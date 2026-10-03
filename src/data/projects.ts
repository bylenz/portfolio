import type { Project } from "./types";
import { localize, type Lang } from "../i18n/ui";

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

// Text fields are { es, en }; images, tags, colors and urls are shared.
const projectsData = [
  {
    number: "01",
    status: { es: "En línea", en: "Live" },
    emoji: "🏥",
    title: "Mentor CEAM",
    subtitle: {
      es: "Copiloto de aprendizaje médico con GenAI",
      en: "GenAI learning copilot for medical professionals",
    },
    description: {
      es: "Plataforma educativa basada en IA generativa para profesionales de la salud. Copiloto conversacional con RAG sobre literatura clínica, evaluación adaptativa y dashboards de progreso. Backend en Python con APIs REST y frontend en React.",
      en: "Generative AI learning platform for healthcare professionals. A conversational copilot with RAG over clinical literature, adaptive assessment and progress dashboards. Python REST APIs on the backend, React on the frontend.",
    },
    highlights: {
      es: [
        "RAG multimodal sobre papers médicos",
        "Copiloto conversacional con LLMs",
        "Prompt engineering y evaluación de respuestas",
        "Vector store para recuperación eficiente",
        "Evaluación adaptativa con IA",
      ],
      en: [
        "Multimodal RAG over medical papers",
        "Conversational copilot powered by LLMs",
        "Prompt engineering and response evaluation",
        "Vector store for efficient retrieval",
        "AI-driven adaptive assessment",
      ],
    },
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
    status: { es: "En producción", en: "In production" },
    emoji: "📋",
    title: "Informes Marco",
    subtitle: {
      es: "Plataforma full-stack de reportes técnicos offline-first",
      en: "Offline-first full-stack platform for technical field reports",
    },
    description: {
      es: "Monorepo full-stack para la gestión de reportes técnicos de campo (IE/IS/AC). PWA offline-first con cola de sincronización, backend con arquitectura hexagonal y APIs REST, contratos compartidos con Zod y generación de PDFs en cliente y servidor.",
      en: "Full-stack monorepo for managing technical field reports (IE/IS/AC). Offline-first PWA with a sync queue, hexagonal backend with REST APIs, shared Zod contracts and PDF generation on both client and server.",
    },
    highlights: {
      es: [
        "PWA offline-first con sync queue",
        "Arquitectura hexagonal en el backend",
        "Contratos compartidos TypeScript + Zod",
        "Generación de PDFs en cliente y servidor",
        "CI/CD con lint, typecheck y tests",
      ],
      en: [
        "Offline-first PWA with sync queue",
        "Hexagonal architecture on the backend",
        "Shared TypeScript + Zod contracts",
        "Client- and server-side PDF generation",
        "CI/CD with lint, typecheck and tests",
      ],
    },
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "PWA"],
    accentColor: "#CAFF33",
    images: getImages("informes-marco", [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    ]),
    isPrivate: true,
  },
  {
    number: "03",
    status: { es: "En producción", en: "In production" },
    emoji: "☕",
    title: "Grana",
    subtitle: {
      es: "ERP para exportadora de café",
      en: "ERP for a coffee exporter",
    },
    description: {
      es: "ERP web completo para gestionar exportaciones de café: inventario, órdenes, clientes, facturación, reportes y seguimiento de embarques internacionales.",
      en: "Full web ERP for managing coffee exports: inventory, orders, customers, invoicing, reporting and international shipment tracking.",
    },
    highlights: {
      es: [
        "Inventario en tiempo real",
        "Módulo de exportaciones",
        "Reportes automatizados",
        "Módulo de trader",
        "Trazabilidad de lotes",
        "Generación de documentos",
        "Insights con IA para gerencia",
      ],
      en: [
        "Real-time inventory",
        "Exports module",
        "Automated reports",
        "Trader module",
        "Lot traceability",
        "Document generation",
        "AI-powered insights for management",
      ],
    },
    tags: ["React", "NestJS", "PostgreSQL", "JWT", "Chakra UI"],
    accentColor: "#FF5733",
    images: getImages("grana", [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    ]),
    isPrivate: true,
  },
];

export const projectCount = projectsData.length;

export function getProjects(lang: Lang): Project[] {
  return projectsData.map((p) => ({
    ...p,
    status: localize(p.status, lang),
    subtitle: localize(p.subtitle, lang),
    description: localize(p.description, lang),
    highlights: localize(p.highlights, lang),
  }));
}
