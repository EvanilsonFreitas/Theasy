/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL pública do site, sem barra final (canonical, Open Graph, sitemap). */
  readonly VITE_SITE_URL?: string
  /** Endpoint que recebe o formulário de contato (POST JSON). */
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
