import { asset } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PhotoProps {
  /** Nome base do arquivo em public/images (sem sufixo nem extensão). */
  name: string
  alt: string
  /** Proporção do arquivo: define width/height intrínsecos (evita CLS). */
  ratio: '3/2' | '16/9' | '4/5'
  sizes: string
  className?: string
  priority?: boolean
}

const dims = {
  '3/2': [1600, 1066],
  '16/9': [1600, 900],
  '4/5': [960, 1200],
} as const

/**
 * Fotografia otimizada: WebP em duas larguras, carregamento preguiçoso e
 * dimensões declaradas para não deslocar o layout.
 */
export function Photo({ name, alt, ratio, sizes, className, priority }: PhotoProps) {
  const [w, h] = dims[ratio]
  return (
    <img
      src={asset(`images/${name}.webp`)}
      srcSet={`${asset(`images/${name}-sm.webp`)} ${w / 2}w, ${asset(`images/${name}.webp`)} ${w}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={cn('block h-auto w-full object-cover', className)}
    />
  )
}
