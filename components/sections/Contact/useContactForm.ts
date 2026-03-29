"use client";

import { useState } from "react";

export interface ContactForm {
  nombre: string;
  email: string;
  mensaje: string;
}

export interface ContactErrors {
  [key: string]: string | undefined;
  nombre?: string;
  email?: string;
  mensaje?: string;
}

export interface ContactState {
  form: ContactForm;
  errors: ContactErrors;
  touched: Record<string, boolean>;
  status: "idle" | "loading" | "success" | "error";
  apiError: string;
}

export const useContactForm = () => {
  const [form, setForm] = useState<ContactForm>({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [apiError, setApiError] = useState("");

  // Real-time validation function
  const validateField = (name: keyof ContactForm, value: string): string => {
    switch (name) {
      case "nombre":
        if (!value.trim()) return "El nombre es obligatorio";
        if (value.trim().length < 2) return "El nombre debe tener al menos 2 caracteres";
        if (value.trim().length > 50) return "El nombre no puede exceder 50 caracteres";
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) return "Solo letras y espacios permitidos";
        return "";
      
      case "email":
        if (!value.trim()) return "El email es obligatorio";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Introduce un email válido";
        if (value.length > 100) return "Email demasiado largo";
        return "";
      
      case "mensaje":
        if (!value.trim()) return "El mensaje es obligatorio";
        if (value.trim().length < 10) return "Cuéntanos más (mínimo 10 caracteres)";
        if (value.trim().length > 500) return "El mensaje no puede exceder 500 caracteres";
        return "";
      
      default:
        return "";
    }
  };

  const validate = (): boolean => {
    const errs: ContactErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key as keyof ContactForm, form[key as keyof ContactForm]);
      if (error) errs[key as keyof ContactForm] = error;
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const updateField = (name: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const updateFieldWithTouch = (name: keyof ContactForm, value: string) => {
    updateField(name, value);
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const resetForm = () => {
    setForm({ nombre: "", email: "", mensaje: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
    setApiError("");
  };

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
  };
};
