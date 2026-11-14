import { useRef, type KeyboardEvent } from 'react'

/**
 * Navegação por teclado no padrão ARIA de abas: setas, Home e End movem a
 * seleção e o foco (ativação automática).
 */
export function useRovingTabs(count: number, onSelect: (i: number) => void) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    let next = -1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % count
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
      next = (i - 1 + count) % count
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = count - 1
    if (next < 0) return
    e.preventDefault()
    onSelect(next)
    refs.current[next]?.focus()
  }

  const ref = (i: number) => (el: HTMLButtonElement | null) => {
    refs.current[i] = el
  }

  return { onKeyDown, ref }
}
