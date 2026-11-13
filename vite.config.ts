import path from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Rotas indexáveis (manter em sincronia com `publicPaths` em src/routes). */
const PUBLIC_PATHS = [
  '/',
  '/solucoes',
  '/abordagem',
  '/aplicacoes',
  '/sobre',
  '/contato',
  '/privacidade',
]

/**
 * Gera robots.txt sempre e sitemap.xml somente quando VITE_SITE_URL está
 * definido — não inventamos o domínio público do site.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'theasy-seo-files',
    apply: 'build',
    generateBundle() {
      const base = siteUrl.replace(/\/$/, '')
      const robots = ['User-agent: *', 'Allow: /']
      if (base) {
        robots.push('', `Sitemap: ${base}/sitemap.xml`)
        const urls = PUBLIC_PATHS.map(
          (p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`,
        ).join('\n')
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        })
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robots.join('\n') + '\n',
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    // Identificador técnico do deploy no GitHub Pages — não renomear sem
    // renomear o repositório remoto.
    base: process.env.GITHUB_PAGES ? '/oneb-website/' : '/',
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 5173,
      strictPort: false,
    },
  }
})
