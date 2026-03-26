import { Metadata } from "next";
import MadurezEmpresarialClient from "./MadurezEmpresarialClient";

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: "Test de Madurez Empresarial | ELEVA CONSULTORIA",
  description:
    "Evalúa el nivel de madurez organizacional de tu empresa. Descubre áreas de mejora y obtén recomendaciones personalizadas para escalar tus operaciones y liderazgo.",
  keywords:
    "test madurez empresarial, diagnóstico organizacional, evaluación liderazgo, madurez agile, consultoría organizacional, escalar startup",
  alternates: {
    canonical: "https://eleva-consultoria.com/madurez-empresarial",
    languages: {
      'es': 'https://eleva-consultoria.com/madurez-empresarial',
      'en': 'https://eleva-consultoria.com/en/business-maturity',
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
}

export default function MadurezEmpresarial() {
  return <MadurezEmpresarialClient />;
}
