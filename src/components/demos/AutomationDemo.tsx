import { useRef, useState } from 'react'
import { useFitScale } from '@/hooks/useFitScale'
import { cn } from '@/lib/utils'
import { DemoFrame, Segmented } from './DemoFrame'
import { useStepper } from './useStepper'

/*
 * Fluxo de automação com gatilho, condição, ações e resultado. A opção
 * "simular divergência" desvia a execução para o ramo de exceção.
 */

const W = 760
const H = 250

type NodeId = 'trigger' | 'extract' | 'cond' | 'act' | 'done' | 'exc' | 'alert'

const NODES: Record<
  NodeId,
  {
    x: number
    y: number
    w: number
    h: number
    kind: string
    title: string
    text: string
  }
> = {
  trigger: {
    x: 16,
    y: 95,
    w: 120,
    h: 60,
    kind: 'Gatilho',
    title: 'Todo dia às 7h',
    text: 'agenda',
  },
  extract: {
    x: 168,
    y: 95,
    w: 118,
    h: 60,
    kind: 'Ação',
    title: 'Extrai vendas',
    text: 'do ERP',
  },
  cond: {
    x: 316,
    y: 86,
    w: 132,
    h: 78,
    kind: 'Condição',
    title: 'Totais conferem?',
    text: 'ERP × metas',
  },
  act: {
    x: 474,
    y: 18,
    w: 128,
    h: 60,
    kind: 'Ação',
    title: 'Atualiza base',
    text: 'e painel',
  },
  done: {
    x: 626,
    y: 18,
    w: 130,
    h: 60,
    kind: 'Resultado',
    title: 'Resumo enviado',
    text: 'à diretoria',
  },
  exc: {
    x: 474,
    y: 172,
    w: 128,
    h: 60,
    kind: 'Exceção',
    title: 'Abre registro',
    text: 'com a divergência',
  },
  alert: {
    x: 626,
    y: 172,
    w: 130,
    h: 60,
    kind: 'Resultado',
    title: 'Alerta enviado',
    text: 'ao responsável',
  },
}

const EDGES: { from: NodeId; to: NodeId; d: string; label?: string }[] = [
  { from: 'trigger', to: 'extract', d: 'M136 125H168' },
  { from: 'extract', to: 'cond', d: 'M286 125H318' },
  {
    from: 'cond',
    to: 'act',
    d: 'M448 125C462 125 458 48 474 48',
    label: 'sim',
  },
  { from: 'act', to: 'done', d: 'M602 48H626' },
  {
    from: 'cond',
    to: 'exc',
    d: 'M448 125C462 125 458 202 474 202',
    label: 'não',
  },
  { from: 'exc', to: 'alert', d: 'M602 202H626' },
]

const MANUAL = [
  { t: 'Baixar o relatório de vendas do ERP', r: 'depende de acesso' },
  { t: 'Copiar os dados para a planilha', r: 'risco de erro' },
  { t: 'Conferir totais com o financeiro', r: 'troca de mensagens' },
  { t: 'Atualizar os gráficos à mão', r: 'repetitivo' },
  { t: 'Enviar por email para a diretoria', r: 'chega tarde' },
]

export function AutomationDemo() {
  const [mode, setMode] = useState<'manual' | 'auto'>('auto')
  const [diverge, setDiverge] = useState(false)
  const { done, running, run } = useStepper(5, 750)
  const wrap = useRef<HTMLDivElement>(null)
  const scale = useFitScale(wrap, W + 16)

  const path: NodeId[] = diverge
    ? ['trigger', 'extract', 'cond', 'exc', 'alert']
    : ['trigger', 'extract', 'cond', 'act', 'done']
  const idx = (n: NodeId) => path.indexOf(n)
  const state = (n: NodeId) => {
    const i = idx(n)
    if (i < 0) return 'off'
    return i < done ? 'done' : i === done && running ? 'run' : 'wait'
  }
  const edgeState = (e: (typeof EDGES)[number]) => {
    const a = idx(e.from)
    const b = idx(e.to)
    if (a < 0 || b < 0) return 'off'
    return b < done ? 'done' : b === done && running ? 'run' : 'wait'
  }

  const choose = (m: 'manual' | 'auto') => {
    setMode(m)
    if (m === 'auto') run()
  }

  const toggleDiverge = () => {
    setDiverge((v) => !v)
    run()
  }

  const outcome = diverge
    ? 'Divergência detectada: registro aberto e responsável avisado. O resumo só sai após a conferência.'
    : 'Totais conferidos: base e painel atualizados, resumo enviado às 07:02.'

  return (
    <DemoFrame
      title="Relatório diário de vendas"
      badge="Processo ilustrativo"
      actions={
        <Segmented
          label="Modo do processo"
          value={mode}
          onChange={choose}
          options={[
            { id: 'manual', label: 'Antes · manual' },
            { id: 'auto', label: 'Depois · automatizado' },
          ]}
        />
      }
    >
      {mode === 'manual' ? (
        <div className="bg-page flex flex-col gap-2.5 p-5">
          <span className="type-mono text-ink-3 text-[9.5px]">
            Hoje · cinco passos feitos à mão, todos os dias
          </span>
          <ol className="flex flex-col gap-2">
            {MANUAL.map((s, i) => (
              <li
                key={s.t}
                className="border-rule-strong/50 bg-paper grid grid-cols-[26px_minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 rounded-lg border border-dashed px-3.5 py-2.5 @xl:grid-cols-[26px_minmax(0,1fr)_auto]"
              >
                <span className="type-mono text-ink-3">0{i + 1}</span>
                <span className="text-[14px]">{s.t}</span>
                <span className="text-warn col-start-2 text-[11.5px] @xl:col-start-auto">
                  {s.r}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-ink-2 mt-1 text-[13px]">
            Escolha <strong className="text-ink">Depois · automatizado</strong>{' '}
            para ver o mesmo processo como fluxo.
          </p>
        </div>
      ) : (
        <>
          <div className="stage hidden border-0 border-b @2xl:block">
            <div
              ref={wrap}
              className="px-2 py-4"
              style={{ height: H * scale + 32 }}
            >
              <div
                role="img"
                aria-label={`Fluxo demonstrativo: gatilho diário, extração do ERP e conferência dos totais. ${diverge ? 'Com divergência, segue para o ramo de exceção e alerta.' : 'Com totais corretos, atualiza base e painel e envia o resumo.'}`}
                className="relative origin-top-left"
                style={{ width: W, height: H, transform: `scale(${scale})` }}
              >
                <svg
                  width={W}
                  height={H}
                  viewBox={`0 0 ${W} ${H}`}
                  aria-hidden="true"
                  className="absolute inset-0"
                >
                  {EDGES.map((e) => {
                    const s = edgeState(e)
                    return (
                      <g key={e.d}>
                        <path
                          d={e.d}
                          fill="none"
                          strokeWidth={s === 'off' ? 1 : 1.4}
                          strokeDasharray={s === 'off' ? '3 4' : undefined}
                          className={cn(
                            'transition-[stroke] duration-300',
                            s === 'run'
                              ? 'wire-flow stroke-purple-600'
                              : s === 'done'
                                ? 'stroke-purple-500'
                                : 'stroke-wire',
                          )}
                        />
                        {e.label && (
                          <text
                            x="452"
                            y={e.label === 'sim' ? 80 : 178}
                            className={cn(
                              'font-mono text-[9px] uppercase',
                              s === 'off' ? 'fill-ink-3' : 'fill-purple-700',
                            )}
                          >
                            {e.label}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </svg>
                {(Object.keys(NODES) as NodeId[]).map((id) => {
                  const n = NODES[id]
                  const s = state(id)
                  return (
                    <div
                      key={id}
                      className={cn(
                        'bracket absolute border px-3 py-2 transition-[opacity,border-color,box-shadow,background-color] duration-300',
                        s === 'run'
                          ? 'e3 bg-paper border-purple-600'
                          : s === 'done'
                            ? 'e1 bg-paper border-purple-300'
                            : 'border-line bg-paper',
                        s === 'off' &&
                          'bg-page text-ink-2 [&_span]:text-ink-3 border-dashed',
                        id === 'cond' && 'bg-purple-50/50',
                        (id === 'exc' || id === 'alert') &&
                          s !== 'off' &&
                          'border-warn/60',
                      )}
                      style={{ left: n.x, top: n.y, width: n.w, height: n.h }}
                    >
                      <span
                        className={cn(
                          'type-mono block text-[9px]',
                          id === 'exc' ? 'text-warn' : 'text-ink-3',
                        )}
                      >
                        {n.kind}
                      </span>
                      <span className="block text-[12.5px] leading-tight font-semibold whitespace-nowrap">
                        {n.title}
                      </span>
                      <span className="text-ink-2 block text-[11px] whitespace-nowrap">
                        {n.text}
                      </span>
                      {s === 'done' && (
                        <span
                          aria-hidden="true"
                          className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-bold text-white"
                        >
                          ✓
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <ol className="border-rule flex flex-col gap-2 border-b p-4 @2xl:hidden">
            {path.map((id, i) => {
              const n = NODES[id]
              const s = state(id)
              return (
                <li
                  key={id}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-3 py-2.5',
                    s === 'run'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-rule bg-paper',
                  )}
                >
                  <span
                    className={cn(
                      'bracket-sm flex size-7 shrink-0 items-center justify-center border text-[11px] font-bold',
                      s === 'done'
                        ? 'border-purple-600 bg-purple-600 text-white'
                        : 'border-line text-ink-2',
                    )}
                  >
                    {s === 'done' ? '✓' : i + 1}
                  </span>
                  <span className="flex flex-col">
                    <span className="type-mono text-ink-3 text-[9px]">
                      {n.kind}
                    </span>
                    <span className="text-[13px] font-semibold">
                      {n.title}{' '}
                      <span className="text-ink-2 font-normal">{n.text}</span>
                    </span>
                  </span>
                </li>
              )
            })}
          </ol>

          <div className="flex flex-col gap-3 p-4 @xl:flex-row @xl:items-center @xl:justify-between">
            <p
              aria-live="polite"
              className="text-ink-2 text-[13px] leading-relaxed"
            >
              <span className="type-mono text-ink-3 mr-2 text-[9.5px]">
                Resultado
              </span>
              {running ? `Executando etapa ${done + 1} de 5…` : outcome}
            </p>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={diverge}
                onClick={toggleDiverge}
                className="border-line hover:border-ink inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-[12.5px] font-[560]"
              >
                {/* Trilho 36 × 20 com recuo de 3 px; botão de 14 px percorre
                    36 − 2 × 3 − 14 = 16 px. Layout em flex, sem offsets absolutos. */}
                <span
                  aria-hidden="true"
                  data-switch-track
                  className={cn(
                    'inline-flex h-5 w-9 shrink-0 items-center rounded-full p-[3px] transition-colors duration-200',
                    diverge ? 'bg-purple-600' : 'bg-line',
                  )}
                >
                  <span
                    data-switch-thumb
                    className={cn(
                      'ease-snap size-3.5 rounded-full bg-white shadow-[0_1px_2px_rgb(21_19_27/0.3)] transition-transform duration-200',
                      diverge ? 'translate-x-4' : 'translate-x-0',
                    )}
                  />
                </span>
                Simular divergência
              </button>
              <button
                type="button"
                onClick={run}
                disabled={running}
                className="border-ink hover:bg-ink min-h-10 rounded-lg border px-3.5 text-[12.5px] font-semibold transition-colors hover:text-white disabled:opacity-60"
              >
                Executar novamente
              </button>
            </div>
          </div>
        </>
      )}
    </DemoFrame>
  )
}
