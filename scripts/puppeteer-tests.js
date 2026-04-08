const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuración
const config = {
  baseUrl: 'http://localhost:3000',
  screenshotDir: './test-results/screenshots',
  reportDir: './test-results/reports',
  devices: {
    desktop: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    mobile: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      isMobile: true
    },
    tablet: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
      isMobile: true
    }
  }
};

// Páginas clave para testear
const keyPages = [
  { path: '/', name: 'homepage' },
  { path: '/servicios', name: 'servicios' },
  { path: '/precios', name: 'precios' },
  { path: '/sobre-mi', name: 'sobre-mi' },
  { path: '/testimonios', name: 'testimonios' },
  { path: '/faq', name: 'faq' },
  { path: '/casos-de-estudio', name: 'casos-de-estudio' },
  { path: '/en', name: 'english-homepage' }
];

// Crear directorios de resultados
function ensureDirectories() {
  [config.screenshotDir, config.reportDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Sleep function helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Tomar screenshot con timestamp
async function takeScreenshot(page, pageName, deviceName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${pageName}-${deviceName}-${timestamp}.png`;
  const filepath = path.join(config.screenshotDir, filename);
  
  await page.screenshot({
    path: filepath,
    fullPage: true
  });
  
  console.log(`Screenshot guardado: ${filename}`);
  return filepath;
}

// Medir Web Vitals
async function measureWebVitals(page) {
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals = {};
      let hasLCP = false;
      let hasFID = false;
      let hasCLS = false;
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint' && !hasLCP) {
            vitals.LCP = entry.startTime;
            hasLCP = true;
          } else if (entry.entryType === 'first-input' && !hasFID) {
            vitals.FID = entry.processingStart - entry.startTime;
            hasFID = true;
          } else if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            vitals.CLS = (vitals.CLS || 0) + entry.value;
            hasCLS = true;
          }
        });
        
        // Resolver cuando tengamos todas las métricas principales
        if (hasLCP && hasFID && hasCLS) {
          observer.disconnect();
          resolve(vitals);
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      
      // Timeout después de 15 segundos con fallback
      setTimeout(() => {
        observer.disconnect();
        // Fallback: intentar obtener métricas básicas
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          vitals.loadTime = navigation.loadEventEnd - navigation.fetchStart;
          vitals.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;
        }
        resolve(vitals);
      }, 15000);
    });
  });
  
  return metrics;
}

// Test de página individual
async function testPage(browser, pageInfo, deviceName) {
  const deviceConfig = config.devices[deviceName];
  const page = await browser.newPage();
  
  // Configurar dispositivo
  await page.setViewport(deviceConfig);
  await page.setUserAgent(deviceConfig.userAgent);
  
  try {
    console.log(`\nTesting ${pageInfo.name} on ${deviceName}...`);
    
    // Navegar a la página
    const response = await page.goto(`${config.baseUrl}${pageInfo.path}`, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    // Verificar respuesta HTTP
    const status = response.status();
    console.log(`HTTP Status: ${status}`);
    
    if (status !== 200) {
      throw new Error(`HTTP ${status} for ${pageInfo.path}`);
    }
    
    // Esperar a que la página cargue completamente
    await sleep(2000);
    
    // Verificar elementos clave
    const elements = await page.evaluate(() => {
      const checks = {
        hasTitle: !!document.querySelector('title'),
        hasMetaDescription: !!document.querySelector('meta[name="description"]'),
        hasH1: !!document.querySelector('h1'),
        hasNavigation: !!document.querySelector('nav'),
        hasWhatsApp: !!document.querySelector('a[href*="wa.me"]') || !!document.querySelector('[class*="whatsapp"]'),
        hasLanguageToggle: !!document.querySelector('[data-language-toggle]') || !!document.querySelector('button[aria-label*="language"]') || !!document.querySelector('.language-toggle'),
        hasFooter: !!document.querySelector('footer') || !!document.querySelector('[class*="footer"]') || !!document.querySelector('section[class*="contact"]'),
        hasStructuredData: !!document.querySelector('script[type="application/ld+json"]')
      };
      
      return checks;
    });
    
    // Medir Web Vitals
    const webVitals = await measureWebVitals(page);
    
    // Tomar screenshot
    const screenshot = await takeScreenshot(page, pageInfo.name, deviceName);
    
    // Verificar responsive design
    const responsive = await page.evaluate(() => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      // Verificar si los elementos se adaptan al viewport
      const isResponsive = document.body.clientWidth <= viewport.width;
      
      return {
        viewport,
        isResponsive,
        scrollWidth: document.body.scrollWidth,
        clientWidth: document.body.clientWidth
      };
    });
    
    // Test de accesibilidad básica
    const accessibility = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('img'));
      const imagesWithoutAlt = images.filter(img => !img.alt && !img.getAttribute('aria-label'));
      
      const links = Array.from(document.querySelectorAll('a[href]'));
      const linksWithoutText = links.filter(link => !link.textContent.trim() && !link.getAttribute('aria-label'));
      
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const hasProperHeadingStructure = headings.length > 0;
      
      return {
        totalImages: images.length,
        imagesWithoutAlt: imagesWithoutAlt.length,
        totalLinks: links.length,
        linksWithoutText: linksWithoutText.length,
        totalHeadings: headings.length,
        hasProperHeadingStructure
      };
    });
    
    return {
      page: pageInfo.name,
      device: deviceName,
      status: 'success',
      httpStatus: status,
      elements,
      webVitals,
      responsive,
      accessibility,
      screenshot,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`Error testing ${pageInfo.name} on ${deviceName}:`, error.message);
    
    // Tomar screenshot del error
    const errorScreenshot = await takeScreenshot(page, `${pageInfo.name}-error`, deviceName);
    
    return {
      page: pageInfo.name,
      device: deviceName,
      status: 'error',
      error: error.message,
      screenshot: errorScreenshot,
      timestamp: new Date().toISOString()
    };
  } finally {
    await page.close();
  }
}

// Ejecutar suite de tests completo
async function runTestSuite() {
  ensureDirectories();
  
  console.log('Iniciando suite de tests automatizados con Puppeteer...\n');
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = [];
  const startTime = Date.now();
  
  try {
    // Ejecutar tests para cada página y dispositivo
    for (const pageInfo of keyPages) {
      for (const deviceName of Object.keys(config.devices)) {
        const result = await testPage(browser, pageInfo, deviceName);
        results.push(result);
      }
    }
    
    // Generar reporte
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    const report = {
      summary: {
        totalTests: results.length,
        successful: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'error').length,
        duration: `${duration}s`,
        timestamp: new Date().toISOString()
      },
      results,
      config
    };
    
    // Guardar reporte
    const reportPath = path.join(config.reportDir, `puppeteer-test-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Mostrar resumen
    console.log('\n=== RESUMEN DE TESTS ===');
    console.log(`Total tests: ${report.summary.totalTests}`);
    console.log(`Exitosos: ${report.summary.successful}`);
    console.log(`Fallidos: ${report.summary.failed}`);
    console.log(`Duración: ${report.summary.duration}`);
    console.log(`Reporte guardado: ${reportPath}`);
    
    // Mostrar errores si los hay
    const failures = results.filter(r => r.status === 'error');
    if (failures.length > 0) {
      console.log('\n=== ERRORES ===');
      failures.forEach(failure => {
        console.log(`${failure.page} (${failure.device}): ${failure.error}`);
      });
    }
    
    // Mostrar métricas de performance
    const successfulTests = results.filter(r => r.status === 'success');
    if (successfulTests.length > 0) {
      console.log('\n=== WEB VITALS PROMEDIO ===');
      const avgLCP = successfulTests.reduce((sum, r) => sum + (r.webVitals.LCP || 0), 0) / successfulTests.length;
      const avgFID = successfulTests.reduce((sum, r) => sum + (r.webVitals.FID || 0), 0) / successfulTests.length;
      const avgCLS = successfulTests.reduce((sum, r) => sum + (r.webVitals.CLS || 0), 0) / successfulTests.length;
      
      console.log(`LCP promedio: ${avgLCP.toFixed(0)}ms`);
      console.log(`FID promedio: ${avgFID.toFixed(0)}ms`);
      console.log(`CLS promedio: ${avgCLS.toFixed(3)}`);
    }
    
    return report;
    
  } finally {
    await browser.close();
  }
}

// Ejecutar tests si se llama directamente
if (require.main === module) {
  runTestSuite()
    .then(() => {
      console.log('\nTests completados exitosamente');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error ejecutando tests:', error);
      process.exit(1);
    });
}

module.exports = { runTestSuite, config };
