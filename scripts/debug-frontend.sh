#!/bin/bash

echo "🚀 Ejecutando pruebas automatizadas del frontend..."

# Verificar que el servidor esté corriendo
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Servidor no encontrado. Iniciando servidor..."
    npm run dev &
    sleep 5
fi

# Ejecutar pruebas automatizadas
echo "🧪 Corriendo tests de Playwright..."
npx playwright test tests/automated-debug.spec.ts --reporter=list

echo "✅ Pruebas completadas. Revisa el reporte en: npx playwright show-report"
