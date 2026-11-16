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
import orbitCover from '../assets/images/projects/orbit.jpg'
import playgroundCover from '../assets/images/projects/playground.jpg'

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
      { challenge: 'Keeping filters shareable and intact across refresh and the back button.', solution: 'Filter state lives in the URL query string and is read back on every render.' },
      { challenge: 'Drawers and lightboxes opened underneath the sticky header.', solution: 'They render through portals, outside the stacking context created by page transitions.' },
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
      { challenge: 'Making every chart, alert and assistant answer agree with each other.', solution: 'All sample data comes from one seeded generator anchored to today, and everything computes from it.' },
      { challenge: 'Charts did not follow the dark and light themes.', solution: 'Chart colours are read from the active CSS variables whenever the theme changes.' },
    ],
    featured: false,
  },
  {
    id: 'creative-agency',
    title: 'Orbit Studio: Creative Agency',
    tagline: 'Creative digital agency website',
    description:
      'A bold, experimental website for a fictional creative agency: a custom GLSL 3D hero, interactive cursor, GSAP scroll choreography, horizontal scrolling and generative case-study artwork.',
    overview: [
      'Orbit Studio is designed like a high-end agency site: oversized editorial type, a shader-driven 3D planet that reacts to the pointer and to scroll, a custom cursor with contextual labels, magnetic buttons and curtain page transitions.',
      'The work section pins and scrolls horizontally, the gallery filters and switches between grid and list, and each case study has its own palette. Every image is generated in code from seeded algorithms, so there are no stock photos. The contact form is a labelled demo.',
    ],
    category: 'Creative Websites',
    tech: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Lenis', 'Framer Motion', 'Tailwind CSS'],
    icon: 'Palette',
    accent: ['#d4ff3a', '#8b5cf6'],
    cover: orbitCover,
    screenshots: [],
    // Set `live` and switch status to 'live' once the deployment is verified.
    links: { github: 'https://github.com/laxmik0799/studio-orbit', live: null },
    status: 'in-development',
    features: [
      'Custom GLSL 3D hero that reacts to pointer and scroll',
      'Custom cursor with labels and magnetic buttons',
      'GSAP ScrollTrigger reveals, parallax and pinned horizontal scrolling',
      'Filterable project gallery and themed case studies',
      'Generative artwork drawn in code (no stock imagery)',
      'Curtain page transitions and a full-screen menu',
    ],
    challenges: [
      { challenge: 'Keeping smooth scrolling, pinned sections and scroll-linked animation in sync.', solution: 'Lenis is driven by the GSAP ticker so ScrollTrigger reads one consistent scroll position.' },
      { challenge: 'Page transitions occasionally stalled after in-page animations.', solution: 'Isolated page content from the route-level presence so inner exit animations can never block navigation.' },
    ],
    featured: false,
  },
  {
    id: 'dev-playground',
    title: 'Developer Playground',
    tagline: 'Interactive developer playground',
    description:
      'A developer-themed interactive site with a terminal that really works, an animated code editor that visualises algorithms line by line, a technology constellation and 3D floating objects.',
    overview: [
      'The terminal is a real command interpreter with a virtual filesystem, history, tab completion and a safe calculator. Its commands drive the page: they run visualisers, switch themes, navigate and open projects.',
      'The editor types out source code, then highlights the executing line in sync with visualisations of bubble sort, quicksort, binary search and breadth-first pathfinding on a grid you can draw walls on. A canvas constellation maps the tools I use and how they connect.',
    ],
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'React Three Fiber', 'Canvas', 'Framer Motion', 'Zustand', 'Tailwind CSS'],
    icon: 'SquareTerminal',
    accent: ['#ffb454', '#59c2ff'],
    cover: playgroundCover,
    screenshots: [],
    // Add the repository and live URL once they exist.
    links: { github: null, live: null },
    status: 'in-development',
    features: [
      'Working terminal: virtual filesystem, history, tab completion, calculator',
      'Animated code editor with line-by-line execution highlighting',
      'Sorting, binary search and BFS pathfinding visualisers',
      'Interactive technology constellation on canvas',
      '3D floating objects that react to hover and click',
      'Dock navigation, keyboard shortcuts and four themes',
    ],
    challenges: [
      { challenge: 'Keeping the highlighted code line in step with each visualisation.', solution: 'Every algorithm pre-computes its steps with the source line attached, so the player simply walks an array.' },
      { challenge: 'Evaluating user-typed maths without eval.', solution: 'A small recursive-descent parser handles operators, precedence and parentheses safely.' },
    ],
    featured: false,
  },
]
