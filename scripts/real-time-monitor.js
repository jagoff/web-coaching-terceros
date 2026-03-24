#!/usr/bin/env node

/**
 * Real-time Monitor
 * Monitoreo continuo del estado del proyecto
 */

import { spawn } from 'child_process';
import { watchFile, unwatchFile } from 'fs';
import { join } from 'path';

class RealTimeMonitor {
  constructor() {
    this.processes = new Map();
    this.stats = {
      startTime: Date.now(),
      fileChanges: 0,
      errors: 0,
      warnings: 0,
      builds: 0,
      tests: 0,
    };
    this.isMonitoring = false;
  }

  startProcess(name, cmd, args = []) {
    const process = spawn(cmd, args, {
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true,
    });

    process.stdout.on('data', (data) => {
      const output = data.toString();
      this.processOutput(name, output, 'stdout');
    });

    process.stderr.on('data', (data) => {
      const output = data.toString();
      this.processOutput(name, output, 'stderr');
    });

    process.on('error', (error) => {
      console.log(`❌ ${name} process error:`, error.message);
      this.stats.errors++;
    });

    this.processes.set(name, process);
    return process;
  }

  processOutput(processName, output, type) {
    const lines = output.trim().split('\n');
    
    lines.forEach(line => {
      if (line.includes('ERROR') || line.includes('Failed')) {
        console.log(`🔴 ${processName}: ${line}`);
        this.stats.errors++;
      } else if (line.includes('WARNING') || line.includes('warn')) {
        console.log(`🟡 ${processName}: ${line}`);
        this.stats.warnings++;
      } else if (line.includes('compiled') || line.includes('Ready')) {
        console.log(`🟢 ${processName}: ${line}`);
        if (line.includes('compiled')) this.stats.builds++;
      } else if (line.includes('PASS') || line.includes('passed')) {
        console.log(`✅ ${processName}: ${line}`);
        this.stats.tests++;
      }
    });
  }

  startFileWatcher() {
    const filesToWatch = [
      'components/**/*.tsx',
      'app/**/*.tsx',
      'lib/**/*.ts',
      'hooks/**/*.ts',
    ];

    console.log('👀 Iniciando monitoreo de archivos...');
    
    // Watch para cambios en componentes
    this.startProcess('Dev Server', 'npm', ['run', 'dev']);
    
    // Watch para TypeScript
    this.startProcess('TypeScript', 'npx', ['tsc', '--noEmit', '--watch']);
    
    // Watch para ESLint
    this.startProcess('ESLint', 'npm', ['run', 'lint', '--', '--watch']);

    this.isMonitoring = true;
    this.showStatus();
  }

  showStatus() {
    const uptime = Date.now() - this.stats.startTime;
    const minutes = Math.floor(uptime / 60000);
    const seconds = Math.floor((uptime % 60000) / 1000);

    console.log('\n📊 ESTADO DEL MONITOR');
    console.log('='.repeat(40));
    console.log(`⏱️  Uptime: ${minutes}m ${seconds}s`);
    console.log(`📁 Cambios: ${this.stats.fileChanges}`);
    console.log(`🔨 Builds: ${this.stats.builds}`);
    console.log(`🧪 Tests: ${this.stats.tests}`);
    console.log(`❌ Errores: ${this.stats.errors}`);
    console.log(`⚠️  Warnings: ${this.stats.warnings}`);
    console.log(`🟢 Estado: ${this.stats.errors === 0 ? 'SANO' : 'NECESITA ATENCIÓN'}`);

    if (this.isMonitoring) {
      setTimeout(() => this.showStatus(), 10000);
    }
  }

  stop() {
    console.log('\n🛑 Deteniendo monitoreo...');
    this.isMonitoring = false;
    
    this.processes.forEach((process, name) => {
      process.kill();
      console.log(`🔌 Detenido: ${name}`);
    });
    
    this.processes.clear();
  }
}

// Ejecución
const monitor = new RealTimeMonitor();

process.on('SIGINT', () => {
  monitor.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  monitor.stop();
  process.exit(0);
});

console.log('🚀 Iniciando Real-time Monitor...');
monitor.startFileWatcher();
