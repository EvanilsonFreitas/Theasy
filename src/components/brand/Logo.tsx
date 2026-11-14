import { cn } from '@/lib/utils'

/**
 * Símbolo ThEasy: dois colchetes que se encaixam ao redor de uma estrela.
 * Vetorizado a partir da referência institucional (vídeo/arte enviada pela
 * ThEasy), preservando a geometria: colchetes com simetria de rotação e a
 * estrela central de quatro pontas com lados côncavos. Substituir pelo
 * arquivo vetorial oficial quando ele estiver disponível.
 */
const BRACKET =
  'M185 672V420A235 235 0 0 1 420 185H725A122 122 0 0 1 603 307H420A113 113 0 0 0 307 420V550A122 122 0 0 1 185 672Z'
const STAR =
  'M512 347A165 165 0 0 0 677 512A165 165 0 0 0 512 677A165 165 0 0 0 347 512A165 165 0 0 0 512 347Z'

export function Symbol({
  className,
  title,
  animated = false,
}: {
  className?: string
  title?: string
  /** Colchetes se encaixam e a estrela aparece (uma vez, respeita movimento reduzido). */
  animated?: boolean
}) {
  return (
    <svg
      viewBox="160 160 704 704"
      fill="currentColor"
      className={cn('shrink-0', animated && 'symbol-animated', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path className="symbol-a" d={BRACKET} />
      <g className="symbol-b">
        <path transform="rotate(180 512 512)" d={BRACKET} />
      </g>
      <path className="symbol-star" d={STAR} />
    </svg>
  )
}

/**
 * Assinatura completa: símbolo + THEASY (+ assinatura "Your data analytics").
 * O logotipo tipográfico é composto em Instrument Sans. A entrelinha do
 * nome é ajustada à altura das maiúsculas para que nome e descritor formem
 * um bloco compacto, centrado na altura do símbolo.
 */
export function Logo({
  className,
  tone = 'ink',
  tagline = false,
  size = 'md',
}: {
  className?: string
  tone?: 'ink' | 'on-ink'
  tagline?: boolean
  size?: 'md' | 'lg'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        size === 'lg' ? 'gap-4' : 'gap-2.5 md:gap-3',
        className,
      )}
    >
      <Symbol
        className={cn(
          'text-brand',
          size === 'lg' ? 'size-16 sm:size-20' : 'size-8 md:size-9',
        )}
      />
      <span
        className={cn(
          'flex flex-col justify-center',
          size === 'lg' ? 'gap-2.5 sm:gap-3' : 'gap-[4px]',
        )}
      >
        <span
          className={cn(
            'font-semibold tracking-[0.03em]',
            size === 'lg'
              ? 'text-[2.5rem] sm:text-[3.25rem]'
              : 'text-[1.3125rem] md:text-[1.4375rem]',
            'leading-[0.74]',
            tone === 'ink' ? 'text-ink' : 'text-on-ink',
          )}
        >
          THEASY
        </span>
        {tagline && (
          <span
            className={cn(
              'font-normal whitespace-nowrap',
              size === 'lg'
                ? 'text-[15px] sm:text-[17px]'
                : 'text-[10.5px] md:text-[11px]',
              'leading-none',
              tone === 'ink' ? 'text-ink-3' : 'text-on-ink-3',
            )}
          >
            Your data analytics
          </span>
        )}
      </span>
    </span>
  )
}
