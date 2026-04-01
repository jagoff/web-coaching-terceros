/**
 * Script para reemplazar console.logs con el logger centralizado
 * Uso: node scripts/fix-console-logs.js
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const componentsDir = path.join(__dirname, '../components');

// Archivos a procesar
const files = [
  'TestPage.tsx',
  'experimental/ForceVisibleButton.tsx',
  'experimental/ContactNetlify.tsx',
  'YouTubeThumbnail.tsx',
  'experimental/ContactFormspree.tsx',
  'experimental/CalBooking.tsx',
  'experimental/ContactEmailJS.tsx',
  'sections/CalBookingSimple.tsx',
  'ui/ErrorBoundary.tsx',
  'ui/parallax-hero-images.tsx'
].map(f => path.join(componentsDir, f));

files.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Archivo no encontrado: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Verificar si ya tiene el import del logger
  if (!content.includes('import { debugLog, errorLog }') && !content.includes('from "@/lib/debug-logger"')) {
    // Agregar import después del último import
    const lastImportIndex = content.lastIndexOf('import ');
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    
    if (endOfLastImport !== -1) {
      content = content.slice(0, endOfLastImport + 1) + 
                'import { debugLog, errorLog } from "@/lib/debug-logger";\n' +
                content.slice(endOfLastImport + 1);
      modified = true;
    }
  }

  // Reemplazar console.log con debugLog
  const componentName = path.basename(filePath, '.tsx');
  content = content.replace(/console\.log\(['"`]([^'"`]+)['"`],?\s*([^)]*)\)/g, (match, msg, data) => {
    modified = true;
    return data ? `debugLog('${componentName}', '${msg}', ${data})` : `debugLog('${componentName}', '${msg}')`;
  });

  // Reemplazar console.error con errorLog
  content = content.replace(/console\.error\(['"`]([^'"`]+)['"`],?\s*([^)]*)\)/g, (match, msg, data) => {
    modified = true;
    return data ? `errorLog('${componentName}', '${msg}', ${data})` : `errorLog('${componentName}', '${msg}')`;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Actualizado: ${path.relative(componentsDir, filePath)}`);
  } else {
    console.log(`⏭️  Sin cambios: ${path.relative(componentsDir, filePath)}`);
  }
});

console.log('\n✨ Script completado');
