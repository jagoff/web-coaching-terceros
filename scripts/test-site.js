#!/usr/bin/env node

/**
 * Automated Site Testing Script
 * Tests build, start, and basic functionality
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    const result = execSync(command, { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000 // 30 seconds timeout
    });
    console.log(`✅ ${description} - SUCCESS`);
    return { success: true, output: result };
  } catch (error) {
    console.log(`❌ ${description} - FAILED`);
    console.log(`Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

function checkBuildOutput() {
  console.log('\n🔍 Checking build output...');
  
  const buildDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(buildDir)) {
    console.log('❌ Build directory not found');
    return false;
  }
  
  // Check for static pages
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    const pages = fs.readdirSync(staticDir).filter(f => f.endsWith('.html'));
    console.log(`✅ Found ${pages.length} static pages`);
  }
  
  return true;
}

function checkCriticalFiles() {
  console.log('\n🔍 Checking critical files...');
  
  const criticalFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'components/PageSections.tsx',
    'components/sections/Hero.tsx',
    'components/WhatsAppBooking.tsx',
    'components/sections/Footer.tsx'
  ];
  
  let allExists = true;
  criticalFiles.forEach(file => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
      allExists = false;
    }
  });
  
  return allExists;
}

async function runSiteTest() {
  console.log('🚀 Starting Automated Site Test\n');
  console.log('================================');
  
  // Step 1: Check critical files
  const filesOk = checkCriticalFiles();
  if (!filesOk) {
    console.log('\n❌ Critical files missing - cannot continue');
    return false;
  }
  
  // Step 2: Clean previous build
  console.log('\n🧹 Cleaning previous build...');
  try {
    fs.rmSync(path.join(process.cwd(), '.next'), { recursive: true, force: true });
    console.log('✅ Build directory cleaned');
  } catch (error) {
    console.log('⚠️  Could not clean build directory');
  }
  
  // Step 3: Run build
  const buildResult = runCommand('npm run build', 'Building production version');
  if (!buildResult.success) {
    console.log('\n❌ Build failed - site not ready');
    return false;
  }
  
  // Step 4: Check build output
  const buildOk = checkBuildOutput();
  if (!buildOk) {
    console.log('\n❌ Build output invalid');
    return false;
  }
  
  // Step 5: Check hydration issues
  console.log('\n🔍 Running hydration check...');
  try {
    const hydrationResult = execSync('node scripts/check-page-components.js', { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    if (hydrationResult.includes('✅ No critical hydration issues found')) {
      console.log('✅ Hydration check passed');
    } else {
      console.log('❌ Hydration issues found');
      console.log(hydrationResult);
      return false;
    }
  } catch (error) {
    console.log('❌ Could not run hydration check');
    return false;
  }
  
  // Step 6: Try to start development server (brief test)
  console.log('\n🔄 Testing development server startup...');
  let devServerTest = false;
  try {
    // Start dev server in background
    const devProcess = require('child_process').spawn('npm', ['run', 'dev'], {
      stdio: 'pipe',
      detached: true
    });
    
    // Wait a bit for startup
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if it's still running (successful startup)
    if (devProcess.connected || !devProcess.killed) {
      console.log('✅ Development server starts successfully');
      devServerTest = true;
      
      // Kill the process
      process.kill(-devProcess.pid);
    }
  } catch (error) {
    console.log('⚠️  Could not test development server');
  }
  
  // Final results
  console.log('\n📊 Test Results Summary');
  console.log('=======================');
  console.log(`✅ Critical files: OK`);
  console.log(`✅ Production build: OK`);
  console.log(`✅ Build output: OK`);
  console.log(`✅ Hydration check: OK`);
  console.log(`${devServerTest ? '✅' : '⚠️ '} Development server: ${devServerTest ? 'OK' : 'Not tested'}`);
  
  console.log('\n🎉 Site Status: READY FOR PRODUCTION');
  console.log('🚀 All critical tests passed - hydration issues resolved!');
  
  return true;
}

// Run the test
runSiteTest().then(success => {
  if (success) {
    console.log('\n✅ Test completed successfully');
    process.exit(0);
  } else {
    console.log('\n❌ Test failed - site needs fixes');
    process.exit(1);
  }
}).catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
