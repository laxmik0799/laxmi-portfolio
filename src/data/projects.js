/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — add a project by adding one object to this array.
 * ─────────────────────────────────────────────────────────────
 *  The Projects section, category filters and detail view are all
 *  generated from this file. No component changes are needed.
 *
 *  Field reference
 *  ───────────────
 *  id           unique, URL-safe slug (used for ?project=<id> deep links)
 *  title        project name
 *  tagline      one-line hook shown on the card
 *  description  2–3 sentence summary (card + modal intro)
 *  overview     detailed write-up (array of paragraphs)
 *  category     any string; filters are created automatically
 *  tech         array of technology names
 *  icon         a lucide-react icon name used on the generated cover
 *               (see src/utils/icons.js for the available names)
 *  accent       [fromColor, toColor] for the generated cover + glow
 *  cover        null → a generated cover is used.
 *               Or import an image:  import cover from '../assets/images/projects/x.png'
 *  screenshots  array of { src, caption }  (imported images or /public paths)
 *  links        { github: 'https://…' | null, live: 'https://…' | null }
 *               null hides the button — never put a fake URL here.
 *  features     array of strings
 *  challenges   array of { challenge, solution }  (empty array hides the block)
 *  featured     true → shows the "Featured" badge and sorts first
 */

export const projects = [
  {
    id: 'wealth-core-rm',
    title: 'Wealth Core RM',
    tagline: 'Relationship management platform for banking',
    description:
      'A banking relationship management application with client portfolio views, product management, financial insights, and other core banking workflows.',
    overview: [
      'Wealth Core RM gives relationship managers one place to work: a dashboard of what matters today, rich client views, the product catalogue, service requests, statements, advice and notifications.',
      'The front end is built in React with Material UI and talks to a Java Spring Boot backend over REST APIs. Data is persisted with Spring Data JPA on H2 for local development and PostgreSQL for production-grade storage.',
    ],
    category: 'Full-Stack',
    tech: ['React.js', 'Material UI', 'Java', 'Spring Boot', 'REST APIs', 'Spring Data JPA', 'H2', 'PostgreSQL'],
    icon: 'Landmark',
    accent: ['#8b5cf6', '#4f7cff'],
    cover: null,
    screenshots: [],
    links: { github: null, live: null }, // TODO: add real links when available
    features: [
      'Relationship manager dashboard with an at-a-glance summary',
      'Client and portfolio views',
      'Product management module',
      'Service requests and statements',
      'Advice, downloads and notifications workflows',
      'REST API layer between the React front end and Spring Boot backend',
    ],
    // TODO: refine these in your own words
    challenges: [
      {
        challenge: 'Keeping many banking modules consistent as the application grows.',
        solution:
          'A layered Spring Boot backend (controller → service → repository) with clear REST contracts, and reusable React + MUI components on the front end.',
      },
      {
        challenge: 'Moving smoothly from local development to a production database.',
        solution: 'Spring Data JPA abstracts persistence, so the same entities run on H2 locally and PostgreSQL in production.',
      },
    ],
    featured: true,
  },
  {
    id: 'tdm-automation',
    title: 'TDM Automation',
    tagline: 'Automated data mapping & validation',
    description:
      'An automation solution for data mapping, validation, discrepancy identification, and Transformational Data Model (TDM) template generation.',
    overview: [
      'Maintaining a Transformational Data Model by hand means cross-checking large Excel workbooks line by line. This tool automates that work by reading the DTP Mapping Sheet, the Physical Data Model (PDM) and the latest TDM template, then reconciling them.',
      'It maps source-to-target attributes, validates them, flags discrepancies, compares proposed mappings against the existing TDM, detects new attributes and pipelines, and generates a TDM buffer plus review-ready Excel reports. A Streamlit front end makes the whole flow usable by non-developers.',
    ],
    category: 'Data & Automation',
    tech: ['Python', 'Pandas', 'Streamlit', 'Excel Automation'],
    icon: 'Workflow',
    accent: ['#22d3ee', '#4f7cff'],
    cover: null,
    screenshots: [],
    links: { github: null, live: null }, // TODO
    features: [
      'Reads DTP Mapping Sheet, PDM and TDM template workbooks',
      'Source-to-target attribute mapping',
      'Validation and discrepancy identification',
      'Comparison of proposed mappings against the existing TDM',
      'Detection of new attributes and pipelines',
      'TDM buffer generation and Excel review reports',
      'Streamlit interface on top of the automation backend',
    ],
    // TODO: refine these in your own words
    challenges: [
      {
        challenge: 'Reconciling three differently structured Excel sources reliably.',
        solution: 'Normalising each workbook into Pandas DataFrames with consistent keys before any comparison runs.',
      },
      {
        challenge: 'Making the output easy for reviewers to act on.',
        solution: 'Generating structured Excel review reports that separate matches, discrepancies and new items.',
      },
    ],
    featured: true,
  },
  {
    id: 'rag-knowledge-system',
    title: 'RAG Knowledge Management System',
    tagline: 'Ask questions, get grounded answers',
    description:
      'A retrieval-augmented generation (RAG) system for knowledge management — answers questions using retrieved context from a document base instead of guesswork.',
    overview: [
      'This project applies retrieval-augmented generation to knowledge management: relevant context is retrieved from a knowledge base and passed to a language model so answers stay grounded in the source material.',
      // TODO: add details on architecture, data sources and results.
    ],
    category: 'AI',
    tech: ['React.js', 'Node.js', 'TypeScript', 'MongoDB', 'LLM / RAG'], // TODO: confirm the stack
    icon: 'BrainCircuit',
    accent: ['#a855f7', '#22d3ee'],
    cover: null,
    screenshots: [],
    links: { github: null, live: null }, // TODO
    features: [
      'Retrieval of relevant context from a knowledge base',
      'LLM answers grounded in retrieved content',
      // TODO: add more features
    ],
    challenges: [], // TODO
    featured: false,
  },
  {
    id: 'ai-seo-dashboard',
    title: 'AI-Powered SEO Dashboard',
    tagline: 'SEO insights, assisted by AI',
    description: 'A dashboard that brings SEO data together and uses AI to help turn it into actionable insights.',
    overview: [
      'An analytics dashboard focused on search engine optimisation, with AI integrated to help interpret the data.',
      // TODO: add details on what it measures, how AI is used and outcomes.
    ],
    category: 'AI',
    tech: ['React.js', 'Node.js', 'TypeScript', 'AI Integration'], // TODO: confirm the stack
    icon: 'LineChart',
    accent: ['#4f7cff', '#a855f7'],
    cover: null,
    screenshots: [],
    links: { github: null, live: null }, // TODO
    features: [
      'Dashboard view of SEO data',
      'AI-assisted insights',
      // TODO: add more features
    ],
    challenges: [], // TODO
    featured: false,
  },
]
