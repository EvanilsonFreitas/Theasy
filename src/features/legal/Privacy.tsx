import { Seo } from '@/components/seo/Seo'
import { PageHero } from '@/components/system/PageHero'
import { Section } from '@/components/system/Section'

const sections = [
  {
    title: 'Quais dados coletamos',
    body: 'Somente os dados que você informa no formulário de contato: nome, email, empresa, cargo (opcional), área e frente de interesse (opcionais) e a mensagem.',
  },
  {
    title: 'Para que usamos',
    body: 'Para responder ao seu contato e, se você quiser, dar continuidade à conversa comercial. Não usamos esses dados para outras finalidades nem os vendemos ou compartilhamos para marketing de terceiros.',
  },
  {
    title: 'Cookies e rastreamento',
    body: 'Este site não usa cookies de publicidade nem ferramentas de análise de navegação. As fontes tipográficas são servidas pelo próprio site, sem chamadas a serviços externos.',
  },
  {
    title: 'Envio do formulário',
    body: 'Quando o envio online estiver ativo, os dados do formulário são transmitidos por conexão segura (HTTPS) ao serviço de recebimento de mensagens configurado pela ThEasy.',
  },
  {
    title: 'Seus direitos',
    body: 'Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar a confirmação, o acesso, a correção ou a exclusão dos seus dados. Para isso, use o formulário de contato e indique o pedido na mensagem.',
  },
]

const slug = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const updated = new Date(2026, 10, 13).toLocaleDateString('pt-BR')

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacidade"
        description="Como a ThEasy trata os dados enviados pelo formulário de contato do site."
      />
      <PageHero
        id="privacidade-title"
        label="Política de privacidade"
        title="Como tratamos os seus dados."
        intro={
          <p>
            Texto objetivo sobre o que este site coleta, por que coleta e como
            você pode exercer seus direitos.
          </p>
        }
      >
        <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-[14px]">
          <div className="flex gap-2">
            <dt className="text-ink-3">Versão</dt>
            <dd className="font-semibold">{updated}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-ink-3">Abrange</dt>
            <dd className="font-semibold">
              este site e o formulário de contato
            </dd>
          </div>
        </dl>
      </PageHero>

      <Section labelledBy="indice-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-labelledby="indice-title"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p id="indice-title" className="type-mono text-ink-3 mb-3">
              Nesta página
            </p>
            <ol className="border-rule flex flex-col border-l">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${slug(s.title)}`}
                    className="text-ink-2 hover:text-ink -ml-px flex min-h-10 items-center gap-3 border-l border-transparent pl-4 text-[14.5px] transition-colors hover:border-purple-600"
                  >
                    <span className="type-code text-ink-3 text-[11px]">
                      {i + 1}.
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="max-w-[44em]">
            {sections.map((s, i) => (
              <section
                key={s.title}
                id={slug(s.title)}
                aria-labelledby={`${slug(s.title)}-t`}
                className="border-rule first:border-ink scroll-mt-28 border-t py-7 first:pt-6"
              >
                <h2
                  id={`${slug(s.title)}-t`}
                  className="mb-3 flex items-baseline gap-3 text-[20px] font-semibold"
                >
                  <span className="type-code text-[13px] text-purple-600">
                    {i + 1}.
                  </span>
                  {s.title}
                </h2>
                <p className="text-ink-2 text-[16px] leading-[1.75]">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
