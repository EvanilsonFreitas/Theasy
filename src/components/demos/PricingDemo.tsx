import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { DemoFrame } from './DemoFrame'

/*
 * Simulação demonstrativa de formação de preço:
 * preço = custo ÷ (1 − despesas variáveis − despesas fixas − margem).
 * Produtos e valores são fictícios.
 */

const PRODUCTS = [
  { id: 'a', name: 'Produto A', cost: 120, price: 199 },
  { id: 'b', name: 'Produto B', cost: 64, price: 129 },
  { id: 'c', name: 'Produto C', cost: 210, price: 289 },
]

const brl = (v: number) =>
  'R$ ' +
  v.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
const pct = (v: number) =>
  v.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%'

function Slider({
  label,
  value,
  min,
  max,
  onChange,
  suffix = '%',
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
  suffix?: string
}) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="text-ink-2 text-[12px]">
          {label}
        </label>
        <output htmlFor={id} className="text-[14px] font-semibold tabular-nums">
          {suffix === 'R$' ? brl(value) : `${value}${suffix}`}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-6 w-full cursor-pointer accent-purple-600"
      />
    </div>
  )
}

export function PricingDemo() {
  const [pid, setPid] = useState('a')
  const p = PRODUCTS.find((x) => x.id === pid)!
  const [cost, setCost] = useState<Record<string, number>>({
    a: 120,
    b: 64,
    c: 210,
  })
  const [dv, setDv] = useState(18)
  const [df, setDf] = useState(12)
  const [mg, setMg] = useState(15)

  const c = cost[pid]
  const total = (dv + df + mg) / 100
  const price = total < 0.95 ? c / (1 - total) : NaN
  const marginAt = (pr: number, cc: number) =>
    ((pr - cc - (pr * (dv + df)) / 100) / pr) * 100
  const cur = marginAt(p.price, c)
  const below = cur < mg

  // Cascata: do preço sugerido até a margem.
  const steps = isNaN(price)
    ? []
    : [
        { label: 'Preço', v: price, from: 0, cls: 'bg-ink' },
        {
          label: 'Desp. variáveis',
          v: (price * dv) / 100,
          from: price - (price * dv) / 100,
          cls: 'bg-purple-300',
        },
        {
          label: 'Desp. fixas',
          v: (price * df) / 100,
          from: price - (price * (dv + df)) / 100,
          cls: 'bg-purple-500',
        },
        { label: 'Custo', v: c, from: (price * mg) / 100, cls: 'bg-line' },
        {
          label: 'Margem',
          v: (price * mg) / 100,
          from: 0,
          cls: 'bg-purple-600',
        },
      ]

  return (
    <DemoFrame
      title="Formação de preço"
      badge="Simulação demonstrativa"
      actions={
        <div role="group" aria-label="Produto" className="flex gap-1">
          {PRODUCTS.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={pid === x.id}
              onClick={() => setPid(x.id)}
              className={cn(
                'min-h-8 rounded-md border px-2.5 text-[12.5px] transition-colors',
                pid === x.id
                  ? 'border-ink bg-ink text-white'
                  : 'border-line text-ink-2 hover:text-ink',
              )}
            >
              {x.name}
            </button>
          ))}
        </div>
      }
      bodyClassName="grid grid-cols-[minmax(0,1fr)] @2xl:grid-cols-[260px_minmax(0,1fr)]"
    >
      <div className="border-rule bg-page flex flex-col gap-4 border-b p-4 @2xl:border-r @2xl:border-b-0">
        <Slider
          label="Custo unitário"
          value={c}
          min={30}
          max={260}
          suffix="R$"
          onChange={(v) => setCost((s) => ({ ...s, [pid]: v }))}
        />
        <Slider
          label="Despesas variáveis (impostos, comissão)"
          value={dv}
          min={0}
          max={35}
          onChange={setDv}
        />
        <Slider
          label="Despesas fixas rateadas"
          value={df}
          min={0}
          max={25}
          onChange={setDf}
        />
        <Slider
          label="Margem desejada"
          value={mg}
          min={0}
          max={35}
          onChange={setMg}
        />
        <p className="type-code border-line bg-paper text-ink-2 mt-auto rounded-md border border-dashed px-2.5 py-2 text-[10.5px]">
          preço = custo ÷ (1 − desp. variáveis − desp. fixas − margem)
        </p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="grid gap-3 @lg:grid-cols-2">
          <div className="bracket e1 bg-paper border border-purple-600 px-3.5 py-3">
            <span className="type-mono text-[9.5px] text-purple-600">
              Preço sugerido
            </span>
            <p
              aria-live="polite"
              className="mt-1 text-[26px] font-semibold tracking-[-0.01em] tabular-nums"
            >
              {isNaN(price) ? 'inviável' : brl(price)}
            </p>
          </div>
          <div
            className={cn(
              'bracket bg-paper border px-3.5 py-3',
              below ? 'border-danger/40' : 'border-rule',
            )}
          >
            <span className="type-mono text-ink-3 text-[9.5px]">
              Margem com o preço atual de {brl(p.price)}
            </span>
            <p
              className={cn(
                'mt-1 text-[26px] font-semibold tabular-nums',
                below ? 'text-danger' : 'text-ok',
              )}
            >
              {pct(cur)}
            </p>
          </div>
        </div>

        <div>
          <p className="mb-2 text-[13px] font-semibold">Do preço à margem</p>
          <div
            role="img"
            aria-label={
              isNaN(price)
                ? 'Combinação inviável: despesas e margem somam quase todo o preço.'
                : `Cascata demonstrativa: preço ${brl(price)}, despesas variáveis ${dv}%, despesas fixas ${df}%, custo ${brl(c)} e margem ${mg}%.`
            }
            className="border-line relative flex h-40 items-end gap-3 border-b px-1"
          >
            {isNaN(price) && (
              <p className="text-ink-2 m-auto max-w-[24em] text-center text-[13px]">
                Combinação inviável: despesas e margem somam quase todo o preço.
                Reduza algum percentual para ver a cascata.
              </p>
            )}
            {steps.map((s, i) => (
              <div key={s.label} className="relative h-full flex-1">
                <span
                  className={cn(
                    'ease-snap absolute inset-x-0 bottom-0 h-full origin-bottom rounded-t-[3px] transition-transform duration-500',
                    s.cls,
                  )}
                  style={{
                    transform: `translateY(${-(s.from / price) * 100}%) scaleY(${s.v / price})`,
                  }}
                />
                {i > 0 && i < 4 && s.v > 0 && (
                  <span
                    aria-hidden="true"
                    className="border-ink-3 absolute -left-3 w-3 border-t border-dashed"
                    style={{ bottom: `${((s.from + s.v) / price) * 100}%` }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-3 px-1" aria-hidden="true">
            {steps.map((s) => (
              <span key={s.label} className="flex-1 text-center">
                <span className="type-mono text-ink-3 block text-[8.5px]">
                  {s.label}
                </span>
                <span className="text-[11px] tabular-nums">{brl(s.v)}</span>
              </span>
            ))}
          </div>
        </div>

        <p className="border-line text-ink-2 border-t border-dashed pt-3 text-[12.5px] leading-relaxed">
          {isNaN(price)
            ? 'Despesas e margem somam quase todo o preço: revise as premissas.'
            : below
              ? `Com o preço atual, a margem fica abaixo da meta de ${mg}%. Para chegar à meta, o preço precisaria subir ${brl(price - p.price)}, ou custo e despesas precisariam cair.`
              : `O preço atual já cobre custos, despesas e a margem desejada de ${mg}%.`}
        </p>
      </div>
    </DemoFrame>
  )
}
