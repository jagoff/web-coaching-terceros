#!/usr/bin/env node

/**
 * Dynamic Components Hydration Check
 * Checks all components that might be loaded dynamically
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// All possible components that could be loaded
const ALL_COMPONENTS = [
  'components/sections/Hero.tsx',
  'components/sections/About.tsx', 
  'components/sections/Services.tsx',
  'components/sections/Process.tsx',
  'components/sections/Testimonials.tsx',
  'components/sections/CaseStudies.tsx',
  'components/sections/Pricing.tsx',
  'components/sections/FAQ.tsx',
  'components/sections/Contact.tsx',
  'components/sections/Footer.tsx',
  'components/sections/CalBookingSimple.tsx',
  'components/WhatsAppBooking.tsx',
  'components/PageSections.tsx',
  'components/ui/LoadingFallback.tsx',
  'components/CoachingWordsBackground.tsx',
  'components/InstagramGesturesCarousel.tsx',
];

const HYDRATION_KILLERS = [
  'Math.random()',
  'Date.now()',
  'new Date()',
  'typeof window',
  'window.innerWidth',
  'window.innerHeight',
  'localStorage',
  'sessionStorage',
  'navigator.userAgent',
  'document.querySelector',
];

function checkAllComponents() {
  const issues = [];
  const criticalIssues = [];
  
  ALL_COMPONENTS.forEach(componentPath => {
    const fullPath = path.join(process.cwd(), componentPath);
    
    if (!fs.existsSync(fullPath)) {
      return;
    }
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Skip comments and imports
        if (line.trim().startsWith('//') || 
            line.trim().startsWith('*') ||
            line.trim().startsWith('import') ||
            line.trim().startsWith('from')) return;
        
        HYDRATION_KILLERS.forEach(issue => {
          if (line.includes(issue)) {
            const issueData = {
              file: componentPath,
              line: index + 1,
              issue: issue,
              code: line.trim(),
            };
            
            issues.push(issueData);
            
            // Critical issues that definitely cause hydration mismatches
            if (['Math.random()', 'Date.now()', 'new Date()'].includes(issue)) {
              criticalIssues.push(issueData);
            }
          }
        });
      });
    } catch (error) {
      console.error(`Error scanning ${componentPath}:`, error.message);
    }
  });
  
  return { criticalIssues, allIssues: issues };
}

// Run the check
const { criticalIssues, allIssues } = checkAllComponents();

console.log('\n🔍 Dynamic Components Hydration Check\n');
console.log('=====================================\n');

if (criticalIssues.length > 0) {
  console.log(`🚨 Found ${criticalIssues.length} CRITICAL hydration issues:\n`);
  
  criticalIssues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.file}:${issue.line}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Code: ${issue.code}`);
    console.log('');
  });
  
  console.log('🔧 IMMEDIATE FIXES NEEDED:');
  console.log('1. Replace Math.random() with deterministic functions');
  console.log('2. Move Date.now() to useEffect');
  console.log('3. Use SSR-safe patterns');
  
} else {
  console.log('✅ No critical hydration issues found!');
}

if (allIssues.length > criticalIssues.length) {
  console.log(`\nℹ️  Additional browser API usage: ${allIssues.length - criticalIssues.length}`);
  console.log('   (These are OK if properly handled in useEffect)');
}

console.log('\n📊 Summary:');
console.log(`- Components checked: ${ALL_COMPONENTS.length}`);
console.log(`- Critical issues: ${criticalIssues.length}`);
console.log(`- Total issues: ${allIssues.length}`);
console.log(`- Status: ${criticalIssues.length === 0 ? '✅ Hydration-safe' : '🚨 Needs fixes'}`);

if (criticalIssues.length === 0) {
  console.log('\n🎯 If hydration errors persist, check:');
  console.log('- Browser extensions interfering with HTML');
  console.log('- CSS-in-JS libraries causing style mismatches');
  console.log('- Third-party scripts modifying DOM');
  console.log('- Framer Motion animations with different initial states');
}
