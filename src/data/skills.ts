import type { SkillCategory } from "./types";
import { localize, type Lang } from "../i18n/ui";

// Translated notes/labels are { es, en }; tech names are shared.
const skillCategoriesData = [
  {
    icon: "🎨",
    label: "Frontend",
    color: "#FFE135",
    skills: [
      {
        name: "React",
        note: {
          es: "Componentes, hooks, state management",
          en: "Components, hooks, state management",
        },
        percentage: 85,
      },
      {
        name: "Next.js",
        note: "SSR, SSG, App Router",
        percentage: 80,
      },
      {
        name: "TypeScript",
        note: {
          es: "Tipado fuerte, interfaces",
          en: "Strong typing, interfaces",
        },
        percentage: 78,
      },
      {
        name: "Astro",
        note: { es: "Sitios estáticos, islands", en: "Static sites, islands" },
        percentage: 70,
      },
      {
        name: "Tailwind CSS",
        note: { es: "Estilos utility-first", en: "Utility-first styling" },
        percentage: 82,
      },
    ],
  },
  {
    icon: "⚙️",
    label: "Backend",
    color: "#CAFF33",
    skills: [
      {
        name: "FastAPI",
        note: "Python, async, REST/WebSockets",
        percentage: 82,
      },
      {
        name: "NestJS",
        note: {
          es: "Módulos, guards, interceptors",
          en: "Modules, guards, interceptors",
        },
        percentage: 75,
      },
      {
        name: "Python",
        note: { es: "Lenguaje principal para IA", en: "Core language for AI" },
        percentage: 85,
      },
      {
        name: "Node.js",
        note: "Event-driven, streams",
        percentage: 72,
      },
      {
        name: "PostgreSQL",
        note: {
          es: "Queries, relaciones, índices",
          en: "Queries, relations, indexes",
        },
        percentage: 70,
      },
    ],
  },
  {
    icon: "🤖",
    label: "AI / LLMs",
    color: "#FF5733",
    skills: [
      {
        name: "LangChain",
        note: "Chains, agents, RAG",
        percentage: 85,
      },
      {
        name: "LangGraph",
        note: {
          es: "Flujos stateful, multi-agent",
          en: "Stateful flows, multi-agent",
        },
        percentage: 80,
      },
      {
        name: "LlamaIndex",
        note: {
          es: "Ingesta e indexación de datos",
          en: "Data ingestion, indexing",
        },
        percentage: 75,
      },
      {
        name: "PydanticAI",
        note: "Structured outputs",
        percentage: 72,
      },
      {
        name: "Prompt Engineering",
        note: { es: "Técnicas avanzadas", en: "Advanced techniques" },
        percentage: 90,
      },
    ],
  },
  {
    icon: "⚡",
    label: { es: "Automatización", en: "Automation" },
    color: "#a855f7",
    skills: [
      {
        name: "n8n",
        note: { es: "Workflows, integraciones", en: "Workflows, integrations" },
        percentage: 80,
      },
      {
        name: "AI Agents",
        note: "Tool use, memory, planning",
        percentage: 82,
      },
      {
        name: "API Integration",
        note: "REST, webhooks",
        percentage: 85,
      },
      {
        name: "Docker",
        note: "Containers, compose",
        percentage: 68,
      },
      {
        name: "Git/GitHub",
        note: {
          es: "Control de versiones, CI/CD",
          en: "Version control, CI/CD",
        },
        percentage: 80,
      },
    ],
  },
];

export function getSkillCategories(lang: Lang): SkillCategory[] {
  return skillCategoriesData.map((category) => ({
    ...category,
    label: localize(category.label, lang),
    skills: category.skills.map((skill) => ({
      ...skill,
      note: localize(skill.note, lang),
    })),
  }));
}

export const toolsBelt: string[] = [
  "Opencode",
  "Antigravity",
  "Nvim",
  "GCP",
  "AWS",
  "Terraform",
  "GitHub",
  "Qdrant",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Cloudflare",
  "Figma",
  "Stitch",
  "Postman",
  "Docker",
  "Linux",
];
