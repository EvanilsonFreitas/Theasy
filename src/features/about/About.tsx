import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { PageHero } from '@/components/system/PageHero'
import { Section, SectionHead } from '@/components/system/Section'
import { CompetenceGraphic } from '@/components/system/CompetenceGraphic'
import { Star } from '@/components/system/Star'
import { principles } from '@/content/principles'

const competences = [
  {
    title: 'Negócio',
    body: 'Controladoria e finanças, formação de preço, rentabilidade, custos e margens, gestão de pessoas, processos e projetos.',
    tags: ['Custos', 'Preço', 'Processos'],
  },
  {
    title: 'Dados',
    body: 'Business Intelligence, modelagem analítica, engenharia e integração de dados, qualidade e governança.',
    tags: ['Power BI', 'SQL', 'Modelagem'],
  },
  {
    title: 'Software',
    body: 'Aplicações web, sistemas corporativos, APIs e integrações, automação de processos.',
    tags: ['Python', 'Azure', 'APIs'],
  },
]

const audience = [
  'Empresários e gestores',
  'Diretores e executivos',
  'Líderes de tecnologia e operações',
  'Gestores de BI e dados',
  'Finanças, controladoria e precificação',
  'Quem precisa de soluções sob medida',
]

export function About() {
  return (
    <>
      <Seo
        title="Sobre"
        description="A ThEasy reúne consultoria de negócios, dados e engenharia de software para resolver problemas reais de empresas, do diagnóstico à solução em uso."
      />
      <PageHero
        id="sobre-title"
        label="Sobre a ThEasy"
        title="Consultoria que entende o negócio. Engenharia que entrega a solução."
        intro={
          <p>
            A ThEasy reúne negócio, dados e software. Não vendemos tecnologia
            isolada: entendemos o desafio, identificamos onde está a
            oportunidade de melhoria e construímos a solução adequada ao
            contexto de cada operação.
          </p>
        }
        aside={<CompetenceGraphic />}
      />

      <Section tone="paper" labelledBy="reunimos-title">
        <SectionHead
          id="reunimos-title"
          label="O que reunimos"
          title="Três competências que raramente ficam na mesma mesa."
          intro={
            <p>
              É comum ter quem entenda de negócio, quem entenda de dados e quem
              construa software, muitas vezes em empresas diferentes. Juntar os
              três evita o projeto que funciona tecnicamente e não muda nada.
            </p>
          }
        />
        <ol className="relative mt-10 grid gap-4 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute top-[30px] right-[16%] left-[16%] hidden h-px bg-purple-300 md:block"
          />
          {competences.map((c, i) => (
            <li
              key={c.title}
              className="e1 border-rule bg-paper relative flex flex-col gap-3 rounded-2xl border p-5 sm:p-6"
            >
              <span className="bracket type-code relative flex size-11 items-center justify-center border border-purple-600 bg-purple-50 text-[12px] text-purple-700">
                0{i + 1}
              </span>
              <h3 className="type-h3">{c.title}</h3>
              <p className="text-ink-2 text-[15px] leading-relaxed">{c.body}</p>
              <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="bracket-sm border-line border px-2 py-1 text-[12px]"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="principios-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <SectionHead
            id="principios-title"
            label="Como atuamos"
            title="Princípios de atuação."
          />
          <ol className="border-ink border-t">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="border-rule grid grid-cols-[48px_minmax(0,1fr)] border-b py-5"
              >
                <span className="type-mono pt-1 text-purple-600">0{i + 1}</span>
                <span>
                  <span className="block text-[18px] font-semibold">
                    {p.title}
                  </span>
                  <span className="text-ink-2 mt-1 block text-[15px] leading-relaxed">
                    {p.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="paper" labelledBy="quem-title">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <figure className="e2 relative m-0 overflow-hidden rounded-2xl">
            <Photo
              name="sobre-diagnostico"
              alt="Mão com caneta diante de um quadro branco com esboços de telas"
              ratio="4/5"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="aspect-[4/3]"
            />
            <figcaption className="type-mono from-ink/80 text-on-ink absolute inset-x-0 bottom-0 bg-gradient-to-t to-transparent px-4 pt-10 pb-3 text-[9.5px]">
              Fotografia ilustrativa
            </figcaption>
          </figure>
          <div className="flex flex-col gap-5">
            <SectionHead
              id="quem-title"
              label="Para quem trabalhamos"
              title="Para quem decide e para quem opera."
            />
            <p className="type-lead text-ink-2">
              Conversamos com a diretoria sobre resultado e com a equipe sobre a
              rotina, e escrevemos para que os dois entendam.
            </p>
            <ul className="grid gap-x-6 sm:grid-cols-2">
              {audience.map((a) => (
                <li
                  key={a}
                  className="border-rule flex items-center gap-2.5 border-b py-3 text-[15.5px]"
                >
                  <Star size={10} className="text-purple-500" />
                  {a}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink to="/contato" arrow>
                Conversar com a ThEasy
              </ButtonLink>
              <ButtonLink to="/abordagem" variant="secondary">
                Ver como trabalhamos
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
