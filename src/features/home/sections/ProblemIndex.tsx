import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { areas, problems, type Area } from '@/content/problems'
import { solutionBySlug } from '@/content/solutions'
import { areaIcons } from '@/content/icons'
import { cn } from '@/lib/utils'

type Filter = Area | 'Todas'

const INITIAL = 6

/**
 * Índice de problemas — o visitante se reconhece em uma situação e é levado
 * à frente de solução correspondente. Os filtros por área substituem a
 * tradicional grade de "setores atendidos".
 */
export function ProblemIndex() {
  const [filter, setFilter] = useState<Filter>('Todas')
  const [expanded, setExpanded] = useState(false)
  const filtered = problems.filter(
    (p) => filter === 'Todas' || p.area === filter,
  )
  const collapsible = filter === 'Todas' && filtered.length > INITIAL
  const list = collapsible && !expanded ? filtered.slice(0, INITIAL) : filtered

  return (
    <section
      id="problemas"
      aria-labelledby="problemas-title"
      className="border-rule scroll-mt-16 border-b py-16 sm:py-24 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="problemas-title"
          label="§ 01 · Problemas reais"
          title={'Algum destes\nsoa familiar?'}
          intro={
            <p>
              Projetos raramente começam com “precisamos de um dashboard”.
              Começam com uma situação que custa tempo, dinheiro ou confiança.
              Escolha uma área e veja por onde começaríamos.
            </p>
          }
        />

        <div
          className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filtrar problemas por área"
        >
          {(['Todas', ...areas] as Filter[]).map((a) => {
            const active = filter === a
            return (
              <button
                key={a}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(a)}
                className={cn(
                  'inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-sm transition-colors duration-150',
                  active
                    ? 'border-ink bg-ink text-white'
                    : 'border-rule bg-paper text-ink hover:border-ink',
                )}
              >
                {a !== 'Todas' &&
                  (() => {
                    const Icon = areaIcons[a]
                    return (
                      <Icon
                        aria-hidden="true"
                        className="size-4"
                        strokeWidth={1.5}
                      />
                    )
                  })()}
                {a}
              </button>
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {list.length} de {filtered.length} situações{' '}
          {filter === 'Todas' ? 'no total' : `em ${filter}`}
        </p>

        <ul id="lista-problemas" className="border-ink mt-4 border-t">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p) => {
              const sol = solutionBySlug(p.solution)!
              return (
                <m.li
                  key={p.text}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="border-rule border-b"
                >
                  <Link
                    to={`/solucoes#${sol.slug}`}
                    className="group hover:bg-paper-2 grid gap-x-8 gap-y-2 px-1 py-5 transition-colors duration-150 sm:px-2 sm:py-6 md:grid-cols-[minmax(0,1fr)_9rem_15rem] md:items-baseline"
                  >
                    <span className="text-[1.1875rem] leading-[1.25] font-[520] tracking-[-0.01em] [font-stretch:90%] sm:text-[1.5rem]">
                      {p.text}
                    </span>
                    <span className="type-mono text-ink-3 flex items-center gap-2">
                      {(() => {
                        const Icon = areaIcons[p.area]
                        return (
                          <Icon
                            aria-hidden="true"
                            className="size-4"
                            strokeWidth={1.5}
                          />
                        )
                      })()}
                      {p.area}
                    </span>
                    <span className="text-ink flex items-baseline gap-2 text-[15px] font-semibold group-hover:text-purple-600">
                      <span className="type-mono text-ink-3 font-normal md:hidden">
                        Por onde começar:
                      </span>
                      <span>{sol.name}</span>
                      <span
                        aria-hidden="true"
                        className="ease-snap transition-transform duration-150 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </m.li>
              )
            })}
          </AnimatePresence>
        </ul>

        {collapsible && (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="lista-problemas"
            onClick={() => setExpanded((e) => !e)}
            className="mt-6 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold underline decoration-1 underline-offset-[6px] hover:text-purple-600"
          >
            {expanded
              ? 'Mostrar menos'
              : `Mostrar mais ${filtered.length - INITIAL} situações`}
            <span aria-hidden="true">{expanded ? '↑' : '↓'}</span>
          </button>
        )}
      </div>
    </section>
  )
}
