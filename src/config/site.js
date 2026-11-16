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
  title: 'Software Developer | Full-Stack Engineer | AI Enthusiast',
  roles: ['Software Developer', 'Full-Stack Engineer', 'AI Enthusiast'],

  // The hero shows your name large, then this headline beneath it.
  heroHeadline: ['Building Intelligent Products.', "Engineering What's Next."],

  // Small status pill in the hero. Set `available: false` to show a neutral state.
  status: {
    available: true,
    label: 'Open to freelance & collaborations',
  },

  // ── About ───────────────────────────────────────────────────
  about: {
    intro:
      "I'm a Software Developer and IIT (BHU) graduate, currently a Development Engineer at Standard Chartered, with experience in software development, backend engineering, full-stack applications, AI-driven solutions and data automation.",
    body: [
      'I enjoy building scalable applications, designing efficient backend systems, developing interactive user experiences, and exploring how AI can transform software products.',
      'My interests include backend engineering, full-stack development, system design, artificial intelligence, and building products that solve real-world problems.',
    ],
    // Short interactive highlights shown as hoverable chips.
    highlights: [
      { label: 'Backend Engineering', detail: 'Java, Spring Boot, REST APIs and well-modelled data layers.' },
      { label: 'Full-Stack Products', detail: 'React front ends wired to robust Spring Boot and Python services.' },
      { label: 'AI-Driven Apps', detail: 'Exploring how AI can make software products more useful.' },
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
    email: 'laxmikumari0799@gmail.com',
    linkedin: 'https://www.linkedin.com/in/laxmi-kumari-a00817258/',
    github: 'https://github.com/laxmik0799',
  },

  // Put your PDF at public/resume/ and keep this path in sync.
  resume: {
    path: '/resume/Laxmi_Kumari_Resume.pdf', // replace this PDF to update the download
    downloadName: 'Laxmi_Kumari_Resume.pdf',
  },

  // ── Contact form ────────────────────────────────────────────
  // 1. Create a free form at https://formspree.io
  // 2. Paste its ID (the part after /f/, e.g. "xyzabcd") below.
  // While empty, the form falls back to opening the visitor's email app.
  formspreeId: '', // TODO

  // ── SEO (injected into index.html at build time) ────────────
  seo: {
    url: 'https://laxmi-portfolio-beryl.vercel.app',
    title: 'Laxmi Kumari — Software Developer | Full-Stack Engineer | AI Enthusiast',
    description:
      'Portfolio of Laxmi Kumari, IIT (BHU) graduate and Development Engineer at Standard Chartered. Backend engineering, full-stack development, AI-driven applications and data automation.',
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
