import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import { SolutionArtifact } from '@/components/solutions/SolutionArtifact'
import { solutions } from '@/content/solutions'
import { solutionIcons } from '@/content/icons'
import { IconMark } from '@/components/ui/IconMark'
import { cn } from '@/lib/utils'

/**
 * Explorador de soluções: lista numerada (abas) + painel com o que a frente
 * resolve, o que entrega e a forma do entregável. Substitui a grade de
 * cards idênticos com ícones.
 */
export function SolutionExplorer() {
  const uid = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const sol = solutions[active]

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = solutions.length - 1
    const next: Record<string, number> = {
      ArrowDown: i === last ? 0 : i + 1,
      ArrowRight: i === last ? 0 : i + 1,
      ArrowUp: i === 0 ? last : i - 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }
    if (e.key in next) {
      e.preventDefault()
      setActive(next[e.key])
      tabs.current[next[e.key]]?.focus()
    }
  }

  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-title"
      className="border-rule bg-paper-2 border-b py-16 sm:py-24 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="solucoes-title"
          label="§ 02 · Soluções"
          title={'Cinco frentes.\nUma pergunta: o que\nprecisa mudar?'}
          intro={
            <p>
              Negócio, dados e software sob o mesmo teto. Na maioria dos
              projetos, mais de uma frente trabalha junto, e o diagnóstico
              define a combinação.
            </p>
          }
        />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-10">
          <div
            role="tablist"
            aria-label="Frentes de solução"
            aria-orientation="vertical"
            className="no-scrollbar border-ink -mx-4 flex gap-0 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:border-t lg:px-0"
          >
            {solutions.map((s, i) => {
              const selected = i === active
              return (
                <button
                  key={s.slug}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  id={`${uid}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    'group flex min-h-12 shrink-0 items-center gap-3 border-b-2 px-3 py-3 text-left transition-colors duration-200 lg:border-b lg:border-[#d9d5e0] lg:px-1 lg:py-[1.1rem]',
                    selected
                      ? 'border-purple-600 text-purple-600'
                      : 'text-ink border-transparent hover:text-purple-600',
                  )}
                >
                  <IconMark
                    icon={solutionIcons[s.slug]}
                    active={selected}
                    size="sm"
                    className="hidden lg:inline-flex"
                  />
                  <span className="type-mono text-[11px] opacity-70 lg:hidden">
                    {s.num}
                  </span>
                  <span
                    className={cn(
                      'leading-tight tracking-[-0.015em] whitespace-nowrap [font-stretch:85%] transition-[font-size,font-weight] duration-200 lg:whitespace-normal',
                      selected
                        ? 'text-lg font-[640] lg:text-[1.625rem]'
                        : 'text-lg font-[480] lg:text-xl',
                    )}
                  >
                    {s.name}
                  </span>
                </button>
              )
            })}
          </div>

          <div
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${active}`}
            className="border-ink bg-paper border"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={sol.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                className="grid gap-8 p-5 sm:p-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-10 xl:p-10"
              >
                <div className="flex flex-col gap-6">
                  <p className="type-mono text-purple-600">
                    {sol.num} · {sol.name}
                  </p>
                  <p className="type-h3">{sol.lead}</p>
                  <div>
                    <p className="type-mono text-ink-3 mb-3">
                      Faz sentido quando
                    </p>
                    <ul className="text-ink-2 grid gap-2 text-[15px] leading-normal">
                      {sol.when.map((w) => (
                        <li key={w} className="grid grid-cols-[1rem_1fr] gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-[0.55em] block size-1.5 bg-purple-500"
                          />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ButtonLink
                    to={`/solucoes#${sol.slug}`}
                    variant="text"
                    arrow
                    className="self-start"
                  >
                    Ver a frente {sol.name}
                  </ButtonLink>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="type-mono text-ink-3 mb-2">
                      O que entregamos
                    </p>
                    <ul className="text-[15px]">
                      {sol.deliver.map((d) => (
                        <li key={d} className="border-rule border-b py-2.5">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SolutionArtifact kind={sol.artifact} />
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
