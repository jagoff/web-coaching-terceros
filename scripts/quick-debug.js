#!/usr/bin/env node

/**
 * Quick Debug Script
 * Verificación rápida de problemas comunes
 */

import { execSync } from 'child_process';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const QUICK_CHECKS = [
  {
    name: 'TypeScript Errors',
    cmd: 'npx tsc --noEmit --noUnusedLocals false',
    fix: 'Revisar tipos y variables no utilizadas',
  },
  {
    name: 'ESLint Issues',
    cmd: 'npm run lint',
    fix: 'Corregir estilo y mejores prácticas',
  },
  {
    name: 'Build Success',
    cmd: 'npm run build',
    fix: 'Resolver errores de compilación',
  },
];

const ISSUES_PATTERNS = [
  { pattern: 'TypeError', severity: 'error', solution: 'Error de tipo en JavaScript' },
  { pattern: 'Cannot read property', severity: 'error', solution: 'Acceso a propiedad indefinida' },
  { pattern: 'Hydration failed', severity: 'error', solution: 'Problema de hidratación SSR' },
  { pattern: 'Warning:', severity: 'warning', solution: 'Advertencia de React' },
];

function runQuickChecks() {
  console.log('⚡ QUICK DEBUG - Verificación Rápida\n');
  
  let issues = 0;
  let warnings = 0;

  QUICK_CHECKS.forEach((check, index) => {
    try {
      console.log(`${index + 1}. ${check.name}...`);
      const output = execSync(check.cmd, { encoding: 'utf8', stdio: 'pipe' });
      console.log(`   ✅ PASSED`);
    } catch (error) {
      const output = error.stdout || error.message;
      const hasErrors = ISSUES_PATTERNS.some(p => 
        output.includes(p.pattern) && p.severity === 'error'
      );
      
      if (hasErrors) {
        console.log(`   ❌ FAILED - ${check.fix}`);
        issues++;
      } else {
        console.log(`   ⚠️  WARNING - ${check.fix}`);
        warnings++;
      }
      
      // Mostrar primeras líneas del error
      const errorLines = output.split('\n').slice(0, 3);
      errorLines.forEach(line => console.log(`      ${line}`));
    }
  });

  console.log(`\n📊 Resultados:`);
  console.log(`   ❌ Errores: ${issues}`);
  console.log(`   ⚠️  Advertencias: ${warnings}`);
  console.log(`   ✅ Estado: ${issues === 0 ? 'LISTO' : 'NECESITA REVISIÓN'}`);

  return { issues, warnings };
}

function checkCriticalFiles() {
  console.log('\n📁 Verificando archivos críticos...');
  
  const criticalFiles = [
    'app/layout.tsx',
    'app/page.tsx',
    'components/sections/Hero.tsx',
    'next.config.js',
    'package.json',
  ];

  const missingFiles = [];

  criticalFiles.forEach(file => {
    try {
      readFileSync(file);
      console.log(`   ✅ ${file}`);
    } catch {
      console.log(`   ❌ ${file} - ARCHIVO FALTANTE`);
      missingFiles.push(file);
    }
  });

  return missingFiles;
}

function main() {
  const { issues, warnings } = runQuickChecks();
  const missingFiles = checkCriticalFiles();

  if (issues > 0 || missingFiles.length > 0) {
    console.log('\n🚨 ACCIONES REQUERIDAS:');
    if (issues > 0) console.log(`   - Corregir ${issues} error(es) crítico(s)`);
    if (missingFiles.length > 0) console.log(`   - Crear ${missingFiles.length} archivo(s) faltante(s)`);
    process.exit(1);
  } else if (warnings > 0) {
    console.log('\n💡 RECOMENDACIONES:');
    console.log(`   - Revisar ${warnings} advertencia(s) para mejor calidad`);
    process.exit(0);
  } else {
    console.log('\n🎉 TODO OK - Proyecto listo para desarrollo');
    process.exit(0);
  }
}

main();
