import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SelectOption<T extends string> {
  value: T
  label: string
}

const GAP = 4
const EDGE = 8

/**
 * Seletor do design system no padrão WAI-ARIA "select-only combobox":
 * o foco permanece no gatilho (aria-activedescendant), setas, Home e End
 * navegam, Enter, Espaço ou Alt+↑ selecionam, Esc fecha, digitar busca pela
 * primeira letra (também com a lista fechada). A lista é renderizada em
 * portal com posição fixa, então molduras com overflow oculto (janelas das
 * demos) não a cortam; abre para cima quando falta espaço abaixo e rola
 * internamente se não couber.
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
  const [pos, setPos] = useState<CSSProperties>({})
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const list = useRef<HTMLUListElement>(null)
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
  const search = (key: string) => {
    const now = Date.now()
    typed.current.text =
      (now - typed.current.at < 600 ? typed.current.text : '') +
      key.toLowerCase()
    typed.current.at = now
    return options.findIndex((o) =>
      o.label.toLowerCase().startsWith(typed.current.text),
    )
  }

  // Posição fixa a partir do gatilho; acompanha scroll e redimensionamento.
  useLayoutEffect(() => {
    if (!open) return
    const place = () => {
      const t = trigger.current
      if (!t) return
      const r = t.getBoundingClientRect()
      const wanted = options.length * 40 + 10
      const below = window.innerHeight - r.bottom - GAP - EDGE
      const above = r.top - GAP - EDGE
      const up = below < wanted && above > below
      const alignEnd = r.left + Math.max(r.width, 200) > window.innerWidth - EDGE
      setPlacement(up ? 'up' : 'down')
      setPos({
        position: 'fixed',
        minWidth: r.width,
        maxHeight: Math.max(120, up ? above : below),
        ...(up
          ? { bottom: window.innerHeight - r.top + GAP }
          : { top: r.bottom + GAP }),
        ...(alignEnd
          ? { right: window.innerWidth - r.right }
          : { left: r.left }),
      })
    }
    place()
    window.addEventListener('scroll', place, { capture: true, passive: true })
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place, { capture: true })
      window.removeEventListener('resize', place)
    }
  }, [open, options.length])

  // Mantém a opção ativa visível quando a lista rola. Rola só a lista
  // (nunca a página, como scrollIntoView faria).
  useEffect(() => {
    const ul = list.current
    const el = ul?.querySelector<HTMLElement>(`[id="${id}-opt-${active}"]`)
    if (!open || !ul || !el) return
    if (el.offsetTop < ul.scrollTop) ul.scrollTop = el.offsetTop
    else if (el.offsetTop + el.offsetHeight > ul.scrollTop + ul.clientHeight)
      ul.scrollTop = el.offsetTop + el.offsetHeight - ul.clientHeight
  }, [open, active, id])

  // Clique ou toque fora (do gatilho e da lista) fecha.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (!root.current?.contains(t) && !list.current?.contains(t))
        setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1
    const printable = e.key.length === 1 && /\S/.test(e.key) && !e.ctrlKey && !e.metaKey
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault()
        openAt(selectedIndex)
      } else if (e.key === 'Home') {
        e.preventDefault()
        openAt(0)
      } else if (e.key === 'End') {
        e.preventDefault()
        openAt(last)
      } else if (printable) {
        const hit = search(e.key)
        openAt(hit >= 0 ? hit : selectedIndex)
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
        if (e.altKey) commit(active)
        else setActive((a) => Math.max(0, a - 1))
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
    if (printable) {
      const hit = search(e.key)
      if (hit >= 0) setActive(hit)
    }
  }

  return (
    <div ref={root} className={cn('relative', className)}>
      <span
        id={labelId}
        className={
          hideLabel ? 'sr-only' : 'text-ink-2 mb-1 block text-[11.5px]'
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
        aria-labelledby={labelId}
        aria-activedescendant={open ? optId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex))}
        onKeyDown={onKeyDown}
        className={cn(
          'bg-paper text-ink flex w-full items-center justify-between gap-3 rounded-md border text-left transition-[border-color,box-shadow] duration-150',
          size === 'sm'
            ? 'min-h-8 px-2.5 text-[12.5px]'
            : 'min-h-9 px-2.5 text-[13px]',
          open
            ? 'border-purple-600 shadow-[0_0_0_3px_var(--color-purple-100)]'
            : 'border-rule-strong hover:border-ink',
        )}
      >
        <span className="truncate">{current?.label}</span>
        <svg
          viewBox="0 0 12 12"
          aria-hidden="true"
          className={cn(
            'text-ink-3 ease-snap size-3 shrink-0 transition-transform duration-200',
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

      {createPortal(
        <AnimatePresence>
          {open && (
            <m.ul
              ref={list}
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              initial={{ opacity: 0, y: placement === 'down' ? -4 : 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: placement === 'down' ? -4 : 4 }}
              transition={{ duration: 0.14, ease: [0.2, 0.8, 0.2, 1] }}
              style={pos}
              className="e4 border-line bg-paper z-50 overflow-y-auto rounded-lg border p-1 whitespace-nowrap"
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
                      i === active ? 'text-ink bg-purple-50' : 'text-ink-2',
                      selected && 'font-semibold text-purple-700',
                    )}
                  >
                    {o.label}
                    {selected && (
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className="size-3 text-purple-600"
                      >
                        <path
                          d="M2.5 6.5L5 9l4.5-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </li>
                )
              })}
            </m.ul>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  )
}
