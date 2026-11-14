import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { contactCta, primaryNav } from '@/content/site'
import { cn } from '@/lib/utils'

/** Limiares do header compacto (px de scroll), com histerese. */
const COMPACT_AT = 48
const EXPAND_AT = 16

export function SiteHeader() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [glint, setGlint] = useState(0)
  const [panelTop, setPanelTop] = useState<number | null>(null)
  const header = useRef<HTMLElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const openRef = useRef(open)

  // Fecha o menu ao navegar.
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    openRef.current = open
  }, [open])

  // Header compacto no scroll, com histerese: compacta acima de COMPACT_AT e
  // só volta ao tamanho completo abaixo de EXPAND_AT. A leitura é limitada a
  // um quadro por vez (rAF) e o estado só muda ao cruzar um limiar, então
  // não há renderização por pixel nem oscilação perto do limite. Com o menu
  // aberto o estado fica congelado.
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      if (openRef.current) return
      const y = window.scrollY
      setCompact((c) => (c ? y > EXPAND_AT : y > COMPACT_AT))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Brilho curto da estrela a cada troca de estado (não toca na montagem).
  const [lastCompact, setLastCompact] = useState(compact)
  if (lastCompact !== compact) {
    setLastCompact(compact)
    setGlint((g) => g + 1)
  }

  // Menu aberto: trava o scroll do documento, Esc fecha, foco preso no painel.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'

    const first = panel.current?.querySelector<HTMLElement>('a, button')
    first?.focus()

    // Conteúdo atrás do menu fica inerte (leitores de tela e teclado).
    const behind = [
      document.getElementById('conteudo'),
      document.querySelector('body footer'),
      document.querySelector<HTMLElement>('a[href="#conteudo"]'),
      document.querySelector<HTMLElement>('[data-whatsapp-float]'),
    ].filter((el): el is HTMLElement => !!el)
    behind.forEach((el) => (el.inert = true))

    // Ao passar para a largura desktop, o painel some: fecha o menu.
    const desktop = window.matchMedia('(min-width: 64rem)')
    const onDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false)
    }
    desktop.addEventListener('change', onDesktop)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = panel.current.querySelectorAll<HTMLElement>('a, button')
      const firstEl = items[0]
      const lastEl = items[items.length - 1]
      const toggle = menuButton.current
      // Ciclo: botão Menu ↔ itens do painel
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault()
        toggle?.focus()
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault()
        toggle?.focus()
      } else if (document.activeElement === toggle) {
        e.preventDefault()
        ;(e.shiftKey ? lastEl : firstEl)?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onDesktop)
      behind.forEach((el) => (el.inert = false))
    }
  }, [open])

  return (
    <header
      ref={header}
      data-compact={compact || undefined}
      className={cn(
        // A altura no fluxo nunca muda (sem deslocar o conteúdo). O header
        // fica preso alguns pixels acima da viewport, então a faixa visível
        // passa de 64/72 para 56/60 px; a linha interna se recentra com
        // transform.
        'bg-paper border-rule sticky -top-2 z-40 border-b transition-[box-shadow] duration-300 md:-top-3',
        compact || open
          ? 'shadow-[0_10px_28px_-18px_rgb(21_19_27/0.28)]'
          : 'shadow-[0_10px_28px_-18px_rgb(21_19_27/0)]',
      )}
    >
      <div
        className={cn(
          'frame ease-snap flex h-16 items-center justify-between gap-6 transition-transform duration-[360ms] md:h-[4.5rem]',
          compact ? 'translate-y-1 md:translate-y-1.5' : 'translate-y-0',
        )}
      >
        <Link to="/" className="-m-2 p-2" aria-label="ThEasy, página inicial">
          <Logo tagline compact={compact} glint={glint} />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'relative inline-flex min-h-11 items-center px-3.5 text-[15px] transition-colors duration-150 hover:text-purple-600',
                      'after:ease-snap after:absolute after:inset-x-3.5 after:bottom-2 after:h-0.5 after:origin-left after:bg-purple-600 after:transition-transform after:duration-200',
                      isActive
                        ? 'text-ink font-semibold after:scale-x-100'
                        : 'text-ink after:scale-x-0 hover:after:scale-x-100',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            to={contactCta.to}
            variant="ink"
            size="md"
            arrow
            className="hidden sm:inline-flex"
          >
            {contactCta.short}
          </ButtonLink>
          <button
            ref={menuButton}
            type="button"
            className="border-line bg-paper inline-flex min-h-11 items-center gap-2.5 rounded-lg border px-3.5 text-[15px] font-medium lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => {
              // O painel começa exatamente na borda inferior visível do
              // header, qualquer que seja o estado (completo ou compacto).
              setPanelTop(
                header.current?.getBoundingClientRect().bottom ?? null,
              )
              setOpen((o) => !o)
            }}
          >
            <span>{open ? 'Fechar' : 'Menu'}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={cn(
                  'ease-snap absolute left-0 h-px w-full bg-current transition-transform duration-200',
                  open ? 'top-1/2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'ease-snap absolute left-0 h-px w-full bg-current transition-transform duration-200',
                  open ? 'top-1/2 -rotate-45' : 'bottom-0',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            ref={panel}
            id="menu-mobile"
            key="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
            style={panelTop != null ? { top: panelTop } : undefined}
            className="on-ink bg-ink text-on-ink fixed inset-x-0 top-16 bottom-0 overflow-y-auto md:top-[4.5rem] lg:hidden"
          >
            <nav
              aria-label="Menu"
              className="container-page flex min-h-full flex-col pt-6 pb-8"
            >
              <ul>
                {[...primaryNav, { to: '/contato', label: 'Contato' }].map(
                  (item, i) => (
                    <m.li
                      key={item.to}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.36,
                        delay: 0.04 + i * 0.045,
                        ease: [0.2, 0.8, 0.2, 1],
                      }}
                      className="border-ink-line border-b"
                    >
                      <NavLink
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'flex min-h-16 items-baseline justify-between gap-4 py-4 text-[1.75rem] leading-none font-semibold tracking-[-0.02em]',
                            isActive ? 'text-purple-300' : 'text-on-ink',
                          )
                        }
                      >
                        <span>{item.label}</span>
                        <span className="type-mono text-on-ink-3">
                          0{i + 1}
                        </span>
                      </NavLink>
                    </m.li>
                  ),
                )}
              </ul>
              <div className="mt-auto pt-10">
                <ButtonLink
                  to={contactCta.to}
                  onClick={() => setOpen(false)}
                  variant="on-ink"
                  arrow
                  className="w-full"
                >
                  {contactCta.label}
                </ButtonLink>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
