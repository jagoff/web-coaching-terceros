"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  Sparkles,
  Award,
  Users,
  TrendingUp,
  Quote
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function ContactSidebar() {
  const { language } = useLanguage();
  const es = language === 'es';

  const metrics = [
    {
      icon: Award,
      value: "20+",
      label: es ? "Años en Tech" : "Years in Tech",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Users,
      value: "50+",
      label: es ? "Equipos Transformados" : "Teams Transformed",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: TrendingUp,
      value: "11+",
      label: es ? "Años de Coaching" : "Years Coaching",
      gradient: "from-amber-500 to-orange-600"
    }
  ];

  const testimonials = [
    {
      quote: es 
        ? "Fernando nos ayudó a escalar de 5 a 30 personas sin perder la cultura que nos define."
        : "Fernando helped us scale from 5 to 30 people without losing our defining culture.",
      author: "CTO, Startup Fintech",
      role: es ? "Argentina" : "Argentina"
    },
    {
      quote: es
        ? "Pasamos de micromanagement a equipos autónomos en 3 meses. Cambió completamente nuestra dinámica."
        : "We went from micromanagement to autonomous teams in 3 months. It completely changed our dynamics.",
      author: "VP Engineering",
      role: es ? "Tech Scale-up" : "Tech Scale-up"
    }
  ];

  const guarantees = [
    {
      icon: Clock,
      text: es ? "Respuesta en menos de 24hs" : "Response within 24h",
      color: "#10b981"
    },
    {
      icon: Shield,
      text: es ? "100% confidencial" : "100% confidential",
      color: "#3b82f6"
    },
    {
      icon: Sparkles,
      text: es ? "Primera sesión gratuita" : "First session free",
      color: "#f59e0b"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Guarantees - Moved to top */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          {es ? '¿Por qué contactarme?' : 'Why contact me?'}
        </h3>
        {guarantees.map((guarantee, index) => {
          const Icon = guarantee.icon;
          return (
            <motion.div 
              key={index} 
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              whileHover={{ 
                borderColor: 'rgba(255, 107, 53, 0.2)',
                transition: { duration: 0.2 }
              }}
            >
              <div 
                className="p-2 rounded-lg flex-shrink-0"
                style={{
                  background: `${guarantee.color}20`,
                }}
              >
                <Icon size={18} style={{ color: guarantee.color }} />
              </div>
              <span className="text-sm font-medium text-gray-200">{guarantee.text}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-3"
      >
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-xl p-4 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-2">
                <div 
                  className="p-2 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)`
                  }}
                >
                  <Icon size={18} style={{ color: '#FF6B35' }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400 leading-tight">{metric.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Single Best Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-xl p-5"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="flex items-start gap-3">
          <Quote size={20} className="text-gray-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-sm text-gray-300 leading-relaxed mb-3 italic">
              "{es 
                ? 'Pasamos de micromanagement a equipos autónomos en 3 meses. Cambió completamente nuestra dinámica.'
                : 'We went from micromanagement to autonomous teams in 3 months. It completely changed our dynamics.'
              }"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">VP Engineering</p>
                <p className="text-xs text-gray-500">{es ? 'Tech Scale-up' : 'Tech Scale-up'}</p>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3" fill="#FF6B35" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
