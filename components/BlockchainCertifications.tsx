'use client'

import { motion } from 'framer-motion'
import { Shield, QrCode, Trophy, Linkedin, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

export default function BlockchainCertifications() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-orange-900/10 to-black/50" />
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 mb-6">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-yellow-400 font-semibold">Tecnología Exclusiva</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Certificados Inmutables
            </span>
            <br />
            <span className="text-3xl md:text-4xl font-light text-gray-300">
              Verificados en Blockchain
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            La primera plataforma de certificaciones profesionales verificadas en blockchain. Tus
            credenciales ahora son permanentes, transferibles e imposibles de falsificar. El
            estándar de confianza del futuro consulting.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: Shield,
              title: 'Blockchain Inmutable',
              description:
                'Una vez en blockchain, nadie puede modificar ni eliminar tu certificado. Permanente como tu experiencia.',
              gradient: 'from-blue-500 to-purple-500',
            },
            {
              icon: QrCode,
              title: 'Verificación Global',
              description:
                'Cualquier empresa en cualquier país puede verificar tu certificado instantáneamente con un simple QR code.',
              gradient: 'from-green-500 to-teal-500',
            },
            {
              icon: Trophy,
              title: 'Activo Digital',
              description:
                'Tu certificado es un NFT que puedes vender, transferir o usar como collateral. Se aprecia con el tiempo.',
              gradient: 'from-yellow-500 to-orange-500',
            },
            {
              icon: Linkedin,
              title: 'Badge LinkedIn',
              description:
                'Badge verificado oficial que distingue tu perfil. Imposible de copiar, solo para certificados blockchain reales.',
              gradient: 'from-purple-500 to-pink-500',
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon size={32} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-3xl p-8 md:p-12 mb-16 border border-yellow-400/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-white">
                Tu experiencia profesional finalmente vale lo que realmente vale
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Transformá tus credenciales profesionales en activos digitales inmutables.
                Verificación global instantánea, imposibles de falsificar, y que se revalorizan con
                el tiempo.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  '🔒 Seguridad: Blockchain inmutable',
                  '💎 Valor: Activo digital transferible',
                  '🌍 Confianza: Verificación global instantánea',
                  '📈 ROI: +200% valor profesional y +30% salario',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="bg-black/50 rounded-2xl p-8 border border-yellow-400/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <QrCode size={120} className="text-yellow-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-400">Escanea para verificar</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estado:</span>
                    <span className="text-green-400 font-bold">VERIFICADO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Blockchain:</span>
                    <span className="text-yellow-400 font-bold">ETHEREUM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ID:</span>
                    <span className="text-white font-mono text-sm">0x7f9a...3b2d</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full border border-orange-400/30 mb-6">
            <Trophy size={16} className="text-orange-400" />
            <span className="text-orange-400 font-semibold">Founding Members Program</span>
          </div>

          <h3 className="text-3xl font-bold mb-4 text-white">
            Sé parte de los primeros 100 profesionales en Latinoamérica
          </h3>

          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Status exclusivo, beneficios permanentes y co-creación del estándar. Solo 37 cupos
            disponibles para acceso fundador con 75% descuento.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Precio fundador</div>
              <div className="text-2xl font-bold text-white">$497</div>
              <div className="text-sm line-through text-gray-500">$1,997</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Cupos restantes</div>
              <div className="text-2xl font-bold text-orange-400">37/100</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-1">Valor estimado</div>
              <div className="text-2xl font-bold text-green-400">$8,000+</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-lg font-bold hover:from-yellow-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔥 Reservar Certificado Blockchain - 75% OFF
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              className="px-8 py-4 border border-yellow-400 text-yellow-400 rounded-lg font-semibold hover:bg-yellow-400 hover:text-black transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔍 Ver Demo de Verificación
            </motion.button>
          </div>
        </motion.div>

        {/* Social Proof Preview */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Trophy key={i} size={24} className="text-yellow-400" />
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">
              Lo que dicen los primeros usuarios
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="bg-black/50 rounded-2xl p-6 border-l-4 border-yellow-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300 mb-4 leading-relaxed">
                "Mi certificado blockchain me consiguió un 30% más de salario. El HR escaneó el QR y
                dijo 'nunca había visto algo tan seguro'."
              </p>
              <div className="text-yellow-400 font-semibold">- Carlos M., CTO</div>
            </motion.div>

            <motion.div
              className="bg-black/50 rounded-2xl p-6 border-l-4 border-yellow-400"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-300 mb-4 leading-relaxed">
                "Finalmente mi experiencia de 15 años vale lo que realmente vale. Nadie puede dudar
                de mis credenciales ahora."
              </p>
              <div className="text-yellow-400 font-semibold">- Ana S., Agile Coach</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
