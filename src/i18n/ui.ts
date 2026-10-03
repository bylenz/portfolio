export type Lang = "es" | "en";

export const defaultLang: Lang = "es";

export const languages: Record<Lang, string> = {
  es: "Español",
  en: "English",
};

// Home URL for each locale (Spanish is served from the root)
export const homePath: Record<Lang, string> = { es: "/", en: "/en/" };

// A value that is either shared by all locales (tech names, numbers...)
// or translated per locale.
export type Localized<T = string> = T | Record<Lang, T>;

export function localize<T>(value: Localized<T>, lang: Lang): T {
  const isPerLocale =
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    lang in value;
  return isPerLocale ? (value as Record<Lang, T>)[lang] : (value as T);
}

// Strings containing markup are rendered with set:html (static, trusted copy).
const es = {
  meta: {
    title: "Lenin Chavez (Lenz) — AI Engineer | RAG, LLMs, React, FastAPI",
    description:
      "AI Engineer que construye sistemas RAG, agentes con LLMs y aplicaciones full-stack con React, Next.js, FastAPI y LangChain. Proyectos reales en producción.",
    ogImageAlt:
      "Lenin Chavez (Lenz), AI Engineer: sistemas RAG, agentes con LLMs y desarrollo full-stack",
    skipToContent: "Saltar al contenido",
  },
  nav: {
    ariaLabel: "Navegación principal",
    home: "Inicio",
    openMenu: "Abrir menú de navegación",
    closeMenu: "Cerrar menú de navegación",
    mobileMenu: "Menú móvil",
    language: "Idioma",
  },
  hero: {
    status: "Disponible para nuevos proyectos",
    desc: "No soy solo un dev: soy el <strong>arquitecto</strong> que orquesta la IA para construir más rápido, con más criterio y más impacto. React · Next.js · LangChain · LangGraph · FastAPI.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Hablemos",
    statsLabel: "Estadísticas",
    floatArchitect: "Arquitecto",
    techStackLabel: "Tech stack",
  },
  about: {
    tag: "01 — Sobre mí",
    title: "No soy un dev<br />más del montón.",
    approach: "MI ENFOQUE",
    p1: 'Soy <strong>AI Engineer</strong> con un enfoque distinto: domino los fundamentos del desarrollo y construí un flujo de trabajo donde <span class="highlight">la IA es mi copiloto</span>. Yo diseño la solución y defino la arquitectura; la IA me ayuda a escribir y acelerar el código.',
    p2: "El resultado: <strong>entrego proyectos complejos</strong> —plataformas de aprendizaje para médicos, ERPs, chatbots y agentes de IA— con la velocidad y la precisión de alguien con años más de experiencia.",
    pills: [
      "🏗️ Arquitectura de sistemas",
      "🤖 Orquestación de IA",
      "⚡ Entrega rápida",
      "🎯 Resolución de problemas",
    ],
    philosophyTitle: "Mi filosofía",
    philosophy:
      "“El mejor ingeniero no es el que escribe más código, sino el que <strong>diseña mejores sistemas</strong>.”",
    softSkills: "Soft skills",
    bannerTitle: "Desarrollo potenciado por IA",
    bannerText:
      "Uso Opencode, Claude, skills y agentes personalizados como parte central de mi flujo de trabajo: no como sustituto, sino como multiplicador de mi capacidad técnica.",
    bannerBadge: "Rendimiento",
  },
  skills: {
    tag: "02 — Skills",
    title: 'Mi arsenal<br /><span class="accent-coral">técnico.</span>',
    tools: "Herramientas y entorno",
  },
  projects: {
    tag: "03 — Proyectos",
    title:
      'Lo que he<br /><span style="color: var(--coral)">construido.</span>',
    view: "Ver proyecto →",
    ctaText: "¿Tienes un proyecto en mente?",
    ctaButton: "Hablemos →",
  },
  modal: {
    close: "Cerrar",
    windowTitle: "Proyecto",
    prev: "Imagen anterior",
    next: "Imagen siguiente",
    features: "Funcionalidades clave",
    techStack: "Tech stack",
    visit: "Visitar proyecto ↗",
    private: "Proyecto privado",
    imageAlt: "Captura del proyecto",
  },
  experience: {
    tag: "04 — Experiencia",
    title: "Mi camino<br />hasta aquí.",
    cardBadge: "AI Engineer",
    cardExtra: "+ Full-Stack",
    cardTitle: "Lo que me diferencia",
    points: [
      {
        icon: "🏗️",
        title: "Pensamiento de arquitecto",
        text: "Diseño sistemas escalables, no solo features",
      },
      {
        icon: "🤖",
        title: "AI-augmented workflow",
        text: "Entrego con calidad senior apoyado en IA",
      },
      {
        icon: "🚀",
        title: "Proyectos reales en producción",
        text: "No solo side projects: clientes reales",
      },
      {
        icon: "📈",
        title: "Crecimiento acelerado",
        text: "En 1 año avancé lo que a otros les toma 3",
      },
    ],
    learning: "Aprendiendo ahora",
  },
  contact: {
    tag: "05 — Contacto",
    title:
      '¿Tienes un proyecto<br /><span class="contact-accent">potenciado por IA?</span>',
    desc: "Estoy abierto a nuevas oportunidades y proyectos desafiantes. Si necesitas un AI Engineer que piense en sistemas y entregue resultados, hablemos.",
    linksLabel: "Contacto y redes sociales",
  },
  form: {
    header: "ENVIAR MENSAJE",
    nameLabel: "Tu nombre",
    namePlaceholder: "Ana Pérez",
    emailLabel: "Email",
    emailPlaceholder: "ana@empresa.com",
    subjectLabel: "¿De qué se trata?",
    subjects: [
      "Proyecto freelance",
      "Trabajo full-time",
      "Colaboración",
      "Solo saludar",
    ],
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntame sobre tu proyecto...",
    submit: "Enviar mensaje",
    honeypotLabel: "Deja este campo vacío",
    // Used by the client-side script
    client: {
      nameRequired: "El nombre es obligatorio",
      emailRequired: "El email es obligatorio",
      emailInvalid: "El formato del email no es válido",
      subjectRequired: "Selecciona una opción",
      messageRequired: "El mensaje es obligatorio",
      sending: "Enviando...",
      success: "Mensaje enviado. Te responderé pronto.",
      error: "No se pudo enviar el mensaje.",
      network: "Error de conexión. Inténtalo de nuevo.",
    },
  },
  footer: {
    socialLabel: "Redes sociales",
  },
  newTab: "(abre en nueva pestaña)",
};

const en: typeof es = {
  meta: {
    title: "Lenin Chavez (Lenz) — AI Engineer | RAG, LLMs, React & FastAPI",
    description:
      "AI Engineer building RAG systems, LLM agents and full-stack apps with React, Next.js, FastAPI and LangChain. Real projects running in production.",
    ogImageAlt:
      "Lenin Chavez (Lenz), AI Engineer: RAG systems, LLM agents and full-stack development",
    skipToContent: "Skip to content",
  },
  nav: {
    ariaLabel: "Main navigation",
    home: "Home",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mobileMenu: "Mobile menu",
    language: "Language",
  },
  hero: {
    status: "Available for new projects",
    desc: "Not just another dev — I'm the <strong>architect</strong> who orchestrates AI to build faster, smarter and with more impact. React · Next.js · LangChain · LangGraph · FastAPI.",
    ctaProjects: "View projects",
    ctaContact: "Let's talk",
    statsLabel: "Stats",
    floatArchitect: "Architect",
    techStackLabel: "Tech stack",
  },
  about: {
    tag: "01 — About",
    title: "Not your average<br />dev.",
    approach: "MY APPROACH",
    p1: "I'm an <strong>AI Engineer</strong> with a different approach: I know the fundamentals of software development, and I've built a workflow where <span class=\"highlight\">AI is my copilot</span>. I design the solution and define the architecture; AI helps me write and ship the code faster.",
    p2: "The result: <strong>I ship complex projects</strong> — learning platforms for doctors, ERPs, chatbots and AI agents — with the speed and precision of someone with years more experience.",
    pills: [
      "🏗️ Systems architecture",
      "🤖 AI orchestration",
      "⚡ Rapid delivery",
      "🎯 Problem solver",
    ],
    philosophyTitle: "My philosophy",
    philosophy:
      "“The best engineer isn't the one who writes the most code, but the one who <strong>designs better systems</strong>.”",
    softSkills: "Soft skills",
    bannerTitle: "AI-Augmented Engineering",
    bannerText:
      "Opencode, Claude, custom skills and agents are a core part of my workflow — not a replacement for engineering skill, but a multiplier of it.",
    bannerBadge: "Output",
  },
  skills: {
    tag: "02 — Skills",
    title: 'My tech<br /><span class="accent-coral">arsenal.</span>',
    tools: "Tools & environment",
  },
  projects: {
    tag: "03 — Projects",
    title: 'What I\'ve<br /><span style="color: var(--coral)">built.</span>',
    view: "View project →",
    ctaText: "Have a project in mind?",
    ctaButton: "Let's talk →",
  },
  modal: {
    close: "Close",
    windowTitle: "Project",
    prev: "Previous image",
    next: "Next image",
    features: "Key features",
    techStack: "Tech stack",
    visit: "Visit project ↗",
    private: "Private project",
    imageAlt: "Project screenshot",
  },
  experience: {
    tag: "04 — Experience",
    title: "How I<br />got here.",
    cardBadge: "AI Engineer",
    cardExtra: "+ Full-Stack",
    cardTitle: "What sets me apart",
    points: [
      {
        icon: "🏗️",
        title: "Architect mindset",
        text: "I design scalable systems, not just features",
      },
      {
        icon: "🤖",
        title: "AI-augmented workflow",
        text: "Senior-level delivery, powered by AI",
      },
      {
        icon: "🚀",
        title: "Real projects in production",
        text: "Not just side projects — real clients",
      },
      {
        icon: "📈",
        title: "Fast growth",
        text: "In one year I covered what usually takes three",
      },
    ],
    learning: "Currently learning",
  },
  contact: {
    tag: "05 — Contact",
    title:
      'Building something<br /><span class="contact-accent">powered by AI?</span>',
    desc: "I'm open to new opportunities and challenging projects. If you need an AI Engineer who thinks in systems and delivers results, let's talk.",
    linksLabel: "Contact and social links",
  },
  form: {
    header: "SEND A MESSAGE",
    nameLabel: "Your name",
    namePlaceholder: "Jane Doe",
    emailLabel: "Email",
    emailPlaceholder: "jane@company.com",
    subjectLabel: "What's it about?",
    subjects: [
      "Freelance project",
      "Full-time role",
      "Collaboration",
      "Just saying hi",
    ],
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project...",
    submit: "Send message",
    honeypotLabel: "Leave this field empty",
    client: {
      nameRequired: "Name is required",
      emailRequired: "Email is required",
      emailInvalid: "Please enter a valid email",
      subjectRequired: "Please pick an option",
      messageRequired: "Message is required",
      sending: "Sending...",
      success: "Message sent. I'll get back to you soon.",
      error: "Couldn't send the message.",
      network: "Connection error. Please try again.",
    },
  },
  footer: {
    socialLabel: "Social links",
  },
  newTab: "(opens in a new tab)",
};

export const ui: Record<Lang, typeof es> = { es, en };

export function useTranslations(lang: Lang) {
  return ui[lang];
}
