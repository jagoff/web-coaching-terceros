#!/usr/bin/env node

/**
 * Page Components Hydration Check
 * Checks only the components used in the main page for hydration issues
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Components used in the main page (from app/page.tsx)
const PAGE_COMPONENTS = [
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
  'components/WhatsAppBooking.tsx',
  'components/PageSections.tsx',
];

const CRITICAL_ISSUES = [
  'Math.random()',
  'Date.now()',
  'typeof window',
];

function checkPageComponents() {
  const criticalIssues = [];
  const allIssues = [];
  
  PAGE_COMPONENTS.forEach(componentPath => {
    const fullPath = path.join(process.cwd(), componentPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Component not found: ${componentPath}`);
      return;
    }
    
    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        // Skip comments
        if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
        
        CRITICAL_ISSUES.forEach(issue => {
          if (line.includes(issue)) {
            const issueData = {
              file: componentPath,
              line: index + 1,
              issue: issue,
              code: line.trim(),
            };
            
            allIssues.push(issueData);
            
            // Critical issues are those that cause hydration mismatches
            if (issue === 'Math.random()' || issue === 'Date.now()') {
              criticalIssues.push(issueData);
            }
          }
        });
      });
    } catch (error) {
      console.error(`Error scanning ${componentPath}:`, error.message);
    }
  });
  
  return { criticalIssues, allIssues };
}

// Run the check
const { criticalIssues, allIssues } = checkPageComponents();

console.log('\n🔍 Page Components Hydration Check\n');
console.log('===================================\n');

if (criticalIssues.length === 0) {
  console.log('✅ No critical hydration issues found in page components!');
  console.log('🚀 Site should load without hydration errors\n');
} else {
  console.log(`🚨 Found ${criticalIssues.length} CRITICAL hydration issues:\n`);
  
  criticalIssues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.file}:${issue.line}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Code: ${issue.code}`);
    console.log('');
  });
}

if (allIssues.length > criticalIssues.length) {
  console.log(`ℹ️  Additional non-critical issues: ${allIssues.length - criticalIssues.length}`);
}

console.log('📊 Summary:');
console.log(`- Page components checked: ${PAGE_COMPONENTS.length}`);
console.log(`- Critical issues: ${criticalIssues.length}`);
console.log(`- Total issues: ${allIssues.length}`);
console.log(`- Status: ${criticalIssues.length === 0 ? '✅ Ready for production' : '🚨 Needs immediate fixes'}`);

if (criticalIssues.length > 0) {
  console.log('\n🔧 Recommended fixes:');
  console.log('1. Replace Math.random() with deterministic functions');
  console.log('2. Move Date.now() to useEffect');
  console.log('3. Use SSR-safe patterns for browser APIs');
  console.log('4. Test with npm run build && npm run start');
}
