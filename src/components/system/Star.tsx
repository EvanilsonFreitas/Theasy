import { cn } from '@/lib/utils'

/** Caminho da estrela côncava de quatro pontas do símbolo ThEasy. */
export const STAR_PATH =
  'M512 347A165 165 0 0 0 677 512A165 165 0 0 0 512 677A165 165 0 0 0 347 512A165 165 0 0 0 512 347Z'

/**
 * Estrela de junção: marca pontos de decisão, conexões ativas e o
 * cruzamento das guias de seção. Sempre decorativa (aria-hidden).
 */
export function Star({
  className,
  size = 12,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="347 347 330 330"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0 fill-current', className)}
    >
      <path d={STAR_PATH} />
    </svg>
  )
}
