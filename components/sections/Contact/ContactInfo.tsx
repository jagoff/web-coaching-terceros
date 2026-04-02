"use client";

import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Target, 
  Zap,
  CheckCircle2,
  MessageCircle
} from "lucide-react";
import { slideLeft } from "./animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui";
import { Card } from "@/components/ui";

export default function ContactInfo() {
  const { language } = useLanguage();

  const benefits = [
    {
      icon: Sparkles,
      title: language === 'es' ? 'Sesión Gratuita' : 'Free Session',
      description: language === 'es' 
        ? 'Tu primera sesión de coaching es completamente gratuita. Es una oportunidad para conocernos, entender tus objetivos y descubrir cómo puedo ayudarte a alcanzarlos. Sin compromisos, sin costos, solo conversación y crecimiento.'
        : 'Your first coaching session is completely free. It\'s an opportunity to get to know each other, understand your goals, and discover how I can help you achieve them. No commitments, no costs, just conversation and growth.',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: Target,
      title: language === 'es' ? 'Enfoque Personalizado' : 'Personalized Approach',
      description: language === 'es'
        ? 'Cada persona y cada equipo es único. Diseño estrategias de coaching adaptadas específicamente a tu contexto, desafíos y objetivos. No uso soluciones genéricas, creo caminos personalizados que resuenen con tu realidad.'
        : 'Every person and every team is unique. I design coaching strategies specifically tailored to your context, challenges, and goals. No generic solutions, just personalized paths that resonate with your reality.',
      color: 'from-indigo-600 to-purple-600'
    },
    {
      icon: Zap,
      title: language === 'es' ? 'Resultados Rápidos' : 'Fast Results',
      description: language === 'es'
        ? 'Utilizo metodologías validadas por Scrum.org y técnicas de coaching probadas que generan resultados tangibles en tiempo récord. No se trata de teorías abstractas, sino de herramientas prácticas que implementarás desde el primer día.'
        : 'I use Scrum.org validated methodologies and proven coaching techniques that generate tangible results in record time. This isn\'t about abstract theories, but practical tools you\'ll implement from day one.',
      color: 'from-rose-600 to-pink-600'
    }
  ];

  const guarantees = [
    language === 'es' ? 'Respuesta en menos de 24hs' : 'Response in less than 24h',
    language === 'es' ? '100% confidencial' : '100% confidential',
    language === 'es' ? 'Sin compromiso' : 'No commitment'
  ];

  return (
    <motion.div
      variants={slideLeft}
      className="space-y-4"
    >
      {/* Headline - OPCIÓN 1: Minimalista Brutalista */}
      <div className="relative mb-4">
        <div className="text-center">
          {/* Brutalist Header */}
          <div className="mb-2">
            <div className="inline-block">
              <div 
                className="border-4 border-white p-4 lg:p-6 bg-black"
                style={{ 
                  transform: "rotate(-1deg)"
                }}
              >
                <h3 
                  className="text-white font-black tracking-tight"
                  style={{ 
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(2.5rem, 6vw, 4rem)",
                    fontWeight: "900",
                    letterSpacing: "-0.04em",
                    lineHeight: "0.9",
                    textTransform: "uppercase"
                  }}
                >
                  ¿POR QUÉ<br/>EL PRIMER<br/>PASO HOY?
                </h3>
              </div>
            </div>
          </div>
          
          {/* Minimalist Subheadline */}
          <div className="max-w-3xl mx-auto">
            <p 
              className="text-base font-light"
              style={{ 
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontWeight: "300",
                letterSpacing: "0.02em",
                lineHeight: "1.6"
              }}
            >
              Las transformaciones más significativas comienzan con una decisión.
              <span className="block mt-2 text-white font-medium">
                No necesitas todas las respuestas. Solo coraje para empezar.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Cards - Creative Design */}
      <div className="space-y-3">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="group"
            >
              <div className="relative">
                {/* Card with creative layout */}
                <Card
                  variant="glass"
                  padding="sm"
                  interactive
                  className="relative overflow-hidden"
                >
                  {/* Creative background pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      background: `repeating-linear-gradient(${index % 2 === 0 ? '45deg' : '-45deg'}, transparent, transparent 10px, ${benefit.color.replace('from-', '').replace(' to-', ',').replace('600', '400')} 10px, ${benefit.color.replace('from-', '').replace(' to-', ',').replace('600', '400')} 20px)`
                    }}
                  />
                  
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
                    {/* Icon Section */}
                    <div className="lg:col-span-3">
                      <div className="relative">
                        <div
                          className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl group-hover:rotate-6 transition-transform duration-500"
                          style={{
                            background: benefit.color,
                          }}
                        >
                          <Icon 
                            size={40} 
                            className="text-white" 
                          />
                        </div>
                        {/* Decorative element */}
                        <div 
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-60"
                          style={{
                            background: benefit.color,
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:col-span-9">
                      {/* Creative Title Layout */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span 
                            className="text-3xl lg:text-4xl font-black"
                            style={{ 
                              fontFamily: "var(--font-heading)",
                              fontWeight: "900",
                              letterSpacing: "-0.02em",
                              background: benefit.color,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text"
                            }}
                          >
                            {benefit.title.split(' ')[0]}
                          </span>
                          {benefit.title.split(' ')[1] && (
                            <span 
                              className="text-xl lg:text-2xl font-light italic"
                              style={{ 
                                fontFamily: "Georgia, serif",
                                fontStyle: "italic",
                                color: "var(--text-secondary)"
                              }}
                            >
                              {benefit.title.split(' ')[1]}
                            </span>
                          )}
                          {benefit.title.split(' ')[2] && (
                            <span 
                              className="text-2xl lg:text-3xl font-bold"
                              style={{ 
                                fontFamily: "var(--font-heading)",
                                fontWeight: "700",
                                color: "var(--text-primary)"
                              }}
                            >
                              {benefit.title.split(' ')[2]}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description with mixed typography */}
                      <div className="space-y-2">
                        {benefit.description.split('. ').map((sentence, i) => (
                          <p 
                            key={i}
                            className="leading-relaxed"
                            style={{ 
                              color: "var(--text-secondary)",
                              fontFamily: i % 2 === 0 ? "var(--font-body)" : "Georgia, serif",
                              fontSize: "clamp(1rem, 2vw, 1.15rem)",
                              fontWeight: i % 2 === 0 ? "400" : "300",
                              fontStyle: i % 2 === 1 ? "italic" : "normal",
                              lineHeight: "1.7"
                            }}
                          >
                            {sentence + (i < benefit.description.split('. ').length - 1 ? '.' : '')}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Floating decorative element */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full opacity-20"
                  style={{
                    background: benefit.color,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Guarantees */}
      <div className="mt-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <span 
                className="font-medium"
                style={{ 
                  color: "var(--text-secondary)",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: "500"
                }}
              >
                {guarantee}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Primary CTA - WhatsApp Direct */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <h4 
            className="mb-4 text-white font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
              fontWeight: "800",
              letterSpacing: "-0.01em"
            }}
          >
            {language === 'es' ? 'Comienza tu transformación hoy' : 'Start your transformation today'}
          </h4>
          <p 
            className="max-w-2xl mx-auto mb-8"
            style={{ 
              color: "var(--text-secondary)",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              lineHeight: "1.7",
              fontWeight: "400"
            }}
          >
            {language === 'es' 
              ? 'No esperes el momento perfecto. La conversación que puede cambiar tu carrera, tu equipo o tu vida está a un mensaje de distancia. Te responderé personalmente en menos de 24 horas.'
              : 'Don\'t wait for the perfect moment. The conversation that can change your career, your team, or your life is just one message away. I\'ll personally respond within 24 hours.'
            }
          </p>
        </motion.div>
        
        <motion.a
          href="https://wa.me/5493425153999?text=Hola%20Fernando%2C%20vi%20tu%20web%20y%20quiero%20agendar%20una%20sesi%C3%B3n%20gratuita."
          target="_blank"
          rel="noopener noreferrer"
          className="force-cta-style w-full flex items-center justify-center gap-3 group"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            fontWeight: "700",
            letterSpacing: "0.05em"
          }}
          whileHover={{ scale: 1.025, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
          <span>{language === 'es' ? 'Agendar Sesión Gratuita' : 'Book Free Session'}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-4"
          style={{ 
            color: "var(--text-secondary)",
            fontFamily: "var(--font-body)",
            fontSize: "0.95rem",
            fontWeight: "500"
          }}
        >
          {language === 'es' ? '✨ Respuesta garantizada en menos de 24 horas' : '✨ Response guaranteed within 24 hours'}
        </motion.p>
      </div>
    </motion.div>
  );
}
