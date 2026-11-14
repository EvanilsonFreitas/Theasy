import type { SolutionSlug } from '@/content/solutions'
import type { AreaKey } from '@/content/contexts'
import { cn } from '@/lib/utils'

/*
 * Glifos proprietários: pequenas miniaturas técnicas, monocromáticas, no
 * mesmo vocabulário do mapa (traço 1.5, raio 2, colchete, estrela). Não são
 * ícones de biblioteca: cada um descreve a forma do trabalho que representa.
 */

const S = 'stroke-current fill-none'

export function ServiceGlyph({
  slug,
  className,
}: {
  slug: SolutionSlug
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn('size-8', className)}
    >
      {slug === 'bi-analytics' && (
        <>
          <path d="M5 27H27" className={S} strokeWidth="1.5" />
          <rect
            x="7"
            y="17"
            width="4"
            height="8"
            rx="1"
            className="fill-current opacity-40"
          />
          <rect
            x="14"
            y="12"
            width="4"
            height="13"
            rx="1"
            className="fill-current opacity-60"
          />
          <rect
            x="21"
            y="7"
            width="4"
            height="18"
            rx="1"
            className="fill-current"
          />
          <path
            d="M6 14L13 9L19 11L26 4"
            className={S}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </>
      )}
      {slug === 'dados-engenharia' && (
        <>
          <ellipse
            cx="9"
            cy="8"
            rx="5"
            ry="2.2"
            className={S}
            strokeWidth="1.5"
          />
          <path
            d="M4 8V14C4 15.2 6.2 16.2 9 16.2S14 15.2 14 14V8"
            className={S}
            strokeWidth="1.5"
          />
          <path
            d="M14 11H18Q20 11 20 13V19Q20 21 22 21H24"
            className={S}
            strokeWidth="1.5"
          />
          <rect
            x="24"
            y="17"
            width="5"
            height="8"
            rx="1.5"
            className="fill-current"
          />
          <path
            d="M9 16.2V22Q9 24 11 24H24"
            className={S}
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
        </>
      )}
      {slug === 'sistemas' && (
        <>
          <rect
            x="4"
            y="6"
            width="24"
            height="20"
            rx="3"
            className={S}
            strokeWidth="1.5"
          />
          <path d="M11 6V26" className={S} strokeWidth="1.5" />
          <path
            d="M15 12H24M15 16H22M15 20H24"
            className={S}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="6"
            y="10"
            width="3"
            height="2"
            rx=".5"
            className="fill-current"
          />
        </>
      )}
      {slug === 'automacao' && (
        <>
          <circle cx="6" cy="16" r="3" className={S} strokeWidth="1.5" />
          <path d="M9 16H13" className={S} strokeWidth="1.5" />
          <path
            d="M13 16L17 12L21 16L17 20Z"
            className={S}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M21 16Q23 16 23 13V10H26M21 16Q23 16 23 19V22H26"
            className={S}
            strokeWidth="1.5"
          />
          <circle cx="27" cy="10" r="2" className="fill-current" />
          <circle cx="27" cy="22" r="2" className="fill-current opacity-50" />
        </>
      )}
      {slug === 'consultoria' && (
        <>
          <path d="M4 27H28" className={S} strokeWidth="1.5" />
          <rect
            x="5"
            y="5"
            width="4"
            height="22"
            rx="1"
            className="fill-current"
          />
          <rect
            x="11"
            y="5"
            width="4"
            height="6"
            rx="1"
            className="fill-current opacity-40"
          />
          <rect
            x="17"
            y="11"
            width="4"
            height="5"
            rx="1"
            className="fill-current opacity-60"
          />
          <rect
            x="23"
            y="16"
            width="4"
            height="11"
            rx="1"
            className={S}
            strokeWidth="1.5"
          />
        </>
      )}
    </svg>
  )
}

export function AreaGlyph({
  area,
  className,
}: {
  area: AreaKey
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 40 28"
      aria-hidden="true"
      className={cn('h-7 w-10', className)}
    >
      {area === 'financeiro' && (
        <>
          <rect
            x="1"
            y="2"
            width="8"
            height="24"
            rx="1"
            className="fill-current opacity-30"
          />
          <rect
            x="11"
            y="2"
            width="8"
            height="8"
            rx="1"
            className="fill-current opacity-55"
          />
          <rect
            x="21"
            y="10"
            width="8"
            height="6"
            rx="1"
            className="fill-current opacity-75"
          />
          <rect
            x="31"
            y="16"
            width="8"
            height="10"
            rx="1"
            className="fill-current"
          />
        </>
      )}
      {area === 'operacoes' && (
        <>
          <circle cx="5" cy="14" r="4" className={S} strokeWidth="1.5" />
          <path d="M9 14H15" className={S} strokeWidth="1.5" />
          <rect
            x="15"
            y="8"
            width="11"
            height="12"
            rx="2"
            className={S}
            strokeWidth="1.5"
          />
          <path d="M18 14H23" className={S} strokeWidth="1.5" />
          <path d="M26 14H31" className={S} strokeWidth="1.5" />
          <circle cx="35" cy="14" r="4" className="fill-current" />
        </>
      )}
      {area === 'comercial' && (
        <>
          <path
            d="M1 3H39L29 14V26H11V14Z"
            className={S}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M7 9H33M13 19H27" className={S} strokeWidth="1" />
        </>
      )}
      {area === 'logistica' && (
        <>
          <path
            d="M4 22C10 22 10 8 18 8S26 20 34 20"
            className={S}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <circle cx="4" cy="22" r="3" className="fill-current" />
          <circle
            cx="18"
            cy="8"
            r="3"
            className="fill-white stroke-current"
            strokeWidth="1.5"
          />
          <circle cx="34" cy="20" r="3" className="fill-current" />
        </>
      )}
      {area === 'gestao' && (
        <>
          <rect
            x="1"
            y="1"
            width="18"
            height="12"
            rx="2"
            className={S}
            strokeWidth="1.5"
          />
          <rect
            x="21"
            y="1"
            width="18"
            height="12"
            rx="2"
            className="fill-current stroke-current opacity-25"
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="15"
            width="38"
            height="12"
            rx="2"
            className={S}
            strokeWidth="1.5"
          />
          <path
            d="M5 23L12 19L18 21L25 18L34 20"
            className={S}
            strokeWidth="1.2"
          />
        </>
      )}
      {area === 'tecnologia' && (
        <>
          <rect
            x="1"
            y="3"
            width="10"
            height="8"
            rx="1.5"
            className={S}
            strokeWidth="1.5"
          />
          <rect
            x="1"
            y="17"
            width="10"
            height="8"
            rx="1.5"
            className={S}
            strokeWidth="1.5"
          />
          <rect
            x="29"
            y="10"
            width="10"
            height="8"
            rx="1.5"
            className="fill-current"
          />
          <path
            d="M11 7H18Q20 7 20 9V14H29M11 21H18Q20 21 20 19V14"
            className={S}
            strokeWidth="1.5"
          />
        </>
      )}
    </svg>
  )
}
