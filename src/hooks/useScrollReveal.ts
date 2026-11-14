import { useEffect, type RefObject } from 'react'

const SELECTOR = '[data-reveal]:not(.is-in), [data-rise]:not(.is-in)'

/**
 * Observa elementos marcados com `data-reveal` (títulos com máscara) ou
 * `data-rise` (blocos que sobem 16px) dentro do container e adiciona
 * `.is-in` quando entram na viewport. Elementos inseridos depois (troca de
 * rota, abas) são capturados pelo MutationObserver.
 *
 * O estado inicial "escondido" só existe sob `.js` + movimento permitido
 * (ver index.css), então sem JS ou com movimento reduzido tudo é visível.
 */
export function useScrollReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = root.current
    if (!container) return

    if (!('IntersectionObserver' in window)) {
      container
        .querySelectorAll(SELECTOR)
        .forEach((el) => el.classList.add('is-in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    const scan = () =>
      container.querySelectorAll(SELECTOR).forEach((el) => io.observe(el))
    scan()

    const mo = new MutationObserver(scan)
    mo.observe(container, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [root])
}
