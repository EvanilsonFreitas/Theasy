import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  /** Rótulo mono, ex.: "§ 02 — Soluções". */
  label: string
  /** Título; quebras de linha ("\n") viram linhas da revelação por máscara. */
  title: string
  id?: string
  intro?: ReactNode
  tone?: 'ink' | 'on-ink'
  as?: 'h1' | 'h2'
  size?: 'display' | 'h2'
  className?: string
  /** Layout: título e introdução lado a lado (split) ou empilhados. */
  layout?: 'split' | 'stack'
}

/**
 * Cabeçalho de seção padrão: rótulo mono numerado + título comprimido.
 * A numeração "§" e o rótulo mono são parte da gramática de relatório
 * do site — ver DESIGN.md › Assinatura.
 */
export function SectionHeader({
  label,
  title,
  id,
  intro,
  tone = 'ink',
  as: Heading = 'h2',
  size = 'h2',
  className,
  layout = 'split',
}: SectionHeaderProps) {
  const lines = title.split('\n')
  return (
    <div
      className={cn(
        'grid gap-6 md:gap-8',
        layout === 'split' && intro && 'md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-end',
        className,
      )}
    >
      <div>
        <p
          className={cn(
            'type-mono mb-4',
            tone === 'ink' ? 'text-ink-3' : 'text-on-ink-3',
          )}
        >
          {label}
        </p>
        <Heading
          id={id}
          data-reveal=""
          className={size === 'display' ? 'type-display' : 'type-h2'}
        >
          {lines.map((line, i) => (
            <span
              key={i}
              className="reveal-line"
              style={{ '--i': i } as CSSProperties}
            >
              <span>{line}</span>
            </span>
          ))}
        </Heading>
      </div>
      {intro && (
        <div
          className={cn(
            'type-lead max-w-[34em]',
            tone === 'ink' ? 'text-ink-2' : 'text-on-ink-2',
          )}
        >
          {intro}
        </div>
      )}
    </div>
  )
}
