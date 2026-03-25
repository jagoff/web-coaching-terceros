import { Metadata } from "next";
import MadurezEmpresarial from "./MadurezEmpresarial";

export const metadata: Metadata = {
  title: "Test de Madurez Empresarial | ELEVA CONSULTING",
  description:
    "Evalúa el nivel de madurez organizacional de tu empresa. Descubre áreas de mejora y obtén recomendaciones personalizadas para escalar tus operaciones y liderazgo.",
  keywords:
    "test madurez empresarial, diagnóstico organizacional, evaluación liderazgo, madurez agile, consultoría organizacional, escalar startup",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
}

export default MadurezEmpresarial;
