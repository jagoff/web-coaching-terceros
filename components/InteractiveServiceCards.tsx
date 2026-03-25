"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Users, Target, Zap } from "lucide-react";

export default function InteractiveServiceCards() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      icon: Users,
      title: "Leadership Coaching",
      description: "<span style='background: linear-gradient(135deg, #FF6B35 0%, #C87B5A 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;'>Potencia tu impacto como líder</span>",
      details: "Sesiones 1:1 personalizadas para desarrollar habilidades de liderazgo situacional, comunicación efectiva e inteligencia emocional.",
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 2,
      icon: Target,
      title: "Organizational Consulting",
      description: "Transforma tu cultura empresarial",
      details: "Diseño de procesos ágiles, estructura organizacional flexible y métricas significativas para escalar tu negocio.",
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 3,
      icon: Zap,
      title: "Agile Transformation",
      description: "Adopta agilidad real",
      details: "Implementación de Scrum/Kanban, gestión del cambio cultural y creación de equipos autónomos de alto rendimiento.",
      color: "from-green-500 to-green-700"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Servicios Personalizados
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card Container */}
              <motion.div
                className="relative h-80 cursor-pointer"
                onClick={() => setActiveCard(activeCard === service.id ? null : service.id)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {/* Front of Card */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} p-8 flex flex-col justify-between backface-hidden`}
                  animate={{ 
                    rotateY: activeCard === service.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div>
                    <motion.div
                      className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <service.icon size={32} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-white/80" dangerouslySetInnerHTML={{ __html: service.description }} />
                  </div>
                  
                  <motion.div
                    className="flex items-center text-white"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="mr-2">Ver más</span>
                    <ChevronRight size={20} />
                  </motion.div>
                </motion.div>

                {/* Back of Card */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} p-8 flex flex-col justify-center backface-hidden`}
                  animate={{ 
                    rotateY: activeCard === service.id ? 0 : -180,
                  }}
                  transition={{ duration: 0.6 }}
                  style={{ 
                    transformStyle: "preserve-3d",
                    rotateY: activeCard === service.id ? 180 : 0
                  }}
                >
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-white/90 leading-relaxed">{service.details}</p>
                    
                    <motion.button
                      className="mt-6 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Agendar Sesión
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
