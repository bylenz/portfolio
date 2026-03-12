import type { Experience, LearningItem } from './types';

export const experiences: Experience[] = [
  {
    period: '2024 — Present',
    role: 'AI Engineer Freelance',
    company: 'Independent',
    type: 'Freelance',
    color: '#FFE135',
    description:
      'Desarrollo de soluciones de IA para clientes: chatbots empresariales, plataformas con LLMs, automatizaciones con n8n y agentes IA.',
    achievements: [
      'Entregué 10+ proyectos con IA integrada',
      'Reduje tiempo de desarrollo 60% con AI-augmented workflow',
      'Construí plataforma médica de 0 a producción en 3 meses',
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Frontend Developer',
    company: 'Startups & Proyectos',
    type: 'Contract',
    color: '#CAFF33',
    description:
      'Desarrollo de interfaces React/Next.js, landings de alto impacto y ERPs web. Primer contacto serio con automatización e IA aplicada.',
    achievements: [
      'ERP para exportadora de café en producción',
      '5+ landing pages con Lighthouse 90+',
      'Primer chatbot con LangChain',
    ],
  },
  {
    period: '2022 — 2023',
    role: 'Self-taught Developer',
    company: 'Learning Journey',
    type: 'Learning',
    color: '#a855f7',
    description:
      'Período intensivo de aprendizaje autodidacta. React, Node.js, Python, bases de datos y los fundamentos que hoy sostienen todo mi trabajo.',
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
