export interface Project {
  number: string;
  status: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  accentColor: string;
  featured?: boolean;
  links?: { demo?: string; github?: string };
}

export interface Skill {
  name: string;
  note: string;
  percentage: number;
}

export interface SkillCategory {
  icon: string;
  label: string;
  color: string;
  skills: Skill[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  type: string;
  color: string;
  description: string;
  achievements: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface LearningItem {
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
  value: string;
}

export interface SoftSkill {
  icon: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface MarqueeItem {
  label: string;
}

export interface TechCard {
  icon: string;       // identifier key matching TechIcon component
  label: string;
  category: string;
  color: string;      // CSS custom-property value, used as --card-accent
}
