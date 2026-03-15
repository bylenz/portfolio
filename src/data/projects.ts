import type { Project } from "./types";

export const projects: Project[] = [
  {
    number: "01",
    status: "Live",
    emoji: "🏥",
    title: "Mentor CEAM",
    subtitle: "Plataforma de aprendizaje para médicos",
    description:
      "Plataforma educativa basada en IA para profesionales de la salud. Sistema de evaluación adaptativa, chatbot médico especializado con RAG sobre literatura clínica y dashboards de progreso.",
    highlights: [
      "RAG sobre papers médicos",
      "Evaluación adaptativa IA",
      "Dashboard de progreso",
      "Simulación de casos clínicos",
    ],
    tags: ["Next.js", "FastAPI", "LlamaIndex", "RAG", "Qdrant"],
    accentColor: "#FFE135",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",

    ],
    url: "https://ceam.edu.pe",
  },
  {
    number: "02",
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
    ],
    tags: ["React", "NestJS", "PostgreSQL", "JWT", "Chakra UI"],
    accentColor: "#CAFF33",
    images: [
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    ],
    isPrivate: true,
  },
  {
    number: "03",
    status: "Open Source",
    emoji: "🤖",
    title: "Multi-Agent System",
    subtitle: "Sistema de agentes IA con LangGraph",
    description:
      "Arquitectura multi-agente con LangGraph para automatización de flujos de trabajo complejos. Agentes especializados con memoria persistente, herramientas de búsqueda y generación de reportes.",
    highlights: [
      "Orquestación multi-agente",
      "Memoria persistente",
      "Tool use avanzado",
    ],
    tags: ["LangGraph", "Python", "FastAPI", "PydanticAI", "Redis"],
    accentColor: "#FF5733",
    images: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    ],
    url: "https://github.com/lenz-dev",
  },
  {
    number: "04",
    status: "Live",
    emoji: "💬",
    title: "AI Chatbot Suite",
    subtitle: "Chatbots personalizados para empresas",
    description:
      "Suite de chatbots empresariales con RAG sobre documentación propia, integración con WhatsApp y Slack, escalado a humano y analytics de conversaciones.",
    highlights: [
      "RAG sobre docs propios",
      "WhatsApp + Slack",
      "Analytics en tiempo real",
    ],
    tags: ["LangChain", "n8n", "FastAPI", "React", "LlamaIndex"],
    accentColor: "#a855f7",
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80",
    ],
    isPrivate: true,
  },
  {
    number: "05",
    status: "Multiple",
    emoji: "🚀",
    title: "Landing Pages",
    subtitle: "Landings de alto impacto con IA",
    description:
      "Diseño y desarrollo de landing pages optimizadas para conversión. Generación de copy con IA, A/B testing integrado, animaciones y performance lighthouse 90+.",
    highlights: ["Lighthouse 90+", "Copy generado con IA", "A/B testing"],
    tags: ["Next.js", "Astro", "Framer", "TypeScript", "Vercel"],
    accentColor: "#3B82F6",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    ],
    url: "https://lenz.dev",
  },
  {
    number: "06",
    status: "For Clients",
    emoji: "⚡",
    title: "N8N Automations",
    subtitle: "Automatizaciones complejas con n8n",
    description:
      "Flujos de automatización empresarial: integración entre CRMs, procesamiento de facturas con OCR + IA, notificaciones inteligentes y pipelines de datos.",
    highlights: [
      "OCR + AI processing",
      "CRM integrations",
      "Pipeline automatizado",
    ],
    tags: ["n8n", "Python", "LLMs", "APIs", "Webhooks"],
    accentColor: "#FFE135",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    ],
    isPrivate: true,
  },
];
