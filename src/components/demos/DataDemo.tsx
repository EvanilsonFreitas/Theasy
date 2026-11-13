import { useRef } from 'react'
import { useFitScale } from '@/hooks/useFitScale'
import { cn } from '@/lib/utils'
import { Star } from '@/components/system/Star'
import { DemoFrame } from './DemoFrame'
import { useStepper } from './useStepper'

/*
 * Topologia de integração: fontes → ingestão → tratamento → estruturação →
 * consumo. Desenhada em 760 × 290 e escalada; em contêineres estreitos vira
 * uma lista vertical com os mesmos estados.
 */

const W = 760
const H = 290

const STAGES = [
  {
    name: 'Fontes',
    result: '4 origens lidas',
    log: 'leitura de ERP, CRM, planilha e API',
  },
  {
    name: 'Ingestão',
    result: '18.420 linhas',
    log: 'ingestão incremental concluída',
  },
  {
    name: 'Tratamento',
    result: '312 ajustes',
    log: 'duplicidades e formatos corrigidos',
  },
  {
    name: 'Estruturação',
    result: '6 tabelas',
    log: 'modelo dimensional atualizado',
  },
  {
    name: 'Consumo',
    result: '3 destinos',
    log: 'painéis, sistema e automações notificados',
  },
]

const SOURCES = [
  { n: 'ERP', d: 'pedidos' },
  { n: 'CRM', d: 'clientes' },
  { n: 'Planilha', d: 'metas' },
  { n: 'API', d: 'frete' },
]
const SRC_Y = [30, 92, 154, 216]
const OUT = ['Painéis de BI', 'Sistemas', 'Automações']
const OUT_Y = [62, 132, 202]

type State = 'wait' | 'run' | 'done'

export function DataDemo() {
  const { done, running, run } = useStepper(STAGES.length, 950)
  const wrap = useRef<HTMLDivElement>(null)
  const scale = useFitScale(wrap, W + 16)
  const st = (i: number): State =>
    i < done ? 'done' : i === done && running ? 'run' : 'wait'
  const wire = (i: number) =>
    cn(
      'fill-none transition-[stroke] duration-300',
      st(i) === 'run'
        ? 'stroke-purple-600 wire-flow'
        : st(i) === 'done'
          ? 'stroke-purple-500'
          : 'stroke-wire',
    )
  const box = (i: number) =>
    cn(
      'absolute bracket border bg-paper transition-[border-color,box-shadow] duration-300',
      st(i) === 'run'
        ? 'border-purple-600 e3'
        : st(i) === 'done'
          ? 'border-purple-300 e1'
          : 'border-line',
    )

  const logLines = STAGES.slice(0, done).map((s, i) => `07:0${i} ${s.log}`)

  return (
    <DemoFrame
      title="Carga diária · base comercial"
      badge="Exemplo demonstrativo"
      actions={
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="min-h-9 rounded-lg bg-purple-600 px-3 text-[12.5px] font-semibold text-white transition-colors hover:bg-purple-800 disabled:opacity-70"
        >
          {running ? 'Executando…' : 'Executar carga'}
        </button>
      }
    >
      {/* Topologia larga */}
      <div className="stage hidden border-0 border-b @2xl:block">
        <div
          ref={wrap}
          className="px-2 py-4"
          style={{ height: H * scale + 32 }}
        >
          <div
            role="img"
            aria-label="Topologia demonstrativa: quatro fontes passam por ingestão, tratamento e estruturação em um modelo dimensional, consumido por painéis, sistema e automações."
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
              {SRC_Y.map((y) => (
                <path
                  key={y}
                  d={`M126 ${y + 20}C150 ${y + 20} 142 145 166 145`}
                  strokeWidth="1.25"
                  className={wire(0)}
                />
              ))}
              <path d="M286 145H322" strokeWidth="1.4" className={wire(1)} />
              <path d="M478 145H488" strokeWidth="1.4" className={wire(2)} />
              {OUT_Y.map((y) => (
                <path
                  key={y}
                  d={`M608 145C626 145 622 ${y + 18} 640 ${y + 18}`}
                  strokeWidth="1.25"
                  className={wire(3)}
                />
              ))}
            </svg>

            {SOURCES.map((s, i) => (
              <div
                key={s.n}
                className={cn(
                  box(0),
                  'flex h-10 w-[110px] items-center justify-between px-3',
                )}
                style={{ left: 16, top: SRC_Y[i] }}
              >
                <span className="text-[13px] font-semibold">{s.n}</span>
                <span className="type-code text-ink-3 text-[10px]">{s.d}</span>
              </div>
            ))}

            <div
              className={cn(box(1), 'h-[84px] w-[120px] px-3 py-2.5')}
              style={{ left: 166, top: 103 }}
            >
              <StageHead name="Ingestão" state={st(1)} />
              <p className="type-code text-ink-3 mt-1.5 text-[10px]">
                agendada 07:00 · incremental
              </p>
            </div>

            <div
              className={cn(box(2), 'h-[104px] w-[156px] px-3 py-2.5')}
              style={{ left: 322, top: 93 }}
            >
              <StageHead name="Tratamento" state={st(2)} />
              <ul className="type-code text-ink-2 mt-1.5 flex flex-col gap-0.5 text-[10px] whitespace-nowrap">
                <li>✓ deduplica registros</li>
                <li>✓ padroniza códigos</li>
                <li>✓ valida totais</li>
              </ul>
            </div>

            <div
              className={cn(box(3), 'h-[150px] w-[120px] px-3 py-2.5')}
              style={{ left: 488, top: 70 }}
            >
              <StageHead name="Estruturação" state={st(3)} />
              <svg
                viewBox="0 0 96 96"
                className="mt-1.5 h-[100px] w-[96px]"
                aria-hidden="true"
              >
                <path
                  d="M48 48L16 18M48 48L80 18M48 48L16 80M48 48L80 80"
                  className="stroke-purple-300"
                  strokeWidth="1.2"
                />
                <rect
                  x="30"
                  y="38"
                  width="36"
                  height="20"
                  rx="3"
                  className="fill-purple-600"
                />
                <text
                  x="48"
                  y="51"
                  textAnchor="middle"
                  className="fill-white font-mono text-[9px]"
                >
                  fato
                </text>
                {[
                  [2, 8],
                  [66, 8],
                  [2, 72],
                  [66, 72],
                ].map(([x, y]) => (
                  <rect
                    key={`${x}${y}`}
                    x={x}
                    y={y}
                    width="28"
                    height="16"
                    rx="3"
                    className="fill-paper stroke-line"
                    strokeWidth="1"
                  />
                ))}
                {[
                  ['cli', 16, 19],
                  ['prod', 80, 19],
                  ['tempo', 16, 83],
                  ['canal', 80, 83],
                ].map(([t, x, y]) => (
                  <text
                    key={t as string}
                    x={x as number}
                    y={y as number}
                    textAnchor="middle"
                    className="fill-ink-2 font-mono text-[9px]"
                  >
                    {t}
                  </text>
                ))}
              </svg>
            </div>

            {OUT.map((o, i) => (
              <div
                key={o}
                className={cn(
                  box(4),
                  'flex h-9 w-[112px] items-center gap-1.5 px-2.5 text-[12px] font-semibold',
                )}
                style={{ left: 640, top: OUT_Y[i] }}
              >
                <Star
                  size={9}
                  className={st(4) === 'wait' ? 'text-line' : 'text-purple-600'}
                />
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lista vertical em contêineres estreitos */}
      <ol className="border-rule flex flex-col gap-2 border-b p-4 @2xl:hidden">
        {STAGES.map((s, i) => (
          <li
            key={s.name}
            className={cn(
              'flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors',
              st(i) === 'run'
                ? 'border-purple-600 bg-purple-50'
                : 'border-rule bg-paper',
            )}
          >
            <span className="text-[13px] font-semibold">{s.name}</span>
            <StateTag state={st(i)} result={s.result} />
          </li>
        ))}
      </ol>

      <div className="bg-rule grid gap-px @2xl:grid-cols-[1fr_1fr]">
        <div className="bg-paper p-4">
          <p className="type-mono text-ink-3 mb-2 text-[9.5px]">Execução</p>
          <ul className="grid grid-cols-1 gap-x-5 gap-y-1.5 @md:grid-cols-2">
            {STAGES.map((s, i) => (
              <li
                key={s.name}
                className="flex items-center justify-between gap-2 text-[12px]"
              >
                <span className="text-ink-2">{s.name}</span>
                <StateTag state={st(i)} result={s.result} />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-ink text-on-ink-2 p-4">
          <p className="type-mono text-on-ink-3 mb-2 text-[9.5px]">Registro</p>
          <ol
            aria-live="polite"
            className="type-code flex min-h-[5.5rem] flex-col gap-0.5 text-[11px]"
          >
            {done === STAGES.length && !running ? (
              <>
                {logLines.slice(-3).map((l) => (
                  <li key={l}>{l}</li>
                ))}
                <li className="text-purple-300">
                  carga concluída · 0 erros · próxima execução amanhã às 07:00
                </li>
              </>
            ) : (
              logLines.map((l) => <li key={l}>{l}</li>)
            )}
          </ol>
        </div>
      </div>
    </DemoFrame>
  )
}

function StageHead({ name, state }: { name: string; state: State }) {
  return (
    <div className="flex items-center justify-between gap-1">
      <span className="text-[12.5px] font-semibold">{name}</span>
      <span
        aria-hidden="true"
        className={cn(
          'flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white',
          state === 'done'
            ? 'bg-purple-600'
            : state === 'run'
              ? 'animate-pulse bg-purple-300'
              : 'border-line border',
        )}
      >
        {state === 'done' ? '✓' : ''}
      </span>
    </div>
  )
}

function StateTag({ state, result }: { state: State; result: string }) {
  return (
    <span
      className={cn(
        'type-mono text-[9.5px] whitespace-nowrap',
        state === 'done'
          ? 'text-ok'
          : state === 'run'
            ? 'text-purple-600'
            : 'text-ink-3',
      )}
    >
      {state === 'done'
        ? result
        : state === 'run'
          ? 'executando'
          : 'aguardando'}
    </span>
  )
}
