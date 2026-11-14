import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Abertura das páginas internas: título e introdução à esquerda e um
 * elemento próprio da página à direita (índice, diagrama, composição).
 * Mesma moldura e luz do hero da home, em escala menor.
 */
export function PageHero({
  id,
  label,
  title,
  intro,
  aside,
  children,
  className,
}: {
  id: string
  label: string
  title: ReactNode
  intro?: ReactNode
  aside?: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <section aria-labelledby={id} className="bg-paper relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_70%_at_85%_20%,rgb(139_108_240/0.08),transparent_70%)]"
      />
      <div
        className={cn(
          'frame relative grid gap-10 pt-10 pb-14 sm:pt-14 lg:pt-16 lg:pb-20',
          aside &&
            'lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-14',
          className,
        )}
      >
        <div className="flex flex-col gap-5">
          <p className="type-mono text-purple-600">{label}</p>
          <h1 id={id} className="type-display max-w-[18ch]">
            {title}
          </h1>
          {intro && (
            <div className="type-lead text-ink-2 max-w-[36em]">{intro}</div>
          )}
          {children}
        </div>
        {aside}
      </div>
    </section>
  )
}
