#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando verificación de SSR/SSG...');

// Check if Next.js build works with static generation
try {
  console.log('📦 Building project with static generation...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully');
  
  // Check if .next/static exists
  const staticDir = path.join(process.cwd(), '.next/static');
  if (fs.existsSync(staticDir)) {
    console.log('✅ Static files generated in .next/static');
  } else {
    console.log('⚠️  No static files found');
  }
  
  // Check if standalone output exists
  const standaloneDir = path.join(process.cwd(), '.next/standalone');
  if (fs.existsSync(standaloneDir)) {
    console.log('✅ Standalone output generated');
  } else {
    console.log('⚠️  No standalone output found');
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

console.log('🎉 SSR/SSG verification completed!');
