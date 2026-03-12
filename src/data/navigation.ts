import type {
  HeroStat,
  MarqueeItem,
  NavLink,
  SocialLink,
  SoftSkill,
} from "./types";

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "XP", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    icon: "📧",
    value: "hello@example.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: "💼",
    value: "/in/yourname",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: "🐙",
    value: "/yourhandle",
  },
];

export const heroStats: HeroStat[] = [
  { value: "10+", label: "Proyectos" },
  { value: "5+", label: "Tech Stacks" },
  { value: "AI", label: "Focused" },
];

export const marqueeItems: MarqueeItem[] = [
  { label: "React" },
  { label: "Next.js" },
  { label: "NestJS" },
  { label: "FastAPI" },
  { label: "LangChain" },
  { label: "LangGraph" },
  { label: "LlamaIndex" },
  { label: "PydanticAI" },
  { label: "n8n" },
  { label: "TypeScript" },
  { label: "Python" },
];

export const softSkills: SoftSkill[] = [
  { icon: "🧠", label: "Pensamiento sistémico" },
  { icon: "🔍", label: "Problem solving" },
  { icon: "🚀", label: "Aprendizaje rápido" },
  { icon: "🤝", label: "Comunicación técnica" },
  { icon: "🎯", label: "Orientado a resultados" },
  { icon: "🔄", label: "Adaptabilidad" },
];

export const footerData = {
  logo: "LENZ_DEV",
  tagline: "Construyendo el futuro,\nun agente a la vez.",
  copyright: "©2025",
  builtWith: "Built with Astro + React",
} as const;
