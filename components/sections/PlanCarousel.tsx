'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react'
import { scrollToElement } from '@/lib/scroll'
import { headerStagger, blurUp, dividerGrow } from '@/lib/animations'
import { useLanguage } from '@/contexts/LanguageContext'

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function PlanCarousel() {
  const { t, language } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [page, setPage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const plans = [
    {
      id: 'individual',
      name: t.pricing.plans.liderazgo.name,
      description: t.pricing.plans.liderazgo.description,
      features: t.pricing.plans.liderazgo.features,
      cta: t.pricing.consultPlan,
      featured: false,
      badge: null,
      icon: Target,
      gradient: 'from-blue-500 via-cyan-500 to-teal-600',
      bgGradient: 'from-blue-500/10 to-cyan-500/5',
      borderColor: 'border-blue-500/30',
      titleHighlight: language === 'es' ? 'Liderazgo' : 'Leadership',
    },
    {
      id: 'transformacion',
      name: t.pricing.plans.organizacional.name,
      description: t.pricing.plans.organizacional.description,
      features: t.pricing.plans.organizacional.features,
      cta: t.pricing.consultPlan,
      featured: true,
      badge: t.pricing.mostPopular,
      icon: Sparkles,
      gradient: 'from-violet-500 via-purple-500 to-indigo-600',
      bgGradient: 'from-violet-500/10 to-purple-500/5',
      borderColor: 'border-violet-500/30',
      titleHighlight: language === 'es' ? 'Transformación' : 'Transformation',
    },
    {
      id: 'elite',
      name: t.pricing.plans.personalizado.name,
      description: t.pricing.plans.personalizado.description,
      features: t.pricing.plans.personalizado.features,
      cta: t.pricing.consultPlan,
      featured: false,
      badge: null,
      icon: Zap,
      gradient: 'from-amber-500 via-orange-500 to-red-600',
      bgGradient: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'border-amber-500/30',
      titleHighlight: language === 'es' ? 'Excelencia' : 'Excellence',
    },
  ]

  const paginate = (newDirection: number) => {
    setIsAutoPlaying(false)
    setPage(page + newDirection)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setPage(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      paginate(1)
    }, 5000)

    return () => clearInterval(timer)
  }, [page, isAutoPlaying])

  const currentPlan = plans[page]

  const handleScroll = (href: string) => scrollToElement(href)

  return (
    <section id="precios" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">
              {language === 'es' ? 'Encuentra tu Plan Ideal' : 'Find Your Ideal Plan'}
            </span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {language === 'es' ? 'Elige tu' : 'Choose Your'}{' '}
            <span className="text-gradient">{currentPlan.titleHighlight}</span>
          </motion.h2>
          <motion.p
            variants={blurUp}
            className="text-sm text-center mx-auto"
            style={{ color: 'var(--text-muted)' }}
          >
            {t.pricing.subtitle}
          </motion.p>
          <motion.div variants={dividerGrow} className="divider-gold mt-6" />
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="transition-all duration-500 group"
              style={{
                width: page === index ? '48px' : '12px',
                height: '12px',
                borderRadius: '6px',
                background:
                  page === index
                    ? `linear-gradient(135deg, ${getGradientColors(currentPlan.gradient).start} 0%, ${getGradientColors(currentPlan.gradient).end} 100%)`
                    : 'rgba(124,107,196,0.3)',
                border: 'none',
                cursor: 'pointer',
                boxShadow:
                  page === index
                    ? `0 0 20px ${getGradientColors(currentPlan.gradient).start}40`
                    : 'none',
              }}
              aria-label={`${language === 'es' ? 'Ir al plan' : 'Go to plan'} ${index + 1}`}
            >
              {page === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-full h-full rounded-full"
                  style={{ background: 'inherit' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none z-20">
            <button
              className="pointer-events-auto -ml-4 md:-ml-6 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/10 backdrop-blur-sm border border-violet-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => paginate(-1)}
              disabled={page === 0}
              aria-label={language === 'es' ? 'Anterior' : 'Previous'}
            >
              <ChevronLeft className="w-6 h-6 text-violet-400" />
            </button>

            <button
              className="pointer-events-auto -mr-4 md:-mr-6 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-purple-500/10 backdrop-blur-sm border border-violet-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => paginate(1)}
              disabled={page === plans.length - 1}
              aria-label={language === 'es' ? 'Siguiente' : 'Next'}
            >
              <ChevronRight className="w-6 h-6 text-violet-400" />
            </button>
          </div>

          {/* Carousel Container with Perspective */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ height: '600px', perspective: '1200px' }}
          >
            <div className="relative w-full h-full">
              {plans.map((plan, index) => {
                const offset = index - page
                const isActive = index === page
                const PlanIcon = plan.icon

                return (
                  <motion.div
                    key={plan.id}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                      x: `${offset * 65}%`,
                      scale: isActive ? 1 : 0.85,
                      opacity: Math.abs(offset) > 1 ? 0 : 1,
                      rotateY: isActive ? 0 : offset > 0 ? -15 : 15,
                      zIndex: isActive ? 10 : Math.abs(offset) === 1 ? 5 : 0,
                      filter: isActive ? 'blur(0px)' : 'blur(2px)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                      opacity: { duration: 0.3 },
                    }}
                    style={{
                      transformOrigin: 'center',
                      pointerEvents: isActive ? 'auto' : Math.abs(offset) === 1 ? 'auto' : 'none',
                    }}
                    drag={Math.abs(offset) === 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(e, { offset: dragOffset, velocity }) => {
                      if (Math.abs(offset) === 1) {
                        const swipe = swipePower(dragOffset.x, velocity.x)
                        if (swipe < -swipeConfidenceThreshold) {
                          paginate(offset > 0 ? 1 : -1)
                        }
                      }
                    }}
                    onClick={() => Math.abs(offset) === 1 && goToSlide(index)}
                  >
                    <div
                      className={`w-full max-w-md h-full p-8 md:p-10 bg-gradient-to-br ${plan.bgGradient} border ${plan.borderColor} backdrop-blur-xl rounded-3xl cursor-pointer transition-all duration-300 ${isActive ? 'shadow-2xl' : 'shadow-xl hover:shadow-2xl'}`}
                      style={{
                        transform: `translateX(${Math.abs(offset) === 1 ? (offset > 0 ? '-10%' : '10%') : '0'})`,
                        clipPath: isActive
                          ? 'none'
                          : Math.abs(offset) === 1
                            ? offset > 0
                              ? 'inset(0 0 0 35%)'
                              : 'inset(0 35% 0 0)'
                            : 'none',
                      }}
                    >
                      {/* Plan Content */}
                      <div className="h-full flex flex-col justify-between">
                        {/* Header */}
                        <div className="text-center">
                          {/* Badge */}
                          {plan.badge && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/20 to-purple-500/10 border border-violet-500/30 mb-6"
                            >
                              <Sparkles className="w-4 h-4 text-violet-400" />
                              <span className="text-sm font-medium text-violet-300">
                                {plan.badge}
                              </span>
                            </motion.div>
                          )}

                          {/* Icon */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plan.gradient} p-5 shadow-2xl`}
                          >
                            <PlanIcon className="w-full h-full text-white" />
                          </motion.div>

                          {/* Plan Name */}
                          <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl md:text-4xl font-black mb-4"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            <span
                              className={`bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                            >
                              {plan.name}
                            </span>
                          </motion.h3>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-base text-gray-300 mb-6 leading-relaxed"
                            style={{ display: isActive ? 'block' : 'none' }}
                          >
                            {plan.description}
                          </motion.p>
                        </div>

                        {/* Features */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 }}
                          className="flex-1 mb-6"
                        >
                          <div
                            className={`space-y-3 ${isActive ? 'max-w-sm' : 'max-w-xs'} mx-auto`}
                          >
                            {(isActive ? plan.features.slice(0, 4) : plan.features.slice(0, 2)).map(
                              (feature: string, featureIndex: number) => (
                                <motion.div
                                  key={feature}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.7 + featureIndex * 0.1 }}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                                  style={{
                                    display:
                                      isActive || (Math.abs(offset) === 1 && featureIndex < 2)
                                        ? 'flex'
                                        : 'none',
                                  }}
                                >
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-gray-200 text-sm font-medium">
                                    {feature}
                                  </span>
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.0 }}
                          className="text-center"
                        >
                          <button
                            className={`group relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r ${plan.gradient} font-bold text-white shadow-xl transition-all duration-500 hover:shadow-lg hover:scale-105 border border-white/20 overflow-hidden ${!isActive && Math.abs(offset) === 1 ? 'text-sm px-4 py-2' : ''}`}
                            onClick={e => {
                              e.stopPropagation()
                              handleScroll('#contacto')
                            }}
                            style={{
                              display: isActive || Math.abs(offset) === 1 ? 'inline-flex' : 'none',
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 opacity-50" />
                            <div className="relative z-10 flex items-center gap-2">
                              <span>{plan.cta}</span>
                              {isActive && (
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              )}
                            </div>
                          </button>
                        </motion.div>

                        {/* Click hint for side cards */}
                        {!isActive && Math.abs(offset) === 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl"
                          >
                            <div className="text-center">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/20 flex items-center justify-center"
                              >
                                <ChevronRight
                                  className={`w-6 h-6 text-white ${offset > 0 ? '' : 'rotate-180'}`}
                                />
                              </motion.div>
                              <p className="text-white text-sm font-medium">
                                {language === 'es' ? 'Click para ver' : 'Click to view'}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Auto-play Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
              aria-label={isAutoPlaying ? 'Pause' : 'Play'}
            >
              <div
                className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}
              />
              <span className="text-sm text-gray-300">
                {isAutoPlaying
                  ? language === 'es'
                    ? 'Pausar'
                    : 'Pause'
                  : language === 'es'
                    ? 'Reproducir'
                    : 'Play'}
              </span>
            </button>
          </div>

          {/* Plan Counter */}
          <div className="text-center mt-6">
            <span className="text-sm text-gray-400">
              {language === 'es' ? 'Plan' : 'Plan'} {page + 1} {language === 'es' ? 'de' : 'of'}{' '}
              {plans.length}
            </span>
          </div>
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mt-16"
        >
          <p className="text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
            {t.pricing.doubt}
          </p>
          <button
            className="underline transition-colors bg-transparent border-0 cursor-pointer p-0 text-base"
            style={{ color: 'var(--gold-primary)' }}
            onClick={() => handleScroll('#contacto')}
          >
            {t.pricing.contactText}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function getGradientColors(gradient: string) {
  const colors: { [key: string]: { start: string; end: string } } = {
    'from-violet-500 via-purple-500 to-indigo-600': { start: '#8B5CF6', end: '#6366F1' },
    'from-blue-500 via-cyan-500 to-teal-600': { start: '#3B82F6', end: '#0D9488' },
    'from-amber-500 via-orange-500 to-red-600': { start: '#F59E0B', end: '#DC2626' },
  }
  return colors[gradient] || { start: '#8B5CF6', end: '#6366F1' }
}
