import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { approach } from '@/content/approach'
import { useRovingTabs } from '@/hooks/useRovingTabs'
import { cn } from '@/lib/utils'
import {
  Architecture,
  Evolution,
  Matrix,
  Rollout,
  Versions,
} from './Deliverables'

const deliverables = [Matrix, Architecture, Versions, Rollout, Evolution]

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Percurso do método: cinco etapas selecionáveis ligadas por um conector
 * que avança até a etapa ativa, e um painel compartilhado em que o
 * entregável de cada etapa se transforma. "detailed" acrescenta as
 * perguntas de cada etapa (página Abordagem).
 */
export function ProcessStepper({ detailed = false }: { detailed?: boolean }) {
  const [step, setStep] = useState(0)
  const tabs = useRovingTabs(approach.length, setStep)
  const cur = approach[step]
  const Deliverable = deliverables[step]
  const last = approach.length - 1

  return (
    <div>
      <div
        role="tablist"
        aria-label="Etapas do método"
        className="relative grid grid-cols-5 gap-1"
      >
        <span
          aria-hidden="true"
          className="bg-line absolute top-[21px] right-[10%] left-[10%] h-[1.5px]"
        />
        <span
          aria-hidden="true"
          className="ease-snap absolute top-[21px] left-[10%] h-[1.5px] w-[80%] origin-left bg-purple-600 transition-transform duration-500"
          style={{ transform: `scaleX(${step / last})` }}
        />
        {approach.map((s, i) => {
          const on = i === step
          const past = i < step
          return (
            <button
              key={s.num}
              ref={tabs.ref(i)}
              id={`etapa-${s.num}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="painel-etapa"
              tabIndex={on ? 0 : -1}
              onClick={() => setStep(i)}
              onKeyDown={(e) => tabs.onKeyDown(e, i)}
              className="group relative flex flex-col items-center gap-2.5 px-0.5 pb-1 text-center"
            >
              <span
                className={cn(
                  'bracket type-code flex size-11 items-center justify-center border text-[12px] transition-[background-color,border-color,color,box-shadow,transform] duration-300',
                  on
                    ? 'border-purple-600 bg-purple-600 text-white shadow-[0_10px_24px_-8px_rgb(63_39_163/0.55)]'
                    : past
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-line bg-paper text-ink-3 group-hover:border-ink-3',
                )}
              >
                {s.num}
              </span>
              <span
                className={cn(
                  'sr-only text-[14.5px] leading-tight font-semibold sm:not-sr-only',
                  on || past ? 'text-ink' : 'text-ink-3',
                )}
              >
                {s.name}
              </span>
            </button>
          )
        })}
      </div>

      <div
        id="painel-etapa"
        role="tabpanel"
        aria-labelledby={`etapa-${cur.num}`}
        className="e3 border-rule bg-paper mt-7 grid overflow-hidden rounded-[18px] border lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={cur.num}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="flex flex-col gap-4 p-6 sm:p-8"
          >
            <p className="type-mono text-purple-600">
              Etapa {cur.num} de 0{approach.length}
            </p>
            <h3 className="text-[24px] leading-tight font-semibold tracking-[-0.01em] sm:text-[26px]">
              {cur.name}
            </h3>
            <p className="type-lead text-ink-2">
              {detailed ? cur.detail : cur.summary}
            </p>
            {detailed && (
              <ul className="flex flex-col gap-1.5 text-[14px]">
                {cur.questions.map((q) => (
                  <li key={q} className="flex gap-2">
                    <span aria-hidden="true" className="text-purple-600">
                      ?
                    </span>
                    {q}
                  </li>
                ))}
              </ul>
            )}
            <p className="bracket border-line bg-page self-start border px-3 py-2.5 text-[13.5px]">
              <span className="type-mono block text-[9.5px] text-purple-600">
                Entregável
              </span>
              {cur.output}
            </p>
            <div className="mt-auto flex items-center gap-4 pt-2">
              {step < last ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="group/btn inline-flex min-h-11 items-center gap-2 text-[14.5px] font-semibold hover:text-purple-600"
                >
                  Próxima etapa: {approach[step + 1].name}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover/btn:translate-x-1"
                  >
                    →
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="inline-flex min-h-11 items-center gap-2 text-[14.5px] font-semibold hover:text-purple-600"
                >
                  Voltar ao início
                </button>
              )}
            </div>
          </m.div>
        </AnimatePresence>

        <div className="stage border-rule flex items-center justify-center border-0 border-t p-4 sm:p-7 lg:border-t-0 lg:border-l">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={cur.num}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="w-full max-w-[560px]"
            >
              <Deliverable />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
