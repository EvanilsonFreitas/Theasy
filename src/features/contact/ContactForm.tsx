import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { SelectField, TextAreaField, TextField } from '@/components/ui/Field'
import { areas } from '@/content/problems'
import { solutions } from '@/content/solutions'
import {
  ContactNotConfiguredError,
  contactConfigured,
  formatContactText,
  sendContact,
  type ContactPayload,
} from '@/services/contactService'

const schema = z.object({
  nome: z.string().trim().min(2, 'Informe seu nome.'),
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu email.')
    .email('Confira o email, parece incompleto.'),
  empresa: z.string().trim().min(2, 'Informe o nome da empresa.'),
  cargo: z.string().trim().optional(),
  area: z.string().optional(),
  assunto: z.string().optional(),
  mensagem: z
    .string()
    .trim()
    .min(20, 'Conte um pouco mais sobre a situação (mínimo de 20 caracteres).')
    .max(4000, 'Mensagem muito longa. Resuma em até 4.000 caracteres.'),
  /** Campo-isca contra spam: deve permanecer vazio. */
  website: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

type Status =
  | { kind: 'idle' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }
  | { kind: 'unconfigured'; text: string }

interface ContactFormProps {
  defaults: Partial<FormValues>
}

export function ContactForm({ defaults }: ContactFormProps) {
  const [status, setStatusRaw] = useState<Status>({ kind: 'idle' })
  const [statusNonce, setStatusNonce] = useState(0)
  const setStatus = (s: Status) => {
    setStatusRaw(s)
    setStatusNonce((n) => n + 1)
  }
  const [copied, setCopied] = useState(false)
  const resultRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: '',
      email: '',
      empresa: '',
      cargo: '',
      area: '',
      assunto: '',
      mensagem: '',
      website: '',
      ...defaults,
    },
    shouldFocusError: true,
  })

  useEffect(() => {
    if (status.kind !== 'idle') resultRef.current?.focus()
  }, [status.kind, statusNonce])

  const onSubmit = async (values: FormValues) => {
    if (values.website) return // bot
    const payload: ContactPayload = {
      nome: values.nome,
      email: values.email,
      empresa: values.empresa,
      cargo: values.cargo || undefined,
      area: values.area || undefined,
      assunto:
        solutions.find((s) => s.slug === values.assunto)?.name || undefined,
      mensagem: values.mensagem,
    }
    try {
      await sendContact(payload)
      setStatus({ kind: 'success' })
      reset()
    } catch (err) {
      if (err instanceof ContactNotConfiguredError) {
        setStatus({ kind: 'unconfigured', text: formatContactText(payload) })
      } else {
        setStatus({
          kind: 'error',
          message:
            'Não foi possível enviar agora. Verifique a conexão e tente novamente. Seus dados continuam no formulário.',
        })
      }
    }
  }

  if (status.kind === 'success') {
    return (
      <div
        ref={resultRef}
        tabIndex={-1}
        role="status"
        className="border-ink flex flex-col gap-5 border p-6 outline-none sm:p-10"
      >
        <span className="type-mono text-purple-600">Mensagem enviada</span>
        <p className="type-h2">Recebemos sua mensagem.</p>
        <p className="type-lead text-ink-2">
          Vamos ler com atenção e responder pelo email informado para marcar uma
          primeira conversa.
        </p>
        <Button
          variant="secondary"
          className="self-start"
          onClick={() => setStatus({ kind: 'idle' })}
        >
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      className="border-ink flex flex-col gap-6 border p-5 sm:p-8 lg:p-10"
      aria-labelledby="form-title"
    >
      <div className="flex flex-col gap-1">
        <h2 id="form-title" className="type-h3">
          Conte o que está acontecendo
        </h2>
        <p className="text-ink-3 text-sm">
          Campos sem a marcação “opcional” são obrigatórios.
        </p>
      </div>

      <TextAreaField
        label="A situação"
        rows={6}
        placeholder="O que está difícil hoje? Que decisão, processo ou número preocupa?"
        error={errors.mensagem?.message}
        {...register('mensagem')}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          label="Área do desafio"
          optional
          placeholder="Selecione"
          options={areas.map((a) => ({ value: a, label: a }))}
          {...register('area')}
        />
        <SelectField
          label="Frente de interesse"
          optional
          placeholder="Ainda não sei"
          options={solutions.map((s) => ({ value: s.slug, label: s.name }))}
          {...register('assunto')}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Nome"
          autoComplete="name"
          error={errors.nome?.message}
          {...register('nome')}
        />
        <TextField
          label="Email corporativo"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Empresa"
          autoComplete="organization"
          error={errors.empresa?.message}
          {...register('empresa')}
        />
        <TextField
          label="Cargo"
          optional
          autoComplete="organization-title"
          {...register('cargo')}
        />
      </div>

      {/* Campo-isca: invisível para pessoas, preenchido por robôs. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">Não preencha este campo</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <p className="text-ink-3 text-sm leading-relaxed">
        Usamos estes dados apenas para responder ao seu contato. Veja a{' '}
        <Link
          to="/privacidade"
          className="underline underline-offset-4 hover:text-purple-600"
        >
          política de privacidade
        </Link>
        .
      </p>

      {status.kind === 'error' && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="border-danger text-danger border-l-[3px] bg-[#fdf3f2] p-4 text-sm outline-none"
        >
          {status.message}
        </div>
      )}

      {status.kind === 'unconfigured' && (
        <div
          ref={resultRef}
          tabIndex={-1}
          role="alert"
          className="flex flex-col gap-3 border border-purple-600 bg-purple-50 p-4 outline-none sm:p-5"
        >
          <p className="font-semibold">
            O envio online ainda não está ativo neste site.
          </p>
          <p className="text-ink-2 text-sm leading-relaxed">
            Sua mensagem <strong>não foi enviada</strong>. Copie o texto abaixo
            e guarde a mensagem até o canal de envio estar disponível.
          </p>
          <pre className="border-rule bg-paper max-h-48 overflow-auto border p-3 font-mono text-xs whitespace-pre-wrap">
            {status.text}
          </pre>
          <Button
            variant="secondary"
            size="md"
            className="self-start"
            onClick={() => {
              void navigator.clipboard
                ?.writeText(status.text)
                .then(() => setCopied(true))
                .catch(() => setCopied(false))
            }}
          >
            {copied ? 'Texto copiado' : 'Copiar mensagem'}
          </Button>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          arrow={!isSubmitting}
          disabled={isSubmitting}
          aria-describedby={!contactConfigured ? 'envio-nota' : undefined}
          onClick={() => {
            // garante foco no primeiro erro mesmo com noValidate
            if (Object.keys(errors).length)
              setFocus(Object.keys(errors)[0] as keyof FormValues)
          }}
        >
          {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
        </Button>
        {!contactConfigured && (
          <p id="envio-nota" className="text-ink-3 text-sm">
            Envio online em configuração.
          </p>
        )}
      </div>
    </form>
  )
}
