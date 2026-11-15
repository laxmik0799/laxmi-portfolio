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
    summary: 'Building software as a Development Engineer at Standard Chartered.',
    points: [], // TODO: add responsibilities in your own words
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
    summary: 'Indian Institute of Technology (BHU), Varanasi.',
    points: [],
    tags: ['Engineering', 'Problem Solving'],
  },
]
