import { useLocation, useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { Section, SectionHead } from '@/components/system/Section'
import { areas } from '@/content/problems'
import { solutionBySlug } from '@/content/solutions'
import { ContactForm } from './ContactForm'

const steps = [
  {
    title: 'Você descreve a situação',
    body: 'Do jeito que ela aparece no dia a dia. Não precisa saber qual tecnologia resolve.',
  },
  {
    title: 'Marcamos uma conversa',
    body: 'Para entender o contexto, as áreas envolvidas e o que já foi tentado.',
  },
  {
    title: 'Propomos o próximo passo',
    body: 'Se fizer sentido seguir, um diagnóstico com escopo e prazo claros.',
  },
]

const faq = [
  {
    q: 'Preciso saber qual solução quero?',
    a: 'Não. A maioria das conversas começa por uma situação: um número que não fecha, um processo lento, uma decisão difícil. Definir a solução faz parte do trabalho.',
  },
  {
    q: 'Vocês trabalham apenas com Power BI?',
    a: 'Não. Power BI é uma das ferramentas que usamos em projetos de BI. A escolha depende do problema, do ambiente que a empresa já tem e de quem vai manter a solução.',
  },
  {
    q: 'O que acontece depois da entrega?',
    a: 'A entrega inclui documentação e transferência de conhecimento para a sua equipe. Quando faz sentido, seguimos com evolução e suporte.',
  },
]

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function Contact() {
  const location = useLocation()
  const [params] = useSearchParams()
  const stateMessage =
    (location.state as { message?: string } | null)?.message ?? ''
  const assunto = params.get('assunto') ?? ''
  const areaParam = params.get('area') ?? ''
  const area = areas.find((a) => normalize(a) === areaParam) ?? ''

  return (
    <>
      <Seo
        title="Contato"
        description="Conte o desafio da sua empresa. A primeira conversa serve para entender a situação; se fizer sentido, a ThEasy propõe um diagnóstico com escopo claro."
      />
      <section aria-labelledby="contato-title" className="bg-paper relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_80%_10%,rgb(139_108_240/0.09),transparent_70%)]"
        />
        <div className="frame relative grid gap-12 pt-10 pb-16 sm:pt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:pt-16 lg:pb-24">
          <div className="flex flex-col gap-6">
            <p className="type-mono text-purple-600">Contato</p>
            <h1 id="contato-title" className="type-display">
              Vamos entender a situação.
            </h1>
            <p className="type-lead text-ink-2">
              A primeira conversa serve para entender o contexto, antes de falar
              de qualquer ferramenta.
            </p>
            <ol
              aria-label="Como funciona"
              className="relative mt-2 flex flex-col gap-1"
            >
              <span
                aria-hidden="true"
                className="bg-line absolute top-5 bottom-5 left-[17px] w-px"
              />
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="relative grid grid-cols-[36px_minmax(0,1fr)] gap-4 py-3"
                >
                  <span
                    className={
                      'bracket type-code relative flex size-9 items-center justify-center border text-[11px] ' +
                      (i === 0
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-line bg-paper text-ink-3')
                    }
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-ink-2 mt-1 text-[15px] leading-normal">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative">
            <ContactForm
              // remonta ao mudar ?assunto ou ?area, para refletir os novos valores
              key={location.key}
              defaults={{
                mensagem: stateMessage,
                assunto: solutionBySlug(assunto) ? assunto : '',
                area,
              }}
            />
          </div>
        </div>
      </section>

      <Section labelledBy="faq-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <SectionHead
            id="faq-title"
            label="Perguntas frequentes"
            title="Antes da primeira conversa."
          />
          <div className="flex flex-col gap-2.5">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group border-rule bg-paper open:e2 open:border-line rounded-xl border transition-shadow"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="bracket-sm border-line text-ink-2 flex size-7 shrink-0 items-center justify-center border transition-transform duration-200 group-open:rotate-45 group-open:border-purple-600 group-open:text-purple-600"
                  >
                    +
                  </span>
                </summary>
                <p className="text-ink-2 max-w-[40em] px-5 pb-5 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
