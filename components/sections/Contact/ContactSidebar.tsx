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
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(124, 107, 196, 0.1) 0%, rgba(200, 123, 90, 0.05) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex items-start gap-4">
          <div className="relative">
            <div 
              className="w-16 h-16 rounded-full overflow-hidden"
              style={{
                border: '2px solid rgba(255, 107, 53, 0.3)',
              }}
            >
              <Image
                src="/images/fernando-avatar.jpg"
                alt="Fernando Ferrari"
                width={64}
                height={64}
                className="object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image doesn't exist
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<div style="width: 64px; height: 64px; background: linear-gradient(135deg, #7C6BC4 0%, #C87B5A 100%); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; color: white;">FF</div>';
                }}
              />
            </div>
            <div 
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                border: '2px solid #14121D'
              }}
            >
              <CheckCircle2 size={14} className="text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-bold text-white mb-1">Fernando Ferrari</h4>
            <p className="text-sm text-gray-400 mb-2">
              {es ? 'Agile Coach & Consultor Organizacional' : 'Agile Coach & Organizational Consultant'}
            </p>
            <div className="flex items-center gap-2">
              <Award size={14} style={{ color: '#FF6B35' }} />
              <span className="text-xs text-gray-400">
                {es ? 'Certificado Scrum.org' : 'Scrum.org Certified'}
              </span>
            </div>
          </div>
        </div>
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

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-xl p-5"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
            whileHover={{ 
              borderColor: 'rgba(255, 107, 53, 0.2)',
              transition: { duration: 0.2 }
            }}
          >
            <div className="flex items-start gap-3">
              <Quote size={20} className="text-gray-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-300 leading-relaxed mb-3 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">{testimonial.author}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
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
        ))}
      </motion.div>

      {/* Guarantees */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        {guarantees.map((guarantee, index) => {
          const Icon = guarantee.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="p-2 rounded-lg"
                style={{
                  background: `${guarantee.color}20`,
                }}
              >
                <Icon size={16} style={{ color: guarantee.color }} />
              </div>
              <span className="text-sm text-gray-300">{guarantee.text}</span>
            </div>
          );
        })}
      </motion.div>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative overflow-hidden rounded-xl p-4 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield size={18} style={{ color: '#10b981' }} />
          <span className="text-sm font-semibold text-white">
            {es ? 'Conversación Confidencial' : 'Confidential Conversation'}
          </span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          {es 
            ? 'Tu información está protegida. Solo la usamos para contactarte.'
            : 'Your information is protected. We only use it to contact you.'
          }
        </p>
      </motion.div>
    </div>
  );
}
