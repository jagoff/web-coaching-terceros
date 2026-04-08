const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuración mejorada para precisión estadística
const config = {
  baseUrl: 'http://localhost:3000',
  screenshotDir: './test-results/screenshots',
  reportDir: './test-results/reports',
  metricsDir: './test-results/metrics',
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
  },
  // Configuración de precisión
  precision: {
    measurements: 3, // Número de mediciones por página
    timeout: 30000, // Timeout extendido
    waitTime: 3000, // Tiempo de espera para carga completa
    scrollWait: 1000, // Espera después de scroll
    clickWait: 500 // Espera después de clicks
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
  [config.screenshotDir, config.reportDir, config.metricsDir].forEach(dir => {
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
async function takeScreenshot(page, pageName, deviceName, iteration = 1) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${pageName}-${deviceName}-run${iteration}-${timestamp}.png`;
  const filepath = path.join(config.screenshotDir, filename);
  
  await page.screenshot({
    path: filepath,
    fullPage: true
  });
  
  console.log(`Screenshot guardado: ${filename}`);
  return filepath;
}

// Medición precisa de Web Vitals
async function measureWebVitalsPrecise(page) {
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals = {};
      let measurements = {
        LCP: [],
        FID: [],
        CLS: [],
        FCP: [],
        TTFB: [],
        loadTime: [],
        domContentLoaded: []
      };
      
      // Observer para LCP
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            measurements.LCP.push(entry.startTime);
          }
        });
      });
      
      // Observer para FID
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'first-input') {
            measurements.FID.push(entry.processingStart - entry.startTime);
          }
        });
      });
      
      // Observer para CLS
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            measurements.CLS.push(entry.value);
          }
        });
      });
      
      // Observer para FCP
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            measurements.FCP.push(entry.startTime);
          }
        });
      });
      
      // Iniciar observers
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      fcpObserver.observe({ entryTypes: ['paint'] });
      
      // Medición de tiempos de carga
      const measureLoadTimes = () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          measurements.loadTime.push(navigation.loadEventEnd - navigation.fetchStart);
          measurements.domContentLoaded.push(navigation.domContentLoadedEventEnd - navigation.fetchStart);
          measurements.TTFB.push(navigation.responseStart - navigation.requestStart);
        }
      };
      
      // Medir inmediatamente y periódicamente
      measureLoadTimes();
      const interval = setInterval(measureLoadTimes, 1000);
      
      // Timeout con cálculo de promedios
      setTimeout(() => {
        clearInterval(interval);
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        fcpObserver.disconnect();
        
        // Calcular promedios y estadísticas
        const calculateStats = (values) => {
          if (values.length === 0) return { avg: 0, min: 0, max: 0, count: 0 };
          const sorted = values.sort((a, b) => a - b);
          return {
            avg: values.reduce((a, b) => a + b, 0) / values.length,
            min: sorted[0],
            max: sorted[sorted.length - 1],
            median: sorted[Math.floor(sorted.length / 2)],
            count: values.length,
            p95: sorted[Math.floor(sorted.length * 0.95)],
            p99: sorted[Math.floor(sorted.length * 0.99)]
          };
        };
        
        vitals.LCP = calculateStats(measurements.LCP);
        vitals.FID = calculateStats(measurements.FID);
        vitals.CLS = calculateStats(measurements.CLS);
        vitals.FCP = calculateStats(measurements.FCP);
        vitals.TTFB = calculateStats(measurements.TTFB);
        vitals.loadTime = calculateStats(measurements.loadTime);
        vitals.domContentLoaded = calculateStats(measurements.domContentLoaded);
        
        resolve(vitals);
      }, 15000);
    });
  });
  
  return metrics;
}

// Detección precisa de elementos
async function detectElementsPrecise(page) {
  const elements = await page.evaluate(() => {
    const checks = {
      // Elementos básicos
      hasTitle: !!document.querySelector('title'),
      hasMetaDescription: !!document.querySelector('meta[name="description"]'),
      hasMetaKeywords: !!document.querySelector('meta[name="keywords"]'),
      hasH1: !!document.querySelector('h1'),
      hasNavigation: !!document.querySelector('nav'),
      
      // WhatsApp (múltiples selectores)
      hasWhatsApp: !!(
        document.querySelector('a[href*="wa.me"]') ||
        document.querySelector('[class*="whatsapp"]') ||
        document.querySelector('[class*="WhatsApp"]') ||
        document.querySelector('[aria-label*="whatsapp"]') ||
        document.querySelector('[aria-label*="WhatsApp"]')
      ),
      
      // Language toggle (múltiples selectores)
      hasLanguageToggle: !!(
        document.querySelector('[data-language-toggle]') ||
        document.querySelector('button[aria-label*="language"]') ||
        document.querySelector('button[aria-label*="Language"]') ||
        document.querySelector('.language-toggle') ||
        document.querySelector('[class*="lang"]') ||
        document.querySelector('[class*="Lang"]')
      ),
      
      // Footer (múltiples selectores)
      hasFooter: !!(
        document.querySelector('footer') ||
        document.querySelector('[class*="footer"]') ||
        document.querySelector('[class*="Footer"]') ||
        document.querySelector('section[class*="contact"]') ||
        document.querySelector('section[class*="Contact"]')
      ),
      
      // Structured data
      hasStructuredData: !!document.querySelector('script[type="application/ld+json"]'),
      
      // Elementos de formulario
      hasForm: !!document.querySelector('form'),
      hasInput: !!document.querySelector('input'),
      hasButton: !!document.querySelector('button'),
      
      // Elementos multimedia
      hasImages: !!document.querySelector('img'),
      hasVideos: !!document.querySelector('video'),
      hasIframes: !!document.querySelector('iframe'),
      
      // Elementos de accesibilidad
      hasSkipLink: !!document.querySelector('a[href*="#main"]'),
      hasAriaLabels: !!document.querySelector('[aria-label]'),
      hasAltText: !!document.querySelector('img[alt]'),
      
      // Elementos de SEO
      hasCanonical: !!document.querySelector('link[rel="canonical"]'),
      hasHreflang: !!document.querySelector('link[hreflang]'),
      hasOpenGraph: !!document.querySelector('meta[property*="og:"]'),
      hasTwitterCard: !!document.querySelector('meta[name*="twitter:"]'),
      
      // Scripts y tracking
      hasAnalytics: !!(
        document.querySelector('script[src*="analytics"]') ||
        document.querySelector('script[src*="gtag"]') ||
        document.querySelector('script[src*="vercel"]')
      )
    };
    
    // Conteos detallados
    counts = {
      totalImages: document.querySelectorAll('img').length,
      imagesWithoutAlt: Array.from(document.querySelectorAll('img')).filter(img => !img.alt && !img.getAttribute('aria-label')).length,
      totalLinks: document.querySelectorAll('a[href]').length,
      linksWithoutText: Array.from(document.querySelectorAll('a[href]')).filter(link => !link.textContent.trim() && !link.getAttribute('aria-label')).length,
      totalHeadings: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length,
      totalForms: document.querySelectorAll('form').length,
      totalButtons: document.querySelectorAll('button').length,
      totalInputs: document.querySelectorAll('input').length,
      structuredDataScripts: document.querySelectorAll('script[type="application/ld+json"]').length
    };
    
    // Análisis de estructura
    structure = {
      hasProperHeadingStructure: (() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        if (headings.length === 0) return false;
        
        let lastLevel = 0;
        for (const heading of headings) {
          const level = parseInt(heading.tagName.substring(1));
          if (level > lastLevel + 1) return false;
          lastLevel = level;
        }
        return true;
      })(),
      hasViewportMeta: !!document.querySelector('meta[name="viewport"]'),
      hasCharsetMeta: !!document.querySelector('meta[charset]'),
      hasLangAttribute: !!document.documentElement.lang
    };
    
    return { checks, counts, structure };
  });
  
  return elements;
}

// Tracking de eventos de usuario
async function trackUserEvents(page) {
  const events = await page.evaluate(() => {
    const eventLog = [];
    
    // Event listeners
    const logEvent = (type, details) => {
      eventLog.push({
        type,
        timestamp: Date.now(),
        details
      });
    };
    
    // Scroll tracking
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > scrollDepth) {
        scrollDepth = scrollPercent;
        logEvent('scroll', { depth: scrollPercent });
      }
    });
    
    // Click tracking
    document.addEventListener('click', (e) => {
      logEvent('click', {
        tagName: e.target.tagName,
        className: e.target.className,
        id: e.target.id,
        href: e.target.href,
        text: e.target.textContent?.trim().substring(0, 50)
      });
    });
    
    // Form interaction tracking
    document.addEventListener('focus', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        logEvent('form_focus', {
          tagName: e.target.tagName,
          type: e.target.type,
          name: e.target.name
        });
      }
    }, true);
    
    return eventLog;
  });
  
  return events;
}

// Medición de rendimiento de red
async function measureNetworkPerformance(page) {
  const network = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    
    if (!navigation) return {};
    
    return {
      // Timing de red
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnect: navigation.connectEnd - navigation.connectStart,
      sslNegotiation: navigation.secureConnectionStart > 0 ? navigation.connectEnd - navigation.secureConnectionStart : 0,
      ttfb: navigation.responseStart - navigation.requestStart,
      contentDownload: navigation.responseEnd - navigation.responseStart,
      
      // Timing de procesamiento
      domProcessing: navigation.domContentLoadedEventStart - navigation.responseEnd,
      domInteractive: navigation.domInteractive - navigation.responseEnd,
      
      // Timing total
      totalLoadTime: navigation.loadEventEnd - navigation.navigationStart,
      
      // Tamaño de recursos
      transferSize: navigation.transferSize || 0,
      encodedBodySize: navigation.encodedBodySize || 0,
      decodedBodySize: navigation.decodedBodySize || 0
    };
  });
  
  return network;
}

// Test de página individual con múltiples mediciones
async function testPagePrecise(browser, pageInfo, deviceName) {
  const deviceConfig = config.devices[deviceName];
  const results = [];
  
  for (let i = 0; i < config.precision.measurements; i++) {
    const page = await browser.newPage();
    
    try {
      console.log(`Testing ${pageInfo.name} on ${deviceName} - Run ${i + 1}/${config.precision.measurements}...`);
      
      // Configurar dispositivo con validación
      await page.setViewport({
        width: deviceConfig.width,
        height: deviceConfig.height,
        deviceScaleFactor: deviceConfig.deviceScaleFactor,
        isMobile: deviceConfig.isMobile || false,
        hasTouch: deviceConfig.isMobile || false
      });
      await page.setUserAgent(deviceConfig.userAgent);
      
      // Esperar a que el viewport se estabilice
      await sleep(500);
      
      // Validar viewport antes de continuar
      const viewportValid = await page.evaluate(() => {
        return window.innerWidth > 0 && window.innerHeight > 0;
      });
      
      if (!viewportValid) {
        throw new Error('Viewport inválido después de configuración');
      }
      
      // Habilitar tracking de red
      await page.setRequestInterception(true);
      const resourceTimings = [];
      
      page.on('request', request => {
        request.continue();
      });
      
      page.on('response', response => {
        resourceTimings.push({
          url: response.url(),
          status: response.status(),
          type: response.request().resourceType(),
          timing: response.timing()
        });
      });
      
      // Navegar a la página
      const startTime = Date.now();
      const response = await page.goto(`${config.baseUrl}${pageInfo.path}`, {
        waitUntil: 'networkidle2',
        timeout: config.precision.timeout
      });
      
      const endTime = Date.now();
      
      // Verificar respuesta HTTP
      const status = response.status();
      console.log(`HTTP Status: ${status}`);
      
      if (status !== 200) {
        throw new Error(`HTTP ${status} for ${pageInfo.path}`);
      }
      
      // Esperar carga completa
      await sleep(config.precision.waitTime);
      
      // Validar que la página esté cargada
      const pageLoaded = await page.evaluate(() => {
        return document.readyState === 'complete';
      });
      
      if (!pageLoaded) {
        console.log('Esperando a que la página termine de cargar...');
        await page.waitForFunction(() => document.readyState === 'complete', { timeout: 10000 });
      }
      
      // Scroll para simular usuario (solo si hay contenido)
      const hasScrollableContent = await page.evaluate(() => {
        return document.body.scrollHeight > window.innerHeight;
      });
      
      if (hasScrollableContent) {
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight / 2);
        });
        await sleep(config.precision.scrollWait);
      }
      
      // Medir métricas principales
      const elements = await detectElementsPrecise(page);
      const webVitals = await measureWebVitalsPrecise(page);
      const network = await measureNetworkPerformance(page);
      const events = await trackUserEvents(page);
      
      // Responsive check
      const responsive = await page.evaluate(() => {
        const viewport = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        return {
          viewport,
          isResponsive: document.body.clientWidth <= viewport.width,
          scrollWidth: document.body.scrollWidth,
          clientWidth: document.body.clientWidth,
          scrollHeight: document.body.scrollHeight,
          clientHeight: document.body.clientHeight
        };
      });
      
      // Validar viewport antes de screenshot
      const screenshotViewportValid = await page.evaluate(() => {
        return window.innerWidth > 0 && window.innerHeight > 0;
      });
      
      let screenshot = '';
      if (screenshotViewportValid) {
        try {
          screenshot = await takeScreenshot(page, pageInfo.name, deviceName, i + 1);
        } catch (screenshotError) {
          console.log(`Error en screenshot: ${screenshotError.message}`);
          screenshot = `error-screenshot-${Date.now()}`;
        }
      } else {
        console.log('Viewport inválido para screenshot');
        screenshot = `invalid-viewport-${Date.now()}`;
      }
      
      // Consolidar resultado
      const result = {
        page: pageInfo.name,
        device: deviceName,
        run: i + 1,
        status: 'success',
        httpStatus: status,
        loadTime: endTime - startTime,
        elements,
        webVitals,
        network,
        responsive,
        events,
        resourceTimings,
        screenshot,
        viewportValid: screenshotViewportValid,
        timestamp: new Date().toISOString()
      };
      
      results.push(result);
      console.log(`Run ${i + 1} completed successfully`);
      
    } catch (error) {
      console.error(`Error in run ${i + 1}:`, error.message);
      
      let errorScreenshot = '';
      try {
        errorScreenshot = await takeScreenshot(page, `${pageInfo.name}-error-run${i + 1}`, deviceName);
      } catch (screenshotError) {
        errorScreenshot = `screenshot-failed-${Date.now()}`;
      }
      
      results.push({
        page: pageInfo.name,
        device: deviceName,
        run: i + 1,
        status: 'error',
        error: error.message,
        screenshot: errorScreenshot,
        timestamp: new Date().toISOString()
      });
      
    } finally {
      await page.close();
      // Esperar un poco entre corridas para evitar sobrecarga
      await sleep(1000);
    }
  }
  
  // Consolidar resultados múltiples mediciones
  const successfulRuns = results.filter(r => r.status === 'success');
  
  if (successfulRuns.length === 0) {
    return results[0]; // Retornar primer error
  }
  
  // Calcular promedios y estadísticas
  const consolidated = {
    page: pageInfo.name,
    device: deviceName,
    status: 'success',
    totalRuns: results.length,
    successfulRuns: successfulRuns.length,
    failedRuns: results.filter(r => r.status === 'error').length,
    
    // Promedios de Web Vitals
    webVitals: {
      LCP: {
        avg: successfulRuns.reduce((sum, r) => sum + (r.webVitals.LCP?.avg || 0), 0) / successfulRuns.length,
        min: Math.min(...successfulRuns.map(r => r.webVitals.LCP?.min || 0)),
        max: Math.max(...successfulRuns.map(r => r.webVitals.LCP?.max || 0)),
        median: successfulRuns.map(r => r.webVitals.LCP?.median || 0).sort((a, b) => a - b)[Math.floor(successfulRuns.length / 2)]
      },
      FID: {
        avg: successfulRuns.reduce((sum, r) => sum + (r.webVitals.FID?.avg || 0), 0) / successfulRuns.length,
        min: Math.min(...successfulRuns.map(r => r.webVitals.FID?.min || 0)),
        max: Math.max(...successfulRuns.map(r => r.webVitals.FID?.max || 0))
      },
      CLS: {
        avg: successfulRuns.reduce((sum, r) => sum + (r.webVitals.CLS?.avg || 0), 0) / successfulRuns.length,
        min: Math.min(...successfulRuns.map(r => r.webVitals.CLS?.min || 0)),
        max: Math.max(...successfulRuns.map(r => r.webVitals.CLS?.max || 0))
      },
      loadTime: {
        avg: successfulRuns.reduce((sum, r) => sum + r.loadTime, 0) / successfulRuns.length,
        min: Math.min(...successfulRuns.map(r => r.loadTime)),
        max: Math.max(...successfulRuns.map(r => r.loadTime))
      }
    },
    
    // Element detection consistency
    elements: {
      checks: successfulRuns[0].elements.checks, // Usar primera medición como referencia
      detectionRate: {}
    },
    
    // Network performance promedio
    network: {
      ttfb: {
        avg: successfulRuns.reduce((sum, r) => sum + (r.network.ttfb || 0), 0) / successfulRuns.length,
        min: Math.min(...successfulRuns.map(r => r.network.ttfb || 0)),
        max: Math.max(...successfulRuns.map(r => r.network.ttfb || 0))
      },
      totalLoadTime: {
        avg: successfulRuns.reduce((sum, r) => sum + (r.network.totalLoadTime || 0), 0) / successfulRuns.length,
        min: Math.min(...successfulRuns.map(r => r.network.totalLoadTime || 0)),
        max: Math.max(...successfulRuns.map(r => r.network.totalLoadTime || 0))
      }
    },
    
    // Responsive consistency
    responsive: successfulRuns[0].responsive,
    
    // Event tracking consolidado
    events: {
      totalEvents: successfulRuns.reduce((sum, r) => sum + (r.events?.length || 0), 0),
      uniqueEventTypes: [...new Set(successfulRuns.flatMap(r => r.events?.map(e => e.type) || []))]
    },
    
    // Screenshots de todas las corridas
    screenshots: successfulRuns.map(r => r.screenshot),
    
    // Raw data para análisis detallado
    rawResults: results,
    
    timestamp: new Date().toISOString()
  };
  
  // Calcular tasas de detección
  Object.keys(consolidated.elements.checks).forEach(key => {
    const detectedCount = successfulRuns.filter(r => r.elements.checks[key]).length;
    consolidated.elements.detectionRate[key] = detectedCount / successfulRuns.length;
  });
  
  return consolidated;
}

// Ejecutar suite de tests completo con precisión estadística
async function runEnhancedTestSuite() {
  ensureDirectories();
  
  console.log('Iniciando suite de tests automatizados con PRECISIÓN ESTADÍSTICA...\n');
  console.log(`Configuración:`);
  console.log(`- Mediciones por página: ${config.precision.measurements}`);
  console.log(`- Timeout: ${config.precision.timeout}ms`);
  console.log(`- Tiempo de espera: ${config.precision.waitTime}ms\n`);
  
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
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Testing ${pageInfo.name} on ${deviceName.toUpperCase()}`);
        console.log(`${'='.repeat(60)}`);
        
        const result = await testPagePrecise(browser, pageInfo, deviceName);
        results.push(result);
        
        // Mostrar resumen de la página
        console.log(`\n--- Resumen ${pageInfo.name} (${deviceName}) ---`);
        console.log(`Status: ${result.status}`);
        console.log(`Runs: ${result.successfulRuns}/${result.totalRuns} exitosos`);
        console.log(`LCP promedio: ${result.webVitals.LCP.avg?.toFixed(0)}ms`);
        console.log(`FID promedio: ${result.webVitals.FID.avg?.toFixed(0)}ms`);
        console.log(`CLS promedio: ${result.webVitals.CLS.avg?.toFixed(3)}`);
        console.log(`Tasa de detección WhatsApp: ${(result.elements.detectionRate.hasWhatsApp * 100).toFixed(0)}%`);
        console.log(`Tasa de detección Structured Data: ${(result.elements.detectionRate.hasStructuredData * 100).toFixed(0)}%`);
      }
    }
    
    // Generar reporte estadístico
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    const report = {
      summary: {
        totalTests: results.length,
        successful: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'error').length,
        duration: `${duration}s`,
        timestamp: new Date().toISOString(),
        precision: {
          measurementsPerPage: config.precision.measurements,
          totalMeasurements: results.reduce((sum, r) => sum + r.totalRuns, 0)
        }
      },
      
      // Estadísticas globales
      globalStats: {
        webVitals: {
          LCP: {
            avg: results.reduce((sum, r) => sum + (r.webVitals.LCP?.avg || 0), 0) / results.length,
            min: Math.min(...results.map(r => r.webVitals.LCP?.avg || Infinity)),
            max: Math.max(...results.map(r => r.webVitals.LCP?.avg || 0)),
            p95: results.map(r => r.webVitals.LCP?.avg || 0).sort((a, b) => a - b)[Math.floor(results.length * 0.95)]
          },
          FID: {
            avg: results.reduce((sum, r) => sum + (r.webVitals.FID?.avg || 0), 0) / results.length,
            min: Math.min(...results.map(r => r.webVitals.FID?.avg || Infinity)),
            max: Math.max(...results.map(r => r.webVitals.FID?.avg || 0))
          },
          CLS: {
            avg: results.reduce((sum, r) => sum + (r.webVitals.CLS?.avg || 0), 0) / results.length,
            min: Math.min(...results.map(r => r.webVitals.CLS?.avg || Infinity)),
            max: Math.max(...results.map(r => r.webVitals.CLS?.avg || 0))
          }
        },
        
        // Tasa de detección global
        detectionRates: {
          hasWhatsApp: results.reduce((sum, r) => sum + r.elements.detectionRate.hasWhatsApp, 0) / results.length,
          hasLanguageToggle: results.reduce((sum, r) => sum + r.elements.detectionRate.hasLanguageToggle, 0) / results.length,
          hasFooter: results.reduce((sum, r) => sum + r.elements.detectionRate.hasFooter, 0) / results.length,
          hasStructuredData: results.reduce((sum, r) => sum + r.elements.detectionRate.hasStructuredData, 0) / results.length
        }
      },
      
      results,
      config,
      
      // Recomendaciones basadas en datos
      recommendations: generateRecommendations(results)
    };
    
    // Guardar reporte principal
    const reportPath = path.join(config.reportDir, `puppeteer-enhanced-report-${Date.now()}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Guardar métricas separadas para análisis
    const metricsPath = path.join(config.metricsDir, `metrics-${Date.now()}.json`);
    fs.writeFileSync(metricsPath, JSON.stringify({
      webVitals: report.globalStats.webVitals,
      detectionRates: report.globalStats.detectionRates,
      rawResults: results
    }, null, 2));
    
    // Mostrar resumen final
    console.log('\n' + '='.repeat(80));
    console.log('RESUMEN EJECUTIVO - MÉTRICAS ESTADÍSTICAS');
    console.log('='.repeat(80));
    console.log(`Total tests: ${report.summary.totalTests}`);
    console.log(`Exitosos: ${report.summary.successful}`);
    console.log(`Fallidos: ${report.summary.failed}`);
    console.log(`Duración: ${report.summary.duration}`);
    console.log(`Mediciones totales: ${report.summary.precision.totalMeasurements}`);
    
    console.log('\nWEB VITALS GLOBALES:');
    console.log(`LCP promedio: ${report.globalStats.webVitals.LCP.avg.toFixed(0)}ms (min: ${report.globalStats.webVitals.LCP.min.toFixed(0)}ms, max: ${report.globalStats.webVitals.LCP.max.toFixed(0)}ms)`);
    console.log(`FID promedio: ${report.globalStats.webVitals.FID.avg.toFixed(0)}ms`);
    console.log(`CLS promedio: ${report.globalStats.webVitals.CLS.avg.toFixed(3)}`);
    
    console.log('\nTASAS DE DETECCIÓN:');
    console.log(`WhatsApp: ${(report.globalStats.detectionRates.hasWhatsApp * 100).toFixed(0)}%`);
    console.log(`Language Toggle: ${(report.globalStats.detectionRates.hasLanguageToggle * 100).toFixed(0)}%`);
    console.log(`Footer: ${(report.globalStats.detectionRates.hasFooter * 100).toFixed(0)}%`);
    console.log(`Structured Data: ${(report.globalStats.detectionRates.hasStructuredData * 100).toFixed(0)}%`);
    
    console.log('\nRECOMENDACIONES:');
    report.recommendations.forEach((rec, i) => {
      console.log(`${i + 1}. ${rec}`);
    });
    
    console.log(`\nReporte guardado: ${reportPath}`);
    console.log(`Métricas guardadas: ${metricsPath}`);
    
    return report;
    
  } finally {
    await browser.close();
  }
}

// Generar recomendaciones basadas en datos
function generateRecommendations(results) {
  const recommendations = [];
  
  const avgLCP = results.reduce((sum, r) => sum + (r.webVitals.LCP?.avg || 0), 0) / results.length;
  const avgFID = results.reduce((sum, r) => sum + (r.webVitals.FID?.avg || 0), 0) / results.length;
  const avgCLS = results.reduce((sum, r) => sum + (r.webVitals.CLS?.avg || 0), 0) / results.length;
  
  const whatsappRate = results.reduce((sum, r) => sum + r.elements.detectionRate.hasWhatsApp, 0) / results.length;
  const structuredDataRate = results.reduce((sum, r) => sum + r.elements.detectionRate.hasStructuredData, 0) / results.length;
  
  // Recomendaciones de performance
  if (avgLCP > 2500) {
    recommendations.push('Optimizar LCP: Implementar lazy loading y optimizar imágenes críticas');
  }
  
  if (avgFID > 100) {
    recommendations.push('Optimizar FID: Reducir JavaScript execution time y main thread work');
  }
  
  if (avgCLS > 0.1) {
    recommendations.push('Optimizar CLS: Estabilizar layout y reservar espacio para elementos dinámicos');
  }
  
  // Recomendaciones de detección
  if (whatsappRate < 0.8) {
    recommendations.push('Mejorar detección de WhatsApp: Revisar selectores CSS y visibilidad responsive');
  }
  
  if (structuredDataRate < 0.8) {
    recommendations.push('Optimizar structured data: Asegurar JSON-LD presente en todas las páginas');
  }
  
  // Recomendaciones generales
  if (recommendations.length === 0) {
    recommendations.push('Todas las métricas están dentro de los umbrales recomendados');
  }
  
  return recommendations;
}

// Ejecutar tests si se llama directamente
if (require.main === module) {
  runEnhancedTestSuite()
    .then(() => {
      console.log('\nTests con precisión estadística completados exitosamente');
      process.exit(0);
    })
    .catch(error => {
      console.error('Error ejecutando tests:', error);
      process.exit(1);
    });
}

module.exports = { runEnhancedTestSuite, config };
