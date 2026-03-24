# 🐛 Guía de Debugging Automático

Sistema completo de debugging automático para desarrollo sin intervención manual.

## 🚀 Comandos Disponibles

### Debugging Rápido
```bash
npm run debug:quick
```
Verificación instantánea de problemas críticos:
- Errores de TypeScript
- Problemas de ESLint  
- Compilación exitosa
- Archivos críticos faltantes

### Debugging Automático Completo
```bash
npm run debug:auto
```
Análisis profundo del proyecto:
- Ejecuta todos los tests (unit + E2E)
- Verifica problemas de hidratación SSR
- Analiza rendimiento y bundle size
- Genera reporte JSON detallado

### Modo Watch (Desarrollo Continuo)
```bash
npm run debug:watch
```
Monitoreo automático en tiempo real:
- Detecta cambios en archivos `.tsx/.ts`
- Ejecuta debugging automáticamente
- Genera reportes por cada cambio
- Ideal para desarrollo activo

### Monitoreo en Tiempo Real
```bash
npm run debug:monitor
```
Supervisión continua del estado:
- Monitorea servidor de desarrollo
- Vigila compilación TypeScript
- Detecta errores y advertencias
- Muestra estadísticas en vivo

## 📊 Reportes Generados

Los reportes se guardan en `./debug-reports/`:
- `debug-YYYY-MM-DD-HH-mm-ss.json`
- Incluyen estadísticas completas
- Recomendaciones automáticas
- Historial de ejecuciones

## 🔧 Problemas Detectados

### Errores Críticos (❌)
- TypeScript compilation errors
- Test failures
- Build failures
- Missing critical files

### Advertencias (⚠️)
- ESLint warnings
- Performance issues
- Hydration warnings
- Bundle size warnings

## 📈 Estadísticas Monitoreadas

- **Total Runs**: Veces ejecutado
- **Errors Found**: Errores críticos detectados
- **Warnings Found**: Advertencias encontradas
- **File Changes**: Cambios detectados
- **Builds**: Compilaciones exitosas
- **Tests**: Tests pasados

## 🛠️ Integración con VSCode

Agrega a `.vscode/tasks.json`:
```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Debug Quick",
      "type": "npm",
      "script": "debug:quick",
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Debug Watch",
      "type": "npm", 
      "script": "debug:watch",
      "group": "build",
      "isBackground": true,
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    }
  ]
}
```

## 💡 Mejores Prácticas

### Antes de Commits
```bash
npm run debug:quick
```

### Durante Desarrollo
```bash
npm run debug:watch
```

### Para Debugging Profundo
```bash
npm run debug:auto
```

### Monitoreo Continuo
```bash
npm run debug:monitor
```

## 🚨 Configuración

### Variables de Entorno
- `CI`: Activa modo CI (más estricto)
- `DEBUG_LEVEL`: Nivel de logging (error/warn/info)

### Personalización
Edita los archivos en `./scripts/` para:
- Agregar nuevos checks
- Modificar patrones de error
- Cambiar configuración de timeouts

## 🔍 Problemas Comunes Detectados

### Hydration Issues
- `typeof window` checks
- `Math.random()` en render
- `localStorage` acceso directo
- Browser APIs en SSR

### Performance Issues
- Bundle size excesivo
- Componentes no optimizados
- Renders innecesarios
- Memory leaks

### Type Safety
- Tipos incorrectos
- Variables no utilizadas
- Props faltantes
- Any types

## 📞 Soporte

Si encuentras problemas con los scripts:
1. Revisa `./debug-reports/` para logs detallados
2. Ejecuta `npm run debug:quick` para diagnóstico rápido
3. Usa `npm run debug:monitor` para supervisión en vivo

---

**Tip**: Usa `npm run debug:watch` durante el desarrollo para detección instantánea de problemas.
