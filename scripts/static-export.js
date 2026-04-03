#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizing for static hosting...');

// Add static export configuration
try {
  console.log('📦 Adding static export configuration...');
  
  // Read current next.config.ts
  const configPath = path.join(process.cwd(), 'next.config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Check if output is already set to 'export'
  if (configContent.includes("output: 'export'")) {
    console.log('✅ Static export already configured');
  } else {
    // Add output export to the nextConfig object
    // Find the position after const nextConfig: NextConfig = {
    const configStart = configContent.indexOf("const nextConfig: NextConfig = {");
    if (configStart !== -1) {
      // Find the closing brace of the config object
      const configEnd = configContent.indexOf("};", configStart);
      if (configEnd !== -1) {
        // Insert output: 'export' before the closing brace
        const beforeClosingBrace = configContent.lastIndexOf("\n", configEnd);
        const insertionPoint = beforeClosingBrace + 1;
        
        const indent = '  '; // Match existing indentation
        const outputConfig = `\n${indent}output: 'export',\n`;
        
        configContent = configContent.slice(0, insertionPoint) + 
                        outputConfig + 
                        configContent.slice(insertionPoint);
      }
    }
    
    fs.writeFileSync(configPath, configContent);
    console.log('✅ Updated configuration for static export');
  }
  
  // Build with static export
  console.log('📦 Building static export...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if out directory exists
  const outDir = path.join(process.cwd(), 'out');
  if (fs.existsSync(outDir)) {
    console.log('✅ Static files generated in /out directory');
    
    // List generated files
    const files = fs.readdirSync(outDir, { recursive: true });
    console.log(`📄 Generated ${files.length} files`);
    
    // Check for critical files
    const criticalFiles = ['index.html', '_next/static'];
    criticalFiles.forEach(file => {
      const filePath = path.join(outDir, file);
      if (fs.existsSync(filePath)) {
        console.log(`✅ ${file} found`);
      } else {
        console.log(`⚠️  ${file} not found`);
      }
    });
    
  } else {
    console.log('❌ No static export directory found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Static optimization failed:', error.message);
  process.exit(1);
}

console.log('🎉 Static optimization completed!');
console.log('📁 Your static site is ready in the /out directory');
