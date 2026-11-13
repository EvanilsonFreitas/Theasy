import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { SystemMap, SystemMapCompact } from '@/components/system/SystemMap'
import { solutions, type SolutionSlug } from '@/content/solutions'
import { cn } from '@/lib/utils'

/**
 * Primeira dobra: oferta em uma frase, as cinco competências como chaves
 * do mapa e a arquitetura ilustrativa à direita. Passar o cursor (ou o foco)
 * em uma competência acende os nós e caminhos que ela envolve.
 */
export function Hero() {
  const [active, setActive] = useState<SolutionSlug | null>(null)

  return (
    <section aria-labelledby="hero-title" className="bg-paper relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_30%,rgb(139_108_240/0.09),transparent_70%)]"
      />
      <div className="frame relative grid gap-10 pt-10 pb-14 sm:pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-12 lg:pt-16 lg:pb-20">
        <div className="flex flex-col gap-6">
          <p className="type-mono text-purple-600">
            Consultoria em dados, tecnologia e gestão
          </p>
          <h1
            id="hero-title"
            className="type-display max-w-[15ch] lg:max-w-none"
          >
            Dados, BI e sistemas para fazer sua empresa funcionar melhor.
          </h1>
          <p className="type-lead text-ink-2 max-w-[34em]">
            A ThEasy une consultoria de negócios, engenharia de dados,
            desenvolvimento de software e automação para transformar desafios
            operacionais em soluções práticas.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink to="/solucoes" arrow>
              Conhecer as soluções
            </ButtonLink>
            <ButtonLink to="/contato" variant="secondary">
              Conversar com a ThEasy
            </ButtonLink>
          </div>

          <div className="border-rule mt-1 flex flex-col gap-2.5 border-t pt-5">
            <p id="hero-servicos" className="type-mono text-ink-3">
              O que entregamos
              <span className="hidden lg:inline">
                {' '}
                · passe o cursor para ver no mapa
              </span>
            </p>
            <ul
              aria-labelledby="hero-servicos"
              className="flex flex-wrap gap-2"
            >
              {solutions.map((s) => {
                const on = active === s.slug
                return (
                  <li key={s.slug}>
                    <Link
                      to={`/solucoes#${s.slug}`}
                      onMouseEnter={() => setActive(s.slug)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(s.slug)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        'bracket-sm inline-flex min-h-11 items-center border px-3 text-[13.5px] font-[560] transition-[background-color,border-color,color,box-shadow] duration-200',
                        on
                          ? 'e3 border-purple-600 bg-purple-50 text-purple-700'
                          : 'e1 border-line bg-paper text-ink hover:border-purple-500',
                      )}
                    >
                      {s.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="e2 bracket hidden sm:block">
            <SystemMap active={active} />
          </div>
          <div className="sm:hidden">
            <SystemMapCompact active={active} />
          </div>
        </div>
      </div>
    </section>
  )
}
