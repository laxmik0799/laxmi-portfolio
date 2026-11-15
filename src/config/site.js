/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONFIG — the single place for your personal details.
 * ─────────────────────────────────────────────────────────────
 *  Everything here is plain data. Change a value, save, and the
 *  whole site (including SEO tags in index.html) updates.
 *
 *  Search for "TODO" to find every placeholder you should replace.
 */

export const site = {
  // ── Identity ────────────────────────────────────────────────
  name: 'Laxmi Kumari',
  firstName: 'Laxmi',
  brand: 'LAXMI.EXE',
  tagline: 'Building Beyond Boundaries',
  title: 'Software Developer | Full-Stack Engineer | AI & Backend Developer',
  roles: ['Software Developer', 'Full-Stack Engineer', 'AI Enthusiast'],

  heroHeading: "Hi, I'm Laxmi.",
  heroSubheading:
    'I build intelligent systems, scalable applications, and experiences that make technology meaningful.',

  // Small status pill in the hero. Set `available: false` to show a neutral state.
  status: {
    available: true,
    label: 'Open to freelance & collaborations',
  },

  // ── About ───────────────────────────────────────────────────
  about: {
    intro:
      "I'm a Software Developer and an IIT (BHU) Varanasi graduate, currently working as a Development Engineer at Standard Chartered.",
    body: [
      'My engineering degree is in Mechanical Engineering, but my craft is software. I care about building backend systems that scale, full-stack products that feel effortless to use, and AI-powered applications that solve real problems.',
      'I enjoy the whole lifecycle: designing the architecture, writing clean and maintainable code, debugging down to the root cause, and shipping something people can rely on.',
    ],
    // Short interactive highlights shown as hoverable chips.
    highlights: [
      { label: 'Backend Engineering', detail: 'Java, Spring Boot, REST APIs and well-modelled data layers.' },
      { label: 'Full-Stack Products', detail: 'React front ends wired to robust Spring Boot and Python services.' },
      { label: 'AI-Powered Apps', detail: 'Bringing LLMs and retrieval into practical, usable products.' },
      { label: 'System Design', detail: 'Thinking in components, contracts, scalability and trade-offs.' },
      { label: 'Data Engineering', detail: 'Mapping, validation and automation pipelines for data quality.' },
    ],
    // Replace with an imported image, e.g.
    //   import photo from '../assets/images/profile.jpg'
    //   photo: photo,
    // While null, a styled monogram placeholder is shown.
    photo: null,
  },

  // ── Links ───────────────────────────────────────────────────
  links: {
    email: 'your.email@example.com', // TODO: your email
    linkedin: 'https://www.linkedin.com/in/your-linkedin-handle', // TODO
    github: 'https://github.com/your-github-username', // TODO
  },

  // Put your PDF at public/resume/ and keep this path in sync.
  resume: {
    path: '/resume/Laxmi_Kumari_Resume.pdf', // TODO: replace the placeholder PDF
    downloadName: 'Laxmi_Kumari_Resume.pdf',
  },

  // ── Contact form ────────────────────────────────────────────
  // 1. Create a free form at https://formspree.io
  // 2. Paste its ID (the part after /f/, e.g. "xyzabcd") below.
  // While empty, the form falls back to opening the visitor's email app.
  formspreeId: '', // TODO

  // ── SEO (injected into index.html at build time) ────────────
  seo: {
    url: 'https://your-portfolio.vercel.app', // TODO: your deployed URL
    title: 'Laxmi Kumari — Software Developer & Full-Stack Engineer',
    description:
      'Portfolio of Laxmi Kumari, IIT (BHU) graduate and Development Engineer at Standard Chartered. Backend engineering, full-stack development and AI-powered applications.',
    keywords:
      'Laxmi Kumari, Software Developer, Full-Stack Engineer, Java, Spring Boot, React, Python, AI, Backend Developer, IIT BHU, Portfolio',
    ogImage: '/og-image.png',
    themeColor: '#05060f',
  },

  // ── Navigation (ids must match section ids) ─────────────────
  nav: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Projects' },
    { id: 'lab', label: 'Lab' },
    { id: 'experience', label: 'Journey' },
    { id: 'achievements', label: 'Beyond Code' },
    { id: 'contact', label: 'Contact' },
  ],
}
