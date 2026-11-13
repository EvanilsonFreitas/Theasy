import { useId, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Star } from '@/components/system/Star'
import { cn } from '@/lib/utils'

const AREAS = [
  { slug: 'financeiro', label: 'Financeiro' },
  { slug: 'operacoes', label: 'Operações' },
  { slug: 'comercial', label: 'Comercial' },
  { slug: 'logistica', label: 'Logística' },
  { slug: 'gestao', label: 'Gestão' },
  { slug: 'tecnologia', label: 'Tecnologia' },
]

const MAX = 600

/**
 * 07 · Encerramento. O visitante descreve a situação aqui e continua no
 * formulário de contato com o texto e a área já preenchidos. Nenhum envio
 * acontece nesta etapa, e a interface diz isso.
 */
export function ClosingCta() {
  const navigate = useNavigate()
  const [text, setText] = useState('')
  const [area, setArea] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const id = useId()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (text.trim().length < 10) {
      setError(true)
      document.getElementById(`${id}-msg`)?.focus()
      return
    }
    const query = area ? `?area=${area}` : ''
    void navigate(`/contato${query}`, { state: { message: text.trim() } })
  }

  return (
    <section
      aria-labelledby="cta-title"
      className="on-ink bg-ink text-on-ink relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_75%_at_88%_0%,rgb(139_108_240/0.24),transparent_70%),radial-gradient(40%_50%_at_0%_100%,rgb(139_108_240/0.08),transparent_70%)]"
      />
      <div className="frame md:border-ink-line relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 lg:py-24">
        <div className="flex flex-col gap-5">
          <p className="type-mono text-purple-300">07 · Primeira conversa</p>
          <h2 id="cta-title" className="type-h2">
            Conte qual desafio sua empresa quer resolver.
          </h2>
          <p className="type-lead text-on-ink-2 max-w-[30em]">
            A primeira conversa serve para entender o contexto. Se fizer sentido
            seguir, propomos um diagnóstico com escopo claro.
          </p>
          <ol className="relative mt-3 flex flex-col">
            <span
              aria-hidden="true"
              className="bg-ink-line absolute top-3 bottom-3 left-[6px] w-px"
            />
            {[
              'Você descreve a situação',
              'Conversamos sobre o contexto',
              'Propomos o próximo passo',
            ].map((s, i) => (
              <li
                key={s}
                className="relative flex items-center gap-4 py-2 text-[15px]"
              >
                {i === 0 ? (
                  <Star size={13} className="relative text-purple-300" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="border-on-ink-3 bg-ink relative ml-[1px] size-[11px] rounded-full border-[1.5px]"
                  />
                )}
                <span className={i === 0 ? 'text-on-ink' : 'text-on-ink-2'}>
                  <span className="sr-only">Passo {i + 1}: </span>
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          aria-label="Começar pelo desafio"
          className="border-ink-line flex flex-col gap-5 self-start rounded-[18px] border bg-[linear-gradient(180deg,#221e2b,#1a1722)] p-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_30px_60px_-20px_rgb(0_0_0/0.5)] sm:p-7"
        >
          <fieldset>
            <legend className="text-[14px] font-[560]">
              Em qual área está o desafio?{' '}
              <span className="text-on-ink-3 font-normal">opcional</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {AREAS.map((a) => {
                const on = area === a.slug
                return (
                  <button
                    key={a.slug}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setArea(on ? null : a.slug)}
                    className={cn(
                      'min-h-10 rounded-lg border px-3 text-[13.5px] transition-colors duration-150',
                      on
                        ? 'text-on-ink border-purple-300 bg-purple-300/15'
                        : 'text-on-ink-2 hover:border-on-ink-3 hover:text-on-ink border-[#4a4555]',
                    )}
                  >
                    {a.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between gap-3">
              <label htmlFor={`${id}-msg`} className="text-[14px] font-[560]">
                Qual é a situação hoje?
              </label>
              <span
                className="type-code text-on-ink-3 text-[11px]"
                aria-hidden="true"
              >
                {text.length}/{MAX}
              </span>
            </div>
            <textarea
              id={`${id}-msg`}
              rows={5}
              maxLength={MAX}
              value={text}
              aria-invalid={error || undefined}
              aria-describedby={`${id}-help`}
              onChange={(e) => {
                setText(e.target.value)
                if (error) setError(false)
              }}
              placeholder="Ex.: o fechamento mensal leva duas semanas e ninguém confia no número de margem."
              className={cn(
                'text-on-ink placeholder:text-on-ink-3 w-full resize-y rounded-[10px] border bg-[#121019] px-3.5 py-3 text-[15px] transition-[border-color,box-shadow] duration-150 focus:outline-none focus-visible:outline-none',
                error
                  ? 'border-[#f19a90] shadow-[0_0_0_3px_rgb(241_154_144/0.25)]'
                  : 'hover:border-on-ink-3 border-[#4a4555] focus:border-purple-300 focus:shadow-[0_0_0_3px_rgb(185_168_248/0.25)]',
              )}
            />
            <p
              id={`${id}-help`}
              className={cn(
                'text-[13px]',
                error ? 'text-[#f6b8b0]' : 'text-on-ink-3',
              )}
            >
              {error
                ? 'Escreva ao menos uma frase sobre a situação para continuar.'
                : 'Nada é enviado aqui. Na próxima etapa você revisa o texto e informa nome e email.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button type="submit" variant="on-ink" arrow>
              Continuar para o contato
            </Button>
            <ButtonLink
              to="/solucoes"
              variant="text"
              className="text-on-ink decoration-on-ink-3 hover:text-purple-300"
            >
              Prefiro ver as soluções antes
            </ButtonLink>
          </div>
        </form>
      </div>
    </section>
  )
}
