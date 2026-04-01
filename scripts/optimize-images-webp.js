/**
 * Script para optimizar imágenes: convertir PNG a WebP y comprimir
 * Usa Sharp para procesamiento de imágenes de alta calidad
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 85; // Calidad WebP (85 es un buen balance)

console.log('🖼️  OPTIMIZACIÓN DE IMÁGENES\n');

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  
  // Solo procesar PNG y JPG
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return null;
  }

  const dir = path.dirname(imagePath);
  const filename = path.basename(imagePath, ext);
  const webpPath = path.join(dir, `${filename}.webp`);

  // Si ya existe el WebP, skip
  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  Skip: ${path.basename(imagePath)} (WebP ya existe)`);
    return null;
  }

  try {
    const originalStats = fs.statSync(imagePath);
    const originalSize = originalStats.size;

    // Convertir a WebP
    await sharp(imagePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${path.basename(imagePath)}`);
    console.log(`   Original: ${formatBytes(originalSize)}`);
    console.log(`   WebP: ${formatBytes(webpSize)}`);
    console.log(`   Ahorro: ${savings}%\n`);

    return {
      original: imagePath,
      webp: webpPath,
      originalSize,
      webpSize,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Error procesando ${imagePath}:`, error.message);
    return null;
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function processDirectory(dir) {
  const results = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directorio no encontrado: ${dir}`);
    return results;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else {
      const result = await optimizeImage(fullPath);
      if (result) {
        results.push(result);
      }
    }
  }

  return results;
}

async function main() {
  console.log(`Procesando imágenes en: ${IMAGES_DIR}\n`);
  console.log('=' .repeat(60));

  const startTime = Date.now();
  const results = await processDirectory(IMAGES_DIR);
  const endTime = Date.now();

  console.log('=' .repeat(60));
  console.log('\n📊 RESUMEN');
  console.log('=' .repeat(60));

  if (results.length === 0) {
    console.log('No se procesaron imágenes nuevas.');
    return;
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
  const totalSavings = ((totalOriginal - totalWebP) / totalOriginal * 100).toFixed(1);

  console.log(`Imágenes procesadas: ${results.length}`);
  console.log(`Tamaño original total: ${formatBytes(totalOriginal)}`);
  console.log(`Tamaño WebP total: ${formatBytes(totalWebP)}`);
  console.log(`Ahorro total: ${formatBytes(totalOriginal - totalWebP)} (${totalSavings}%)`);
  console.log(`Tiempo: ${((endTime - startTime) / 1000).toFixed(2)}s`);

  console.log('\n✅ Optimización completada!');
  console.log('\nPróximos pasos:');
  console.log('1. Verificar que las imágenes WebP se vean correctamente');
  console.log('2. Actualizar componentes para usar WebP con fallback PNG');
  console.log('3. Ejecutar npm run build');
  console.log('4. Verificar mejora en performance');
}

main().catch(console.error);
