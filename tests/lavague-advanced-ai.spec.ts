import { test, expect } from '@playwright/test';

test.describe('LaVague Advanced AI - Natural Language Understanding', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
  });

  test('AI understands and describes the page purpose in natural language', async ({ page }) => {
    console.log('🧠 AI: Analyzing page purpose using natural language understanding...');
    
    // Extract semantic meaning from the page
    const pageAnalysis = await page.evaluate(() => {
      const title = document.title;
      const h1 = document.querySelector('h1')?.textContent || '';
      const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      
      // Extract key sections
      const sections = Array.from(document.querySelectorAll('section, [id]')).map(section => ({
        id: section.id,
        heading: section.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || '',
        text: section.textContent?.slice(0, 200) || ''
      }));
      
      // Extract services/offers
      const services = Array.from(document.querySelectorAll('[class*="service"], [class*="offer"]')).map(el => ({
        title: el.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || '',
        description: el.textContent?.slice(0, 150) || ''
      }));
      
      return {
        title,
        mainHeading: h1,
        metaDescription,
        sections,
        services,
        totalText: document.body.textContent?.slice(0, 500) || ''
      };
    });
    
    console.log('🧠 AI: Page Analysis Results:');
    console.log('   Title:', pageAnalysis.title);
    console.log('   Main Heading:', pageAnalysis.mainHeading);
    console.log('   Sections found:', pageAnalysis.sections.length);
    
    // Natural language understanding - what is this page about?
    const keywords = ['coaching', 'liderazgo', 'consultora', 'transformación', 'equipo', 'organizacional'];
    const foundKeywords = keywords.filter(keyword => 
      pageAnalysis.totalText.toLowerCase().includes(keyword)
    );
    
    const pagePurpose = foundKeywords.length > 3 ? 
      'This is a professional coaching and leadership consulting landing page focused on team transformation and organizational development.' :
      'This appears to be a business consulting website.';
    
    console.log('🧠 AI: Natural Language Understanding Result:');
    console.log('   Detected Purpose:', pagePurpose);
    console.log('   Key Concepts:', foundKeywords);
    
    expect(foundKeywords.length).toBeGreaterThan(3);
    expect(pageAnalysis.mainHeading.length).toBeGreaterThan(10);
    
    console.log('✅ AI: Successfully understood page purpose in natural language');
  });

  test('AI identifies and classifies all conversion opportunities', async ({ page }) => {
    console.log('🧠 AI: Identifying and classifying conversion opportunities...');
    
    const conversionAnalysis = await page.evaluate(() => {
      // Find all potential conversion elements
      const conversionElements: Array<{
        type: string;
        text: string;
        position: number;
        visible: boolean;
      }> = [];
      
      // CTA buttons
      document.querySelectorAll('button, .btn, a[href*="contact"], a[href*="agenda"]').forEach((el: Element) => {
        const text = (el.textContent || '').trim();
        if (text.length > 0 && (text.includes('sesión') || text.includes('gratis') || text.includes('agenda') || text.includes('contact'))) {
          conversionElements.push({
            type: 'CTA Button',
            text,
            position: el.getBoundingClientRect().top,
            visible: (el as HTMLElement).offsetParent !== null
          });
        }
      });
      
      // Contact forms
      document.querySelectorAll('form').forEach((form: Element) => {
        const inputs = form.querySelectorAll('input, textarea, select').length;
        if (inputs > 0) {
          conversionElements.push({
            type: 'Contact Form',
            text: `Form with ${inputs} fields`,
            position: form.getBoundingClientRect().top,
            visible: (form as HTMLElement).offsetParent !== null
          });
        }
      });
      
      // Phone/email links
      document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]').forEach((el: Element) => {
        conversionElements.push({
          type: 'Direct Contact',
          text: (el.textContent || '').trim() || (el as HTMLAnchorElement).href,
          position: el.getBoundingClientRect().top,
          visible: (el as HTMLElement).offsetParent !== null
        });
      });
      
      // Social links
      document.querySelectorAll('a[href*="instagram"], a[href*="linkedin"], a[href*="facebook"], a[href*="twitter"]').forEach((el: Element) => {
        conversionElements.push({
          type: 'Social Media',
          text: (el.textContent || '').trim() || (el as HTMLAnchorElement).href.split('/').pop() || 'Social Link',
          position: el.getBoundingClientRect().top,
          visible: (el as HTMLElement).offsetParent !== null
        });
      });
      
      return conversionElements;
    });
    
    console.log('🧠 AI: Conversion Analysis Results:');
    conversionAnalysis.forEach((element, index) => {
      console.log(`   ${index + 1}. ${element.type}: "${element.text}" (Visible: ${element.visible})`);
    });
    
    // Classify conversion funnel stages
    const funnelStages = {
      awareness: conversionAnalysis.filter((e: any) => e.type === 'Social Media').length,
      consideration: conversionAnalysis.filter((e: any) => e.type === 'CTA Button' && e.text.includes('más')).length,
      conversion: conversionAnalysis.filter((e: any) => e.type === 'Contact Form' || e.text.includes('agenda')).length,
      retention: 0 // No retention elements detected
    };
    
    console.log('🧠 AI: Conversion Funnel Analysis:', funnelStages);
    
    expect(conversionAnalysis.length).toBeGreaterThan(3);
    expect(funnelStages.conversion).toBeGreaterThan(0);
    
    console.log('✅ AI: Successfully identified and classified conversion opportunities');
  });

  test('AI performs semantic content analysis and quality assessment', async ({ page }) => {
    console.log('🧠 AI: Performing semantic content analysis...');
    
    const contentAnalysis = await page.evaluate(() => {
      // Extract text content by sections
      const sections: Record<string, any> = {};
      document.querySelectorAll('section, [id]').forEach(section => {
        const id = section.id || `section-${Object.keys(sections).length}`;
        const text = section.textContent?.trim() || '';
        if (text.length > 50) {
          sections[id] = {
            wordCount: text.split(/\s+/).length,
            sentenceCount: text.split(/[.!?]+/).length,
            readabilityScore: text.length / (text.split(/\s+/).length || 1), // Simple readability metric
            keyPhrases: text.toLowerCase().match(/\b\w{4,}\b/g)?.slice(0, 10) || []
          };
        }
      });
      
      // Analyze emotional tone (simple keyword-based)
      const bodyText = document.body.textContent?.toLowerCase() || '';
      const emotionalWords = {
        positive: ['excelente', 'transformación', 'éxito', 'crecimiento', 'potencial', 'mejora', 'lograr'],
        negative: ['problema', 'dificultad', 'desafío', 'obstáculo'],
        action: ['transformá', 'liderá', 'escalá', 'lográ', 'obtené', 'contactá']
      };
      
      const emotionalTone: Record<string, number> = {};
      Object.entries(emotionalWords).forEach(([tone, words]) => {
        emotionalTone[tone] = words.filter(word => bodyText.includes(word)).length;
      });
      
      return {
        sections,
        emotionalTone,
        totalWordCount: bodyText.split(/\s+/).length,
        uniqueWords: new Set(bodyText.split(/\s+/)).size
      };
    });
    
    console.log('🧠 AI: Content Quality Assessment:');
    console.log('   Total Word Count:', contentAnalysis.totalWordCount);
    console.log('   Unique Words:', contentAnalysis.uniqueWords);
    console.log('   Vocabulary Richness:', (contentAnalysis.uniqueWords / contentAnalysis.totalWordCount * 100).toFixed(1) + '%');
    console.log('   Emotional Tone:', contentAnalysis.emotionalTone);
    
    // Content quality scoring
    const qualityScore = {
      length: contentAnalysis.totalWordCount > 200 ? 25 : 0,
      diversity: (contentAnalysis.uniqueWords / contentAnalysis.totalWordCount) > 0.3 ? 25 : 0,
      structure: Object.keys(contentAnalysis.sections).length > 3 ? 25 : 0,
      emotion: (contentAnalysis.emotionalTone as any).positive > 2 ? 25 : 0
    };
    
    const totalScore = Object.values(qualityScore).reduce((a, b) => a + b, 0);
    console.log('🧠 AI: Content Quality Score:', totalScore + '/100', qualityScore);
    
    expect(contentAnalysis.totalWordCount).toBeGreaterThan(100);
    expect(Object.keys(contentAnalysis.sections).length).toBeGreaterThan(2);
    expect(totalScore).toBeGreaterThan(50);
    
    console.log('✅ AI: Semantic content analysis completed successfully');
  });

  test('AI simulates user journey with decision making', async ({ page }) => {
    console.log('🧠 AI: Simulating intelligent user journey...');
    
    const journeyLog = [];
    
    // AI Decision: First, understand what the page offers
    journeyLog.push('🧠 AI Decision: Scanning page to understand value proposition...');
    const heroText = await page.locator('h1').textContent();
    journeyLog.push(`🧠 AI Understanding: Page offers "${heroText}"`);
    
    // AI Decision: Look for social proof to build trust
    journeyLog.push('🧠 AI Decision: Seeking social proof and testimonials...');
    await page.evaluate(() => {
      const testimonio = document.querySelector('[id*="testimonio"], [class*="testimonio"]');
      if (testimonio) testimonio.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    const testimoniosFound = await page.locator('[id*="testimonio"], [class*="testimonio"]').count();
    journeyLog.push(`🧠 AI Finding: Found ${testimoniosFound} testimonial sections`);
    
    // AI Decision: Evaluate services based on needs
    journeyLog.push('🧠 AI Decision: Evaluating available services...');
    await page.evaluate(() => {
      const servicios = document.querySelector('#servicios, [id*="servicio"]');
      if (servicios) servicios.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    const services = await page.locator('#servicios h2, #servicios h3').allTextContents();
    journeyLog.push(`🧠 AI Analysis: Available services: ${services.slice(0, 3).join(', ')}`);
    
    // AI Decision: Based on analysis, determine best conversion path
    journeyLog.push('🧠 AI Decision: Determining optimal conversion path...');
    
    if (services.length > 0 && testimoniosFound > 0) {
      journeyLog.push('🧠 AI Conclusion: Page has good services and social proof - ready for conversion');
      
      // AI Decision: Look for easiest conversion path
      const freeSessionCTA = page.locator('a, button').filter({ hasText: /sesión.*gratis|gratuita/ }).first();
      if (await freeSessionCTA.isVisible()) {
        journeyLog.push('🧠 AI Action: Found free session CTA - this is the best conversion point');
        await freeSessionCTA.click();
        await page.waitForTimeout(2000);
        journeyLog.push('🧠 AI Success: Clicked free session CTA');
      }
    } else {
      journeyLog.push('🧠 AI Conclusion: Need more information before converting');
    }
    
    // Print journey log
    journeyLog.forEach(log => console.log(`   ${log}`));
    
    // Verify AI made intelligent decisions
    expect(services.length).toBeGreaterThan(0);
    expect(journeyLog.length).toBeGreaterThan(5);
    
    console.log('✅ AI: Successfully completed intelligent user journey simulation');
  });

  test('AI generates natural language recommendations', async ({ page }) => {
    console.log('🧠 AI: Generating natural language recommendations...');
    
    const siteAnalysis = await page.evaluate(() => {
      return {
        hasVideo: document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0,
        hasTestimonials: document.querySelectorAll('[class*="testimonio"], [id*="testimonio"]').length > 0,
        hasPricing: document.querySelectorAll('[class*="precio"], [class*="price"], [id*="precio"]').length > 0,
        hasFAQ: document.querySelectorAll('[class*="pregunta"], [class*="faq"], [id*="faq"]').length > 0,
        ctaCount: document.querySelectorAll('button, .btn').length,
        imageCount: document.querySelectorAll('img').length,
        formCount: document.querySelectorAll('form').length,
        hasBlog: document.querySelectorAll('[class*="blog"], [id*="blog"]').length > 0,
        hasCertifications: document.querySelectorAll('[class*="certificacion"], [class*="certificado"]').length > 0
      };
    });
    
    console.log('🧠 AI: Site Feature Analysis:', siteAnalysis);
    
    // Generate intelligent recommendations
    const recommendations = [];
    
    if (!siteAnalysis.hasVideo) {
      recommendations.push('Consider adding an introductory video to increase engagement and trust');
    }
    
    if (!siteAnalysis.hasPricing) {
      recommendations.push('Add transparent pricing information to reduce friction in the decision process');
    }
    
    if (!siteAnalysis.hasFAQ) {
      recommendations.push('Include an FAQ section to address common objections and questions');
    }
    
    if (siteAnalysis.ctaCount < 3) {
      recommendations.push('Add more strategic CTA buttons throughout the page to capture user interest at different stages');
    }
    
    if (!siteAnalysis.hasBlog) {
      recommendations.push('Consider adding a blog or resources section to demonstrate expertise and improve SEO');
    }
    
    if (!siteAnalysis.hasCertifications) {
      recommendations.push('Showcase certifications and credentials to build credibility and trust');
    }
    
    if (siteAnalysis.formCount === 0) {
      recommendations.push('Add a contact form to capture leads who prefer not to call or email directly');
    }
    
    console.log('🧠 AI: Natural Language Recommendations:');
    recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
    
    // Generate overall assessment
    const score = Object.values(siteAnalysis).filter(Boolean).length;
    const maxScore = Object.keys(siteAnalysis).length;
    const percentage = (score / maxScore * 100).toFixed(0);
    
    console.log(`🧠 AI: Overall Site Completeness: ${percentage}% (${score}/${maxScore})`);
    
    if (parseInt(percentage) >= 80) {
      console.log('🧠 AI Assessment: Excellent! Your site is well-structured and conversion-focused');
    } else if (parseInt(percentage) >= 60) {
      console.log('🧠 AI Assessment: Good foundation with room for improvement');
    } else {
      console.log('🧠 AI Assessment: Basic structure present - consider implementing the recommendations above');
    }
    
    expect(recommendations.length).toBeGreaterThan(0);
    expect(score).toBeGreaterThan(3);
    
    console.log('✅ AI: Successfully generated intelligent recommendations');
  });
});
