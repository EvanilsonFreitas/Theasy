import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { PageIntro } from '@/components/ui/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import { SolutionArtifact } from '@/components/solutions/SolutionArtifact'
import { solutions } from '@/content/solutions'
import { problems } from '@/content/problems'
import { solutionIcons } from '@/content/icons'
import { IconMark } from '@/components/ui/IconMark'

export function Solutions() {
  return (
    <>
      <Seo
        title="Soluções"
        description="BI e Analytics, Dados e Engenharia, Sistemas sob medida, Automação de processos e Consultoria de negócios: o que cada frente resolve e entrega."
      />
      <PageIntro
        label="Soluções"
        title={'Cinco frentes,\ncombinadas conforme\no problema.'}
        intro={
          <p>
            Cada frente existe por conta própria, mas os melhores resultados
            costumam vir da combinação: um modelo de preço precisa de dados
            confiáveis; um painel só é útil se o processo por trás funciona.
          </p>
        }
      >
        <nav aria-label="Frentes nesta página" className="mt-12 lg:mt-16">
          <ol className="border-ink grid border-t sm:grid-cols-2 lg:grid-cols-5">
            {solutions.map((s) => (
              <li
                key={s.slug}
                className="border-rule border-b lg:border-r lg:last:border-r-0"
              >
                <a
                  href={`#${s.slug}`}
                  className="group hover:bg-paper-2 flex min-h-full flex-col gap-2 py-4 pr-4 transition-colors duration-150 lg:px-4 lg:first:pl-0"
                >
                  <span className="flex items-center justify-between gap-3">
                    <IconMark
                      icon={solutionIcons[s.slug]}
                      size="sm"
                      className="group-hover:border-purple-600 group-hover:text-purple-600"
                    />
                    <span className="type-mono text-ink-3">{s.num}</span>
                  </span>
                  <span className="text-lg font-[620] tracking-[-0.015em] [font-stretch:85%] group-hover:text-purple-600">
                    {s.name}
                  </span>
                  <span className="text-ink-2 text-sm">{s.short}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageIntro>

      {solutions.map((s, idx) => {
        const related = problems.filter((p) => p.solution === s.slug)
        return (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={
              'border-rule scroll-mt-20 border-b py-16 sm:py-20 lg:py-28 ' +
              (idx % 2 === 1 ? 'bg-paper-2' : '')
            }
          >
            <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
              <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
                <IconMark icon={solutionIcons[s.slug]} size="lg" active />
                <span className="type-mono text-purple-600">
                  {s.num} / 0{solutions.length}
                </span>
                <h2 id={`${s.slug}-title`} data-reveal="" className="type-h2">
                  <span className="reveal-line">
                    <span>{s.name}</span>
                  </span>
                </h2>
                <p className="type-mono text-ink-3 tracking-normal normal-case">
                  Ferramentas, conforme o projeto: {s.tools.join(' · ')}
                </p>
              </div>

              <div className="grid gap-12">
                <p className="type-h3 max-w-[30em]">{s.lead}</p>

                <div className="grid gap-10 md:grid-cols-2">
                  <div>
                    <h3 className="type-mono text-ink-3 mb-3">
                      Faz sentido quando
                    </h3>
                    <ul className="text-ink-2 grid gap-2.5 leading-normal">
                      {s.when.map((w) => (
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
                  <div>
                    <h3 className="type-mono text-ink-3 mb-1">
                      O que entregamos
                    </h3>
                    <ol className="border-ink border-t">
                      {s.deliver.map((d, i) => (
                        <li
                          key={d}
                          className="border-rule grid grid-cols-[2rem_1fr] gap-2 border-b py-3"
                        >
                          <span className="type-mono text-ink-3 pt-0.5">
                            {i + 1}
                          </span>
                          {d}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
                  <SolutionArtifact kind={s.artifact} />
                  <div className="flex flex-col gap-5">
                    {related.length > 0 && (
                      <div>
                        <h3 className="type-mono text-ink-3 mb-3">
                          Situações típicas
                        </h3>
                        <ul className="grid gap-3">
                          {related.map((p) => (
                            <li
                              key={p.text}
                              className="border-rule border-l-2 pl-3 leading-snug"
                            >
                              “{p.text}”
                              <span className="type-mono text-ink-3 mt-1 block">
                                {p.area}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <ButtonLink
                      to={`/contato?assunto=${s.slug}`}
                      variant="secondary"
                      arrow
                      className="self-start"
                    >
                      Conversar sobre {s.name}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      <section className="py-16 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="type-h2 max-w-[14em]">
            Não sabe qual frente procurar? Normal.
          </p>
          <div className="flex flex-col items-start gap-3">
            <p className="text-ink-2 max-w-[28em]">
              Descreva a situação. Identificar a frente certa é o primeiro passo
              do nosso trabalho, não do seu.
            </p>
            <ButtonLink to="/contato" arrow>
              Conversar sobre seu desafio
            </ButtonLink>
            <Link
              to="/aplicacoes"
              className="text-sm underline underline-offset-4 hover:text-purple-600"
            >
              Ou veja aplicações por área de negócio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
