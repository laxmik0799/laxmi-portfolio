/**
 * EXPERIENCE & EDUCATION — shown in the Journey timeline and the About strip.
 * Newest first. Every field except `title`, `org` and `type` is optional.
 *
 *  type      'work' | 'education'
 *  period    e.g. 'Jul 2026 — Present'. Leave null to hide dates.
 *  status    short badge, e.g. 'Current'
 *  summary   one or two sentences
 *  points    bullet list (empty hides it)
 *  tags      small chips
 */

export const experience = [
  {
    id: 'standard-chartered',
    type: 'work',
    title: 'Development Engineer',
    org: 'Standard Chartered',
    location: null,
    period: null,
    status: 'Current',
    summary: 'Software development across banking applications, backend and frontend integration, and data automation.',
    // Kept deliberately high-level: no confidential or internal details.
    points: [
      'Develop features for banking applications across the stack, with React front ends and Java Spring Boot services.',
      'Integrate front ends with backend REST APIs and relational data layers.',
      'Build Python automation for data mapping, validation and reporting.',
    ],
    tags: ['Java', 'Spring Boot', 'React.js', 'Python'],
  },
  {
    id: 'iit-bhu',
    type: 'education',
    title: 'B.Tech, Mechanical Engineering',
    org: 'IIT (BHU), Varanasi',
    location: 'Varanasi, India',
    period: null,
    status: 'Graduate',
    summary: 'Bachelor of Technology in Mechanical Engineering from the Indian Institute of Technology (BHU), Varanasi.',
    points: [],
    tags: ['Engineering', 'Problem Solving'],
  },
]
