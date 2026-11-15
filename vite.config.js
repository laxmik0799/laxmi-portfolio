import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { site } from './src/config/site.js'

/**
 * Injects SEO values from src/config/site.js into index.html,
 * so personal details live in exactly one place.
 */
function seoFromSiteConfig() {
  const { seo, name } = site
  const abs = (p) => (p.startsWith('http') ? p : seo.url.replace(/\/$/, '') + p)
  const values = {
    SITE_TITLE: seo.title,
    SITE_DESCRIPTION: seo.description,
    SITE_KEYWORDS: seo.keywords,
    SITE_URL: seo.url,
    SITE_OG_IMAGE: abs(seo.ogImage),
    SITE_THEME: seo.themeColor,
    SITE_AUTHOR: name,
    SITE_JSONLD: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name,
      jobTitle: 'Development Engineer',
      worksFor: { '@type': 'Organization', name: 'Standard Chartered' },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology (BHU), Varanasi' },
      url: seo.url,
      sameAs: [site.links.linkedin, site.links.github],
    }),
  }
  const escape = (s) => String(s).replace(/"/g, '&quot;')
  return {
    name: 'seo-from-site-config',
    transformIndexHtml: {
      order: 'pre', // must run before Vite parses the HTML (raw %…% breaks URI decoding)
      handler(html) {
        return html.replace(/%(SITE_[A-Z_]+)%/g, (m, key) => {
          if (!(key in values)) return m
          return key === 'SITE_JSONLD' ? values[key] : escape(values[key])
        })
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), seoFromSiteConfig()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // three.js is only reached through the lazily-imported HeroScene,
        // so Vite keeps it out of the initial bundle automatically.
        manualChunks: { motion: ['framer-motion'] },
      },
    },
  },
})
