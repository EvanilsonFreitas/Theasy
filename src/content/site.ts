/**
 * Dados institucionais e de navegação da ThEasy.
 *
 * Nada aqui é inventado. O único canal direto informado pela ThEasy é o
 * WhatsApp comercial (abaixo). Endereço, CNPJ e redes sociais ainda não
 * foram fornecidos; quando existirem, devem entrar neste arquivo.
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

/** Número internacional (E.164 sem o "+"), fonte única do canal. */
const WHATSAPP_NUMBER = '5511964639228'
const WHATSAPP_MESSAGE =
  'Olá! Conheci a ThEasy pelo site e gostaria de conversar sobre uma solução para minha empresa.'

/**
 * WhatsApp comercial da ThEasy. Link oficial `wa.me` (sem encurtadores, SDK
 * ou scripts de terceiros) com a mensagem inicial codificada.
 */
export const whatsapp = {
  number: WHATSAPP_NUMBER,
  display: '+55 (11) 96463-9228',
  message: WHATSAPP_MESSAGE,
  url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  /**
   * Nome acessível do botão flutuante. Contém o texto visível da dica
   * ("Falar pelo WhatsApp"), como pede a WCAG 2.5.3 (rótulo no nome).
   */
  tooltip: 'Falar pelo WhatsApp',
  label: 'Falar pelo WhatsApp com a ThEasy',
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
