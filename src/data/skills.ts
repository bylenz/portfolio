import type { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
  {
    icon: '🎨',
    label: 'Frontend',
    color: '#FFE135',
    skills: [
      {
        name: 'React',
        note: 'Componentes, hooks, state management',
        percentage: 85,
      },
      {
        name: 'Next.js',
        note: 'SSR, SSG, App Router',
        percentage: 80,
      },
      {
        name: 'TypeScript',
        note: 'Tipado fuerte, interfaces',
        percentage: 78,
      },
      {
        name: 'Astro',
        note: 'Static sites, islands',
        percentage: 70,
      },
      {
        name: 'Tailwind CSS',
        note: 'Utility-first styling',
        percentage: 82,
      },
    ],
  },
  {
    icon: '⚙️',
    label: 'Backend',
    color: '#CAFF33',
    skills: [
      {
        name: 'FastAPI',
        note: 'Python, async, REST/WebSockets',
        percentage: 82,
      },
      {
        name: 'NestJS',
        note: 'Modules, guards, interceptors',
        percentage: 75,
      },
      {
        name: 'Python',
        note: 'Core language para AI',
        percentage: 85,
      },
      {
        name: 'Node.js',
        note: 'Event-driven, streams',
        percentage: 72,
      },
      {
        name: 'PostgreSQL',
        note: 'Queries, relaciones, indexes',
        percentage: 70,
      },
    ],
  },
  {
    icon: '🤖',
    label: 'AI / LLMs',
    color: '#FF5733',
    skills: [
      {
        name: 'LangChain',
        note: 'Chains, agents, RAG',
        percentage: 85,
      },
      {
        name: 'LangGraph',
        note: 'Flujos stateful, multi-agent',
        percentage: 80,
      },
      {
        name: 'LlamaIndex',
        note: 'Data ingestion, indexing',
        percentage: 75,
      },
      {
        name: 'PydanticAI',
        note: 'Structured outputs',
        percentage: 72,
      },
      {
        name: 'Prompt Engineering',
        note: 'Técnicas avanzadas',
        percentage: 90,
      },
    ],
  },
  {
    icon: '⚡',
    label: 'Automation',
    color: '#a855f7',
    skills: [
      {
        name: 'n8n',
        note: 'Workflows, integraciones',
        percentage: 80,
      },
      {
        name: 'AI Agents',
        note: 'Tool use, memory, planning',
        percentage: 82,
      },
      {
        name: 'API Integration',
        note: 'REST, webhooks',
        percentage: 85,
      },
      {
        name: 'Docker',
        note: 'Containers, compose',
        percentage: 68,
      },
      {
        name: 'Git/GitHub',
        note: 'Version control, CI/CD',
        percentage: 80,
      },
    ],
  },
];

export const toolsBelt: string[] = [
  'Cursor IDE',
  'VS Code',
  'Claude AI',
  'GPT-4o',
  'Vercel',
  'GitHub',
  'Supabase',
  'PlanetScale',
  'Redis',
  'Cloudflare',
  'Figma',
  'Postman',
  'Docker',
  'Linux',
];
