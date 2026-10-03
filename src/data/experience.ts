import type { Experience, LearningItem } from "./types";
import { localize, type Lang } from "../i18n/ui";

// Text fields are { es, en }; job titles and colors are shared.
const experiencesData = [
  {
    period: { es: "2026 — Actualidad", en: "2026 — Present" },
    role: "AI Engineer Freelance",
    company: {
      es: "Independiente · Cofundador de agencia de consultoría",
      en: "Independent · Consulting Agency Co-Founder",
    },
    type: "Freelance",
    color: "#FF5733",
    description: {
      es: "Desarrollo soluciones de IA para clientes: chatbots empresariales, plataformas con LLMs, automatizaciones con n8n y agentes de IA.",
      en: "Building AI solutions for clients: enterprise chatbots, LLM-powered platforms, n8n automations and AI agents.",
    },
    achievements: {
      es: [
        "Entregué 10+ proyectos con IA integrada",
        "Reduje el tiempo de desarrollo en 60% con un workflow AI-augmented",
        "Llevé una plataforma médica de cero a producción en 3 meses",
        "ERP para exportadora de café en producción",
      ],
      en: [
        "Delivered 10+ projects with built-in AI",
        "Cut development time by 60% with an AI-augmented workflow",
        "Took a medical platform from zero to production in 3 months",
        "Coffee-export ERP running in production",
      ],
    },
  },
  {
    period: "2025 — 2026",
    role: "Full-Stack Developer Junior",
    company: "SINTAD",
    type: { es: "Contrato", en: "Contract" },
    color: "#3B82F6",
    description: {
      es: "Desarrollo de interfaces con React/Next.js, landing pages de alto impacto y ERPs web. Mi primer contacto serio con la automatización y la IA aplicada.",
      en: "Built React/Next.js interfaces, high-impact landing pages and web ERPs. My first serious hands-on work with automation and applied AI.",
    },
    achievements: {
      es: [
        "Sistema de gestión de proyectos con Next.js",
        "5+ landing pages con Lighthouse 90+",
        "Primer chatbot con LangChain",
      ],
      en: [
        "Project management system built with Next.js",
        "5+ landing pages scoring 90+ on Lighthouse",
        "First chatbot built with LangChain",
      ],
    },
  },
  {
    period: "2024 — 2025",
    role: "Data Analyst Intern",
    company: "EY",
    type: { es: "Contrato", en: "Contract" },
    color: "#ede727ff",
    description: {
      es: "Análisis de datos y reportes financieros para clientes. Chatbots empresariales con LLMs y aplicaciones web con React/Next.js.",
      en: "Data analysis and financial reporting for clients. Enterprise LLM chatbots and React/Next.js web apps.",
    },
    achievements: {
      es: [
        "Chatbot de conocimiento corporativo con modelos de Azure Foundry",
        "Aplicación de presupuestos para proyectos de analítica",
        "Aplicación de gestión de proyectos y cargabilidad",
      ],
      en: [
        "Corporate knowledge chatbot using Azure Foundry models",
        "Budgeting app for analytics projects",
        "Project management and staff utilization app",
      ],
    },
  },
  {
    period: "2022 — 2026",
    role: {
      es: "Bachiller en Ciencia de la Computación",
      en: "Bachelor of Computer Science",
    },
    company: "UTEC",
    type: { es: "Formación", en: "Education" },
    color: "#a855f7",
    description: {
      es: "Ciencia de la computación con un enfoque práctico: React, Node.js, Python, bases de datos y los fundamentos que hoy sostienen todo mi trabajo.",
      en: "Computer science with a hands-on focus: React, Node.js, Python, databases and the fundamentals behind everything I build today.",
    },
    achievements: {
      es: [
        "100+ horas de proyectos prácticos",
        "Bases sólidas en ciencias de la computación y algoritmos",
        "Primeros proyectos con APIs de OpenAI",
      ],
      en: [
        "100+ hours of hands-on projects",
        "Solid CS and algorithms fundamentals",
        "First projects with OpenAI APIs",
      ],
    },
  },
];

const currentlyLearningData = [
  { es: "Agentes de IA avanzados", en: "Advanced AI agents" },
  "Cloud (AWS/GCP)",
  { es: "DevOps y K8s", en: "DevOps & K8s" },
  "Computer Vision",
  { es: "Fine-tuning de LLMs", en: "LLM fine-tuning" },
];

export function getExperiences(lang: Lang): Experience[] {
  return experiencesData.map((exp) => ({
    period: localize(exp.period, lang),
    role: localize(exp.role, lang),
    company: localize(exp.company, lang),
    type: localize(exp.type, lang),
    color: exp.color,
    description: localize(exp.description, lang),
    achievements: localize(exp.achievements, lang),
  }));
}

export function getCurrentlyLearning(lang: Lang): LearningItem[] {
  return currentlyLearningData.map((label) => ({
    label: localize(label, lang),
  }));
}
