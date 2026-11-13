import { Seo } from '@/components/seo/Seo'
import { PageIntro } from '@/components/ui/PageIntro'

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

export function Privacy() {
  return (
    <>
      <Seo
        title="Privacidade"
        description="Como a ThEasy trata os dados enviados pelo formulário de contato do site."
      />
      <PageIntro
        label="Privacidade"
        title={'Como tratamos\nos seus dados.'}
        intro={<p>Texto objetivo sobre o que este site coleta e por quê.</p>}
      />
      <section className="py-14 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
          <p className="type-mono text-ink-3">
            Versão de {new Date(2026, 10, 13).toLocaleDateString('pt-BR')}
          </p>
          <div className="border-ink max-w-[44em] border-t">
            {sections.map((s) => (
              <section key={s.title} className="border-rule border-b py-7">
                <h2 className="type-h3 mb-3">{s.title}</h2>
                <p className="text-ink-2 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
