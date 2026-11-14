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
  tagline: 'Dados, BI e sistemas para fazer sua empresa funcionar melhor.',
  description:
    'Consultoria em dados, tecnologia e gestão: BI e Analytics, engenharia de dados, sistemas sob medida, automação de processos e consultoria financeira para transformar desafios operacionais em soluções práticas.',
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
  { to: '/aplicacoes', label: 'Aplicações' },
  { to: '/abordagem', label: 'Como trabalhamos' },
  { to: '/sobre', label: 'Sobre' },
]

export const contactCta = {
  to: '/contato',
  label: 'Conversar com a ThEasy',
  short: 'Falar com a ThEasy',
} as const
