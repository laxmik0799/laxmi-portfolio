# LAXMI.EXE — Portfolio

Personal portfolio of **Laxmi Kumari**: React + Vite + Tailwind CSS + React Three Fiber + Framer Motion.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build
```

## ✅ Before you deploy: replace the placeholders

Search the project for `TODO`. The important ones:

| What | Where |
|---|---|
| Email, LinkedIn, GitHub | `src/config/site.js` → `links` |
| Deployed URL (SEO / OG tags) | `src/config/site.js` → `seo.url` |
| Resume PDF | replace `public/resume/Laxmi_Kumari_Resume.pdf` (keep the name, or update `resume.path`) |
| Contact form | create a free form at formspree.io, paste its ID into `formspreeId` |
| Profile photo | put it in `src/assets/images/`, import it in `site.js`, set `about.photo` |
| Project links / screenshots | `src/data/projects.js` |
| Social preview image | `public/og-image.png` (1200×630) |

Until `formspreeId` is set, the contact form opens the visitor's email app with the message pre-filled, so it is never broken.

## ✏️ Updating content (no component changes needed)

All content lives in data files. The UI renders whatever is there.

```
src/config/site.js      name, hero text, about, links, resume, SEO, nav
src/data/projects.js    projects (add an object → it appears, with filters + detail view)
src/data/skills.js      tech stack categories (feeds both the constellation and the cards)
src/data/experience.js  journey timeline (set `period` if you ever want dates shown)
src/data/achievements.js
src/utils/icons.js      icon names you can use from data files
```

### Add a project

Append to the `projects` array in `src/data/projects.js`:

```js
{
  id: 'my-new-project',             // unique slug, used for ?project=my-new-project links
  title: 'My New Project',
  tagline: 'One-line hook',
  description: 'Short summary.',
  overview: ['Paragraph one.', 'Paragraph two.'],
  category: 'AI',                   // new categories create new filters automatically
  tech: ['React.js', 'Spring Boot'],
  icon: 'Rocket',                   // any name from src/utils/icons.js
  accent: ['#8b5cf6', '#22d3ee'],   // cover + glow colours
  cover: null,                      // null = generated cover, or an imported image
  screenshots: [],                  // [{ src: importedImage, caption: '…' }]
  links: { github: null, live: null },
  features: ['…'],
  challenges: [{ challenge: '…', solution: '…' }],
  featured: false,
}
```

## 🚀 Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com → **Add New Project** → import the repo.
3. Vercel detects Vite automatically (`vercel.json` is included). Click **Deploy**.
4. Copy the live URL into `seo.url` in `site.js` and push again.

## Architecture notes

- **Performance:** three.js is loaded lazily with the hero scene (kept out of the initial bundle), rendering pauses when the hero is off-screen, DPR is capped, and mobile gets fewer particles and lower geometry detail.
- **Accessibility:** `prefers-reduced-motion` disables Lenis, the intro loader, the 3D motion, tilt, magnetism and the custom cursor. The project dialog has focus management, Esc / ← → keys and a focus trap. A skip link is included.
- **Fallbacks:** no WebGL → a static glow orb; missing cover image → a generated cover; missing links → "coming soon" chips instead of dead links.
- **Deep links:** `?project=<id>` opens that project's detail view directly, so you can share a link to one project.
