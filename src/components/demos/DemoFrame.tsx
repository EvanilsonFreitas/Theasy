import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Janela de interface demonstrativa. Todo componente com números exibe o
 * selo "demonstrativo": nada aqui é apresentado como resultado real.
 */
export function DemoFrame({
  title,
  badge = 'Dados demonstrativos',
  actions,
  children,
  className,
  bodyClassName,
}: {
  title: string
  badge?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
  bodyClassName?: string
}) {
  return (
    <div
      className={cn(
        'win e2 border-line text-ink @container overflow-hidden rounded-[14px] border',
        className,
      )}
    >
      <div className="border-rule flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b px-4 py-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-semibold">{title}</span>
          <span className="type-mono bg-warn-bg text-warn rounded-md px-[7px] py-[3px] text-[9.5px]">
            {badge}
          </span>
        </div>
        {actions}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  )
}

/** Controle segmentado usado nas demonstrações (botões com aria-pressed). */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="bg-paper-2 flex gap-0.5 rounded-lg p-[3px]"
    >
      {options.map((o) => {
        const on = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={cn(
              'min-h-8 rounded-md px-2.5 text-[12.5px] font-[560] transition-colors duration-150',
              on
                ? 'bg-paper text-ink shadow-[0_1px_2px_rgba(21,19,27,.12)]'
                : 'text-ink-2 hover:text-ink',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
