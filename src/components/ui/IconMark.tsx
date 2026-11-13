import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Ícone em moldura quadrada: a forma padrão de iconografia do sistema. */
export function IconMark({
  icon: Icon,
  active = false,
  tone = 'ink',
  size = 'md',
  className,
}: {
  icon: LucideIcon
  active?: boolean
  tone?: 'ink' | 'on-ink'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const box = { sm: 'size-8', md: 'size-10', lg: 'size-14' }[size]
  const glyph = { sm: 'size-4', md: 'size-5', lg: 'size-7' }[size]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center border transition-colors duration-200',
        box,
        tone === 'ink'
          ? active
            ? 'border-purple-600 bg-purple-600 text-white'
            : 'border-ink bg-paper text-ink'
          : 'border-ink-line bg-transparent text-purple-300',
        className,
      )}
    >
      <Icon className={glyph} strokeWidth={1.5} />
    </span>
  )
}
