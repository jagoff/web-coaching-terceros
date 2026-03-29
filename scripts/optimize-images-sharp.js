const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-optimized');

// Asegurar que el directorio de salida existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Optimizar imágenes con Sharp (más rápido y confiable)
async function optimizeImages() {
  try {
    console.log('🚀 Optimizando imágenes con Sharp...');
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedFiles = 0;
    
    // Procesar todos los archivos de imagen
    async function processDirectory(dirPath, relativePath = '') {
      const files = fs.readdirSync(dirPath);
      
      for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          await processDirectory(fullPath, path.join(relativePath, file));
        } else if (/\.(png|jpg|jpeg)$/i.test(file)) {
          const originalSize = stats.size;
          totalOriginalSize += originalSize;
          
          const inputBuffer = fs.readFileSync(fullPath);
          const ext = path.extname(file).toLowerCase();
          const name = path.basename(file, ext);
          const outputSubDir = path.join(outputDir, relativePath);
          
          // Asegurar que el subdirectorio existe
          if (!fs.existsSync(outputSubDir)) {
            fs.mkdirSync(outputSubDir, { recursive: true });
          }
          
          // Optimizar a WebP
          const webpPath = path.join(outputSubDir, `${name}.webp`);
          const webpBuffer = await sharp(inputBuffer)
            .webp({ 
              quality: 80,
              method: 6,
              preset: 'photo',
              effort: 6
            })
            .toBuffer();
          
          fs.writeFileSync(webpPath, webpBuffer);
          const webpSize = webpBuffer.length;
          totalOptimizedSize += webpSize;
          
          // También mantener versión optimizada del formato original
          const optimizedPath = path.join(outputSubDir, file);
          let optimizedBuffer;
          
          if (ext === '.png') {
            optimizedBuffer = await sharp(inputBuffer)
              .png({ 
                quality: 80,
                compressionLevel: 9,
                palette: true
              })
              .toBuffer();
          } else {
            optimizedBuffer = await sharp(inputBuffer)
              .jpeg({ 
                quality: 85,
                progressive: true,
                mozjpeg: true
              })
              .toBuffer();
          }
          
          fs.writeFileSync(optimizedPath, optimizedBuffer);
          totalOptimizedSize += optimizedBuffer.length;
          
          const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
          console.log(`✅ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(webpSize/1024).toFixed(1)}KB (${savings}% ahorro)`);
          
          processedFiles++;
        }
      }
    }
    
    await processDirectory(inputDir);
    
    const overallSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('\\n📊 Resumen de optimización:');
    console.log(`📁 Archivos procesados: ${processedFiles}`);
    console.log(`💾 Tamaño original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`💾 Tamaño optimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`💰 Ahorro total: ${overallSavings}%`);
    
  } catch (error) {
    console.error('❌ Error en optimización:', error);
  }
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
        const originalFile = file.replace('.webp', '');
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
