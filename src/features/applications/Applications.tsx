import { Link, useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { PageIntro } from '@/components/ui/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import { Worksheet } from '@/components/worksheet/Worksheet'
import { cases } from '@/content/cases'
import { solutionBySlug } from '@/content/solutions'
import { cn } from '@/lib/utils'
import { areaIcons } from '@/content/icons'
import { areaImages } from '@/content/sectors'
import { Photo } from '@/components/ui/Photo'

const areaPhrase: Record<string, string> = {
  Financeiro: 'da área financeira',
  Operações: 'de operações',
  Comercial: 'da área comercial',
  Tecnologia: 'de tecnologia',
  Gestão: 'de gestão',
}

const slugOf = (area: string) =>
  area.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Aplicações por área de negócio. Cada área percorre um caso ILUSTRATIVO
 * na folha de trabalho — não há clientes, cases ou resultados reais aqui.
 * A área selecionada fica na URL (?area=) para poder ser compartilhada.
 */
export function Applications() {
  const [params, setParams] = useSearchParams()
  const active = Math.max(
    0,
    cases.findIndex((c) => slugOf(c.area) === params.get('area')),
  )
  const current = cases[active]

  const choose = (i: number) => {
    setParams(
      { area: slugOf(cases[i].area) },
      { replace: true, preventScrollReset: true },
    )
  }

  return (
    <>
      <Seo
        title="Aplicações"
        description="Como dados, sistemas e consultoria se aplicam às áreas financeira, de operações, comercial, de tecnologia e de gestão, com casos ilustrativos de cada uma."
      />
      <PageIntro
        label="Aplicações"
        title={'Da pergunta\nà decisão, em cada\nárea da empresa.'}
        intro={
          <>
            <p>
              Escolha uma área para ver como uma situação típica atravessa
              quatro momentos: desafio, estrutura, solução e decisão.
            </p>
            <p className="text-ink-3 mt-4 text-[15px]">
              Os casos são ilustrativos: representam problemas recorrentes, sem
              dados, nomes ou resultados de clientes.
            </p>
          </>
        }
      />

      <section
        aria-labelledby="area-title"
        className="border-rule border-b py-14 sm:py-20"
      >
        <div className="container-page">
          <h2 id="area-title" className="sr-only">
            Aplicações por área
          </h2>
          <div
            role="group"
            aria-label="Área de negócio"
            className="no-scrollbar border-ink -mx-4 flex gap-0 overflow-x-auto border-b px-4 sm:mx-0 sm:px-0"
          >
            {cases.map((c, i) => (
              <button
                key={c.area}
                type="button"
                aria-pressed={active === i}
                onClick={() => choose(i)}
                className={cn(
                  'relative inline-flex min-h-14 shrink-0 items-center gap-2.5 px-4 text-lg tracking-[-0.01em] [font-stretch:88%] transition-colors duration-200 sm:px-6 sm:text-xl',
                  active === i
                    ? 'text-ink font-[640] after:absolute after:inset-x-0 after:bottom-[-1px] after:h-[3px] after:bg-purple-600'
                    : 'text-ink-3 hover:text-ink font-[480]',
                )}
              >
                {(() => {
                  const Icon = areaIcons[c.area]
                  return (
                    <Icon
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={1.5}
                    />
                  )
                })()}
                {c.area}
              </button>
            ))}
          </div>

          <figure className="bg-paper-2 relative mt-10 mb-0 overflow-hidden">
            <Photo
              key={current.area}
              name={areaImages[current.area].image}
              alt={areaImages[current.area].alt}
              ratio="16/9"
              sizes="(min-width: 1280px) 1184px, 100vw"
              className="animate-fade-in aspect-[16/9] sm:aspect-[21/8]"
            />
            <figcaption className="type-mono bg-ink text-on-ink absolute bottom-0 left-0 px-3 py-2">
              {current.area} · fotografia ilustrativa
            </figcaption>
          </figure>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
            <Worksheet data={current} />

            <div className="flex flex-col gap-10">
              <div>
                <h3 className="type-mono text-ink-3 mb-1">
                  Aplicações típicas · {current.area}
                </h3>
                <ul className="border-ink border-t">
                  {current.applications.map((a) => (
                    <li
                      key={a}
                      className="border-rule border-b py-3.5 text-lg leading-snug"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="type-mono text-ink-3 mb-3">
                  Frentes envolvidas
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {current.solutions.map((slug) => {
                    const s = solutionBySlug(slug)!
                    return (
                      <li key={slug}>
                        <Link
                          to={`/solucoes#${slug}`}
                          className="border-rule hover:border-ink inline-flex min-h-11 items-center gap-2 border px-3.5 text-sm transition-colors hover:text-purple-600"
                        >
                          <span className="type-mono text-ink-3">{s.num}</span>
                          {s.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <ButtonLink
                to={`/contato?area=${slugOf(current.area)}`}
                arrow
                className="self-start"
              >
                Conversar sobre um desafio {areaPhrase[current.area]}
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="todas-title" className="py-16 sm:py-24">
        <div className="container-page">
          <h2 id="todas-title" className="type-h2 mb-10 max-w-[16em]">
            As perguntas que cada área costuma trazer
          </h2>
          <ul className="border-ink grid border-t md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c, i) => (
              <li
                key={c.area}
                className="border-rule border-b md:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <button
                  type="button"
                  onClick={() => {
                    choose(i)
                    document
                      .getElementById('area-title')
                      ?.parentElement?.scrollIntoView()
                  }}
                  className="group hover:bg-paper-2 flex h-full w-full flex-col items-start gap-3 p-5 text-left transition-colors md:p-6"
                >
                  <span className="type-mono text-ink-3">{c.area}</span>
                  <span className="text-xl leading-snug font-[520] [font-stretch:92%]">
                    “{c.question}”
                  </span>
                  <span className="mt-auto pt-2 text-sm font-semibold text-purple-600">
                    Ver o caso ilustrativo{' '}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
