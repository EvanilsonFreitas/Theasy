import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/system/PageHero'
import { Section, SectionHead } from '@/components/system/Section'
import { Star } from '@/components/system/Star'
import { ProcessStepper } from '@/components/process/ProcessStepper'
import { approach } from '@/content/approach'
import { principles } from '@/content/principles'

const commitments = [
  {
    title: 'Diagnóstico antes da ferramenta',
    text: 'A recomendação de tecnologia vem depois de entender o problema, nunca antes.',
  },
  {
    title: 'Implantação faz parte do trabalho',
    text: 'Uma entrega só termina quando está em uso, com pessoas treinadas e responsáveis definidos.',
  },
  {
    title: 'Regras visíveis',
    text: 'Indicadores, cálculos e integrações são documentados para quem vai usar e manter.',
  },
]

export function Approach() {
  return (
    <>
      <Seo
        title="Abordagem"
        description="Diagnóstico, desenho da solução, desenvolvimento, implantação e evolução: as cinco etapas do método da ThEasy e o que cada uma entrega."
      />
      <PageHero
        id="abordagem-title"
        label="Abordagem"
        title="Um método em cinco etapas, do diagnóstico à evolução."
        intro={
          <p>
            Cada etapa termina com uma entrega concreta, avaliada por quem vai
            usar. Assim o projeto corrige a rota cedo e chega à rotina da
            empresa, não só à apresentação.
          </p>
        }
        aside={
          <ol
            className="e2 win border-line flex flex-col rounded-2xl border p-2"
            aria-label="Etapas e entregáveis"
          >
            {approach.map((s, i) => (
              <li
                key={s.num}
                className="relative grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 px-3 py-2.5"
              >
                {i < approach.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="bg-line absolute top-[42px] bottom-[-10px] left-[33px] w-px"
                  />
                )}
                <span className="bracket type-code relative flex size-9 items-center justify-center border border-purple-600 bg-purple-50 text-[11px] text-purple-700">
                  {s.num}
                </span>
                <span className="flex flex-col">
                  <span className="text-[15px] font-semibold">{s.name}</span>
                  <span className="text-ink-2 text-[13px]">
                    Entrega: {s.output.toLowerCase()}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        }
      />

      <Section tone="paper" labelledBy="etapas-title">
        <SectionHead
          id="etapas-title"
          label="As etapas"
          title="O que acontece em cada etapa."
          intro={
            <p>
              Selecione uma etapa para ver o detalhe, as perguntas que ela
              responde e o entregável.
            </p>
          }
        />
        <div className="mt-10 lg:mt-12">
          <ProcessStepper detailed />
        </div>
      </Section>

      <Section labelledBy="principios-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <SectionHead
            id="principios-title"
            label="Como conduzimos"
            title="Princípios que orientam cada projeto."
          />
          <div className="border-rule bg-rule grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="bg-paper flex flex-col gap-2 p-5 sm:p-6"
              >
                <span className="type-mono text-purple-600">0{i + 1}</span>
                <h3 className="text-[17px] font-semibold">{p.title}</h3>
                <p className="text-ink-2 text-[14.5px] leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper" labelledBy="compromissos-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <SectionHead
            id="compromissos-title"
            label="Compromissos"
            title="O que não fica de fora."
          />
          <ul className="border-ink flex flex-col border-t">
            {commitments.map((c) => (
              <li
                key={c.title}
                className="border-rule grid grid-cols-[28px_minmax(0,1fr)] gap-3 border-b py-5"
              >
                <Star size={14} className="mt-1.5 text-purple-600" />
                <span>
                  <span className="block text-[17px] font-semibold">
                    {c.title}
                  </span>
                  <span className="text-ink-2 mt-1 block text-[15px] leading-relaxed">
                    {c.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-rule bg-page mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-8">
          <p className="type-h3 max-w-[26em]">
            A primeira etapa começa com uma conversa sobre a situação.
          </p>
          <ButtonLink to="/contato" arrow>
            Conversar com a ThEasy
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
