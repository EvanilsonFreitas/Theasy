/**
 * Dados institucionais e de navegação da ThEasy.
 *
 * Nada aqui é inventado: não há endereço, telefone, CNPJ ou redes sociais
 * porque essas informações ainda não foram fornecidas. Quando existirem,
 * devem entrar neste arquivo (e no structured data em `Seo.tsx`).
 */

export const site = {
  name: 'ThEasy',
  /** Descrição curta usada em metadados e no rodapé. */
  tagline: 'Dados, sistemas e gestão a partir do problema.',
  description:
    'Consultoria em BI, dados, sistemas sob medida, automação e gestão. A ThEasy entende o desafio do seu negócio antes de recomendar a tecnologia e depois constrói a solução.',
  /** URL pública do site (sem barra final). Defina VITE_SITE_URL no build. */
  url: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),
  locale: 'pt_BR',
} as const

export interface NavItem {
  to: string
  label: string
}

export const primaryNav: NavItem[] = [
  { to: '/solucoes', label: 'Soluções' },
  { to: '/abordagem', label: 'Abordagem' },
  { to: '/aplicacoes', label: 'Aplicações' },
  { to: '/sobre', label: 'Sobre' },
]

export const contactCta = {
  to: '/contato',
  label: 'Conversar sobre seu desafio',
  short: 'Falar com a ThEasy',
} as const
