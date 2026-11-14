import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { cn } from '@/lib/utils'
import { smoothPath, wave, type Pt } from '@/lib/chart'
import { DemoFrame, Segmented } from './DemoFrame'

type Period = 'mes' | 'tri' | 'ano'
type Unit = 'todas' | 'sul' | 'sudeste'

/*
 * Painel executivo demonstrativo. Todos os valores são fictícios e
 * determinísticos: servem para mostrar comportamento (filtro, comparação,
 * detalhe), não resultados.
 */
interface PeriodData {
  labels: string[]
  revenue: number[] // R$ mil
  previous: number[]
  margin: number[] // %
  kpi: { value: string; delta: string; up: boolean; spark: number[] }[]
  cats: number[]
  note: { at: number; text: string }
}

const BASE: Record<Period, PeriodData> = {
  mes: {
    labels: ['jun', 'jul', 'ago', 'set', 'out', 'nov'],
    revenue: [342, 381, 356, 389, 377, 412],
    previous: [330, 349, 361, 352, 380, 396],
    margin: [30.2, 31.6, 29.1, 32.2, 30.6, 31.8],
    kpi: [
      {
        value: 'R$ 412 mil',
        delta: '4,1% no mês',
        up: true,
        spark: [6, 9, 8, 12, 13, 15],
      },
      {
        value: '31,8%',
        delta: '0,6 p.p.',
        up: true,
        spark: [8, 11, 6, 13, 11, 12],
      },
      {
        value: 'R$ 1.240',
        delta: '2,3%',
        up: true,
        spark: [9, 9, 10, 11, 11, 12],
      },
      {
        value: '332',
        delta: '1,8% em Acessórios',
        up: false,
        spark: [12, 11, 12, 10, 9, 9],
      },
    ],
    cats: [38, 33, 29, 24, 17],
    note: { at: 3, text: 'Reajuste de tabela' },
  },
  tri: {
    labels: ['T4 25', 'T1 26', 'T2 26', 'T3 26'],
    revenue: [962, 1078, 1041, 1210],
    previous: [905, 990, 1012, 1122],
    margin: [28.4, 30.2, 29.1, 30.9],
    kpi: [
      {
        value: 'R$ 1,21 mi',
        delta: '7,8% no trimestre',
        up: true,
        spark: [5, 8, 11, 15],
      },
      { value: '30,9%', delta: '1,1 p.p.', up: true, spark: [6, 9, 10, 14] },
      { value: 'R$ 1.205', delta: '0,9%', up: true, spark: [10, 11, 11, 12] },
      {
        value: '1.004',
        delta: '2,1% em Acessórios',
        up: false,
        spark: [13, 12, 11, 10],
      },
    ],
    cats: [37, 32, 30, 23, 18],
    note: { at: 2, text: 'Revisão do preço' },
  },
  ano: {
    labels: ['2024', '2025', '2026'],
    revenue: [3720, 4110, 4620],
    previous: [3410, 3720, 4110],
    margin: [26.1, 28.9, 29.7],
    kpi: [
      {
        value: 'R$ 4,62 mi',
        delta: '12,4% no ano',
        up: true,
        spark: [6, 10, 15],
      },
      { value: '29,7%', delta: '2,0 p.p.', up: true, spark: [6, 10, 14] },
      { value: 'R$ 1.180', delta: '3,5%', up: true, spark: [9, 11, 13] },
      {
        value: '3.915',
        delta: '0,8% em Acessórios',
        up: false,
        spark: [12, 11, 10],
      },
    ],
    cats: [36, 31, 29, 24, 19],
    note: { at: 1, text: 'Nova base de custos' },
  },
}

const UNIT_FACTOR: Record<Unit, number> = { todas: 1, sul: 0.42, sudeste: 0.58 }
const KPI_LABELS = [
  'Receita líquida',
  'Margem de contribuição',
  'Ticket médio',
  'Pedidos',
]
const CATS = [
  'Linha premium',
  'Linha padrão',
  'Serviços',
  'Reposição',
  'Acessórios',
]
const TARGET = 25
const DRILL: Record<number, [string, string][]> = {
  0: [
    ['Cliente 014', '41%'],
    ['Cliente 009', '38%'],
    ['Cliente 033', '35%'],
  ],
  1: [
    ['Cliente 003', '35%'],
    ['Cliente 014', '33%'],
    ['Cliente 027', '29%'],
  ],
  2: [
    ['Cliente 041', '34%'],
    ['Cliente 009', '31%'],
    ['Cliente 003', '27%'],
  ],
  3: [
    ['Cliente 033', '27%'],
    ['Cliente 027', '22%'],
    ['Cliente 041', '21%'],
  ],
  4: [
    ['Cliente 027', '12%'],
    ['Cliente 041', '15%'],
    ['Cliente 003', '21%'],
  ],
}

const fmt = (v: number) =>
  v >= 1000
    ? `R$ ${(v / 1000).toFixed(2).replace('.', ',')} mi`
    : `R$ ${Math.round(v)} mil`

function Spark({ data, seed }: { data: number[]; seed: number }) {
  // Série densa com oscilação natural entre o início e o fim do período.
  const first = data[0]
  const last = data[data.length - 1]
  const series = wave(
    16,
    first,
    last,
    Math.max(0.9, Math.abs(last - first) * 0.16),
    seed,
  )
  const min = Math.min(...series)
  const max = Math.max(...series)
  const pts: Pt[] = series.map((v, i) => [
    (i / (series.length - 1)) * 64,
    20 - ((v - min) / (max - min || 1)) * 16,
  ])
  const line = smoothPath(pts)
  const id = `spark-${seed}`
  return (
    <svg
      width="64"
      height="24"
      viewBox="0 0 64 24"
      aria-hidden="true"
      className="hidden shrink-0 overflow-visible @md:block"
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop
            offset="0"
            stopColor="var(--color-purple-500)"
            stopOpacity="0.22"
          />
          <stop
            offset="1"
            stopColor="var(--color-purple-500)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <path d={`${line}L64 24L0 24Z`} fill={`url(#${id})`} />
      <path
        d={line}
        fill="none"
        className="stroke-purple-600"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle
        cx={pts[pts.length - 1][0]}
        cy={pts[pts.length - 1][1]}
        r="2"
        className="fill-purple-600"
      />
    </svg>
  )
}

export function BIDemo() {
  const [period, setPeriod] = useState<Period>('tri')
  const [unit, setUnit] = useState<Unit>('todas')
  const [compare, setCompare] = useState(true)
  const [hot, setHot] = useState<number | null>(null)
  const [cat, setCat] = useState(4)

  const d = BASE[period]
  const f = UNIT_FACTOR[unit]
  const rev = d.revenue.map((v) => v * f)
  const prev = d.previous.map((v) => v * f)
  const n = rev.length
  const top = Math.ceil((Math.max(...rev, ...prev) * 1.15) / 100) * 100
  const ticks = [top, top / 2, 0]
  const mPts: Pt[] = d.margin.map((mg, i) => [
    ((i + 0.5) / n) * 100,
    100 - ((mg - 20) / 16) * 100,
  ])
  const mLine = smoothPath(mPts)
  const focus = hot ?? n - 1
  const unitLabel =
    unit === 'todas'
      ? 'todas as unidades'
      : unit === 'sul'
        ? 'unidade Sul'
        : 'unidade Sudeste'

  return (
    <DemoFrame
      title="Painel executivo"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="bi-unit">
            Unidade
          </label>
          <select
            id="bi-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="border-line bg-paper min-h-8 rounded-md border px-2 text-[12.5px]"
          >
            <option value="todas">Todas as unidades</option>
            <option value="sul">Unidade Sul</option>
            <option value="sudeste">Unidade Sudeste</option>
          </select>
          <button
            type="button"
            aria-pressed={compare}
            onClick={() => setCompare((c) => !c)}
            className={cn(
              'min-h-8 rounded-md border px-2.5 text-[12.5px] transition-colors',
              compare
                ? 'border-purple-600 bg-purple-50 text-purple-700'
                : 'border-line text-ink-2 hover:text-ink',
            )}
          >
            Comparar com período anterior
          </button>
          <Segmented
            label="Período"
            value={period}
            onChange={(p) => {
              setPeriod(p)
              setHot(null)
            }}
            options={[
              { id: 'mes', label: 'Mês' },
              { id: 'tri', label: 'Trimestre' },
              { id: 'ano', label: 'Ano' },
            ]}
          />
        </div>
      }
    >
      <dl className="border-rule bg-rule grid grid-cols-2 gap-px border-b @2xl:grid-cols-4">
        {KPI_LABELS.map((label, i) => {
          const k = d.kpi[i]
          return (
            <div
              key={label}
              className="bg-paper flex flex-col gap-1 px-4 py-3.5"
            >
              <dt className="type-mono text-ink-3 text-[9.5px]">{label}</dt>
              <dd className="text-[21px] font-semibold tracking-[-0.01em] whitespace-nowrap tabular-nums @2xl:text-[23px]">
                {i === 0 ? fmt(rev[n - 1]) : k.value}
              </dd>
              <dd className="flex items-end justify-between gap-2">
                <span className={cn('text-xs', k.up ? 'text-ok' : 'text-warn')}>
                  <span aria-hidden="true">{k.up ? '▲' : '▼'} </span>
                  <span className="sr-only">
                    {k.up ? 'Alta de ' : 'Queda de '}
                  </span>
                  {k.delta}
                </span>
                <Spark
                  data={k.spark}
                  seed={i + (period === 'mes' ? 1 : period === 'tri' ? 5 : 9)}
                />
              </dd>
            </div>
          )
        })}
      </dl>

      <div className="grid @2xl:grid-cols-[3fr_2fr]">
        <div className="border-rule p-4 @2xl:border-r">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[13px] font-semibold">
              Receita e margem · {unitLabel}
            </span>
            <span
              className="text-ink-2 flex gap-3 text-[11px]"
              aria-hidden="true"
            >
              <span className="flex items-center gap-1.5">
                <span className="size-2 bg-purple-300" />
                Atual
              </span>
              {compare && (
                <span className="flex items-center gap-1.5">
                  <span className="size-2 border border-dashed border-purple-500" />
                  Anterior
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <span className="bg-ink h-0.5 w-2.5" />
                Margem %
              </span>
            </span>
          </div>

          <div className="mt-3 grid grid-cols-[34px_minmax(0,1fr)] gap-x-1.5">
            <div className="relative h-44" aria-hidden="true">
              {ticks.map((t, i) => (
                <span
                  key={t}
                  className="type-code text-ink-3 absolute right-0 -translate-y-1/2 text-[10px]"
                  style={{ top: `${(i / 2) * 100}%` }}
                >
                  {t >= 1000
                    ? `${(t / 1000).toFixed(1).replace('.', ',')}k`
                    : t}
                </span>
              ))}
            </div>
            <div className="border-line relative h-44 border-b border-l">
              {[0, 50].map((y) => (
                <span
                  key={y}
                  aria-hidden="true"
                  className="border-paper-3 absolute inset-x-0 border-t border-dashed"
                  style={{ top: `${y}%` }}
                />
              ))}
              <div className="absolute inset-0 flex items-end gap-[6%] px-[4%]">
                {rev.map((v, i) => {
                  const active = focus === i
                  return (
                    <button
                      key={`${period}-${i}`}
                      type="button"
                      aria-label={`${d.labels[i]}: receita ${fmt(v)}, margem ${d.margin[i].toFixed(1).replace('.', ',')}%`}
                      onMouseEnter={() => setHot(i)}
                      onFocus={() => setHot(i)}
                      onMouseLeave={() => setHot(null)}
                      onBlur={() => setHot(null)}
                      className="group relative flex h-full flex-1 items-end gap-[8%] outline-offset-2"
                    >
                      {compare && (
                        <span
                          className="ease-snap h-full flex-1 origin-bottom border border-b-0 border-dashed border-purple-500/70 transition-transform duration-500"
                          style={{ transform: `scaleY(${prev[i] / top})` }}
                        />
                      )}
                      <span
                        className={cn(
                          'ease-snap h-full flex-1 origin-bottom rounded-t-[3px] transition-[transform,background-color,box-shadow] duration-500',
                          active
                            ? 'bg-purple-600 shadow-[0_0_0_3px_var(--color-purple-100)]'
                            : 'bg-purple-300',
                        )}
                        style={{ transform: `scaleY(${v / top})` }}
                      />
                    </button>
                  )
                })}
              </div>
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full"
              >
                <path
                  d={mLine}
                  fill="none"
                  className="stroke-ink"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              {mPts.map(([x, y], i) => (
                <span
                  key={`${period}-m${i}`}
                  aria-hidden="true"
                  className={cn(
                    'border-ink pointer-events-none absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] transition-colors',
                    focus === i ? 'bg-ink' : 'bg-paper',
                  )}
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              ))}

              {/* Anotação contextual presa à barra */}
              <span
                aria-hidden="true"
                className="type-mono pointer-events-none absolute -top-1 flex -translate-x-1/2 flex-col items-center text-[9px] text-purple-700"
                style={{ left: `${((d.note.at + 0.5) / n) * 100}%` }}
              >
                <span className="rounded bg-purple-50 px-1.5 py-0.5 whitespace-nowrap">
                  {d.note.text}
                </span>
                <span className="h-3 w-px bg-purple-500" />
              </span>

              <AnimatePresence>
                {hot !== null && (
                  <m.div
                    key={hot}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="e4 bg-ink text-on-ink pointer-events-none absolute top-6 z-10 w-40 -translate-x-1/2 rounded-lg px-3 py-2 text-[11.5px] leading-relaxed"
                    style={{
                      left: `${Math.min(80, Math.max(20, ((hot + 0.5) / n) * 100))}%`,
                    }}
                  >
                    <span className="type-mono block text-[9px] text-purple-300">
                      {d.labels[hot]}
                    </span>
                    Receita {fmt(rev[hot])}
                    <br />
                    Margem {d.margin[hot].toFixed(1).replace('.', ',')}%
                    {compare && (
                      <>
                        <br />
                        <span className="text-on-ink-2">
                          vs {fmt(prev[hot])} antes
                        </span>
                      </>
                    )}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <span />
            <div className="flex gap-[6%] px-[4%] pt-1.5" aria-hidden="true">
              {d.labels.map((l) => (
                <span
                  key={l}
                  className="type-mono text-ink-3 flex-1 text-center text-[9.5px]"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-rule flex flex-col gap-2 border-t p-4 @2xl:border-t-0">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-semibold">
              Margem por categoria
            </span>
            <span className="type-mono text-ink-3 text-[9px]">
              meta {TARGET}%
            </span>
          </div>
          <ul className="relative flex flex-col">
            <li
              aria-hidden="true"
              className="border-ink pointer-events-none absolute inset-y-0 z-10 border-l border-dashed"
              style={{ left: `calc(102px + (100% - 150px) * ${TARGET / 40})` }}
            />
            {CATS.map((name, i) => {
              const v = d.cats[i]
              const low = v < TARGET
              return (
                <li key={name}>
                  <button
                    type="button"
                    aria-pressed={cat === i}
                    onClick={() => setCat(i)}
                    className={cn(
                      'grid min-h-9 w-full grid-cols-[96px_minmax(0,1fr)_40px] items-center gap-1.5 rounded-md px-1.5 text-left text-[12.5px] transition-colors',
                      cat === i
                        ? low
                          ? 'bg-warn-bg/70'
                          : 'bg-purple-50'
                        : 'hover:bg-paper-2',
                    )}
                  >
                    <span
                      className={
                        cat === i ? 'text-ink font-semibold' : 'text-ink-2'
                      }
                    >
                      {name}
                    </span>
                    <span className="bg-paper-2 h-2 overflow-hidden rounded-sm">
                      <span
                        className={cn(
                          'ease-snap block h-full origin-left transition-transform duration-500',
                          low ? 'bg-warn' : 'bg-purple-600',
                        )}
                        style={{ transform: `scaleX(${v / 40})` }}
                      />
                    </span>
                    <span className="text-right tabular-nums">{v}%</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="border-line mt-auto border-t border-dashed pt-2.5">
            <p className="type-mono text-ink-3 text-[9.5px]">
              Detalhe · {CATS[cat]}
            </p>
            <AnimatePresence mode="wait">
              <m.dl
                key={cat}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.18 }}
                className="type-code text-ink-2 mt-1.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 text-[11px]"
              >
                {DRILL[cat].map(([c, v]) => (
                  <div key={c} className="contents">
                    <dt>{c}</dt>
                    <dd
                      className={cn(
                        'text-right',
                        parseInt(v) < TARGET && 'text-warn',
                      )}
                    >
                      {v}
                    </dd>
                  </div>
                ))}
              </m.dl>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DemoFrame>
  )
}
