/**
 * Envio do formulário de contato.
 *
 * O site é estático (GitHub Pages) e o repositório não possui backend nem
 * serviço de e-mail configurado. Por isso o envio usa um endpoint externo
 * definido em build:
 *
 *   VITE_CONTACT_ENDPOINT=https://…   (recebe POST JSON e responde 2xx)
 *
 * Compatível com serviços de formulário (ex.: Formspree, Getform) ou com uma
 * função própria (Azure Functions, etc.). Sem essa variável o formulário NÃO
 * finge sucesso: a interface informa que o envio online não está ativo e
 * oferece copiar a mensagem. Ver DESIGN.md › Contato.
 */

export interface ContactPayload {
  nome: string
  email: string
  empresa: string
  cargo?: string
  area?: string
  assunto?: string
  mensagem: string
}

export class ContactNotConfiguredError extends Error {
  constructor() {
    super('Canal de envio não configurado (VITE_CONTACT_ENDPOINT).')
    this.name = 'ContactNotConfiguredError'
  }
}

const endpoint = (import.meta.env.VITE_CONTACT_ENDPOINT ?? '').trim()

export const contactConfigured = endpoint.length > 0

export async function sendContact(
  payload: ContactPayload,
  signal?: AbortSignal,
): Promise<void> {
  if (!contactConfigured) throw new ContactNotConfiguredError()

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    redirect: 'error',
    body: JSON.stringify({
      ...payload,
      origem: 'site',
      enviadoEm: new Date().toISOString(),
    }),
    signal: signal ?? AbortSignal.timeout(15000),
  })

  if (!res.ok) {
    throw new Error(`Falha no envio (HTTP ${res.status}).`)
  }
}

/** Texto plano da mensagem, para copiar quando não houver envio online. */
export function formatContactText(p: ContactPayload) {
  const header = [
    `Nome: ${p.nome}`,
    `Email: ${p.email}`,
    `Empresa: ${p.empresa}`,
    p.cargo ? `Cargo: ${p.cargo}` : null,
    p.area ? `Área: ${p.area}` : null,
    p.assunto ? `Assunto: ${p.assunto}` : null,
  ].filter((l): l is string => l !== null)
  return `${header.join('\n')}\n\n${p.mensagem}`
}
