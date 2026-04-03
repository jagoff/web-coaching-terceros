"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Loader2, 
  User, 
  Mail,
  MessageSquare,
  Sparkles,
  Target,
  Users,
  Zap,
  TrendingUp,
  Send
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendContactForm } from "@/lib/contact-service";

interface FormData {
  nombre: string;
  email: string;
  desafio: string;
  mensaje: string;
}

type Step = 1 | 2 | 3 | 4;

const challenges = {
  es: [
    { icon: Users, label: "Mi equipo no es autónomo", value: "equipo_dependiente" },
    { icon: Target, label: "Necesito escalar sin perder calidad", value: "escalabilidad" },
    { icon: TrendingUp, label: "Quiero mejorar mi liderazgo", value: "liderazgo" },
    { icon: Zap, label: "Tengo problemas de comunicación", value: "comunicacion" },
    { icon: MessageSquare, label: "Otro desafío", value: "custom" }
  ],
  en: [
    { icon: Users, label: "My team isn't autonomous", value: "equipo_dependiente" },
    { icon: Target, label: "Need to scale without losing quality", value: "escalabilidad" },
    { icon: TrendingUp, label: "Want to improve my leadership", value: "liderazgo" },
    { icon: Zap, label: "Communication problems", value: "comunicacion" },
    { icon: MessageSquare, label: "Other challenge", value: "custom" }
  ]
};

export default function ConversationalContactForm() {
  const { language } = useLanguage();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    desafio: "",
    mensaje: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");

  const es = language === 'es';

  const validateStep = (currentStep: Step): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (currentStep) {
      case 1:
        if (!formData.nombre.trim()) {
          newErrors.nombre = es ? "Por favor, comparte tu nombre" : "Please share your name";
        } else if (formData.nombre.trim().length < 2) {
          newErrors.nombre = es ? "Un poco más largo, por favor" : "A bit longer, please";
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre)) {
          newErrors.nombre = es ? "Solo letras y espacios" : "Letters and spaces only";
        }
        break;

      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = es ? "Necesito tu email para contactarte" : "I need your email to contact you";
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = es ? "Este email no parece válido" : "This email doesn't look valid";
        }
        break;

      case 3:
        if (!selectedChallenge) {
          newErrors.desafio = es ? "Selecciona un desafío" : "Select a challenge";
        } else if (selectedChallenge === "custom" && !formData.mensaje.trim()) {
          newErrors.mensaje = es ? "Cuéntame sobre tu desafío" : "Tell me about your challenge";
        } else if (selectedChallenge === "custom" && formData.mensaje.trim().length < 10) {
          newErrors.mensaje = es ? "Un poco más de detalle, por favor" : "A bit more detail, please";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 4) {
        setStep((prev) => (prev + 1) as Step);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as Step);
      setErrors({});
    }
  };

  const handleChallengeSelect = (value: string) => {
    setSelectedChallenge(value);
    setFormData(prev => ({ ...prev, desafio: value }));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setStatus("loading");
    setStep(4);

    try {
      const challengeLabel = challenges[language].find(c => c.value === selectedChallenge)?.label || selectedChallenge;
      const finalMessage = selectedChallenge === "custom" 
        ? formData.mensaje 
        : `${es ? 'Desafío seleccionado' : 'Selected challenge'}: ${challengeLabel}\n\n${formData.mensaje || (es ? 'Sin detalles adicionales' : 'No additional details')}`;

      const result = await sendContactForm({
        nombre: formData.nombre,
        email: formData.email,
        mensaje: finalMessage
      });

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setFormData({ nombre: "", email: "", desafio: "", mensaje: "" });
    setSelectedChallenge("");
    setStep(1);
    setStatus("idle");
    setErrors({});
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return es ? "¿Cómo te llamas?" : "What's your name?";
      case 2: return es ? "¿Cuál es tu email?" : "What's your email?";
      case 3: return es ? "¿Cuál es tu mayor desafío?" : "What's your biggest challenge?";
      case 4: return status === "success" 
        ? (es ? "¡Mensaje enviado!" : "Message sent!")
        : status === "error"
        ? (es ? "Algo salió mal" : "Something went wrong")
        : (es ? "Enviando..." : "Sending...");
      default: return "";
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 1: return es ? "Empecemos por conocernos" : "Let's start by getting to know each other";
      case 2: return es ? "Para poder contactarte" : "So I can reach you";
      case 3: return es ? "Selecciona el que más resuene contigo" : "Select the one that resonates most";
      case 4: return status === "success"
        ? (es ? "Te responderé en menos de 24 horas" : "I'll get back to you within 24 hours")
        : status === "error"
        ? (es ? "Por favor, intenta nuevamente" : "Please try again")
        : "";
      default: return "";
    }
  };

  return (
    <div className="relative">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <motion.div
                className="relative flex items-center justify-center"
                initial={false}
                animate={{
                  scale: step >= s ? 1 : 0.9,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                  style={{
                    background: step >= s 
                      ? 'linear-gradient(135deg, #FF6B35 0%, #FF8555 100%)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: step >= s 
                      ? '2px solid rgba(255, 107, 53, 0.3)'
                      : '2px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {step > s ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-sm font-semibold text-white">{s}</span>
                  )}
                </div>
              </motion.div>
              {s < 3 && (
                <div className="flex-1 h-0.5 mx-2" style={{
                  background: step > s 
                    ? 'linear-gradient(90deg, #FF6B35 0%, #FF8555 100%)'
                    : 'rgba(255, 255, 255, 0.1)'
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          minHeight: '400px'
        }}
      >
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05) 0%, rgba(124, 107, 196, 0.05) 100%)',
          }}
        />

        <div className="relative z-10 p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step Title */}
              <div className="mb-8">
                <h3 
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35 0%, #C87B5A 50%, #7C6BC4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {getStepTitle()}
                </h3>
                <p className="text-gray-400 text-sm md:text-base">
                  {getStepSubtitle()}
                </p>
              </div>

              {/* Step Content */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                      placeholder={es ? "Tu nombre completo" : "Your full name"}
                      className="w-full px-4 py-4 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.nombre ? '2px solid #ef4444' : '2px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '1rem'
                      }}
                      autoFocus
                    />
                    {errors.nombre && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 ml-1"
                      >
                        {errors.nombre}
                      </motion.p>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="email@ejemplo.com"
                      className="w-full px-4 py-4 rounded-xl text-white placeholder-gray-500 transition-all duration-300 focus:outline-none"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: errors.email ? '2px solid #ef4444' : '2px solid rgba(255, 255, 255, 0.1)',
                        fontSize: '1rem'
                      }}
                      autoFocus
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2 ml-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3">
                    {challenges[language].map((challenge) => {
                      const Icon = challenge.icon;
                      const isSelected = selectedChallenge === challenge.value;
                      
                      return (
                        <motion.button
                          key={challenge.value}
                          onClick={() => handleChallengeSelect(challenge.value)}
                          className="relative group text-left p-4 rounded-xl transition-all duration-300"
                          style={{
                            background: isSelected 
                              ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%)'
                              : 'rgba(255, 255, 255, 0.03)',
                            border: isSelected 
                              ? '2px solid rgba(255, 107, 53, 0.4)'
                              : '2px solid rgba(255, 255, 255, 0.08)',
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="p-2 rounded-lg"
                              style={{
                                background: isSelected 
                                  ? 'rgba(255, 107, 53, 0.2)'
                                  : 'rgba(255, 255, 255, 0.05)'
                              }}
                            >
                              <Icon size={20} className="text-white" />
                            </div>
                            <span className="text-white font-medium flex-1">{challenge.label}</span>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <CheckCircle2 size={20} style={{ color: '#FF6B35' }} />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {selectedChallenge === "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="relative"
                    >
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                        placeholder={es ? "Cuéntame más sobre tu desafío..." : "Tell me more about your challenge..."}
                        rows={4}
                        className="w-full p-4 pt-5 rounded-xl text-white placeholder-gray-500 resize-none transition-all duration-300 focus:outline-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: errors.mensaje ? '2px solid #ef4444' : '2px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '1rem'
                        }}
                        autoFocus
                      />
                      {errors.mensaje && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2 ml-1"
                        >
                          {errors.mensaje}
                        </motion.p>
                      )}
                    </motion.div>
                  )}

                  {selectedChallenge && selectedChallenge !== "custom" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="relative"
                    >
                      <textarea
                        value={formData.mensaje}
                        onChange={(e) => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                        placeholder={es ? "¿Algo más que quieras compartir? (opcional)" : "Anything else you'd like to share? (optional)"}
                        rows={3}
                        className="w-full p-4 rounded-xl text-white placeholder-gray-500 resize-none transition-all duration-300 focus:outline-none"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '2px solid rgba(255, 255, 255, 0.1)',
                          fontSize: '1rem'
                        }}
                      />
                    </motion.div>
                  )}

                  {errors.desafio && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm ml-1"
                    >
                      {errors.desafio}
                    </motion.p>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-8">
                  {status === "loading" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin" style={{ color: '#FF6B35' }} />
                      <p className="text-gray-400">{es ? 'Enviando tu mensaje...' : 'Sending your message...'}</p>
                    </motion.div>
                  )}

                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
                      }}>
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-lg text-gray-300 mb-6">
                        {es 
                          ? '¡Gracias por contactarme! Revisaré tu mensaje y te responderé pronto.'
                          : 'Thanks for reaching out! I will review your message and get back to you soon.'
                        }
                      </p>
                      <button
                        onClick={resetForm}
                        className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8555 100%)',
                        }}
                      >
                        {es ? 'Enviar otro mensaje' : 'Send another message'}
                      </button>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '2px solid rgba(239, 68, 68, 0.4)'
                      }}>
                        <span className="text-4xl">😔</span>
                      </div>
                      <p className="text-lg text-gray-300 mb-6">
                        {es 
                          ? 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.'
                          : 'There was a problem sending your message. Please try again.'
                        }
                      </p>
                      <button
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
                        style={{
                          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8555 100%)',
                        }}
                      >
                        {es ? 'Intentar de nuevo' : 'Try again'}
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="flex items-center gap-3 mt-8">
              {step > 1 && (
                <motion.button
                  onClick={handleBack}
                  className="flex items-center gap-2 px-5 py-3 btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={18} />
                  {es ? 'Atrás' : 'Back'}
                </motion.button>
              )}

              <motion.button
                onClick={step === 3 ? handleSubmit : handleNext}
                className="flex-1 flex items-center justify-center gap-2 btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {step === 3 ? (
                  <>
                    <Send size={18} />
                    {es ? 'Enviar mensaje' : 'Send message'}
                  </>
                ) : (
                  <>
                    {es ? 'Continuar' : 'Continue'}
                    <ArrowRight size={18} />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
