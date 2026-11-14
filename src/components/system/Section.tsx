import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Star } from './Star'

type Tone = 'page' | 'paper' | 'ink'

const tones: Record<Tone, string> = {
  page: 'bg-page text-ink',
  paper: 'bg-paper text-ink',
  ink: 'on-ink bg-ink text-on-ink',
}

/**
 * Bloco de seção dentro da moldura contínua. A borda superior cruza as
 * guias laterais e cada cruzamento recebe uma estrela de junção: é o que
 * costura as seções em uma mesma prancha.
 */
export function Section({
  id,
  tone = 'page',
  className,
  innerClassName,
  labelledBy,
  ticks = true,
  children,
}: {
  id?: string
  tone?: Tone
  className?: string
  innerClassName?: string
  labelledBy?: string
  ticks?: boolean
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(tones[tone], className)}
    >
      <div
        className={cn(
          'frame relative py-16 sm:py-20 lg:py-24',
          tone === 'ink' ? 'md:border-ink-line' : 'border-rule border-t',
          innerClassName,
        )}
      >
        {ticks && tone !== 'ink' && (
          <>
            <Star
              size={11}
              className="absolute -top-[6px] -left-[6px] hidden text-purple-500 min-[84rem]:block"
            />
            <Star
              size={11}
              className="absolute -top-[6px] -right-[6px] hidden text-purple-500 min-[84rem]:block"
            />
          </>
        )}
        {children}
      </div>
    </section>
  )
}

/** Cabeçalho de seção: rótulo mono numerado, título e introdução. */
export function SectionHead({
  id,
  label,
  title,
  intro,
  as: Heading = 'h2',
  tone = 'ink',
  aside,
  className,
}: {
  id?: string
  label: string
  title: ReactNode
  intro?: ReactNode
  as?: 'h1' | 'h2'
  tone?: 'ink' | 'on-ink'
  /** Conteúdo à direita (controles, filtros). Substitui a introdução no lado direito. */
  aside?: ReactNode
  className?: string
}) {
  const right = aside ?? intro
  return (
    <div
      className={cn(
        'grid gap-5 md:gap-10',
        right && 'lg:grid-cols-2 lg:items-end',
        className,
      )}
    >
      <div>
        <p
          className={cn(
            'type-mono mb-3.5',
            tone === 'ink' ? 'text-ink-3' : 'text-purple-300',
          )}
        >
          {label}
        </p>
        <Heading
          id={id}
          className={Heading === 'h1' ? 'type-display' : 'type-h2'}
        >
          {title}
        </Heading>
      </div>
      {aside
        ? aside
        : intro && (
            <div
              className={cn(
                'type-lead max-w-[36em]',
                tone === 'ink' ? 'text-ink-2' : 'text-on-ink-2',
              )}
            >
              {intro}
            </div>
          )}
    </div>
  )
}
