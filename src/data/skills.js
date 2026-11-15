/**
 * TECH STACK — grouped by category.
 * Add a technology by adding { name, note } to a category's `items`.
 * Add a category by adding a new object (pick any icon from src/utils/icons.js).
 * The constellation and the cards are both generated from this file.
 */

export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming Languages',
    icon: 'Code2',
    color: '#8b5cf6',
    items: [
      { name: 'Java', note: 'Primary backend language — OOP, collections, clean architecture.' },
      { name: 'Python', note: 'Automation, data processing and AI tooling.' },
      { name: 'C++', note: 'Competitive programming and DSA.' },
      { name: 'JavaScript', note: 'Front-end logic and React applications.' },
      { name: 'SQL', note: 'Querying, joins and relational data modelling.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: 'Server',
    color: '#4f7cff',
    items: [
      { name: 'Spring Boot', note: 'Layered services, dependency injection, production-ready APIs.' },
      { name: 'REST APIs', note: 'Designing and integrating resource-oriented APIs.' },
      { name: 'Spring Data JPA', note: 'Repositories and entity mapping without boilerplate.' },
      { name: 'Hibernate', note: 'ORM behind JPA — relationships, lazy loading, queries.' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: 'LayoutTemplate',
    color: '#22d3ee',
    items: [
      { name: 'React.js', note: 'Reusable components, hooks and API integration.' },
      { name: 'HTML', note: 'Semantic, accessible markup.' },
      { name: 'CSS', note: 'Responsive layouts and polished UI.' },
      { name: 'Material UI', note: 'Consistent, themeable component systems.' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: 'Database',
    color: '#a78bfa',
    items: [
      { name: 'PostgreSQL', note: 'Relational storage for production workloads.' },
      { name: 'H2', note: 'Fast in-memory database for development and tests.' },
    ],
  },
  {
    id: 'tools',
    title: 'Developer Tools',
    icon: 'Wrench',
    color: '#60a5fa',
    items: [
      { name: 'Git', note: 'Branching, history and collaboration.' },
      { name: 'GitHub', note: 'Repositories, reviews and portfolio hosting.' },
      { name: 'Azure DevOps', note: 'Boards, repos and pipelines in a team setting.' },
      { name: 'VS Code', note: 'Daily driver editor.' },
      { name: 'Maven', note: 'Java builds and dependency management.' },
      { name: 'Swagger', note: 'API documentation and testing.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: 'Sparkles',
    color: '#67e8f9',
    items: [
      { name: 'Pandas', note: 'Data wrangling and reconciliation at scale.' },
      { name: 'Streamlit', note: 'Turning Python tools into usable web apps.' },
      { name: 'Excel Automation', note: 'Reading, validating and generating workbooks with Python.' },
      { name: 'LLM Integration', note: 'Building AI-powered features into real products.' },
      { name: 'RAG', note: 'Retrieval-augmented generation for grounded answers.' },
    ],
  },
]

export const allSkills = skillCategories.flatMap((c) => c.items.map((i) => ({ ...i, categoryId: c.id })))
