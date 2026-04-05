'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { EMAIL_REGEX } from '@/lib/validations'

export interface ContactForm {
  nombre: string
  email: string
  mensaje: string
}

export interface ContactErrors {
  [key: string]: string | undefined
  nombre?: string
  email?: string
  mensaje?: string
}

export interface ContactState {
  form: ContactForm
  errors: ContactErrors
  touched: Record<string, boolean>
  status: 'idle' | 'loading' | 'success' | 'error'
  apiError: string
}

export const useContactForm = () => {
  const { language } = useLanguage()
  const [form, setForm] = useState<ContactForm>({
    nombre: '',
    email: '',
    mensaje: '',
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [apiError, setApiError] = useState('')

  // Real-time validation function
  const validateField = (name: keyof ContactForm, value: string): string => {
    const es = language === 'es'
    switch (name) {
      case 'nombre':
        if (!value.trim()) return es ? 'El nombre es obligatorio' : 'Name is required'
        if (value.trim().length < 2)
          return es
            ? 'El nombre debe tener al menos 2 caracteres'
            : 'Name must be at least 2 characters'
        if (value.trim().length > 50)
          return es
            ? 'El nombre no puede exceder 50 caracteres'
            : 'Name cannot exceed 50 characters'
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
          return es ? 'Solo letras y espacios permitidos' : 'Letters and spaces only'
        return ''

      case 'email':
        if (!value.trim()) return es ? 'El email es obligatorio' : 'Email is required'
        if (!EMAIL_REGEX.test(value))
          return es ? 'Introduce un email válido' : 'Enter a valid email'
        if (value.length > 100) return es ? 'Email demasiado largo' : 'Email is too long'
        return ''

      case 'mensaje':
        if (!value.trim()) return es ? 'El mensaje es obligatorio' : 'Message is required'
        if (value.trim().length < 10)
          return es ? 'Cuéntanos más (mínimo 10 caracteres)' : 'Tell us more (min. 10 characters)'
        if (value.trim().length > 1000)
          return es
            ? 'El mensaje no puede exceder 1000 caracteres'
            : 'Message cannot exceed 1000 characters'
        return ''

      default:
        return ''
    }
  }

  const validate = (): boolean => {
    const errs: ContactErrors = {}
    Object.keys(form).forEach(key => {
      const error = validateField(key as keyof ContactForm, form[key as keyof ContactForm])
      if (error) errs[key as keyof ContactForm] = error
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const updateField = (name: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }))

    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const updateFieldWithTouch = (name: keyof ContactForm, value: string) => {
    updateField(name, value)
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const resetForm = () => {
    setForm({ nombre: '', email: '', mensaje: '' })
    setErrors({})
    setTouched({})
    setStatus('idle')
    setApiError('')
  }

  return {
    form,
    errors,
    touched,
    status,
    apiError,
    setStatus,
    setApiError,
    validate,
    updateField,
    updateFieldWithTouch,
    resetForm,
  }
}
