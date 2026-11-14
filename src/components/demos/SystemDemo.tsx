import { useState, type FormEvent } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

type Status = 'ok' | 'risk' | 'late' | 'done'

const STATUS: Record<Status, { label: string; cls: string }> = {
  ok: { label: 'No prazo', cls: 'bg-ok-bg text-ok' },
  risk: { label: 'Em risco', cls: 'bg-warn-bg text-warn' },
  late: { label: 'Atrasado', cls: 'bg-danger-bg text-danger' },
  done: { label: 'Concluído', cls: 'bg-paper-2 text-ink-2' },
}

const STAGES = ['Corte', 'Montagem', 'Pintura', 'Qualidade', 'Expedição']

interface Row {
  id: string
  client: string
  stage: string
  status: Status
  owner: string
  due: string
  note: string
}

/** Pedidos fictícios: clientes identificados apenas por código. */
const INITIAL: Row[] = [
  {
    id: '4821',
    client: 'Cliente 014 · Indústria',
    stage: 'Corte',
    status: 'ok',
    owner: 'Ana',
    due: '18/11',
    note: '',
  },
  {
    id: '4822',
    client: 'Cliente 027 · Distribuição',
    stage: 'Montagem',
    status: 'risk',
    owner: 'Bruno',
    due: '15/11',
    note: 'Aguardando peça do fornecedor.',
  },
  {
    id: '4823',
    client: 'Cliente 003 · Varejo',
    stage: 'Pintura',
    status: 'ok',
    owner: 'Carla',
    due: '21/11',
    note: '',
  },
  {
    id: '4824',
    client: 'Cliente 041 · Serviços',
    stage: 'Expedição',
    status: 'late',
    owner: 'Diego',
    due: '12/11',
    note: 'Transportadora remarcou a coleta.',
  },
  {
    id: '4825',
    client: 'Cliente 009 · Agro',
    stage: 'Qualidade',
    status: 'done',
    owner: 'Elisa',
    due: '13/11',
    note: '',
  },
  {
    id: '4826',
    client: 'Cliente 033 · Saúde',
    stage: 'Montagem',
    status: 'ok',
    owner: 'Bruno',
    due: '27/11',
    note: '',
  },
]

const MODULES = ['Pedidos', 'Produção', 'Estoque', 'Clientes', 'Relatórios']
type Filter = 'all' | Status

export function SystemDemo() {
  const [rows, setRows] = useState(INITIAL)
  const [sel, setSel] = useState('4822')
  const [filter, setFilter] = useState<Filter>('all')
  const [draft, setDraft] = useState<{ stage: string; note: string } | null>(
    null,
  )
  const [saved, setSaved] = useState(false)

  const r = rows.find((x) => x.id === sel) ?? rows[0]
  const form = draft ?? { stage: r.stage, note: r.note }
  const visible = rows.filter((x) => filter === 'all' || x.status === filter)
  const count = (s: Filter) =>
    s === 'all' ? rows.length : rows.filter((x) => x.status === s).length

  const pick = (id: string) => {
    setSel(id)
    setDraft(null)
    setSaved(false)
  }

  const save = (e: FormEvent) => {
    e.preventDefault()
    setRows((all) => all.map((x) => (x.id === r.id ? { ...x, ...form } : x)))
    setDraft(null)
    setSaved(true)
  }

  return (
    <DemoFrame
      title="Gestão de pedidos"
      badge="Interface demonstrativa"
      bodyClassName="grid grid-cols-[minmax(0,1fr)] @2xl:grid-cols-[124px_minmax(0,1fr)_214px]"
    >
      <nav
        aria-label="Módulos do sistema demonstrativo"
        className="bg-ink text-on-ink-2 p-2.5"
      >
        <ul className="flex flex-wrap gap-1 @2xl:flex-col">
          {MODULES.map((mod, i) => (
            <li key={mod}>
              <span
                aria-current={i === 0 ? 'page' : undefined}
                className={cn(
                  'block rounded-md px-2.5 py-2 text-[13px] whitespace-nowrap',
                  i === 0 &&
                    'bg-ink-soft font-semibold text-white shadow-[inset_2px_0_0_var(--color-purple-300)]',
                )}
              >
                {mod}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-rule min-w-0 @2xl:border-r">
        <div className="border-rule flex flex-wrap items-center justify-between gap-2 border-b px-3.5 py-2">
          <span className="text-[13.5px] font-semibold">
            Pedidos em produção
          </span>
          <div
            role="group"
            aria-label="Filtrar por status"
            className="flex flex-wrap gap-1"
          >
            {(['all', 'risk', 'late'] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'min-h-8 rounded-md border px-2 text-[12px] transition-colors',
                  filter === f
                    ? 'border-ink bg-ink text-white'
                    : 'border-line text-ink-2 hover:text-ink',
                )}
              >
                {f === 'all' ? 'Todos' : STATUS[f].label}{' '}
                <span className="tabular-nums opacity-70">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12.5px] @md:min-w-[400px]">
            <caption className="sr-only">
              Pedidos demonstrativos; selecione um pedido para ver e editar o
              detalhe.
            </caption>
            <thead className="bg-page">
              <tr className="border-rule border-b">
                {['Nº', 'Cliente', 'Etapa', 'Status'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className={cn(
                      'type-mono text-ink-3 px-2.5 py-2 text-[9.5px] font-normal @md:px-3.5',
                      h === 'Etapa' && 'hidden @md:table-cell',
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'border-paper-2 border-b transition-colors',
                    sel === row.id
                      ? 'bg-purple-50 shadow-[inset_3px_0_0_var(--color-purple-600)]'
                      : 'hover:bg-page',
                  )}
                >
                  <td className="px-2.5 py-1 tabular-nums @md:px-3.5">
                    <button
                      type="button"
                      aria-pressed={sel === row.id}
                      onClick={() => pick(row.id)}
                      className="decoration-line -mx-1 min-h-8 rounded px-1 font-medium underline underline-offset-2 hover:text-purple-600"
                    >
                      {row.id}
                    </button>
                  </td>
                  <td className="max-w-[150px] truncate px-2.5 py-1 @md:px-3.5">
                    {row.client}
                  </td>
                  <td className="text-ink-2 hidden px-2.5 py-1 @md:table-cell @md:px-3.5">
                    {row.stage}
                  </td>
                  <td className="px-2.5 py-1 @md:px-3.5">
                    <span
                      className={cn(
                        'rounded-[5px] px-[7px] py-[3px] text-[11px] font-semibold whitespace-nowrap',
                        STATUS[row.status].cls,
                      )}
                    >
                      {STATUS[row.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.form
          key={r.id}
          onSubmit={save}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.18 }}
          aria-label={`Detalhe do pedido ${r.id}`}
          className="border-rule bg-page flex flex-col gap-2.5 border-t p-3.5 @2xl:border-t-0"
        >
          <div className="flex items-center justify-between">
            <span className="type-mono text-ink-3 text-[9.5px]">
              Pedido {r.id}
            </span>
            <span
              className={cn(
                'rounded-[5px] px-[7px] py-[3px] text-[11px] font-semibold',
                STATUS[r.status].cls,
              )}
            >
              {STATUS[r.status].label}
            </span>
          </div>
          <span className="text-[14.5px] font-semibold">{r.client}</span>
          <p className="text-ink-2 text-[12px]">
            {r.owner} · prazo {r.due}
          </p>
          <label className="text-ink-2 flex flex-col gap-1 text-[11.5px]">
            Etapa
            <select
              value={form.stage}
              onChange={(e) => {
                setDraft({ ...form, stage: e.target.value })
                setSaved(false)
              }}
              className="border-rule-strong bg-paper text-ink min-h-9 rounded-md border px-2 text-[13px]"
            >
              {STAGES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="text-ink-2 flex flex-col gap-1 text-[11.5px]">
            Observação
            <textarea
              rows={2}
              value={form.note}
              onChange={(e) => {
                setDraft({ ...form, note: e.target.value })
                setSaved(false)
              }}
              className="border-rule-strong bg-paper text-ink resize-none rounded-md border px-2 py-1.5 text-[12.5px]"
            />
          </label>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!draft}
              className="disabled:bg-line disabled:text-ink-2 min-h-9 rounded-md bg-purple-600 px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-purple-800"
            >
              Salvar
            </button>
            <span role="status" className="text-ok text-[11.5px]">
              {saved ? 'Salvo nesta demonstração' : ''}
            </span>
          </div>
        </m.form>
      </AnimatePresence>
    </DemoFrame>
  )
}
