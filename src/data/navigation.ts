import type {
  HeroStat,
  NavLink,
  SocialLink,
  SoftSkill,
  TechCard,
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
    href: "#contact",
    icon: "📧",
    value: "Enviar mensaje",
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

export const heroStats: HeroStat[] = [
  { value: "10+", label: "Proyectos" },
  { value: "5+", label: "Tech Stacks" },
  { value: "AI", label: "Focused" },
];

export const techCards: TechCard[] = [
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
  { icon: "n8n", label: "n8n", category: "Automation", color: "var(--coral)" },
  {
    icon: "typescript",
    label: "TypeScript",
    category: "Language",
    color: "var(--blue)",
  },
  {
    icon: "python",
    label: "Python",
    category: "Language",
    color: "var(--yellow)",
  },
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
