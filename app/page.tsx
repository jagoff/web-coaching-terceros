import HeroServer from "@/components/sections/HeroServer";
import {
  About,
  Services,
  Process,
  Results,
  Pricing,
  FAQ,
  Contact,
  ForWho,
  Clients,
} from "@/components/PageSections";
import Testimonials from "@/components/sections/TestimonialsSimple";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";
import { Metadata } from "next";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
  description: "Coaching y consultoría organizacional para líderes tech y startups. Acompañamos a construir equipos que funcionen, procesos que escalen y culturas donde la gente quiera quedarse.",
  keywords: ["coaching", "consultoría", "liderazgo", "tech", "startups", "organizacional", "equipos", "procesos", "cultura"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description: "Coaching y consultoría organizacional para líderes tech y startups",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
    description: "Coaching y consultoría organizacional para líderes tech y startups",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com",
    languages: {
      'es': 'https://eleva-consultoria.com',
      'en': 'https://eleva-consultoria.com/en',
    },
  },
};

export default function Home() {
  return (
    <>
      <JsonLdStructuredData type="LocalBusiness" pathname="/" />
      <JsonLdStructuredData type="Person" pathname="/" />
      <JsonLdStructuredData
        type="WebPage"
        data={{
          title: "ELEVA CONSULTORIA | Coaching & Consultoría Organizacional",
          description: "Coaching y consultoría organizacional para líderes tech y startups. Fernando Ferrari — A-CSM, A-CSPO, 20+ años en tecnología, 50+ equipos transformados.",
          breadcrumb: "Inicio"
        }}
        pathname="/"
      />
      <JsonLdStructuredData
        type="FAQPage"
        data={{
          questions: [
            {
              question: "¿Para quién es este servicio de coaching y consultoría?",
              answer: "Para líderes tech, founders de startups, CTOs y managers que sienten que su equipo podría rendir más, que las decisiones se estancan o que la cultura no escala al mismo ritmo que el negocio."
            },
            {
              question: "¿La sesión de diagnóstico tiene algún costo?",
              answer: "No. La primera sesión de 30 minutos es completamente gratuita y sin compromiso. Sirve para entender tu situación, definir objetivos y ver si tiene sentido trabajar juntos."
            },
            {
              question: "¿Qué diferencia hay entre coaching y consultoría?",
              answer: "El coaching acompaña a la persona a encontrar sus propias respuestas y desarrollar habilidades de liderazgo. La consultoría aporta frameworks, procesos y estrategias concretas. El enfoque de ELEVA combina ambos según lo que necesites."
            },
            {
              question: "¿Cuánto tiempo dura un proceso típico de coaching organizacional?",
              answer: "Un proceso de coaching individual suele durar entre 8 y 12 sesiones (2-3 meses). La consultoría organizacional varía según la complejidad, pero los primeros resultados se ven en las primeras 4-6 semanas y la transformación completa lleva 12 semanas."
            },
            {
              question: "¿Qué resultados concretos se pueden esperar en 3 meses?",
              answer: "Semanas 1-4: evaluación completa y diseño de framework. Semanas 5-8: primer ciclo de implementación con métricas base. Semanas 9-12: escalamiento y validación de ROI. Resultados típicos: 30% reducción en latencia de decisiones y 50% aumento en iniciativas del equipo."
            },
            {
              question: "¿Cuál es el ROI esperado de un programa de coaching organizacional?",
              answer: "El promedio histórico es 3x la inversión en 6 meses. Métricas validadas con 50+ equipos: reducción de reuniones 60%, velocidad de despliegue +200%, rotación de empleados -45%, satisfacción del equipo +40%."
            },
            {
              question: "¿Qué certificaciones y experiencia tiene Fernando Ferrari?",
              answer: "Fernando Ferrari tiene 20+ años en liderazgo tecnológico, es Advanced Certified ScrumMaster (A-CSM) y Advanced Certified Scrum Product Owner (A-CSPO) por Scrum Alliance, Facilitador certificado de Management 3.0, co-fundador de Nodok.AI, y lleva 11 años como consultor ágil independiente con experiencia en empresas de 4 a 2500+ personas."
            },
            {
              question: "¿Qué frameworks de trabajo se implementan?",
              answer: "OKRs (Objectives and Key Results), Scrum, Kanban, Team Topologies, Sociocracy 3.0, Management 3.0, matrices de decisiones RACI/DACI, dashboards de KPIs personalizados y herramientas de automatización de procesos."
            }
          ]
        }}
        pathname="/"
      />
      <main>
        <HeroServer pathname="/" />
        {/* <Clients />
        <ForWho />
        <Services />
        <About />
        <Process />
        <Results />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <WhatsAppButton /> */}
      </main>
    </>
  );
}
