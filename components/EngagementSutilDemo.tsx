"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function EngagementSutilDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 1. CURIOSIDAD VISUAL - Elementos que invitan a descubrir */}
      <CuriosidadVisualSection />
      
      {/* 2. CONFIANZA PROFESIONAL - Detalles de alta calidad */}
      <ConfianzaProfesionalSection />
      
      {/* 3. COMODIDAD VISUAL - Espacio para respirar */}
      <ComodidadVisualSection />
      
      {/* 4. MEMORIA EMOCIONAL - Asociaciones positivas */}
      <MemoriaEmocionalSection />
    </div>
  );
}

// ===== 1. CURIOSIDAD VISUAL =====
function CuriosidadVisualSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background sutil que se mueve */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-8 relative z-10">
        <motion.h1
          className="text-6xl md:text-8xl font-light text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <span className="bg-gradient-to-r from-purple-200/80 to-blue-200/80 bg-clip-text text-transparent">
            Curiosidad Visual
          </span>
        </motion.h1>
        
        {/* Cards que revelan información gradualmente */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="relative h-64 bg-gray-900/50 rounded-2xl p-8 cursor-pointer border border-gray-800/50 backdrop-blur-sm"
              onMouseEnter={() => setHoveredCard(item)}
              onMouseLeave={() => setHoveredCard(null)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Contenido base */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6"
                    animate={{
                      rotate: hoveredCard === item ? 360 : 0,
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    <span className="text-2xl">{item}</span>
                  </motion.div>
                  <h3 className="text-xl font-light text-gray-300">Servicio {item}</h3>
                </div>
                
                {/* Información que se revela en hover */}
                <AnimatePresence>
                  {hoveredCard === item && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400/70 text-sm leading-relaxed">
                        Descubre más sobre este servicio...
                      </p>
                      <motion.div
                        className="mt-4 text-purple-400/60 text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        Explorar →
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Efecto de brillo sutil en hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none"
                animate={{
                  opacity: hoveredCard === item ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
        
        {/* Indicador de scroll muy sutil */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-purple-400/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}

// ===== 2. CONFIANZA PROFESIONAL =====
function ConfianzaProfesionalSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center relative">
      <motion.div
        className="container mx-auto px-8 text-center"
        style={{ y, opacity }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-light mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <span className="text-gray-100/90">Confianza</span>
          <br />
          <span className="text-3xl md:text-4xl font-light text-gray-400/70 italic">Profesional</span>
        </motion.h2>
        
        {/* Elementos que demuestran calidad */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Tipografía perfecta */}
          <motion.div
            className="text-xl md:text-2xl text-gray-300/60 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Cada detalle está cuidadosamente diseñado. Desde la tipografía hasta los espacios en blanco, 
            todo comunica excelencia y atención al detalle.
          </motion.div>
          
          {/* Grid de elementos precisos */}
          <div className="grid grid-cols-3 gap-8 mt-16">
            {["Precisión", "Claridad", "Elegancia"].map((word, index) => (
              <motion.div
                key={word}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="text-3xl font-light text-gray-400/60 mb-2">
                  {["01", "02", "03"][index]}
                </div>
                <div className="text-lg font-light text-gray-300/80">
                  {word}
                </div>
                <motion.div
                  className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gray-400/30 to-transparent mx-auto"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ===== 3. COMODIDAD VISUAL =====
function ComodidadVisualSection() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-7xl font-light text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <span className="text-gray-100/80">Comodidad</span>
          <br />
          <span className="text-3xl md:text-4xl font-light text-gray-400/60 italic">Visual</span>
        </motion.h2>
        
        {/* Mucho espacio en blanco */}
        <div className="max-w-2xl mx-auto text-center space-y-16">
          {/* Elementos espaciados generosamente */}
          <motion.p
            className="text-xl text-gray-400/50 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            El espacio en blanco no es espacio vacío. 
            Es espacio para respirar, para pensar, para procesar.
          </motion.p>
          
          {/* Elemento único con mucho espacio alrededor */}
          <motion.div
            className="py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full mx-auto flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full" />
            </div>
            <p className="mt-8 text-gray-500/60 font-light">
              Un solo elemento, todo el espacio necesario.
            </p>
          </motion.div>
          
          {/* Texto con espaciado generoso */}
          <motion.p
            className="text-lg text-gray-400/40 leading-relaxed font-light max-w-md mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          >
            Nada compite por tu atención. 
            Cada elemento tiene su propósito y su espacio.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

// ===== 4. MEMORIA EMOCIONAL =====
function MemoriaEmocionalSection() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  
  const memories = [
    { emoji: "🌅", title: "Comienzos", description: "El primer paso hacia la transformación" },
    { emoji: "🚀", title: "Crecimiento", description: "Superando límites y alcanzando metas" },
    { emoji: "🎯", title: "Propósito", description: "Encontrando el significado en el trabajo" }
  ];
  
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Background emocional */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-900/5 to-purple-900/5"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(251, 146, 60, 0.05), rgba(139, 92, 246, 0.05))",
            "linear-gradient(to bottom right, rgba(139, 92, 246, 0.05), rgba(251, 146, 60, 0.05))"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-8 relative z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-light text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <span className="text-gray-100/80">Memoria</span>
          <br />
          <span className="text-3xl md:text-4xl font-light text-gray-400/60 italic">Emocional</span>
        </motion.h2>
        
        {/* Memorias interactivas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {memories.map((memory, index) => (
            <motion.button
              key={index}
              className="text-center group"
              onClick={() => setSelectedMemory(selectedMemory === index ? null : index)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              {/* Emoji con animación emocional */}
              <motion.div
                className="text-6xl mb-6"
                animate={{
                  scale: selectedMemory === index ? 1.2 : 1,
                  rotate: selectedMemory === index ? [0, -10, 10, -10, 0] : 0
                }}
                transition={{ 
                  scale: { duration: 0.4 },
                  rotate: { duration: 0.8, repeat: selectedMemory === index ? Infinity : 0 }
                }}
              >
                {memory.emoji}
              </motion.div>
              
              {/* Título */}
              <h3 className="text-xl font-light text-gray-300/80 mb-3">
                {memory.title}
              </h3>
              
              {/* Descripción que aparece */}
              <AnimatePresence>
                {selectedMemory === index && (
                  <motion.p
                    className="text-gray-400/60 text-sm leading-relaxed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {memory.description}
                  </motion.p>
                )}
              </AnimatePresence>
              
              {/* Indicador interactivo */}
              <motion.div
                className="mt-4 text-gray-500/40 text-xs"
                animate={{ opacity: selectedMemory === index ? 0 : 1 }}
              >
                {selectedMemory === index ? "" : "Toca para explorar"}
              </motion.div>
            </motion.button>
          ))}
        </div>
        
        {/* Mensaje final emocional */}
        <motion.p
          className="text-center mt-20 text-gray-400/50 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          Las experiencias que recordamos no son las que vemos, 
          sino las que sentimos.
        </motion.p>
      </div>
    </section>
  );
}
