import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button, ButtonLink } from '@/components/ui/Button'
import { TextAreaField } from '@/components/ui/Field'
import { Symbol } from '@/components/brand/Logo'

/**
 * Encerramento: o visitante começa a descrever o desafio aqui e continua no
 * formulário de contato com o texto já preenchido (via state da rota).
 * Nenhum envio acontece nesta etapa.
 */
export function ClosingCta() {
  const navigate = useNavigate()
  const [text, setText] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void navigate('/contato', { state: { message: text.trim() } })
  }

  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-10">
          <Symbol animated className="size-20 text-purple-500 sm:size-24" />
          <SectionHeader
            id="cta-title"
            label="§ 06 · Primeira conversa"
            title={'Conte qual\né o desafio.'}
            size="display"
            layout="stack"
            intro={
              <p>
                A primeira conversa serve para entender a situação. Se fizer
                sentido seguir, propomos um diagnóstico com escopo claro.
              </p>
            }
          />
        </div>
        <form
          onSubmit={onSubmit}
          className="border-ink flex flex-col gap-5 self-end border p-5 sm:p-8"
          aria-label="Começar pelo desafio"
        >
          <TextAreaField
            label="O que está acontecendo na sua empresa?"
            name="desafio"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ex.: fechamos o mês em planilhas e os números do comercial não batem com os do financeiro."
            hint="Você revisa e completa os dados de contato na próxima etapa."
          />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button type="submit" arrow>
              Continuar para o contato
            </Button>
            <ButtonLink to="/solucoes" variant="text">
              Prefiro ver as soluções antes
            </ButtonLink>
          </div>
        </form>
      </div>
    </section>
  )
}
