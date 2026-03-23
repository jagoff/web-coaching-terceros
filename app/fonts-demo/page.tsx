'use client'

import { useState } from 'react'
import {
  Playfair_Display,
  Inter,
  Space_Grotesk,
  Outfit,
  Poppins,
  Raleway,
  Montserrat,
  Lora,
  Merriweather,
} from 'next/font/google'

// Configuración de fuentes
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

interface FontOption {
  name: string
  heading: string
  body: string
  className: string
  description: string
}

const fontOptions: FontOption[] = [
  {
    name: 'Playfair Display + Inter (Actual)',
    heading: playfair.className,
    body: inter.className,
    className: playfair.className,
    description: 'Elegante clásico, serif para headings, sans-serif para body',
  },
  {
    name: 'Space Grotesk',
    heading: spaceGrotesk.className,
    body: spaceGrotesk.className,
    className: spaceGrotesk.className,
    description: 'Moderno geometrico, excelente legibilidad en mobile',
  },
  {
    name: 'Outfit',
    heading: outfit.className,
    body: outfit.className,
    className: outfit.className,
    description: 'Contemporáneo limpio, diseñado para screens',
  },
  {
    name: 'Poppins',
    heading: poppins.className,
    body: poppins.className,
    className: poppins.className,
    description: 'Amigable y redondeado, muy legible en mobile',
  },
  {
    name: 'Raleway',
    heading: raleway.className,
    body: inter.className,
    className: raleway.className,
    description: 'Elegante sans-serif, moderno y profesional',
  },
  {
    name: 'Montserrat',
    heading: montserrat.className,
    body: montserrat.className,
    className: montserrat.className,
    description: 'Urbano y bold, excelente contraste',
  },
  {
    name: 'Lora + Inter',
    heading: lora.className,
    body: inter.className,
    className: lora.className,
    description: 'Serif moderno, óptimo para lectura larga',
  },
  {
    name: 'Merriweather + Inter',
    heading: merriweather.className,
    body: inter.className,
    className: merriweather.className,
    description: 'Serif robusto, diseñado para lectura en pantalla',
  },
]

const sampleText = {
  heading: 'Transformación & Liderazgo',
  subheading: 'Eleva tu potencial',
  body: 'Descubrí cómo el coaching ágil puede transformar tu liderazgo y llevar tu equipo al siguiente nivel. Más de 20 años de experiencia en tecnología y metodologías ágiles.',
  paragraph:
    'Nuestro enfoque combina las mejores prácticas de agile coaching con herramientas de liderazgo modernas, creando una experiencia única que impulsa resultados reales y medibles.',
  cta: 'Agendar Sesión Gratuita',
}

export default function FontsDemo() {
  const [selectedFont, setSelectedFont] = useState(0)
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile')

  const currentFont = fontOptions[selectedFont]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Demo de Tipografías para Mobile</h1>
          <p className="text-gray-300">
            Compará diferentes fuentes y encontrá la mejor opción para tu sitio
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {fontOptions.map((font, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFont(index)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedFont === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {font.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                📱 Mobile
              </button>
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                🖥️ Desktop
              </button>
            </div>
          </div>
          <div className="mt-4 text-gray-300 text-sm">
            <strong>{currentFont.name}</strong> - {currentFont.description}
          </div>
        </div>

        {/* Demo Content */}
        <div className={`mx-auto ${viewMode === 'mobile' ? 'max-w-md' : 'max-w-4xl'}`}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200 shadow-2xl">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1
                className={`${currentFont.heading} text-4xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight`}
              >
                {sampleText.heading}
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-4"></div>
              <h2 className={`${currentFont.heading} text-xl md:text-2xl text-gray-700 mb-6`}>
                {sampleText.subheading}
              </h2>
            </div>

            {/* Body Content */}
            <div className="space-y-6 mb-8">
              <p className={`${currentFont.body} text-lg leading-relaxed text-gray-800`}>
                {sampleText.body}
              </p>
              <p className={`${currentFont.body} text-base leading-relaxed text-gray-700`}>
                {sampleText.paragraph}
              </p>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {['Liderazgo Ágil', 'Transformación Real', 'Resultados Medibles'].map(
                (item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
                  >
                    <h3
                      className={`${currentFont.heading} text-lg font-semibold text-gray-900 mb-2`}
                    >
                      {item}
                    </h3>
                    <p className={`${currentFont.body} text-sm text-gray-600`}>
                      Soluciones personalizadas para tu equipo
                    </p>
                  </div>
                )
              )}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                className={`${currentFont.body} bg-gradient-to-r from-purple-700 to-pink-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:scale-105`}
              >
                {sampleText.cta}
              </button>
            </div>

            {/* Typography Scale */}
            <div className="mt-12 pt-8 border-t border-gray-300">
              <h3 className={`${currentFont.heading} text-xl font-semibold text-gray-900 mb-6`}>
                Escala Tipográfica
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className={`${currentFont.heading} text-3xl font-bold text-gray-900`}>
                    Heading XLarge
                  </h4>
                </div>
                <div>
                  <h4 className={`${currentFont.heading} text-2xl font-bold text-gray-900`}>
                    Heading Large
                  </h4>
                </div>
                <div>
                  <h4 className={`${currentFont.heading} text-xl font-semibold text-gray-900`}>
                    Heading Medium
                  </h4>
                </div>
                <div>
                  <p className={`${currentFont.body} text-lg text-gray-800`}>
                    Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div>
                  <p className={`${currentFont.body} text-base text-gray-700`}>
                    Body Regular - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore.
                  </p>
                </div>
                <div>
                  <p className={`${currentFont.body} text-sm text-gray-600`}>
                    Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile Specific Tests */}
            {viewMode === 'mobile' && (
              <div className="mt-12 pt-8 border-t border-gray-300">
                <h3 className={`${currentFont.heading} text-xl font-semibold text-gray-900 mb-6`}>
                  Tests Específicos para Mobile
                </h3>

                {/* Small Screen Readability */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <h4 className={`${currentFont.heading} text-lg font-semibold text-gray-900 mb-2`}>
                    Legibilidad en Pantalla Pequeña
                  </h4>
                  <p className={`${currentFont.body} text-sm text-gray-700 leading-relaxed`}>
                    Este texto simula cómo se ve en un móvil. La legibilidad es clave para la
                    experiencia de usuario. Fuentes con buen contraste y espaciado funcionan mejor.
                  </p>
                </div>

                {/* Touch Targets */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                  <h4 className={`${currentFont.heading} text-lg font-semibold text-gray-900 mb-3`}>
                    Botones y Targets Táctiles
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className={`${currentFont.body} bg-purple-700 text-white py-3 px-4 rounded-lg font-medium text-sm`}
                    >
                      Primario
                    </button>
                    <button
                      className={`${currentFont.body} border border-purple-600 text-purple-700 py-3 px-4 rounded-lg font-medium text-sm`}
                    >
                      Secundario
                    </button>
                  </div>
                </div>

                {/* Navigation */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className={`${currentFont.heading} text-lg font-semibold text-gray-900 mb-3`}>
                    Navegación Mobile
                  </h4>
                  <div className="flex justify-around">
                    {['Inicio', 'Servicios', 'Sobre', 'Contacto'].map((item, index) => (
                      <span
                        key={index}
                        className={`${currentFont.body} text-xs text-gray-600 text-center`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-12 bg-white/10 backdrop-blur-md rounded-xl p-6">
          <h3 className="text-2xl font-bold text-white mb-4">Recomendaciones para Mobile</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-2">✅ Buenas Prácticas</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Fuentes sans-serif suelen ser más legibles</li>
                <li>• Peso mínimo de 400 para body text</li>
                <li>• Good contraste entre texto y fondo</li>
                <li>• Line height de 1.5-1.7 para lectura</li>
                <li>• Tamaño mínimo de 16px para body text</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-300 mb-2">⚠️ Consideraciones</h4>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Serif fonts pueden ser difíciles en pantallas pequeñas</li>
                <li>• Fuentes muy decorativas reducen legibilidad</li>
                <li>• Demasiados pesos de fuente afectan performance</li>
                <li>• Considerar fallback fonts locales</li>
                <li>• Testear en diferentes dispositivos reales</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
