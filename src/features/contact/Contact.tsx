import { useLocation, useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { SectionHeader } from '@/components/ui/SectionHeader'
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
      <section className="border-rule border-b">
        <div className="container-page grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:pt-24 lg:pb-24">
          <div className="flex flex-col gap-12">
            <SectionHeader
              as="h1"
              size="display"
              label="Contato"
              title={'Conte qual\né o desafio.'}
              layout="stack"
              intro={
                <p>
                  A primeira conversa serve para entender a situação, antes de
                  falar de qualquer ferramenta.
                </p>
              }
            />
            <ol className="border-ink border-t" aria-label="Como funciona">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  className="border-rule grid grid-cols-[2.5rem_1fr] gap-2 border-b py-4"
                >
                  <span className="type-mono text-ink-3 pt-1">0{i + 1}</span>
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

          <div className="relative lg:pt-2">
            <ContactForm
              defaults={{
                mensagem: stateMessage,
                assunto: solutionBySlug(assunto) ? assunto : '',
                area,
              }}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <SectionHeader
            id="faq-title"
            label="Perguntas frequentes"
            title={'Antes da\nprimeira conversa.'}
            layout="stack"
          />
          <div className="border-ink border-t">
            {faq.map((f) => (
              <details key={f.q} className="group border-rule border-b">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="type-mono text-ink-3 shrink-0 text-base transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="text-ink-2 max-w-[40em] pb-6 leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
