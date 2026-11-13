import { m, useReducedMotion } from 'framer-motion'
import { STAR_PATH } from './Star'

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Composição institucional derivada do símbolo: o colchete superior é a
 * consultoria (contexto e direção), o inferior é a engenharia (construção e
 * operação). Entre eles, as competências convergem para a estrela: a
 * solução em uso.
 */
export function CompetenceGraphic() {
  const reduce = useReducedMotion()
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: '-15%' },
          transition: { duration: 1.1, delay, ease: EASE },
        }
  const nodes = [
    { t: 'Dados', x: 50, y: 25 },
    { t: 'BI', x: 24, y: 50 },
    { t: 'Sistemas', x: 76, y: 50 },
    { t: 'Automação', x: 50, y: 75 },
  ]

  return (
    <figure
      className="stage relative m-0 aspect-[560/470] w-full overflow-hidden rounded-[18px]"
      aria-label="Consultoria e engenharia envolvem dados, BI, sistemas e automação, que convergem para a solução em uso."
      role="img"
    >
      <svg
        viewBox="0 0 560 470"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <m.path
          d="M90 340V170A80 80 0 0 1 170 90H400"
          className="fill-none stroke-purple-500"
          strokeWidth="2"
          strokeLinecap="round"
          {...draw(0)}
        />
        <m.path
          d="M470 130V300A80 80 0 0 1 390 380H160"
          className="stroke-ink fill-none"
          strokeWidth="2"
          strokeLinecap="round"
          {...draw(0.2)}
        />
        {['M280 140V205', 'M280 265V330', 'M160 235H250', 'M310 235H400'].map(
          (d, i) => (
            <m.path
              key={d}
              d={d}
              className="fill-none stroke-purple-600"
              strokeWidth="1.25"
              strokeDasharray="3 4"
              {...draw(0.5 + i * 0.08)}
            />
          ),
        )}
        <circle cx="280" cy="235" r="34" className="fill-purple-100" />
        <path
          transform="translate(280 235) scale(.15) translate(-512 -512)"
          d={STAR_PATH}
          className="fill-purple-600"
        />
      </svg>

      <span className="type-mono absolute top-[12%] left-[17%] text-[10px] text-purple-700">
        Consultoria · contexto e direção
      </span>
      <span className="type-mono text-ink absolute right-[13%] bottom-[11%] text-[10px]">
        Engenharia · construção e operação
      </span>

      {nodes.map((n) => (
        <span
          key={n.t}
          className="bracket e1 border-line bg-paper absolute -translate-x-1/2 -translate-y-1/2 border px-3 py-1.5 text-[13px] font-semibold sm:px-3.5 sm:py-2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.t}
        </span>
      ))}
      <span className="bracket e3 bg-ink text-on-ink absolute top-[63%] left-[60%] hidden px-3 py-1.5 text-[12.5px] whitespace-nowrap sm:block">
        Solução em uso
      </span>
    </figure>
  )
}
