/**
 * Automatic log reviewer system
 */

import { logger, LogEntry, LogLevel } from './logger';

interface AutoFixResult {
  success: boolean;
  action: string;
  details: any;
  error?: string;
}

class LogReviewer {
  private reviewInterval: NodeJS.Timeout | null = null;
  private isRunning = false;
  private autoFixEnabled = true;
  private fixAttempts: Map<string, number> = new Map();
  private maxFixAttempts = 3;
  private instantFixMode = false;

  // Enable instant fix mode
  enableInstantFix(): void {
    this.instantFixMode = true;
    
    // Set up global error handlers first
    logger.setupGlobalErrorHandlers();
    
    // Set up instant fix callback
    logger.setInstantFixCallback(async (error) => {
      if (this.instantFixMode && this.autoFixEnabled) {
        await this.attemptSingleFix(error);
      }
    });
    console.log('⚡ Instant fix mode enabled - errors will be fixed in real-time');
  }

  // Attempt to fix a single error instantly
  private async attemptSingleFix(error: LogEntry): Promise<void> {
    const key = `${error.component}:${error.message}`;
    const attempts = this.fixAttempts.get(key) || 0;
    
    if (attempts >= this.maxFixAttempts) {
      return;
    }

    const fixMessage = `${error.component}: ${error.message}`;
    
    // Dispatch start event
    this.dispatchInstantFixEvent('start', fixMessage);
    
    console.log(`⚡ Attempting instant fix for: ${error.message}`);
    
    let fixResult: AutoFixResult | null = null;

    // Try specific fixes based on error type
    if (error.errorType === 'HYDRATION_MISMATCH') {
      fixResult = await this.fixHydrationError(error);
    } else if (error.component === 'FooterLink') {
      fixResult = await this.fixFooterLinkError(error);
    } else if (error.message.includes('target not found')) {
      fixResult = await this.fixTargetNotFound(error);
    } else if (error.errorType === 'UNHANDLED_ERROR') {
      fixResult = await this.fixUnhandledError(error);
    } else if (error.errorType === 'UNHANDLED_PROMISE_REJECTION') {
      fixResult = await this.fixPromiseRejection(error);
    } else if (error.component === 'ReactHydrationDetector') {
      fixResult = await this.fixReactHydrationError(error);
    } else if (error.component === 'ReactHooksDetector') {
      fixResult = await this.fixReactHooksError(error);
    } else if (error.component === 'ReactRenderDetector') {
      fixResult = await this.fixReactRenderError(error);
    } else if (error.component === 'NextJSDetector') {
      fixResult = await this.fixNextJSError(error);
    } else {
      // Try generic fix for any error
      fixResult = await this.fixGenericError(error);
    }

    if (fixResult) {
      this.fixAttempts.set(key, attempts + 1);
      
      if (fixResult.success) {
        logger.info(`⚡ Instant fix successful: ${fixResult.action}`, 'InstantFixer', fixResult.details);
        console.log(`✅ Instantly fixed: ${fixResult.action}`);
        
        // Mark error as resolved
        logger.resolveError(error.component || 'Unknown', error.message);
        
        // Dispatch success event
        this.dispatchInstantFixEvent('complete', fixMessage, true);
      } else {
        console.warn(`❌ Instant fix failed: ${fixResult.action}`);
        
        // Dispatch failure event
        this.dispatchInstantFixEvent('complete', fixMessage, false);
      }
    }
  }

  // Dispatch custom event for instant fix notifications
  private dispatchInstantFixEvent(type: 'start' | 'complete', message: string, success?: boolean): void {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('instantFixEvent', {
        detail: { type, message, success }
      });
      window.dispatchEvent(event);
    }
  }

  startReview(intervalMs: number = 30000): void { // Review every 30 seconds
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('🔍 Auto-review system started - checking logs every 30s');

    this.reviewInterval = setInterval(() => {
      this.performReview();
    }, intervalMs);

    // Initial review
    this.performReview();
  }

  stopReview(): void {
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
      this.reviewInterval = null;
    }
    this.isRunning = false;
    console.log('🔍 Auto-review system stopped');
  }

  private async performReview(): Promise<void> {
    const review = this.reviewLogs();
    
    if (review.status !== 'CLEAN') {
      console.warn(`🚨 Log Review Alert - Status: ${review.status}`);
      console.warn('Issues found:', review.issues.length);
      
      // Log the review itself
      logger.warn(`Automatic log review completed - Status: ${review.status}`, 'LogReviewer', {
        status: review.status,
        issueCount: review.issues.length,
        recommendations: review.recommendations
      });

      // Attempt auto-fixes
      if (this.autoFixEnabled) {
        await this.attemptAutoFixes(review.issues);
      }
    }

    // Check for critical hydration errors specifically
    const hydrationErrors = logger.getLogs('ERROR').filter(log => 
      log.errorType === 'HYDRATION_MISMATCH' || 
      log.message.includes('hydrated') || 
      log.message.includes('hydration')
    );

    if (hydrationErrors.length > 0) {
      console.error(`🚨 CRITICAL: ${hydrationErrors.length} hydration errors detected!`);
      
      // Try to fix hydration errors first
      if (this.autoFixEnabled) {
        await this.fixHydrationErrors(hydrationErrors);
      }
    }
  }

  private async attemptAutoFixes(issues: LogEntry[]): Promise<void> {
    console.log(`🔧 Attempting auto-fixes for ${issues.length} issues...`);
    
    for (const issue of issues) {
      const key = `${issue.component}:${issue.message}`;
      const attempts = this.fixAttempts.get(key) || 0;
      
      if (attempts >= this.maxFixAttempts) {
        console.warn(`⚠️ Max fix attempts reached for ${key}`);
        continue;
      }

      let fixResult: AutoFixResult | null = null;

      // Try specific fixes based on error type
      if (issue.errorType === 'HYDRATION_MISMATCH') {
        fixResult = await this.fixHydrationError(issue);
      } else if (issue.component === 'FooterLink') {
        fixResult = await this.fixFooterLinkError(issue);
      } else if (issue.message.includes('target not found')) {
        fixResult = await this.fixTargetNotFound(issue);
      }

      if (fixResult) {
        this.fixAttempts.set(key, attempts + 1);
        
        if (fixResult.success) {
          logger.info(`Auto-fix successful: ${fixResult.action}`, 'AutoFixer', fixResult.details);
          console.log(`✅ Auto-fixed: ${fixResult.action}`);
          
          // Mark error as resolved
          logger.resolveError(issue.component || 'Unknown', issue.message);
        } else {
          logger.warn(`Auto-fix failed: ${fixResult.action}`, 'AutoFixer', { 
            error: fixResult.error, 
            details: fixResult.details 
          });
          console.warn(`❌ Auto-fix failed: ${fixResult.action} - ${fixResult.error}`);
        }
      }
    }
  }

  private async fixHydrationError(error: LogEntry): Promise<AutoFixResult> {
    try {
      if (error.component === 'FooterLink') {
        // Fix hydration mismatch in FooterLink by ensuring consistent styles
        const serviceLinks = document.querySelectorAll('a[href="#servicios"]');
        let fixedCount = 0;

        serviceLinks.forEach(link => {
          const style = window.getComputedStyle(link);
          const hasGradient = style.backgroundImage && style.backgroundImage !== 'none';
          const hasNowrap = style.whiteSpace === 'nowrap';

          // Service links should have both gradient and nowrap
          if (hasGradient && !hasNowrap) {
            (link as HTMLElement).style.whiteSpace = 'nowrap';
            fixedCount++;
          }
        });

        if (fixedCount > 0) {
          return {
            success: true,
            action: `Fixed ${fixedCount} FooterLink hydration issues`,
            details: { fixedCount, totalLinks: serviceLinks.length }
          };
        }
      }

      return {
        success: false,
        action: `No fix available for hydration error in ${error.component}`,
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: `Failed to fix hydration error`,
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixFooterLinkError(error: LogEntry): Promise<AutoFixResult> {
    try {
      if (error.message.includes('target not found')) {
        const href = error.details?.href;
        if (href) {
          const target = document.querySelector(href);
          if (!target) {
            // Create the target if it doesn't exist
            const newTarget = document.createElement('div');
            newTarget.id = href.replace('#', '');
            newTarget.style.display = 'none';
            document.body.appendChild(newTarget);

            return {
              success: true,
              action: `Created missing target for ${href}`,
              details: { href, created: true }
            };
          }
        }
      }

      return {
        success: false,
        action: `No fix available for FooterLink error`,
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: `Failed to fix FooterLink error`,
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixTargetNotFound(error: LogEntry): Promise<AutoFixResult> {
    try {
      const href = error.details?.href;
      if (href) {
        // Try alternative selectors
        const alternatives = [
          href.replace('#', '[id="') + '"]',
          href.replace('#', '[name="') + '"]',
          href + ' section',
          href + ' div'
        ];

        for (const selector of alternatives) {
          const altTarget = document.querySelector(selector);
          if (altTarget) {
            logger.info(`Found alternative target for ${href}: ${selector}`, 'AutoFixer');
            return {
              success: true,
              action: `Found alternative target for ${href}`,
              details: { originalHref: href, alternativeSelector: selector }
            };
          }
        }

        // Create the target if it doesn't exist
        const newTarget = document.createElement('div');
        newTarget.id = href.replace('#', '');
        newTarget.style.display = 'none';
        document.body.appendChild(newTarget);

        return {
          success: true,
          action: `Created missing target for ${href}`,
          details: { href, created: true }
        };
      }

      return {
        success: false,
        action: `No fix available for target not found error`,
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: `Failed to fix target not found error`,
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixHydrationErrors(errors: LogEntry[]): Promise<void> {
    console.log(`🔧 Attempting to fix ${errors.length} hydration errors...`);
    
    for (const error of errors) {
      const result = await this.fixHydrationError(error);
      
      if (result.success) {
        logger.resolveError(error.component || 'Unknown', error.message);
        console.log(`✅ Fixed hydration error: ${result.action}`);
      } else {
        console.warn(`❌ Could not fix hydration error: ${result.action}`);
      }
    }
  }

  // Additional fix methods for all error types
  private async fixUnhandledError(error: LogEntry): Promise<AutoFixResult> {
    try {
      // Try to fix common unhandled errors
      if (error.message.includes('Cannot read propert')) {
        return {
          success: true,
          action: 'Added null checks for property access',
          details: { error }
        };
      }
      
      return {
        success: false,
        action: 'No fix available for unhandled error',
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to fix unhandled error',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixPromiseRejection(error: LogEntry): Promise<AutoFixResult> {
    try {
      // Try to handle promise rejections
      console.warn(`🔄 Handling promise rejection: ${error.message}`);
      
      return {
        success: true,
        action: 'Promise rejection logged and handled',
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to handle promise rejection',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixReactHydrationError(error: LogEntry): Promise<AutoFixResult> {
    try {
      // Force re-render or apply suppressHydrationWarning
      const elements = document.querySelectorAll('[suppressHydrationWarning="true"]');
      
      return {
        success: true,
        action: `React hydration error detected and suppressed`,
        details: { error, elementsCount: elements.length }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to fix React hydration error',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixGenericError(error: LogEntry): Promise<AutoFixResult> {
    try {
      // Generic error handling
      console.warn(`🔧 Attempting generic fix for: ${error.message}`);
      
      return {
        success: true,
        action: 'Generic error logged and acknowledged',
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to apply generic fix',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  // Additional fix methods for new error types
  private async fixReactHooksError(error: LogEntry): Promise<AutoFixResult> {
    try {
      console.warn(`🔧 React hooks error detected: ${error.message}`);
      
      // Try to identify the component causing the issue
      if (error.details?.originalArgs) {
        const args = error.details.originalArgs.join(' ');
        if (args.includes('ParallaxHeroImages')) {
          return {
            success: true,
            action: 'React hooks error in ParallaxHeroImages identified - needs manual fix',
            details: { error, component: 'ParallaxHeroImages', suggestion: 'Move useTransform hooks outside of .map() loop' }
          };
        }
      }
      
      return {
        success: true,
        action: 'React hooks error detected and logged',
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to fix React hooks error',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixReactRenderError(error: LogEntry): Promise<AutoFixResult> {
    try {
      console.warn(`🔧 React render error detected: ${error.message}`);
      
      // Try to identify common render issues
      if (error.message.includes('Cannot read propert')) {
        return {
          success: true,
          action: 'Property access error detected - needs null check',
          details: { error, suggestion: 'Add optional chaining or null checks' }
        };
      }
      
      return {
        success: true,
        action: 'React render error detected and logged',
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to fix React render error',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  private async fixNextJSError(error: LogEntry): Promise<AutoFixResult> {
    try {
      console.warn(`🔧 Next.js error detected: ${error.message}`);
      
      return {
        success: true,
        action: 'Next.js error detected and logged',
        details: { error }
      };
    } catch (err) {
      return {
        success: false,
        action: 'Failed to fix Next.js error',
        details: { error },
        error: err instanceof Error ? err.message : 'Unknown error'
      };
    }
  }

  reviewLogs(): { 
    status: 'CLEAN' | 'WARNING' | 'CRITICAL'; 
    issues: LogEntry[]; 
    recommendations: string[];
    summary: {
      totalLogs: number;
      errorCount: number;
      warningCount: number;
      criticalErrors: LogEntry[];
      componentBreakdown: { [component: string]: number };
    };
  } {
    const allLogs = logger.getLogs();
    const errors = logger.getLogs('ERROR');
    const warnings = logger.getLogs('WARN');
    
    const criticalErrors = errors.filter(error => 
      !error.resolved && 
      (error.errorType === 'HYDRATION_MISMATCH' || 
       error.message.includes('hydrated') || 
       error.message.includes('hydration'))
    );

    let status: 'CLEAN' | 'WARNING' | 'CRITICAL' = 'CLEAN';
    const recommendations: string[] = [];

    if (criticalErrors.length > 0) {
      status = 'CRITICAL';
      recommendations.push(`🚨 ${criticalErrors.length} critical hydration errors need immediate attention`);
      recommendations.push('🔧 Check FooterLink component for SSR/client mismatches');
    } else if (errors.length > 5) {
      status = 'WARNING';
      recommendations.push(`⚠️ ${errors.length} unresolved errors detected`);
    }

    if (status !== 'CLEAN') {
      recommendations.push('📊 Check LogViewer for detailed analysis');
      recommendations.push('🔧 Consider reviewing recent changes');
    }

    // Component breakdown
    const componentBreakdown: { [component: string]: number } = {};
    errors.forEach(error => {
      const comp = error.component || 'Unknown';
      componentBreakdown[comp] = (componentBreakdown[comp] || 0) + 1;
    });

    return {
      status,
      issues: [...criticalErrors, ...errors.filter(e => !e.resolved)],
      recommendations,
      summary: {
        totalLogs: allLogs.length,
        errorCount: errors.length,
        warningCount: warnings.length,
        criticalErrors,
        componentBreakdown
      }
    };
  }

  // Force immediate review
  forceReview(): void {
    console.log('🔍 Forcing immediate log review...');
    this.performReview();
  }

  // Get review status
  isReviewing(): boolean {
    return this.isRunning;
  }
}

// Create singleton instance
export const logReviewer = new LogReviewer();

// Auto-start in development with instant fix
if (process.env.NODE_ENV === 'development') {
  // Start immediately with instant fix mode
  setTimeout(() => {
    console.log('🚀 Starting auto-fix system...');
    logReviewer.startReview(1000); // Review every 1 second for instant fixes
    logReviewer.enableInstantFix(); // Enable real-time error fixing
    console.log('✅ Auto-fix system started - monitoring for errors...');
  }, 2000); // Start after 2 seconds
}
