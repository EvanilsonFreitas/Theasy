import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  INITIATIVES,
  level,
  quadrantOf,
  toPercent,
  type Initiative,
} from '@/content/initiatives'

/**
 * Matriz de priorização (impacto × esforço), qualitativa e demonstrativa.
 * A posição de cada iniciativa deriva dos valores; marcadores são botões e
 * a iniciativa selecionada abre o painel de detalhe. Em contêiner estreito,
 * marcadores numerados e lista abaixo, sem rótulos sobrepostos.
 */
export function PriorityMatrix() {
  const [sel, setSel] = useState('base')
  const current = INITIATIVES.find((i) => i.id === sel)!
  const quickWin = (i: Initiative) => quadrantOf(i) === 'Ganho rápido'

  return (
    <div
      data-testid="priority-matrix"
      className="win e2 border-line @container w-full overflow-hidden rounded-xl border"
    >
      <div className="border-rule flex items-center justify-between border-b px-3.5 py-2.5">
        <span className="text-[13px] font-semibold">
          Mapa de problemas e oportunidades
        </span>
        <span className="type-mono text-ink-3 text-[9px]">
          Escala qualitativa · ilustrativo
        </span>
      </div>

      <div className="grid @lg:grid-cols-[minmax(0,1fr)_196px]">
        <div className="relative px-3 pt-4 pb-8 pl-10">
          {/* Eixo de impacto */}
          <span className="type-mono text-ink-2 absolute top-[46%] left-1 origin-center -translate-x-1/4 -rotate-90 text-[9px]">
            Impacto
          </span>
          <span className="type-mono text-ink-3 absolute top-4 left-3 text-[8.5px]">
            alto
          </span>

          <div
            data-testid="matrix-plot"
            className="border-rule-strong relative h-64 border-b border-l"
          >
            {/* Quadrantes */}
            <div
              className="absolute inset-0 grid grid-cols-2 grid-rows-2"
              aria-hidden="true"
            >
              <div className="bg-purple-50">
                <span className="type-mono m-2 block text-[8.5px] text-purple-700">
                  Ganhos rápidos
                </span>
              </div>
              <div className="bg-paper-2/70 text-right">
                <span className="type-mono text-ink-3 m-2 block text-[8.5px]">
                  Projetos estratégicos
                </span>
              </div>
              <div className="flex items-end">
                <span className="type-mono text-ink-3 m-2 block text-[8.5px]">
                  Ajustes pontuais
                </span>
              </div>
              <div className="flex items-end justify-end">
                <span className="type-mono text-ink-3 m-2 block text-[8.5px]">
                  Reavaliar
                </span>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="border-line absolute inset-y-0 left-1/2 border-l border-dashed"
            />
            <span
              aria-hidden="true"
              className="border-line absolute inset-x-0 top-1/2 border-t border-dashed"
            />

            {/* Iniciativas */}
            {INITIATIVES.map((it, n) => {
              const x = toPercent(it.effort)
              const y = 100 - toPercent(it.impact)
              const on = it.id === sel
              const labelLeft = x > 62
              return (
                <button
                  key={it.id}
                  type="button"
                  data-initiative={it.id}
                  data-x={x.toFixed(1)}
                  data-y={y.toFixed(1)}
                  aria-pressed={on}
                  aria-label={`${it.name}: impacto ${level(it.impact)}, esforço ${level(it.effort)}`}
                  onClick={() => setSel(it.id)}
                  className="group absolute flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'ease-snap flex items-center justify-center rounded-full font-mono text-[9px] font-medium transition-[transform,box-shadow,background-color] duration-200',
                      on
                        ? 'size-5 bg-purple-600 text-white shadow-[0_0_0_5px_var(--color-purple-100)]'
                        : quickWin(it)
                          ? 'size-4 bg-purple-500 text-white group-hover:scale-110'
                          : 'border-ink-3 bg-paper text-ink-2 size-4 border-[1.5px] group-hover:scale-110 group-hover:border-purple-600',
                    )}
                  >
                    <span className="@lg:hidden">{n + 1}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute top-1/2 hidden -translate-y-1/2 text-[11.5px] whitespace-nowrap @lg:block',
                      labelLeft
                        ? 'right-full mr-1 text-right'
                        : 'left-full ml-1',
                      on
                        ? 'text-ink font-semibold'
                        : 'text-ink-2 group-hover:text-ink',
                      it.id === 'erp' && !on && 'text-ink-3',
                    )}
                  >
                    {it.name}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="type-mono text-ink-3 mt-1.5 flex justify-between pl-0 text-[8.5px]">
            <span>baixo</span>
            <span className="text-ink-2">Esforço</span>
            <span>alto</span>
          </div>
        </div>

        {/* Lista numerada (contêiner estreito) e painel de detalhe */}
        <div className="border-rule bg-page flex flex-col gap-3 border-t p-4 @lg:border-t-0 @lg:border-l">
          <ol className="flex flex-col gap-1 @lg:hidden">
            {INITIATIVES.map((it, n) => (
              <li key={it.id}>
                <button
                  type="button"
                  aria-pressed={it.id === sel}
                  onClick={() => setSel(it.id)}
                  className={cn(
                    'flex min-h-9 w-full items-center gap-2.5 rounded-md px-2 text-left text-[13px] transition-colors',
                    it.id === sel
                      ? 'bg-purple-50 font-semibold'
                      : 'hover:bg-paper-2',
                  )}
                >
                  <span className="bg-paper border-line flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[9px]">
                    {n + 1}
                  </span>
                  <span className="min-w-0 flex-1 leading-snug">{it.name}</span>
                  <span className="type-mono text-ink-3 shrink-0 text-[8.5px] whitespace-nowrap">
                    {quadrantOf(it)}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={current.id}
              data-testid="matrix-detail"
              aria-live="polite"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2.5"
            >
              <span className="type-mono text-[9px] text-purple-700">
                {quadrantOf(current)}
              </span>
              <strong className="text-[15px] leading-snug">
                {current.name}
              </strong>
              <p className="text-ink-2 text-[12.5px] leading-relaxed">
                {current.description}
              </p>
              <dl className="grid grid-cols-2 gap-2">
                {[
                  ['Impacto', level(current.impact)],
                  ['Esforço', level(current.effort)],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-paper border-rule rounded-md border px-2 py-1.5"
                  >
                    <dt className="type-mono text-ink-3 text-[8.5px]">{k}</dt>
                    <dd className="text-[13px] font-semibold capitalize">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="border-line text-ink-2 border-t border-dashed pt-2 text-[12px] leading-relaxed">
                <strong className="text-ink">Por que nessa ordem:</strong>{' '}
                {current.rationale}
              </p>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
