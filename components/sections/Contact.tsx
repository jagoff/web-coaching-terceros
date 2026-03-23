'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  CheckCircle2,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  User,
  MessageSquare,
  Calendar,
} from 'lucide-react'

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

const promiseStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const promiseItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Contact() {
  const { t, language } = useLanguage()
  console.log('🔥 CONTACT COMPONENT LOADED - ESTE ES EL COMPONENTE ACTIVO')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [80, -40])

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiError, setApiError] = useState('')

  // Real-time validation function
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio'
        if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres'
        if (value.trim().length > 50) return 'El nombre no puede exceder 50 caracteres'
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return 'Solo letras y espacios permitidos'
        return ''

      case 'email': {
        if (!value.trim()) return 'El email es obligatorio'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Introduce un email válido'
        if (value.length > 100) return 'Email demasiado largo'
        return ''
      }

      case 'mensaje':
        if (!value.trim()) return 'El mensaje es obligatorio'
        if (value.trim().length < 10) return 'Cuéntanos más (mínimo 10 caracteres)'
        if (value.trim().length > 500) return 'El mensaje no puede exceder 500 caracteres'
        return ''

      default:
        return ''
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key as keyof typeof form])
      if (error) errs[key] = error
    })
    return errs
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({
        ...prev,
        [name]: error,
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }))

    // Validate on blur
    const error = validateField(name, value)
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }))
  }

  // Get field status for visual feedback
  const getFieldStatus = (fieldName: string) => {
    const hasValue = form[fieldName as keyof typeof form].trim().length > 0
    const hasError = errors[fieldName]
    const isTouched = touched[fieldName]

    if (!isTouched) return 'default'
    if (hasError) return 'error'
    if (hasValue) return 'success'
    return 'default'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setStatus('loading')
    setApiError('')

    try {
      // Formspree configuration
      const formEndpoint = 'https://formspree.io/f/mnjgjjon'

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.nombre,
          email: form.email,
          message: form.mensaje,
          _subject: `Nuevo contacto desde web: ${form.nombre}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setForm({ nombre: '', email: '', mensaje: '' })
        setTouched({})
        setErrors({})

        // Scroll to center of form to show success message properly
        const contactSection = document.getElementById('contacto')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } else {
        throw new Error('Error al enviar el formulario')
      }
    } catch {
      setStatus('error')
      setApiError('Error al enviar el mensaje. Por favor intenta más tarde.')
    }
  }

  return (
    <section id="contacto" className="section section-compact" ref={ref}>
      {/* Glow with scroll parallax */}
      <motion.div
        className="orb orb-gold absolute"
        style={{
          width: 600,
          height: 600,
          bottom: '-30%',
          right: '-15%',
          opacity: 0.35,
          y: orbY,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 xl:gap-28 items-start">
          {/* Left copy */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="badge mb-6 inline-flex">{t.contact.badge}</span>

            <h2 className="heading-xl mb-6 sm:mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
              {t.contact.title} <span className="text-gradient">{t.contact.title2}</span>
            </h2>

            <div className="divider-gold-left mb-6 sm:mb-10" />

            <p className="lead-text mb-4 sm:mb-6">{t.contact.subtitle}</p>

            {/* Urgency indicator */}
            <div
              className="mb-4 p-4 rounded-lg text-center"
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(124,107,196,0.1)',
                border: '1px solid rgba(124,107,196,0.2)',
              }}
            >
              <p className="text-sm text-center" style={{ color: 'var(--gold-primary)' }}>
                🎯 Solo <span className="font-bold">3 cupos disponibles</span> este mes para
                acompañamiento personalizado
              </p>
            </div>

            <motion.ul
              variants={promiseStagger}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-4 sm:space-y-5 mb-10 sm:mb-14"
            >
              {[
                language === 'es' ? '30 minutos que sirven' : '30 minutes that matter',
                language === 'es'
                  ? 'Conversación real y auténtica'
                  : 'Real and authentic conversation',
                language === 'es' ? 'Claridad garantizada' : 'Clarity guaranteed',
              ].map(item => (
                <motion.li key={item} variants={promiseItem} className="flex items-center gap-3">
                  <CheckCircle2 size={18} style={{ color: 'var(--gold-primary)', flexShrink: 0 }} />
                  <span
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                    }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="glass-card p-6 sm:p-10 md:p-12">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-8 gap-6"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center animate-glow"
                      style={{
                        background: 'rgba(34, 197, 94, 0.15)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={24} style={{ color: '#22c55e' }} />
                        <CheckCircle2 size={24} style={{ color: '#22c55e' }} />
                      </div>
                    </div>
                    <h3 className="heading-md" style={{ fontFamily: 'var(--font-heading)' }}>
                      {t.contact.success.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>{t.contact.success.message}</p>

                    {/* Cal.com CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6"
                    >
                      <motion.a
                        href="https://cal.com/fferrari/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-lg"
                        style={{
                          background: 'var(--gradient-gold)',
                          color: 'white',
                          textDecoration: 'none',
                          fontWeight: '600',
                          transition: 'var(--transition-base)',
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(124,107,196,0.3)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Calendar size={18} />
                        Agendar sesión gratuita ahora
                        <ArrowRight size={16} />
                      </motion.a>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6 sm:space-y-7"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name */}
                    <div className="form-group relative">
                      <label htmlFor="nombre" className="form-label">
                        <User size={16} className="inline mr-2" />
                        {t.contact.form.nombre.label}{' '}
                        <span style={{ color: 'var(--gold-primary)' }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="nombre"
                          name="nombre"
                          type="text"
                          autoComplete="name"
                          placeholder={t.contact.form.nombre.placeholder}
                          className={`form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px] transition-all duration-200 ${
                            getFieldStatus('nombre') === 'success'
                              ? 'border-green-500 bg-green-50/10'
                              : getFieldStatus('nombre') === 'error'
                                ? 'border-red-500 bg-red-50/10'
                                : 'border-gray-600'
                          }`}
                          value={form.nombre}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                          aria-invalid={!!errors.nombre}
                        />
                        {!errors.nombre && touched.nombre && form.nombre && (
                          <div
                            className="form-checkmark-right"
                            style={{
                              background: 'rgba(34, 197, 94, 0.1)',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                              padding: '2px 4px',
                              borderRadius: '3px',
                              fontSize: '9px',
                              color: '#22c55e',
                              fontWeight: '500',
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                      {errors.nombre && (
                        <motion.p
                          id="nombre-error"
                          role="alert"
                          className="text-xs mt-2 flex items-center gap-1"
                          style={{ color: '#ef4444' }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle size={12} />
                          {errors.nombre}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-group relative">
                      <label htmlFor="email" className="form-label">
                        <Mail size={16} className="inline mr-2" />
                        {t.contact.form.email.label}{' '}
                        <span style={{ color: 'var(--gold-primary)' }}>*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder={t.contact.form.email.placeholder}
                          className={`form-input text-base sm:text-sm p-4 sm:p-3 min-h-[56px] sm:min-h-[48px] transition-all duration-200 ${
                            getFieldStatus('email') === 'success'
                              ? 'border-green-500 bg-green-50/10'
                              : getFieldStatus('email') === 'error'
                                ? 'border-red-500 bg-red-50/10'
                                : 'border-gray-600'
                          }`}
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={!!errors.email}
                        />
                        {!errors.email && touched.email && form.email && (
                          <div
                            className="form-checkmark-right"
                            style={{
                              background: 'rgba(34, 197, 94, 0.1)',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                              padding: '2px 4px',
                              borderRadius: '3px',
                              fontSize: '9px',
                              color: '#22c55e',
                              fontWeight: '500',
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                      {errors.email && (
                        <motion.p
                          role="alert"
                          className="text-xs mt-2 flex items-center gap-1"
                          style={{ color: '#ef4444' }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle size={12} />
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="form-group relative">
                      <label htmlFor="mensaje" className="form-label">
                        <MessageSquare size={16} className="inline mr-2" />
                        {t.contact.form.mensaje.label}{' '}
                        <span style={{ color: 'var(--gold-primary)' }}>*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          autoComplete="off"
                          className={`form-input form-textarea text-base sm:text-sm p-4 sm:p-3 min-h-[120px] sm:min-h-[100px] transition-all duration-200 ${
                            getFieldStatus('mensaje') === 'success'
                              ? 'border-green-500 bg-green-50/10'
                              : getFieldStatus('mensaje') === 'error'
                                ? 'border-red-500 bg-red-50/10'
                                : 'border-gray-600'
                          }`}
                          placeholder={
                            language === 'es'
                              ? '¿Qué te trae aquí? ¿Qué quieres cambiar?'
                              : 'What brings you here? What do you want to change?'
                          }
                          value={form.mensaje}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                          aria-invalid={!!errors.mensaje}
                        />
                        {!errors.mensaje && touched.mensaje && form.mensaje && (
                          <div
                            className="form-checkmark-right"
                            style={{
                              background: 'rgba(34, 197, 94, 0.1)',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                              padding: '2px 4px',
                              borderRadius: '3px',
                              fontSize: '9px',
                              color: '#22c55e',
                              fontWeight: '500',
                            }}
                          >
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-start mt-2">
                        {errors.mensaje ? (
                          <motion.p
                            role="alert"
                            className="text-xs flex items-center gap-1"
                            style={{ color: '#ef4444' }}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle size={12} />
                            {errors.mensaje}
                          </motion.p>
                        ) : (
                          <div></div>
                        )}
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                          {form.mensaje.trim().length}/500
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className={`btn-primary w-full !mt-8 text-base sm:text-sm py-4 sm:py-3 min-h-[56px] sm:min-h-[48px] transition-all duration-200 rounded-lg ${
                        status === 'loading'
                          ? 'opacity-75 cursor-not-allowed'
                          : Object.keys(errors).length === 0 &&
                              Object.values(form).every(v => v.trim())
                            ? 'animate-glow'
                            : ''
                      }`}
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 size={16} className="inline animate-spin mr-2" />
                          Enviando...
                        </>
                      ) : status === 'error' ? (
                        <>
                          Reintentar <ArrowRight size={16} className="inline ml-1" />
                        </>
                      ) : (
                        <>
                          Enviar y Agendar Sesión <ArrowRight size={16} className="inline ml-1" />
                        </>
                      )}
                    </button>

                    {apiError && (
                      <p role="alert" className="text-xs text-center" style={{ color: '#ef4444' }}>
                        {apiError}
                      </p>
                    )}

                    <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                      {language === 'es'
                        ? 'Respondo en menos de 24h. Tus datos están seguros.'
                        : 'I respond within 24h. Your data is secure.'}
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
