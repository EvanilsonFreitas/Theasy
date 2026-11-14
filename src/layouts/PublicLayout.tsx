import { Suspense, useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { SiteHeader } from '@/components/navigation/SiteHeader'
import { SiteFooter } from '@/components/navigation/SiteFooter'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function PublicLayout() {
  const { pathname, hash } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  useScrollReveal(mainRef)

  // Troca de rota: a posição de scroll fica com <ScrollRestoration /> (topo
  // em navegações novas, posição anterior no Voltar/Avançar). Aqui movemos o
  // foco: para a âncora, quando houver, ou para o conteúdo principal, para
  // que leitores de tela anunciem a nova página.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      if (!hash) return
    }
    if (hash) {
      // Aguarda a rota (possivelmente lazy) renderizar, por até ~5 s.
      const id = decodeURIComponent(hash.slice(1))
      let tries = 0
      let timer = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
        } else if (tries++ < 100) {
          timer = window.setTimeout(tryScroll, 50)
        }
      }
      tryScroll()
      return () => window.clearTimeout(timer)
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname, hash])

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax} strict>
        <a
          href="#conteudo"
          className="bg-ink sr-only z-50 px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <ScrollRestoration />
        <SiteHeader />
        <main
          id="conteudo"
          ref={mainRef}
          tabIndex={-1}
          className="min-h-[60vh] outline-none"
        >
          <Suspense
            fallback={<div className="min-h-[70vh]" aria-busy="true" />}
          >
            <div key={pathname} className="animate-fade-in">
              <Outlet />
            </div>
          </Suspense>
        </main>
        <SiteFooter />
      </LazyMotion>
    </MotionConfig>
  )
}
