import {
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiFastapi,
  SiLangchain,
  SiPython,
  SiTypescript,
  SiN8N,
} from "react-icons/si";
import type { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  nestjs: SiNestjs,
  fastapi: SiFastapi,
  langchain: SiLangchain,
  python: SiPython,
  typescript: SiTypescript,
  n8n: SiN8N,
};

interface Props {
  name: string;
  size?: number;
}

export default function TechIcon({ name, size = 22 }: Props) {
  const Icon = iconMap[name];
  if (!Icon) return <span style={{ fontSize: size }}>?</span>;
  return <Icon size={size} />;
}
