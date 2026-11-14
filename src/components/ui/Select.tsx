import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

/**
 * Seletor do design system no padrão WAI-ARIA "select-only combobox":
 * o foco permanece no gatilho (aria-activedescendant), setas, Home e End
 * navegam, Enter ou Espaço selecionam, Esc fecha, digitar busca pela
 * primeira letra. Abre para cima quando falta espaço abaixo.
 */
export function Select<T extends string>({
  label,
  hideLabel = false,
  value,
  options,
  onChange,
  size = 'sm',
  className,
}: {
  label: string
  hideLabel?: boolean
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  size?: 'sm' | 'md'
  className?: string
}) {
  const id = useId()
  const labelId = `${id}-label`
  const listId = `${id}-list`
  const optId = (i: number) => `${id}-opt-${i}`
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const [placement, setPlacement] = useState<'down' | 'up'>('down')
  const [alignEnd, setAlignEnd] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const typed = useRef({ text: '', at: 0 })

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
  const current = options[selectedIndex]

  const openAt = (index: number) => {
    setActive(index)
    setOpen(true)
  }
  const commit = (index: number) => {
    onChange(options[index].value)
    setOpen(false)
  }

  // Posição do menu: abre para cima ou alinha à direita perto das bordas.
  useLayoutEffect(() => {
    if (!open || !trigger.current) return
    const r = trigger.current.getBoundingClientRect()
    const listHeight = options.length * 40 + 12
    setPlacement(
      window.innerHeight - r.bottom < listHeight && r.top > listHeight
        ? 'up'
        : 'down',
    )
    setAlignEnd(r.left + Math.max(r.width, 200) > window.innerWidth - 8)
  }, [open, options.length])

  // Clique ou toque fora fecha.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1
    if (!open) {
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openAt(selectedIndex)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        openAt(selectedIndex)
      } else if (e.key === 'Home') {
        e.preventDefault()
        openAt(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        openAt(last)
      }
      return
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((a) => Math.min(last, a + 1))
        return
      case 'ArrowUp':
        e.preventDefault()
        setActive((a) => Math.max(0, a - 1))
        return
      case 'Home':
        e.preventDefault()
        setActive(0)
        return
      case 'End':
        e.preventDefault()
        setActive(last)
        return
      case 'Enter':
      case ' ':
        e.preventDefault()
        commit(active)
        return
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        return
      case 'Tab':
        setOpen(false)
        return
    }
    // Busca pela digitação.
    if (e.key.length === 1 && /\S/.test(e.key)) {
      const now = Date.now()
      typed.current.text =
        (now - typed.current.at < 600 ? typed.current.text : '') +
        e.key.toLowerCase()
      typed.current.at = now
      const hit = options.findIndex((o) =>
        o.label.toLowerCase().startsWith(typed.current.text),
      )
      if (hit >= 0) setActive(hit)
    }
  }

  return (
    <div ref={root} className={cn('relative', className)}>
      <span
        id={labelId}
        className={
          hideLabel ? 'sr-only' : 'mb-1 block text-[11.5px] text-ink-2'
        }
      >
        {label}
      </span>
      <button
        ref={trigger}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}-value`}
        aria-activedescendant={open ? optId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={onKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-md border bg-paper text-left text-ink transition-[border-color,box-shadow] duration-150',
          size === 'sm' ? 'min-h-8 px-2.5 text-[12.5px]' : 'min-h-9 px-2.5 text-[13px]',
          open
            ? 'border-purple-600 shadow-[0_0_0_3px_var(--color-purple-100)]'
            : 'border-rule-strong hover:border-ink',
        )}
      >
        <span id={`${id}-value`} className="truncate">
          {current?.label}
        </span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn(
            'size-3 shrink-0 text-ink-3 transition-transform duration-200 ease-snap',
            open && 'rotate-180 text-purple-600',
          )}
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: placement === 'down' ? -4 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === 'down' ? -4 : 4 }}
            transition={{ duration: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
            className={cn(
              'e4 absolute z-30 min-w-full overflow-hidden rounded-lg border border-line bg-paper p-1 whitespace-nowrap',
              placement === 'down' ? 'top-full mt-1' : 'bottom-full mb-1',
              alignEnd ? 'right-0' : 'left-0',
            )}
          >
            {options.map((o, i) => {
              const selected = i === selectedIndex
              return (
                <li
                  key={o.value}
                  id={optId(i)}
                  role="option"
                  aria-selected={selected}
                  onPointerMove={() => setActive(i)}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => commit(i)}
                  className={cn(
                    'flex min-h-9 items-center justify-between gap-4 rounded-md px-2.5 text-[13px] transition-colors duration-100',
                    i === active ? 'bg-purple-50 text-ink' : 'text-ink-2',
                    selected && 'font-semibold text-purple-700',
                  )}
                >
                  {o.label}
                  {selected && (
                    <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 text-purple-600">
                      <path d="M2.5 6.5L5 9l4.5-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              )
            })}
          </m.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
