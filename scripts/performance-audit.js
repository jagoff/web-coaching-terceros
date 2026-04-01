/**
 * Performance Audit Script
 * Analiza el bundle size, dependencias y métricas de performance
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 ANÁLISIS DE PERFORMANCE\n');

// 1. Analizar tamaño del bundle
console.log('📦 BUNDLE SIZE ANALYSIS');
console.log('=' .repeat(50));

const nextDir = path.join(__dirname, '../.next');
const staticDir = path.join(nextDir, 'static');

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  if (!fs.existsSync(dirPath)) {
    return 0;
  }

  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const file of files) {
    const filePath = path.join(dirPath, file.name);
    
    if (file.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    }
  }
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

const totalSize = getDirectorySize(nextDir);
const staticSize = getDirectorySize(staticDir);

console.log(`Total .next directory: ${formatBytes(totalSize)}`);
console.log(`Static assets: ${formatBytes(staticSize)}`);
console.log(`Build artifacts: ${formatBytes(totalSize - staticSize)}`);

// 2. Analizar chunks de JavaScript
console.log('\n📄 JAVASCRIPT CHUNKS');
console.log('=' .repeat(50));

const chunksDir = path.join(staticDir, 'chunks');
if (fs.existsSync(chunksDir)) {
  const chunks = fs.readdirSync(chunksDir)
    .filter(file => file.endsWith('.js'))
    .map(file => {
      const filePath = path.join(chunksDir, file);
      const stats = fs.statSync(filePath);
      return { name: file, size: stats.size };
    })
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  console.log('Top 10 largest chunks:');
  chunks.forEach((chunk, i) => {
    console.log(`${i + 1}. ${chunk.name}: ${formatBytes(chunk.size)}`);
  });
}

// 3. Analizar dependencias del package.json
console.log('\n📚 DEPENDENCIES ANALYSIS');
console.log('=' .repeat(50));

const packageJson = require('../package.json');
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

console.log(`Production dependencies: ${Object.keys(dependencies).length}`);
console.log(`Dev dependencies: ${Object.keys(devDependencies).length}`);

console.log('\nProduction dependencies:');
Object.keys(dependencies).forEach(dep => {
  console.log(`  - ${dep}: ${dependencies[dep]}`);
});

// 4. Analizar imágenes
console.log('\n🖼️  IMAGES ANALYSIS');
console.log('=' .repeat(50));

const imagesDir = path.join(__dirname, '../public/images');
if (fs.existsSync(imagesDir)) {
  const imageSize = getDirectorySize(imagesDir);
  console.log(`Total images size: ${formatBytes(imageSize)}`);
  
  // Contar imágenes por tipo
  const imageTypes = {};
  function countImages(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory()) {
        countImages(filePath);
      } else {
        const ext = path.extname(file.name).toLowerCase();
        if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)) {
          imageTypes[ext] = (imageTypes[ext] || 0) + 1;
        }
      }
    });
  }
  countImages(imagesDir);
  
  console.log('Images by type:');
  Object.entries(imageTypes).forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count} files`);
  });
}

// 5. Recomendaciones
console.log('\n💡 RECOMMENDATIONS');
console.log('=' .repeat(50));

const recommendations = [];

// Check bundle size
if (totalSize > 10 * 1024 * 1024) { // > 10MB
  recommendations.push('⚠️  Bundle size is large (>10MB). Consider code splitting.');
}

// Check dependencies
const heavyDeps = ['framer-motion', '@emotion/react', '@emotion/styled'];
const hasHeavyDeps = heavyDeps.filter(dep => dependencies[dep]);
if (hasHeavyDeps.length > 0) {
  recommendations.push(`⚠️  Heavy dependencies detected: ${hasHeavyDeps.join(', ')}`);
  recommendations.push('   Consider lazy loading or alternatives.');
}

// Check images
if (fs.existsSync(imagesDir)) {
  const imageSize = getDirectorySize(imagesDir);
  if (imageSize > 5 * 1024 * 1024) { // > 5MB
    recommendations.push('⚠️  Images folder is large (>5MB). Consider:');
    recommendations.push('   - Converting to WebP format');
    recommendations.push('   - Compressing images');
    recommendations.push('   - Using CDN for images');
  }
}

// Check for unoptimized images
const unoptimizedConfig = require('../next.config.ts');
if (unoptimizedConfig.default?.images?.unoptimized) {
  recommendations.push('⚠️  Image optimization is disabled (unoptimized: true)');
  recommendations.push('   Consider enabling or using external CDN.');
}

if (recommendations.length === 0) {
  console.log('✅ No major issues detected!');
} else {
  recommendations.forEach(rec => console.log(rec));
}

// 6. Core Web Vitals targets
console.log('\n🎯 CORE WEB VITALS TARGETS');
console.log('=' .repeat(50));
console.log('LCP (Largest Contentful Paint): < 2.5s');
console.log('FID (First Input Delay): < 100ms');
console.log('CLS (Cumulative Layout Shift): < 0.1');
console.log('FCP (First Contentful Paint): < 1.8s');
console.log('TTI (Time to Interactive): < 3.8s');

console.log('\n✅ Performance audit completed!');
console.log('\nNext steps:');
console.log('1. Run Lighthouse: npm run test:visual');
console.log('2. Check bundle analyzer: ANALYZE=true npm run build');
console.log('3. Test on real devices');
