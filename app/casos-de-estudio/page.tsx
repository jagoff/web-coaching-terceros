import { Metadata } from "next";
import CaseStudies from "@/components/sections/CaseStudies";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Casos de Estudio | ELEVA CONSULTORIA",
  description:
    "Transformaciones reales de equipos y organizaciones. Descubrí cómo líderes tech y startups aplicaron nuestra metodología para escalar sus equipos y procesos.",
  keywords:
    "casos de estudio, coaching éxito, consultoría resultados, transformación agile, éxito startups, liderazgo casos reales",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
}

export default CaseStudies;
