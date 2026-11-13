import { useLocation } from 'react-router-dom'
import { site } from '@/content/site'

interface SeoProps {
  title?: string
  description?: string
  /** Não indexar (ex.: 404). */
  noindex?: boolean
}

/**
 * Metadados por página. O React 19 eleva <title>, <meta> e <link> para o
 * <head> automaticamente — sem dependência extra.
 *
 * O canonical e as URLs absolutas de Open Graph só são emitidos quando
 * VITE_SITE_URL está definido: não inventamos um domínio.
 */
export function Seo({ title, description, noindex }: SeoProps) {
  const { pathname } = useLocation()
  const fullTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} | Consultoria em dados, BI e sistemas`
  const desc = description ?? site.description
  const canonical = site.url
    ? `${site.url}${pathname === '/' ? '/' : pathname}`
    : null

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:site_name" content={site.name} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
    </>
  )
}
