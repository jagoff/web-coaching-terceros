#!/usr/bin/env node

/**
 * Hydration Debug Script
 * Detects common hydration issues in Next.js components
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import path from 'path';
import fs from 'fs';

const HYDRATION_ISSUES = [
  'typeof window',
  'Math.random()',
  'Date.now()',
  'new Date()',
  'localStorage',
  'sessionStorage',
  'document.querySelector',
  'window.innerWidth',
  'window.innerHeight',
  'navigator.userAgent',
];

function findHydrationIssues(dir) {
  const issues = [];
  
  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        HYDRATION_ISSUES.forEach(issue => {
          if (line.includes(issue)) {
            // Skip if it's in a comment
            if (line.trim().startsWith('//') || line.trim().startsWith('*')) return;
            
            issues.push({
              file: path.relative(process.cwd(), filePath),
              line: index + 1,
              issue: issue,
              code: line.trim(),
            });
          }
        });
      });
    } catch (error) {
      console.error(`Error scanning ${filePath}:`, error.message);
    }
  }
  
  function scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
          scanDirectory(fullPath);
        } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
          scanFile(fullPath);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dirPath}:`, error.message);
    }
  }
  
  scanDirectory(dir);
  return issues;
}

// Run the scan
const componentsDir = path.join(process.cwd(), 'components');
const issues = findHydrationIssues(componentsDir);

console.log('\n🔍 Hydration Issues Report\n');
console.log('========================\n');

if (issues.length === 0) {
  console.log('✅ No hydration issues found in components!');
} else {
  console.log(`⚠️  Found ${issues.length} potential hydration issues:\n`);
  
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue.file}:${issue.line}`);
    console.log(`   Issue: ${issue.issue}`);
    console.log(`   Code: ${issue.code}`);
    console.log('');
  });
  
  console.log('\n💡 Solutions:');
  console.log('- Replace Math.random() with deterministic functions');
  console.log('- Use useEffect for browser APIs');
  console.log('- Avoid conditional rendering based on typeof window');
  console.log('- Use SSR-safe patterns for localStorage');
}

console.log('\n📊 Summary:');
console.log(`- Total files scanned: ${fs.readdirSync(componentsDir).length}`);
console.log(`- Issues found: ${issues.length}`);
console.log(`- Status: ${issues.length === 0 ? '✅ Ready for production' : '⚠️  Needs fixes'}`);
