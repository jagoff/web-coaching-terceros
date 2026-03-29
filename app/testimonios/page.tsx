import { Metadata } from "next";
import HeroServer from "@/components/sections/HeroServer";
import Testimonials from "@/components/sections/TestimonialsSimple";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Clients from "@/components/sections/Clients";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppBooking from "@/components/WhatsAppBooking";
import JsonLdStructuredData from "@/components/JsonLdStructuredData";

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
  description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching. Líderes tech y startups que han transformado sus equipos y culturas organizacionales.",
  keywords: ["testimonios coaching", "casos de éxito", "coaching liderazgo", "resultados coaching", "clientes satisfechos", "coaching Argentina"],
  authors: [{ name: "Fernando Ferrari" }],
  openGraph: {
    title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
    description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching profesional.",
    type: "website",
    locale: "es_ES",
    url: "https://eleva-consultoria.com/testimonios",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
    description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching profesional.",
  },
  alternates: {
    canonical: "https://eleva-consultoria.com/testimonios",
    languages: {
      'es': 'https://eleva-consultoria.com/testimonios',
      'en': 'https://eleva-consultoria.com/en/testimonials',
    },
  },
};

export default function TestimoniosPage() {
  const testimoniosData = [
    {
      author: "Valentin Rios",
      role: "Software Engineer",
      review: "Lo que más me impactó fue que Fernando no llegó con soluciones pre-armadas. Primero escuchó, observó nuestras reuniones, y recién entonces dijo: 'Veo que el problema no es técnico, es de comunicación'. En dos semanas nuestras daily meetings pasaron de 45 minutos a 15. Los devs empezaron a hablar entre ellos. Fue un cambio evidente.",
      rating: "5",
      date: "2024-01-15"
    },
    {
      author: "George Nicolaou",
      role: "Project Manager",
      review: "En nuestra primera reunión, Fernando me dijo: 'Pará, no me digas lo que querés construir, decime qué problema estás resolviendo'. Nadie me había hecho esa pregunta antes. Empezamos a definir user stories reales, estimar con puntos, y de repente el cliente dejó de cambiar el alcance cada dos días.",
      rating: "5",
      date: "2024-02-20"
    },
    {
      author: "Gabriel Yesuron",
      role: "Software Developer",
      review: "Yo era dev junior y me tocaba hacer tareas sin entender el porqué. Fernando implementó retrospectivas cada dos semanas. La primera fue incómoda, nadie hablaba. Para la tercera, el más silencioso del equipo dijo: '¿Por qué no automatizamos este deploy que nos lleva 4 horas?'. Hoy lo hacemos en 5 minutos.",
      rating: "5",
      date: "2024-03-10"
    }
  ];

  return (
    <>
      {testimoniosData.map((testimonio, index) => (
        <JsonLdStructuredData 
          key={`review-${index}`}
          type="Review" 
          data={testimonio}
          pathname="/testimonios"
        />
      ))}
      <JsonLdStructuredData 
        type="WebPage" 
        data={{ 
          title: "Testimonios | Casos de Éxito | ELEVA CONSULTORIA",
          description: "Descubre los testimonios de clientes y casos de éxito de nuestro coaching.",
          breadcrumb: "Testimonios"
        }} 
        pathname="/testimonios" 
      />
      <main>
        <HeroServer pathname="/testimonios" />
        <Testimonials />
        <Results />
        <CaseStudies />
        <Clients />
        <Contact />
        <Footer />
        <WhatsAppBooking />
      </main>
    </>
  );
}
