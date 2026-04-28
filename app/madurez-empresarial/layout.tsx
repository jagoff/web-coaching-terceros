import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test de Madurez Empresarial | ELEVA CONSULTORA",
  description:
    "Descubre el nivel de madurez de tu organización con un test interactivo de 5 preguntas y obtén recomendaciones personalizadas.",
  alternates: {
    canonical: "/madurez-empresarial",
  },
  openGraph: {
    title: "Test de Madurez Empresarial | ELEVA CONSULTORA",
    description:
      "Test interactivo: descubre el nivel de madurez de tu organización en 5 minutos.",
    url: "/madurez-empresarial",
    type: "website",
  },
};

export default function MadurezEmpresarialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
