#!/usr/bin/env node

/**
 * Auto Debug System
 * Sistema automático de debugging para desarrollo continuo
 */

import { execSync, spawn } from 'child_process';
import { watch } from 'fs';
import { join } from 'path';
import fs from 'fs';

const CONFIG = {
  componentsDir: './components',
  testsDir: './tests',
  debounceMs: 1000,
  port: 3000,
};

class AutoDebugger {
  constructor() {
    this.isRunning = false;
    this.lastChange = 0;
    this.stats = {
      totalRuns: 0,
      errorsFound: 0,
      warningsFound: 0,
      lastRun: null,
    };
  }

  async checkServer() {
    try {
      const response = await fetch('http://localhost:3000');
      return response.ok;
    } catch {
      return false;
    }
  }

  async startServer() {
    console.log('🚀 Iniciando servidor de desarrollo...');
    const server = spawn('npm', ['run', 'dev'], {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    // Esperar a que el servidor esté listo
    await new Promise(resolve => {
      server.stdout.on('data', (data) => {
        if (data.toString().includes('Ready')) {
          resolve();
        }
      });
    });

    return server;
  }

  async runTests() {
    console.log('🧪 Ejecutando suite de pruebas...');
    
    const tests = [
      { name: 'Unit Tests', cmd: 'npm test', critical: true },
      { name: 'E2E Tests', cmd: 'npm run test:e2e', critical: true },
      { name: 'Linting', cmd: 'npm run lint', critical: false },
      { name: 'Type Check', cmd: 'npx tsc --noEmit', critical: true },
    ];

    const results = [];

    for (const test of tests) {
      try {
        console.log(`▶️  ${test.name}...`);
        const output = execSync(test.cmd, { 
          encoding: 'utf8',
          timeout: 30000 
        });
        
        results.push({
          name: test.name,
          status: 'passed',
          output: output,
          critical: test.critical,
        });
        
        console.log(`✅ ${test.name} - PASSED`);
      } catch (error) {
        results.push({
          name: test.name,
          status: 'failed',
          output: error.message,
          critical: test.critical,
        });
        
        console.log(`❌ ${test.name} - FAILED`);
        
        if (test.critical) {
          this.stats.errorsFound++;
        } else {
          this.stats.warningsFound++;
        }
      }
    }

    return results;
  }

  async checkHydration() {
    console.log('💧 Verificando hidratación...');
    
    try {
      const output = execSync('node scripts/debug-hydration.js', { 
        encoding: 'utf8' 
      });
      
      return {
        status: output.includes('✅ No hydration issues') ? 'passed' : 'warning',
        output: output,
      };
    } catch (error) {
      return {
        status: 'failed',
        output: error.message,
      };
    }
  }

  async analyzePerformance() {
    console.log('⚡ Analizando rendimiento...');
    
    // Verificar tamaño de bundle
    try {
      execSync('npm run analyze', { stdio: 'pipe' });
      return { status: 'passed', output: 'Bundle analysis completed' };
    } catch (error) {
      return { status: 'warning', output: 'Bundle analysis failed' };
    }
  }

  async generateReport(results) {
    const timestamp = new Date().toISOString();
    const report = {
      timestamp,
      stats: this.stats,
      results,
      recommendations: this.generateRecommendations(results),
    };

    // Guardar reporte
    const reportPath = `./debug-reports/debug-${timestamp.replace(/[:.]/g, '-')}.json`;
    fs.mkdirSync('./debug-reports', { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Mostrar resumen
    console.log('\n📊 RESUMEN DE DEBUGGING');
    console.log('='.repeat(50));
    console.log(`✅ Tests pasados: ${results.filter(r => r.status === 'passed').length}`);
    console.log(`❌ Tests fallidos: ${results.filter(r => r.status === 'failed').length}`);
    console.log(`⚠️  Advertencias: ${results.filter(r => r.status === 'warning').length}`);
    console.log(`📁 Reporte guardado: ${reportPath}`);

    return report;
  }

  generateRecommendations(results) {
    const recommendations = [];

    results.forEach(result => {
      if (result.status === 'failed' && result.critical) {
        recommendations.push({
          priority: 'high',
          issue: result.name,
          solution: `Revisar logs de ${result.name} para identificar el problema`,
        });
      }
    });

    return recommendations;
  }

  async runFullDebug() {
    if (this.isRunning) return;
    this.isRunning = true;

    console.log('\n🔬 INICIANDO DEBUGGING AUTOMÁTICO');
    console.log('='.repeat(50));

    try {
      // 1. Verificar servidor
      const serverRunning = await this.checkServer();
      if (!serverRunning) {
        await this.startServer();
        await new Promise(resolve => setTimeout(resolve, 3000));
      }

      // 2. Ejecutar tests
      const testResults = await this.runTests();

      // 3. Verificar hidratación
      const hydrationResult = await this.checkHydration();

      // 4. Analizar rendimiento
      const performanceResult = await this.analyzePerformance();

      // 5. Generar reporte
      const allResults = [...testResults, hydrationResult, performanceResult];
      await this.generateReport(allResults);

      this.stats.totalRuns++;
      this.stats.lastRun = new Date();

    } catch (error) {
      console.error('❌ Error en debugging:', error.message);
      this.stats.errorsFound++;
    } finally {
      this.isRunning = false;
    }
  }

  startWatching() {
    console.log('👀 Iniciando modo watch...');
    console.log('📁 Monitoreando cambios en:', CONFIG.componentsDir);

    const watcher = watch(CONFIG.componentsDir, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.tsx') && !filename.endsWith('.ts')) return;

      const now = Date.now();
      if (now - this.lastChange < CONFIG.debounceMs) return;
      this.lastChange = now;

      console.log(`\n🔄 Cambio detectado: ${filename}`);
      this.runFullDebug();
    });

    // Ejecutar debugging inicial
    setTimeout(() => this.runFullDebug(), 2000);

    process.on('SIGINT', () => {
      console.log('\n👋 Deteniendo debugging automático...');
      watcher.close();
      process.exit(0);
    });
  }
}

// Ejecutar
if (process.argv.includes('--watch')) {
  const autoDebugger = new AutoDebugger();
  autoDebugger.startWatching();
} else {
  const autoDebugger = new AutoDebugger();
  autoDebugger.runFullDebug();
}
