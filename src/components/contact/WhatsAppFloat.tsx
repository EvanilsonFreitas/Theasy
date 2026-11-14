import { m } from 'framer-motion'
import { whatsapp } from '@/content/site'
import { WhatsAppIcon } from './WhatsAppIcon'

/**
 * Botão flutuante do WhatsApp comercial, presente em todas as páginas.
 * Discreto: superfície no roxo oficial, glifo contido, sombra ambiente,
 * elevação no hover e dica "Falar pelo WhatsApp" no hover ou foco. Sem
 * animação contínua, balões de "online" ou mensagens simuladas. Respeita as
 * áreas seguras do mobile; com o menu mobile aberto fica atrás do painel e
 * inerte (ver SiteHeader).
 */
export function WhatsAppFloat() {
  return (
    <m.a
      href={whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsapp.label}
      aria-describedby="whatsapp-float-hint"
      data-whatsapp-float
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        right: 'max(1rem, calc(env(safe-area-inset-right) + 0.75rem))',
        bottom: 'max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))',
      }}
      className="group fixed z-30 flex items-center rounded-full sm:right-6! sm:bottom-6!"
    >
      <span
        aria-hidden="true"
        className="bg-ink ease-snap pointer-events-none absolute right-full mr-3 hidden translate-x-1 rounded-md px-2.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-white opacity-0 shadow-[0_6px_18px_-8px_rgb(21_19_27/0.4)] transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block"
      >
        Falar pelo WhatsApp
      </span>
      <span id="whatsapp-float-hint" className="sr-only">
        Abre em nova aba
      </span>
      <span className="bg-brand ease-snap flex size-13 items-center justify-center rounded-full text-white shadow-[0_10px_28px_-10px_rgb(93_59_218/0.6),0_2px_6px_rgb(21_19_27/0.12)] ring-1 ring-white/20 transition-[transform,box-shadow,background-color] duration-200 group-hover:-translate-y-0.5 group-hover:bg-purple-700 group-hover:shadow-[0_14px_32px_-10px_rgb(93_59_218/0.7),0_2px_6px_rgb(21_19_27/0.14)] sm:size-14">
        <WhatsAppIcon className="size-6 sm:size-[26px]" />
      </span>
    </m.a>
  )
}
