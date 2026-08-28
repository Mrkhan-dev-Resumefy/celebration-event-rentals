import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
// @ts-ignore - raw HTML import (Vite ?raw loader), bundled as a string at build time
import indexHtml from '../public/index.html?raw'

const app = new Hono()

// Serve static assets (styles.css, scene.js, app.js) from public/static
app.use('/static/*', serveStatic({ root: './public' }))

// Serve the single-page marketing site
app.get('/', (c) => {
  return c.html(indexHtml)
})

export default app
