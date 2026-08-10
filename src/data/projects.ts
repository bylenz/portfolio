import type { Project } from "./types";

// Obtenemos todas las imágenes de los proyectos de forma automática
// Vite/Astro resolverá estas rutas en el build final.
const projectImages = import.meta.glob<{ default: { src: string } }>(
  "/src/assets/projects/*.{png,jpg,jpeg,webp}",
  { eager: true },
);

// Función para extraer imágenes por el prefijo del proyecto (ej: "grana")
// Si no encuentra imágenes locales, usa las de fallback (Unsplash u otras)
const getImages = (prefix: string, fallback: string[] = []): string[] => {
  const images = Object.keys(projectImages)
    // Filtra las que contengan el prefijo (ej: /grana-1.png, /grana-2.png)
    .filter((path) => path.includes(`/${prefix}-`))
    .sort() // Ordena alfabéticamente para mantener el orden 1, 2, 3...
    .map((path) => projectImages[path].default.src);

  return images.length > 0 ? images : fallback;
};

export const projects: Project[] = [
  {
    number: "01",
    status: "Live",
    emoji: "🏥",
    title: "Mentor CEAM",
    subtitle: "Copiloto de aprendizaje médico con GenAI",
    description:
      "Plataforma educativa basada en IA generativa para profesionales de la salud. Copiloto conversacional con RAG sobre literatura clínica, evaluación adaptativa y dashboards de progreso. Backend en Python con APIs REST y frontend en React.",
    highlights: [
      "RAG multimodal sobre papers médicos",
      "Copiloto conversacional con LLMs",
      "Ingeniería de prompts y evaluación de respuestas",
      "Vector store para recuperación eficiente",
      "Evaluación adaptativa con IA",
    ],
    tags: ["Python", "React", "Gemini", "RAG", "Vector DB", "APIs"],
    accentColor: "#FFE135",
    featured: true,
    images: getImages("mentor-ceam", [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    ]),
    url: "https://ceam.edu.pe",
  },
  {
    number: "02",
    status: "Production",
    emoji: "📋",
    title: "Informes Marco",
    subtitle: "Plataforma fullstack de reportes técnicos offline-first",
    description:
      "Monorepo fullstack para gestión de reportes técnicos de campo (IE/IS/AC). PWA offline-first con sincronización de cola, backend hexagonal con APIs REST, contratos compartidos con Zod y generación de PDFs en cliente y servidor.",
    highlights: [
      "PWA offline-first con sync queue",
      "Arquitectura hexagonal en backend",
      "Contratos compartidos TypeScript + Zod",
      "Generación de PDFs cliente/servidor",
      "CI/CD con lint, typecheck y tests",
    ],
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "PWA"],
    accentColor: "#CAFF33",
    images: getImages("informes-marco", [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ]),
    isPrivate: true,
  },
  {
    number: "03",
    status: "Production",
    emoji: "☕",
    title: "Grana",
    subtitle: "Sistema ERP para exportadora de café",
    description:
      "ERP web completo para gestión de exportaciones de café. Módulos de inventario, órdenes, clientes, facturación, reportes y seguimiento de embarques internacionales.",
    highlights: [
      "Gestión de inventario en tiempo real",
      "Módulo de exportaciones",
      "Reportes automatizados",
      "Módulo de trader",
      "Trazabilidad de lotes",
      "Generación de documentos",
      "Insights para gerencia con IA"
    ],
    tags: ["React", "NestJS", "PostgreSQL", "JWT", "Chakra UI"],
    accentColor: "#FF5733",
    images: getImages("grana", [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    ]),
    isPrivate: true,
  },
];
