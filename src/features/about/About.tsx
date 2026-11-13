import type { CSSProperties } from 'react'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { STAGES } from '@/content/stages'
import { Photo } from '@/components/ui/Photo'
import { Symbol } from '@/components/brand/Logo'

const principle = [
  { stage: STAGES[0], line: 'O problema de negócio vem primeiro.' },
  { stage: STAGES[1], line: 'Dados e processos ganham estrutura.' },
  { stage: STAGES[2], line: 'A tecnologia é o meio.' },
  { stage: STAGES[3], line: 'A decisão é o resultado.' },
]

const competences = [
  {
    title: 'Negócio',
    body: 'Controladoria e finanças, formação de preço, rentabilidade, custos e margens, gestão de pessoas, processos e projetos.',
  },
  {
    title: 'Dados',
    body: 'Business Intelligence, modelagem analítica, engenharia e integração de dados, qualidade e governança, Power BI e SQL.',
  },
  {
    title: 'Software',
    body: 'Aplicações web, sistemas corporativos e SaaS, APIs e integrações, automação de processos, com Python e Azure quando fazem sentido.',
  },
]

const audience = [
  'Empresários e gestores',
  'Diretores e executivos',
  'Líderes de tecnologia e operações',
  'Gestores de BI e dados',
  'Responsáveis por finanças, controladoria e precificação',
  'Quem precisa de soluções sob medida',
]

export function About() {
  return (
    <>
      <Seo
        title="Sobre"
        description="A ThEasy reúne consultoria de negócios, inteligência analítica e engenharia de software para resolver problemas reais de empresas, começando pelo problema."
      />

      <section aria-labelledby="sobre-title" className="border-rule border-b">
        <div className="container-page pt-12 pb-16 sm:pt-16 lg:pt-24 lg:pb-24">
          <div className="mb-8 flex items-center justify-between gap-6">
            <p className="type-mono text-ink-3">Sobre a ThEasy</p>
            <Symbol animated className="size-16 text-purple-500 sm:size-20" />
          </div>
          <h1 id="sobre-title" className="sr-only">
            Sobre a ThEasy: o problema de negócio vem primeiro
          </h1>
          <ol className="border-ink border-t" aria-hidden="false">
            {principle.map((p, i) => (
              <li
                key={p.stage}
                data-reveal=""
                className="border-rule grid gap-2 border-b py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline sm:gap-6 sm:py-5"
              >
                <span
                  className={
                    i === 3
                      ? 'type-mono text-purple-600'
                      : 'type-mono text-ink-3'
                  }
                >
                  0{i + 1} {p.stage}
                </span>
                <span className="reveal-line">
                  <span
                    className={
                      'block text-[2rem] leading-[1] font-[620] tracking-[-0.035em] [font-stretch:78%] sm:text-[3.25rem] lg:text-[4.25rem] ' +
                      (i === 3 ? 'text-purple-600' : '')
                    }
                  >
                    {p.line}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10 grid gap-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-6">
            <span />
            <p className="type-lead text-ink-2 max-w-[38em]">
              A ThEasy é uma consultoria que reúne negócio, dados e software.
              Não vendemos tecnologia isolada: entendemos o desafio,
              identificamos onde está a oportunidade de melhoria e construímos a
              solução adequada ao contexto de cada operação.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="reunimos-title"
        className="border-rule bg-paper-2 border-b py-16 sm:py-24"
      >
        <div className="container-page">
          <SectionHeader
            id="reunimos-title"
            label="O que reunimos"
            title={'Três competências\nque raramente\nficam na mesma mesa.'}
            intro={
              <p>
                É comum ter quem entenda de negócio, quem entenda de dados e
                quem construa software, muitas vezes em empresas diferentes.
                Juntar os três evita o projeto que funciona tecnicamente e não
                muda nada.
              </p>
            }
          />
          <ul className="border-ink mt-12 grid border-t md:grid-cols-3">
            {competences.map((c, i) => (
              <li
                key={c.title}
                data-rise=""
                style={{ '--i': i } as CSSProperties}
                className="border-rule grid content-start gap-3 border-b py-6 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0"
              >
                <h3 className="type-h3">{c.title}</h3>
                <p className="text-ink-2 leading-relaxed">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="quem-title"
        className="border-rule border-b py-16 sm:py-24"
      >
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            id="quem-title"
            label="Para quem trabalhamos"
            title={'Para quem decide\ne para quem opera.'}
            layout="stack"
            intro={
              <p>
                Conversamos com a diretoria sobre resultado e com a equipe sobre
                a rotina, e escrevemos para que os dois entendam.
              </p>
            }
          />
          <div className="grid gap-8">
            <figure className="m-0">
              <Photo
                name="sobre-diagnostico"
                alt="Mão com caneta diante de um quadro branco com esboços de telas"
                ratio="4/5"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] lg:aspect-[16/10]"
              />
              <figcaption className="type-mono text-ink-3 mt-2 tracking-normal normal-case">
                Fotografia ilustrativa
              </figcaption>
            </figure>
            <ul className="border-ink border-t">
              {audience.map((a) => (
                <li key={a} className="border-rule border-b py-3.5 text-lg">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="type-h2 max-w-[13em]">
            Vamos começar pelo seu problema?
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink to="/contato" arrow>
              Conversar sobre seu desafio
            </ButtonLink>
            <ButtonLink to="/abordagem" variant="secondary">
              Ver como trabalhamos
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  )
}
