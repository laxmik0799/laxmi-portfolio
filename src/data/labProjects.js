/**
 * ─────────────────────────────────────────────────────────────
 *  FRONTEND LAB — standalone frontend / creative builds.
 * ─────────────────────────────────────────────────────────────
 *  Kept separate from `projects.js` (professional work).
 *  Add an object to this array and the Lab section renders it.
 *
 *  status   'in-development' | 'live'
 *           A project only counts as live once `links.live` holds a
 *           verified deployment URL. Until then it shows "In Development"
 *           and no demo button. Never put a placeholder URL in `live`.
 *  category One of LAB_CATEGORIES below (drives the filters).
 *  Other fields match projects.js (cover, screenshots, features, …).
 */

import cosmicVoyageCover from '../assets/images/projects/cosmic-voyage.jpg'
import maisonCover from '../assets/images/projects/maison.jpg'
import novaCover from '../assets/images/projects/nova.jpg'

export const LAB_CATEGORIES = ['Frontend', '3D Experiences', 'Full Stack', 'AI & SaaS', 'Creative Websites']

export const labProjects = [
  {
    id: 'cosmic-voyage',
    title: 'Cosmic Voyage',
    tagline: 'Immersive 3D Solar System',
    description:
      'A cinematic, real-time 3D journey from a spiral galaxy into the Solar System. Fly to any planet with GSAP camera transitions and explore real NASA facts.',
    overview: [
      'Cosmic Voyage starts above a procedural spiral galaxy of ~34,000 particles, then dives into the Solar System along a GSAP-animated camera path. Every planet can be visited: the camera tracks it along its orbit while an info panel reveals real reference data and a to-scale size comparison with Earth.',
      'All planet textures are generated at runtime from seeded 3D noise, so the app ships zero image assets. The Sun uses a custom GLSL shader with bloom, Saturn has textured rings, and Earth has clouds, a moon and a Fresnel atmosphere.',
    ],
    category: '3D Experiences',
    tech: ['React', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'GLSL', 'Tailwind CSS', 'Zustand'],
    icon: 'Orbit',
    accent: ['#ffb347', '#7c6cff'],
    cover: cosmicVoyageCover,
    screenshots: [],
    links: { github: 'https://github.com/laxmik0799/cosmic-voyage', live: 'https://cosmic-voyage-teal.vercel.app/' },
    status: 'live', // deployment verified 15 Nov 2026
    features: [
      'Procedural spiral galaxy and starfield',
      'Shader-animated Sun with corona and bloom',
      'Procedurally textured planets, rings, clouds and atmospheres',
      'GSAP camera transitions that track orbiting planets',
      'Info panels with real facts and size comparisons',
      'Grand tour, speed control, keyboard shortcuts',
      'Mobile bottom-sheet layout and reduced-motion support',
    ],
    challenges: [
      {
        challenge: 'Smooth camera transitions to targets that keep moving along their orbits.',
        solution: 'A GSAP-eased blend between the start pose and a live, per-frame target pose, so the camera lands on the planet wherever it has moved to.',
      },
      {
        challenge: 'Rich planet surfaces without downloading large texture files.',
        solution: 'Seamless equirectangular textures painted at runtime by sampling 3D noise on the sphere, generated behind a progress-reporting loader.',
      },
    ],
    featured: true,
  },
  {
    id: 'luxury-ecommerce',
    title: 'Maison: Luxury E-Commerce',
    tagline: 'Editorial fashion storefront',
    description:
      'An editorial luxury storefront for a fictional fashion house: 45 pieces with URL-synced filters, sorting and search, product galleries, a persistent cart and wishlist, and a multi-step checkout demo.',
    overview: [
      'MAISON is a high-end shopping experience built around editorial design and smooth micro-interactions. The homepage pairs a parallax hero and masked headline reveal with a lookbook, category grid and a scrolling new-arrivals rail.',
      'Every shopping flow works end to end: filters and sorting live in the URL so views are shareable, search updates as you type, the cart and wishlist persist between visits, and a four-step checkout validates Indian addresses before showing a confirmation. The checkout is clearly labelled as a demo and collects no payment details.',
    ],
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'React Router'],
    icon: 'ShoppingBag',
    accent: ['#d4b483', '#8b5cf6'],
    cover: maisonCover,
    screenshots: [],
    links: { github: 'https://github.com/laxmik0799/maison-luxe', live: 'https://maison-luxe-pink.vercel.app/' },
    status: 'live', // deployment verified 15 Nov 2026
    features: [
      'Editorial homepage with parallax, reveals and a lookbook',
      'Filters, five sort orders and live search, all synced to the URL',
      'Product galleries with hover zoom, swipe and a lightbox',
      'Persistent cart drawer, bag page and wishlist',
      'Four-step responsive checkout demo with validation',
      'Accessible dialogs, reduced-motion support and code splitting',
    ],
    challenges: [
      'Keeping filter state in the URL so it survives refresh, back and sharing without extra re-renders',
      'Layering drawers and lightboxes above a sticky header when page transitions create new stacking contexts (solved with portals)',
    ],
    featured: false,
  },
  {
    id: 'ai-saas-dashboard',
    title: 'Nova: AI SaaS Dashboard',
    tagline: 'Analytics console for an LLM API platform',
    description:
      'An analytics console for a fictional LLM API platform: interactive charts, usage filters, request logs with live tail, API keys, billing in INR and a demo assistant that answers from the dashboard data.',
    overview: [
      'Nova Console shows how an organisation uses an AI API: traffic, tokens, spend, latency and errors across five models and five projects, from 24 hours to 90 days. Seeded sample data tells a small story (growth, a product launch and a resolved incident) that the charts and notifications surface.',
      'Every control works: filters live in the URL, usage exports as CSV, logs stream in live, API keys are created and revoked with validation, and budgets drive real alerts. Nova Copilot is a clearly labelled demo assistant that matches about ten question types and computes its answers, charts and savings estimates from the same data as the dashboard.',
    ],
    category: 'AI & SaaS',
    tech: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Framer Motion', 'Zustand'],
    icon: 'LayoutDashboard',
    accent: ['#4f7cff', '#22d3ee'],
    cover: novaCover,
    screenshots: [],
    links: { github: 'https://github.com/laxmik0799/nova-ai-dashboard', live: 'https://nova-ai-dashboard-ochre.vercel.app/' },
    status: 'live', // deployment verified 15 Nov 2026
    features: [
      'KPI cards, stacked traffic, spend donut and latency charts',
      'Usage filters synced to the URL, heatmap and CSV export',
      'Request logs with search, pagination, detail drawer and live tail',
      'API key management and budget alerts, persisted locally',
      'Demo AI assistant with streamed, data-backed answers',
      'Command palette, dark / light / system theme, responsive layout',
    ],
    challenges: [
      'Generating deterministic, realistic sample data anchored to today so every chart, alert and assistant answer agrees',
      'Making Recharts follow the theme by reading CSS variables, and fixing an invisible overlay left behind by a shared layout animation',
    ],
    featured: false,
  },
  {
    id: 'creative-agency',
    title: 'Creative Digital Agency',
    tagline: 'Award-style agency site',
    description:
      'An experimental agency website with bold typography, an interactive cursor, 3D objects, scroll-driven animation, horizontal scrolling and a portfolio gallery.',
    overview: ['An award-style creative agency site exploring experimental layouts and scroll-driven storytelling.'],
    category: 'Creative Websites',
    tech: ['React', 'TypeScript', 'GSAP', 'Three.js', 'Framer Motion'],
    icon: 'Palette',
    accent: ['#ff5c8a', '#8b5cf6'],
    cover: null,
    screenshots: [],
    links: { github: null, live: null },
    status: 'in-development',
    features: ['Experimental layouts and bold type', 'Interactive cursor and 3D objects', 'Scroll-triggered and horizontal scroll sections', 'Interactive portfolio gallery'],
    challenges: [],
    featured: false,
  },
  {
    id: 'dev-playground',
    title: 'Developer Playground',
    tagline: 'Terminal-driven interactive site',
    description:
      'A developer-themed experience with an interactive terminal, animated code editor, technology constellation, coding demos and 3D floating objects.',
    overview: ['A playful, command-driven website that turns developer tools into an interactive experience.'],
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    icon: 'SquareTerminal',
    accent: ['#22d3ee', '#a855f7'],
    cover: null,
    screenshots: [],
    links: { github: null, live: null },
    status: 'in-development',
    features: ['Interactive terminal with commands', 'Animated code editor', 'Technology constellation', '3D floating objects'],
    challenges: [],
    featured: false,
  },
]
