import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Section, SectionHead } from '@/components/system/Section'
import { ServiceGlyph } from '@/components/system/Glyphs'
import { demoBySlug } from '@/components/demos'
import { solutions } from '@/content/solutions'
import { useRovingTabs } from '@/hooks/useRovingTabs'
import { cn } from '@/lib/utils'

/**
 * 02 · Showcase de competências: abas à esquerda, palco técnico à direita
 * com uma demonstração própria para cada frente. A troca é coordenada:
 * o conteúdo sai e entra com deslocamento curto e leve mudança de escala.
 */
export function Capabilities() {
  const [active, setActive] = useState(0)
  const tabs = useRovingTabs(solutions.length, setActive)
  const s = solutions[active]
  const Demo = demoBySlug[s.slug]

  return (
    <Section id="competencias" labelledBy="competencias-title">
      <SectionHead
        id="competencias-title"
        label="02 · O que entregamos"
        title="Cinco competências, uma mesma arquitetura."
        intro={
          <p>
            Cada frente resolve um tipo de problema.{' '}
            <span className="text-ink">
              Juntas, ligam a informação da operação às decisões da gestão.
            </span>{' '}
            Escolha uma competência para ver uma demonstração.
          </p>
        }
      />

      <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          <div
            role="tablist"
            aria-label="Competências"
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1"
          >
            {solutions.map((sol, i) => {
              const on = i === active
              return (
                <button
                  key={sol.slug}
                  ref={tabs.ref(i)}
                  id={`tab-${sol.slug}`}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="painel-competencia"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => tabs.onKeyDown(e, i)}
                  className={cn(
                    'group grid grid-cols-[32px_minmax(0,1fr)] items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-[background-color,border-color,box-shadow] duration-200 last:col-span-2 sm:last:col-span-1 lg:px-4 lg:py-3.5',
                    on
                      ? 'e3 bg-paper border-purple-600'
                      : 'border-rule bg-paper hover:border-line hover:bg-paper',
                  )}
                >
                  <ServiceGlyph
                    slug={sol.slug}
                    className={cn(
                      'transition-colors',
                      on
                        ? 'text-purple-600'
                        : 'text-ink-3 group-hover:text-ink-2',
                    )}
                  />
                  <span className="flex flex-col gap-1">
                    <span className="text-[15px] leading-snug font-semibold">
                      {sol.name}
                    </span>
                    <span
                      className={cn(
                        'text-ink-2 hidden text-[13px] leading-snug lg:block',
                        !on && 'lg:hidden',
                      )}
                    >
                      {sol.short}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={s.slug}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="border-rule hidden flex-col gap-4 border-t pt-5 text-[14px] leading-relaxed lg:flex"
            >
              <dl className="flex flex-col gap-4">
                <div>
                  <dt className="type-mono text-ink-3 mb-1">
                    Quando faz sentido
                  </dt>
                  <dd>{s.when[0]}.</dd>
                </div>
                <div>
                  <dt className="type-mono text-ink-3 mb-1">
                    O que entregamos
                  </dt>
                  <dd>{s.deliver.slice(0, 3).join('; ')}.</dd>
                </div>
                <div>
                  <dt className="type-mono text-ink-3 mb-1">Ferramentas</dt>
                  <dd>{s.tools.join(' · ')}</dd>
                </div>
              </dl>
              <Link
                to={`/solucoes#${s.slug}`}
                className="decoration-line inline-flex min-h-11 items-center gap-2 font-[560] underline underline-offset-4 hover:text-purple-600"
              >
                Ver {s.name} em detalhe <span aria-hidden="true">→</span>
              </Link>
            </m.div>
          </AnimatePresence>
        </div>

        <div
          id="painel-competencia"
          role="tabpanel"
          aria-labelledby={`tab-${s.slug}`}
          className="stage relative min-w-0 rounded-[18px] p-3 sm:p-6 xl:p-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={s.slug}
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.99 }}
              transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <Demo />
            </m.div>
          </AnimatePresence>
          <p className="text-ink-2 mt-3 px-1 text-[13px] lg:hidden">
            <strong className="text-ink">Quando faz sentido:</strong>{' '}
            {s.when[0]}.{' '}
            <Link
              to={`/solucoes#${s.slug}`}
              className="font-[560] underline underline-offset-4"
            >
              Ver em detalhe
            </Link>
          </p>
        </div>
      </div>
    </Section>
  )
}
