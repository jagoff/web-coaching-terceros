"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle2, ArrowRight, MessageCircle, ChevronRight } from "lucide-react";
import { scrollToElement } from "@/lib/scroll";
import { headerStagger, blurUp, dividerGrow } from "@/lib/animations";
import { useLanguage } from "@/contexts/LanguageContext";

const planCard: Variants = {
  hidden: { opacity: 0, y: 50, rotateX: 6, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.25 + i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const featureStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } },
};

const featureItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};


export default function Pricing() {
  const { t, language } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  // Handle scroll to update current plan index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.firstChild ? (container.firstChild as HTMLElement).offsetWidth : 0;
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentPlanIndex(Math.max(0, Math.min(index, 2))); // 3 plans total
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = (href: string) => scrollToElement(href);

  const plans = [
    {
      id: "individual",
      name: t.pricing.plans.liderazgo.name,
      description: t.pricing.plans.liderazgo.description,
      features: t.pricing.plans.liderazgo.features,
      cta: t.pricing.consultPlan,
      featured: false,
      badge: null,
    },
    {
      id: "transformacion",
      name: t.pricing.plans.organizacional.name,
      description: t.pricing.plans.organizacional.description,
      features: t.pricing.plans.organizacional.features,
      cta: t.pricing.consultPlan,
      featured: true,
      badge: t.pricing.mostPopular,
    },
    {
      id: "elite",
      name: t.pricing.plans.personalizado.name,
      description: t.pricing.plans.personalizado.description,
      features: t.pricing.plans.personalizado.features,
      cta: t.pricing.consultPlan,
      featured: false,
      badge: null,
    },
  ];

  return (
    <section id="precios" className="section section-surface section-gold-border-top" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={headerStagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div variants={blurUp} className="flex justify-center mb-6">
            <span className="badge">{t.pricing.badge}</span>
          </motion.div>
          <motion.h2
            variants={blurUp}
            className="heading-xl mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t.pricing.title}{" "}
            <span className="text-gradient">{t.pricing.title2}</span>
          </motion.h2>
          <motion.p
            variants={blurUp}
            className="text-sm text-center mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            {t.pricing.subtitle}
          </motion.p>
          <motion.div
            variants={dividerGrow}
            className="divider-gold mt-6"
          />
        </motion.div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-6">
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 0.5
            }}
            className="flex items-center gap-1"
          >
            <ChevronRight 
              size={16} 
              className="text-gradient"
              style={{ color: "var(--gold-primary)" }}
            />
            <ChevronRight 
              size={16} 
              className="text-gradient opacity-60"
              style={{ color: "var(--gold-primary)" }}
            />
            <ChevronRight 
              size={16} 
              className="text-gradient opacity-30"
              style={{ color: "var(--gold-primary)" }}
            />
          </motion.div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {language === "es" ? "deslizá" : "swipe"}
          </span>
        </div>

        {/* Cards — horizontal scroll on mobile, 3-col grid on desktop */}
        <div
          ref={scrollContainerRef}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-10 lg:gap-12 md:items-stretch mt-6 md:mt-16 overflow-x-auto md:overflow-visible snap-x md:snap-none snap-mandatory pb-4 md:pb-0 px-4 md:px-0"
          style={{ 
            scrollbarWidth: "none", 
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth"
          } as React.CSSProperties}
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              variants={planCard}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={`pricing-card flex flex-col relative flex-none md:flex-initial snap-center snap-always${plan.featured ? " featured animated-border" : ""}`}
              style={{ 
                perspective: "800px", 
                width: "calc(100vw - 3rem)", 
                minWidth: "calc(100vw - 3rem)",
                maxWidth: "400px",
                marginRight: i < plans.length - 1 ? "1rem" : "0"
              } as React.CSSProperties}
              whileHover={{ y: -8, boxShadow: plan.featured ? "0 0 60px rgba(124,107,196,0.2), 0 16px 48px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Badge row — fixed height keeps all cards aligned */}
              <div className="flex justify-center mb-4" style={{ minHeight: "1.75rem", transform: "translateY(-15px)" }}>
                {plan.badge && (
                  <span className="badge text-xs px-3 py-1" style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.3)" }} aria-label="Plan más popular">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Plan name */}
              <p
                className="font-bold uppercase tracking-widest mb-5"
                style={{ 
                  letterSpacing: "0.15em"
                }}
              >
                <span 
                  className="text-gradient"
                  style={{
                    fontSize: "1.125rem"
                  }}
                >{plan.name}</span>
              </p>

              {/* Description */}
              <p
                className="text-sm pb-8 mb-8"
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <motion.ul
                variants={featureStagger}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="space-y-4 mb-8 flex-1"
              >
                {plan.features.map((feature) => (
                  <motion.li key={feature} variants={featureItem} className="pricing-feature">
                    <CheckCircle2 className="pricing-check" size={16} />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>

              {/* CTA */}
              <div className="flex justify-center">
                <button
                  className="inline-flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 text-sm font-semibold uppercase tracking-widest transition-all"
                  style={{ 
                    background: "linear-gradient(135deg, #FF8C42 0%, #FF6B35 50%, #FFA500 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "0.1em"
                  }}
                  onClick={() => handleScroll("#contacto")}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                >
                  {plan.cta}
                  <ArrowRight size={16} style={{ color: "#FF6B35" }} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile dots indicator */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-4">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current;
                if (container) {
                  const cardWidth = container.firstChild ? (container.firstChild as HTMLElement).offsetWidth : 0;
                  container.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className="transition-all duration-300"
              style={{
                width: currentPlanIndex === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: currentPlanIndex === index 
                  ? 'linear-gradient(135deg, #C87B5A 0%, #7C6BC4 50%, #FF6B35 100%)'
                  : 'rgba(124,107,196,0.3)',
                border: 'none',
                cursor: 'pointer'
              }}
              aria-label={`Go to plan ${index + 1}`}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div className="text-center">
            <p className="text-base mb-2 text-center mx-auto" style={{ color: "var(--text-secondary)", lineHeight: "1.8" }}>
              {t.pricing.doubt}
            </p>
            <button
              className="underline transition-colors bg-transparent border-0 cursor-pointer p-0 text-base"
              style={{ color: "var(--gold-primary)" }}
              onClick={() => {
                const target = document.querySelector("#contacto");
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t.pricing.contactText}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
