const imagemin = require('imagemin');
const webp = require('imagemin-webp');
const mozjpeg = require('imagemin-mozjpeg');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-optimized');

// Asegurar que el directorio de salida existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Optimizar imágenes a formatos modernos
async function optimizeImages() {
  try {
    console.log('🚀 Optimizando imágenes...');
    
    // Optimizar PNG a WebP
    const webpFiles = await imagemin([`${inputDir}/**/*.png`], {
      destination: outputDir,
      plugins: [
        webp({
          quality: 80,
          method: 6,
          preset: 'photo',
          alphaQuality: 80,
        })
      ]
    });

    // Optimizar JPEG a WebP y JPEG progresivo
    const jpegFiles = await imagemin([`${inputDir}/**/*.jpg`, `${inputDir}/**/*.jpeg`], {
      destination: outputDir,
      plugins: [
        webp({
          quality: 85,
          method: 6,
          preset: 'photo',
        }),
        mozjpeg({
          quality: 85,
          progressive: true,
        })
      ]
    });

    console.log('✅ Optimización completada:');
    console.log(`📁 WebP files: ${webpFiles.length}`);
    console.log(`📁 JPEG files: ${jpegFiles.length}`);
    
    // Calcular ahorro de espacio
    const originalSize = await getDirectorySize(inputDir);
    const optimizedSize = await getDirectorySize(outputDir);
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`💾 Ahorro de espacio: ${savings}%`);
    console.log(`📉 Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`📉 Optimizado: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
    
  } catch (error) {
    console.error('❌ Error en optimización:', error);
  }
}

// Calcular tamaño de directorio
async function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  function calculateSize(filePath) {
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      const files = fs.readdirSync(filePath);
      files.forEach(file => {
        const fullPath = path.join(filePath, file);
        totalSize += calculateSize(fullPath);
      });
    } else {
      totalSize += stats.size;
    }
    return totalSize;
  }
  
  return calculateSize(dirPath);
}

// Generar manifiesto de imágenes optimizadas
function generateImageManifest() {
  const manifest = {
    generated: new Date().toISOString(),
    format: 'webp',
    quality: 80,
    images: []
  };
  
  // Escanear directorio optimizado
  function scanDirectory(dirPath, relativePath = '') {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath, path.join(relativePath, file));
      } else if (file.endsWith('.webp')) {
        const originalFile = file.replace('.webp', path.extname(file).replace('.webp', ''));
        manifest.images.push({
          original: path.join(relativePath, originalFile),
          webp: path.join(relativePath, file),
          size: stats.size,
          optimized: true
        });
      }
    });
  }
  
  scanDirectory(outputDir);
  
  // Guardar manifiesto
  const manifestPath = path.join(outputDir, 'manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  
  console.log('📋 Manifiesto generado:', manifestPath);
}

if (require.main === module) {
  optimizeImages().then(() => {
    generateImageManifest();
    console.log('🎉 Optimización de imágenes completada');
  });
}

module.exports = { optimizeImages, generateImageManifest };
