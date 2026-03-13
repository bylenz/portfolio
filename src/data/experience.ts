import type { Experience, LearningItem } from './types';

export const experiences: Experience[] = [
  {
    period: '2026 — Present',
    role: 'AI Engineer Freelance',
    company: 'Independent & Consulting Agency Co-Founder',
    type: 'Freelance',
    color: '#FF5733',
    description:
      'Desarrollo de soluciones de IA para clientes: chatbots empresariales, plataformas con LLMs, automatizaciones con n8n y agentes IA.',
    achievements: [
      'Entregué 10+ proyectos con IA integrada',
      'Reduje tiempo de desarrollo 60% con AI-augmented workflow',
      'Construí plataforma médica de 0 a producción en 3 meses',
      'ERP para exportadora de café en producción'
    ],
  },
  {
    period: '2025 — 2026',
    role: 'Full-Stack Developer Junior',
    company: 'SINTAD',
    type: 'Contract',
    color: '#3B82F6',
    description:
      'Desarrollo de interfaces React/Next.js, landings de alto impacto y ERPs web. Primer contacto serio con automatización e IA aplicada.',
    achievements: [
      'Project Management System con Next.js',
      '5+ landing pages con Lighthouse 90+',
      'Primer chatbot con LangChain',
    ],
  },
  {
    period: '2024 — 2025',
    role: 'Data Analyst Intern',
    company: 'EY',
    type: 'Contract',
    color: '#ede727ff',
    description:
      'Análisis de datos y reportes financieros para clientes. Chatbots empresariales con LLMs. Aplicaciones web con React/Next.js.',
    achievements: [
      'Chatbot para conocimiento corporativo con modelos de Azure Foundry',
      'Aplicación de presupuestos para proyectos de analítica  ',
      'Aplicación para gestión de proyectos y cargabilidad',
    ],
  },
  {
    period: '2022 — 2026',
    role: 'Bachelor of Computer Science',
    company: 'UTEC',
    type: 'Learning',
    color: '#a855f7',
    description:
      'Estudio de la ciencia de la computación con un enfoque práctico. React, Node.js, Python, bases de datos y los fundamentos que hoy sostienen todo mi trabajo.',
    achievements: [
      '100+ horas de proyectos prácticos',
      'Fundamentos sólidos de CS y algoritmos',
      'Primeros proyectos con APIs de OpenAI',
    ],
  },
];

export const currentlyLearning: LearningItem[] = [
  { label: 'AI Agents avanzados' },
  { label: 'Cloud (AWS/GCP)' },
  { label: 'DevOps & K8s' },
  { label: 'Computer Vision' },
  { label: 'Fine-tuning LLMs' },
];
