import type {
  FooterData,
  HeroStat,
  NavLink,
  SocialLink,
  SoftSkill,
  TechCard,
} from "./types";
import { localize, type Lang } from "../i18n/ui";
import { projectCount } from "./projects";

const navLinksData = [
  { label: { es: "Sobre mí", en: "About" }, href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: { es: "Proyectos", en: "Projects" }, href: "#projects" },
  { label: { es: "Experiencia", en: "Experience" }, href: "#experience" },
  { label: { es: "Contacto", en: "Contact" }, href: "#contact" },
];

const socialLinksData = [
  {
    label: "Email",
    href: "#contact",
    icon: "📧",
    value: { es: "Enviar mensaje", en: "Send a message" },
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lenin-chavez-zapata",
    icon: "💼",
    value: "/in/lenin-chavez-zapata",
  },
  {
    label: "GitHub",
    href: "https://github.com/bylenz",
    icon: "🐙",
    value: "/bylenz",
  },
];

const techCardsData = [
  { icon: "react", label: "React", category: "Frontend", color: "var(--blue)" },
  {
    icon: "nextjs",
    label: "Next.js",
    category: "Frontend",
    color: "var(--black)",
  },
  {
    icon: "nestjs",
    label: "NestJS",
    category: "Backend",
    color: "var(--coral)",
  },
  {
    icon: "fastapi",
    label: "FastAPI",
    category: "Backend",
    color: "var(--lime)",
  },
  {
    icon: "langchain",
    label: "LangChain",
    category: "AI / ML",
    color: "var(--yellow)",
  },
  {
    icon: "n8n",
    label: "n8n",
    category: { es: "Automatización", en: "Automation" },
    color: "var(--coral)",
  },
  {
    icon: "typescript",
    label: "TypeScript",
    category: { es: "Lenguaje", en: "Language" },
    color: "var(--blue)",
  },
  {
    icon: "python",
    label: "Python",
    category: { es: "Lenguaje", en: "Language" },
    color: "var(--yellow)",
  },
];

// Counts are derived from the data so the hero never overstates them
const heroStatsData = [
  {
    value: String(projectCount),
    label: { es: "Proyectos en producción", en: "Projects in production" },
  },
  {
    value: String(techCardsData.length),
    label: { es: "Tecnologías core", en: "Core technologies" },
  },
  { value: "AI", label: { es: "Enfoque", en: "Focused" } },
];

const softSkillsData = [
  {
    icon: "🧠",
    label: { es: "Pensamiento sistémico", en: "Systems thinking" },
  },
  {
    icon: "🔍",
    label: { es: "Resolución de problemas", en: "Problem solving" },
  },
  { icon: "🚀", label: { es: "Aprendizaje rápido", en: "Fast learner" } },
  {
    icon: "🤝",
    label: { es: "Comunicación técnica", en: "Technical communication" },
  },
  { icon: "🎯", label: { es: "Orientado a resultados", en: "Results-driven" } },
  { icon: "🔄", label: { es: "Adaptabilidad", en: "Adaptability" } },
];

export function getNavLinks(lang: Lang): NavLink[] {
  return navLinksData.map((link) => ({
    ...link,
    label: localize(link.label, lang),
  }));
}

export function getSocialLinks(lang: Lang): SocialLink[] {
  return socialLinksData.map((link) => ({
    ...link,
    value: localize(link.value, lang),
  }));
}

export function getHeroStats(lang: Lang): HeroStat[] {
  return heroStatsData.map((stat) => ({
    ...stat,
    label: localize(stat.label, lang),
  }));
}

export function getTechCards(lang: Lang): TechCard[] {
  return techCardsData.map((card) => ({
    ...card,
    category: localize(card.category, lang),
  }));
}

export function getSoftSkills(lang: Lang): SoftSkill[] {
  return softSkillsData.map((skill) => ({
    ...skill,
    label: localize(skill.label, lang),
  }));
}

export function getFooterData(lang: Lang): FooterData {
  return {
    logo: "LENZ_DEV",
    tagline: localize(
      {
        es: "Construyendo el futuro,\nun agente a la vez.",
        en: "Building the future,\none agent at a time.",
      },
      lang,
    ),
    copyright: `©${new Date().getFullYear()}`,
    builtWith: localize(
      { es: "Hecho con Astro + React", en: "Built with Astro + React" },
      lang,
    ),
  };
}
