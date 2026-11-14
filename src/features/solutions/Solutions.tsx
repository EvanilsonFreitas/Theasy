import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/system/PageHero'
import { Section } from '@/components/system/Section'
import { ServiceGlyph } from '@/components/system/Glyphs'
import { SystemMapCompact } from '@/components/system/SystemMap'
import { demoBySlug } from '@/components/demos'
import { solutions } from '@/content/solutions'
import { cn } from '@/lib/utils'

export function Solutions() {
  return (
    <>
      <Seo
        title="Soluções"
        description="BI e Analytics, Engenharia de dados, Sistemas sob medida, Automação de processos e Consultoria financeira e de gestão: o que cada competência resolve e entrega, com demonstrações."
      />
      <PageHero
        id="solucoes-title"
        label="Soluções"
        title="Cinco competências, combinadas conforme o problema."
        intro={
          <p>
            Cada frente existe por conta própria, mas muitos problemas pedem a
            combinação: um modelo de preço precisa de dados confiáveis; um
            painel só é útil se o processo por trás funciona.
          </p>
        }
        aside={
          <nav
            aria-label="Competências nesta página"
            className="e2 win border-line rounded-2xl border p-2"
          >
            <ol className="flex flex-col">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="group grid min-h-14 grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-purple-50"
                  >
                    <ServiceGlyph
                      slug={s.slug}
                      className="text-ink-3 transition-colors group-hover:text-purple-600"
                    />
                    <span className="flex flex-col">
                      <span className="text-[15px] font-semibold group-hover:text-purple-700">
                        {s.name}
                      </span>
                      <span className="text-ink-2 text-[13px] leading-snug">
                        {s.short}
                      </span>
                    </span>
                    <span className="type-mono text-ink-3">{s.num}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      {solutions.map((s, idx) => {
        const Demo = demoBySlug[s.slug]
        return (
          <Section
            key={s.slug}
            id={s.slug}
            tone={idx % 2 ? 'paper' : 'page'}
            labelledBy={`${s.slug}-title`}
            className="scroll-mt-16"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-10">
              <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
                <div className="flex items-center gap-3">
                  <span className="bracket flex size-12 items-center justify-center border border-purple-600 bg-purple-50 text-purple-600">
                    <ServiceGlyph slug={s.slug} className="size-7" />
                  </span>
                  <span className="type-mono text-purple-600">
                    {s.num} / 0{solutions.length}
                  </span>
                </div>
                <h2 id={`${s.slug}-title`} className="type-h2">
                  {s.name}
                </h2>
                <p className="type-lead text-ink-2">{s.lead}</p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  <div>
                    <h3 className="type-mono text-ink-3 mb-2.5">
                      Quando faz sentido
                    </h3>
                    <ul className="flex flex-col gap-2 text-[14.5px] leading-snug">
                      {s.when.map((w) => (
                        <li key={w} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="bg-warn mt-[7px] size-1.5 shrink-0 rounded-full"
                          />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="type-mono text-ink-3 mb-2.5">
                      O que entregamos
                    </h3>
                    <ul className="flex flex-col gap-2 text-[14.5px] leading-snug">
                      {s.deliver.map((d) => (
                        <li key={d} className="flex gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-[7px] size-1.5 shrink-0 rounded-full bg-purple-600"
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-rule flex flex-wrap items-center gap-2 border-t pt-4">
                  <span className="type-mono text-ink-3 mr-1">Ferramentas</span>
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="bracket-sm border-line bg-paper border px-2 py-1 text-[12.5px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ButtonLink
                  to={`/contato?assunto=${s.slug}`}
                  variant="secondary"
                  size="md"
                  arrow
                  className="self-start"
                >
                  Conversar sobre {s.name}
                </ButtonLink>
              </div>

              <div
                className={cn(
                  'stage min-w-0 self-start rounded-[18px] p-3 sm:p-6',
                )}
              >
                <Demo />
              </div>
            </div>
          </Section>
        )
      })}

      <Section tone="paper" labelledBy="combinacao-title">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <div className="flex flex-col gap-5">
            <p className="type-mono text-ink-3">Combinação</p>
            <h2 id="combinacao-title" className="type-h2">
              Na prática, as frentes trabalham juntas.
            </h2>
            <p className="type-lead text-ink-2">
              A consultoria define o contexto e a direção; dados, BI, sistemas e
              automações se conectam a uma mesma base. A primeira conversa serve
              para entender quais frentes o seu problema realmente pede.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/contato" arrow>
                Conversar com a ThEasy
              </ButtonLink>
              <ButtonLink to="/aplicacoes" variant="secondary">
                Ver aplicações
              </ButtonLink>
            </div>
          </div>
          <SystemMapCompact active={null} />
        </div>
      </Section>
    </>
  )
}
