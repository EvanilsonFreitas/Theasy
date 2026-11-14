import { useEffect, useRef, useState, type RefObject } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { scenarios, type Scenario } from '@/content/scenarios'
import { ServiceGlyph } from '@/components/system/Glyphs'
import { Star } from '@/components/system/Star'
import { cn } from '@/lib/utils'
import { ScenarioPreview } from './ScenarioPreview'

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Transformação em três tempos: o contexto como ele é hoje (desorganizado),
 * a intervenção da ThEasy (as frentes envolvidas, em ordem) e a solução
 * estruturada com a decisão que passa a ser possível.
 */
export function Transformation({
  value,
  onChange,
}: {
  value?: number
  onChange?: (i: number) => void
}) {
  const [inner, setInner] = useState(0)
  const index = value ?? inner
  const select = (i: number) => (onChange ? onChange(i) : setInner(i))
  const sc = scenarios[index]
  const grid = useRef<HTMLDivElement>(null)

  return (
    <div>
      <div
        role="group"
        aria-label="Situação por área"
        className="flex flex-wrap gap-1.5"
      >
        {scenarios.map((s, i) => (
          <button
            key={s.slug}
            type="button"
            aria-pressed={i === index}
            onClick={() => select(i)}
            className={cn(
              'min-h-10 rounded-lg border px-3.5 text-[14px] font-[560] transition-[background-color,border-color,color,box-shadow] duration-200',
              i === index
                ? 'e1 border-ink bg-ink text-white'
                : 'border-line bg-paper text-ink hover:border-ink',
            )}
          >
            {s.area}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.p
          key={sc.slug}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-live="polite"
          className="mt-7 text-[19px] leading-snug font-semibold sm:text-[21px]"
        >
          “{sc.question}”
        </m.p>
      </AnimatePresence>

      <div
        ref={grid}
        className="relative mt-5 grid gap-4 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(220px,250px)_minmax(0,1fr)] lg:gap-0"
      >
        <Context sc={sc} />
        <Intervention sc={sc} />
        <Solution sc={sc} />
        <Wires root={grid} version={sc.slug} />
      </div>
      <p className="text-ink-3 mt-3 text-[13px]">
        Situações ilustrativas, compostas a partir de problemas frequentes. Não
        representam clientes específicos.
      </p>
    </div>
  )
}

function Context({ sc }: { sc: Scenario }) {
  const tilt = [
    'sm:-rotate-[1.2deg]',
    'sm:rotate-[1deg]',
    'sm:rotate-[0.6deg]',
    'sm:-rotate-[0.8deg]',
  ]
  return (
    <div
      data-wire="ctx"
      className="border-rule bg-paper-2 relative flex flex-col rounded-2xl border p-5 sm:p-6"
    >
      <p className="type-mono text-ink-3">Contexto do negócio · hoje</p>
      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={sc.slug}
          initial="hide"
          animate="show"
          exit="hide"
          variants={{
            show: { transition: { staggerChildren: 0.05 } },
            hide: {},
          }}
          className="mt-5 grid flex-1 grid-cols-1 content-center gap-3 sm:grid-cols-2"
        >
          {[
            { kind: 'file', head: `▦ ${sc.artifacts.file}`, text: sc.today[0] },
            {
              kind: 'mail',
              head: `✉ ${sc.artifacts.mail}`,
              text: `“${sc.artifacts.quote}”`,
            },
            { kind: 'note', head: 'Lembrete', text: sc.today[2] },
            { kind: 'alert', head: 'Sintoma', text: sc.today[1] },
            { kind: 'late', head: 'Sintoma', text: sc.today[3] },
          ].map((a, i) => (
            <m.li
              key={a.kind}
              variants={{
                hide: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.24, ease: EASE }}
              className={cn(
                'e1 rounded-lg px-3 py-2.5 text-[12.5px] leading-snug',
                tilt[i],
                a.kind === 'note' && 'border border-purple-300 bg-purple-50',
                (a.kind === 'alert' || a.kind === 'late') &&
                  'border-rule-strong/60 bg-paper border border-dashed',
                a.kind === 'late' && 'sm:col-span-2',
                (a.kind === 'file' || a.kind === 'mail') &&
                  'border-line bg-paper border',
              )}
            >
              <span
                className={cn(
                  'type-code mb-1 block truncate text-[10.5px]',
                  a.kind === 'file'
                    ? 'text-ok'
                    : a.kind === 'alert' || a.kind === 'late'
                      ? 'text-warn'
                      : 'text-ink-3',
                )}
              >
                {a.head}
              </span>
              <span className="text-ink-2">{a.text}</span>
            </m.li>
          ))}
        </m.ul>
      </AnimatePresence>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="type-mono bg-warn-bg text-warn rounded-[5px] px-2 py-1 text-[9.5px]">
          {sc.today.length} sintomas
        </span>
        <span className="type-mono border-rule bg-paper text-ink-3 rounded-[5px] border px-2 py-1 text-[9.5px]">
          nenhuma fonte única
        </span>
      </div>
    </div>
  )
}

function Intervention({ sc }: { sc: Scenario }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative flex flex-col py-2 lg:px-0">
      <p className="type-mono mb-3 text-center text-purple-600 lg:absolute lg:inset-x-0 lg:-top-6 lg:mb-0">
        Intervenção ThEasy
      </p>
      <ol className="relative grid flex-1 grid-rows-3 gap-3 lg:gap-0 lg:px-[12.5%]">
        <span
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-[22px] w-px border-l border-dashed border-purple-500 lg:hidden"
        />
        {sc.solution.map((step, i) => (
          <m.li
            key={`${sc.slug}-${step.service}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.28,
              delay: reduce ? 0 : 0.12 + i * 0.1,
              ease: EASE,
            }}
            className="relative flex items-center"
          >
            <div
              data-wire={`node-${i}`}
              className={cn(
                'bracket bg-paper relative w-full border px-3 py-2.5',
                i === 1 ? 'e3 border-purple-600' : 'e1 border-line',
              )}
            >
              <span className="flex items-center gap-2">
                <ServiceGlyph
                  slug={step.service}
                  className="size-5 text-purple-600"
                />
                <span className="type-mono text-ink-3 text-[9.5px]">
                  {i + 1} · {step.label}
                </span>
              </span>
              <span className="mt-1 block text-[13px] leading-snug font-semibold">
                {step.text}
              </span>
            </div>
          </m.li>
        ))}
      </ol>
    </div>
  )
}

function Solution({ sc }: { sc: Scenario }) {
  return (
    <div
      data-wire="sol"
      className="stage flex flex-col gap-3 rounded-2xl p-4 sm:p-5"
    >
      <p className="type-mono text-purple-600">Solução estruturada</p>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={sc.slug}
          initial={{ opacity: 0, y: 10, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, delay: 0.1, ease: EASE }}
          className="flex flex-1 flex-col gap-3"
        >
          <ScenarioPreview type={sc.preview} />
          <div className="bracket border-ink bg-paper mt-auto flex items-start gap-2.5 border px-3.5 py-3">
            <Star size={14} className="mt-1 text-purple-600" />
            <p className="text-[14px] leading-snug">
              <strong>Decisão possível:</strong>{' '}
              {sc.decision.charAt(0).toLowerCase() + sc.decision.slice(1)}
            </p>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  )
}

/** Retângulo de layout relativo à raiz (ignora transforms de animação). */
function layoutRect(el: HTMLElement, root: HTMLElement) {
  let x = 0
  let y = 0
  let n: HTMLElement | null = el
  while (n && n !== root) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

interface WireGeometry {
  w: number
  h: number
  inputs: string[]
  spine: string[]
  output: string
  anchors: { x: number; y: number; end: boolean; strong: boolean }[]
}

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = (x2 - x1) / 2
  return `M${x1} ${y1}C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`
}

/**
 * Conectores medidos a partir das caixas reais (contexto, frentes e
 * solução). Recalculados quando o layout muda de fato (ResizeObserver),
 * nascem e terminam nas bordas, com âncoras nos dois extremos. Só no
 * layout de três colunas; no empilhado, a espinha tracejada da lista
 * cumpre o papel.
 */
function Wires({
  root,
  version,
}: {
  root: RefObject<HTMLDivElement | null>
  version: string
}) {
  const reduce = useReducedMotion()
  const [geo, setGeo] = useState<WireGeometry | null>(null)

  // useEffect (não layout): o ref da grade pai só existe depois do commit
  // completo; efeitos de layout do filho rodam antes da ligação do ref.
  useEffect(() => {
    const el = root.current
    if (!el) return
    const wide = window.matchMedia('(min-width: 64rem)')
    const measure = () => {
      const pick = (k: string) =>
        el.querySelector<HTMLElement>(`[data-wire="${k}"]`)
      const ctx = pick('ctx')
      const sol = pick('sol')
      const nodes = [0, 1, 2].map((i) => pick(`node-${i}`))
      if (!wide.matches || !ctx || !sol || nodes.some((n) => !n)) {
        setGeo(null)
        return
      }
      const C = layoutRect(ctx, el)
      const S = layoutRect(sol, el)
      const N = nodes.map((n) => layoutRect(n!, el))
      const cx = (r: typeof C) => r.x + r.w / 2
      const cy = (r: typeof C) => r.y + r.h / 2
      const right = C.x + C.w
      const yIn = [C.y + C.h * 0.32, C.y + C.h * 0.68]
      setGeo({
        w: el.offsetWidth,
        h: el.offsetHeight,
        inputs: [
          curve(right, yIn[0], N[0].x, cy(N[0])),
          curve(right, yIn[1], N[2].x, cy(N[2])),
        ],
        spine: [
          `M${cx(N[0])} ${N[0].y + N[0].h}V${N[1].y}`,
          `M${cx(N[1])} ${N[1].y + N[1].h}V${N[2].y}`,
        ],
        output: `M${N[1].x + N[1].w} ${cy(N[1])}H${S.x}`,
        anchors: [
          { x: right, y: yIn[0], end: false, strong: false },
          { x: N[0].x, y: cy(N[0]), end: true, strong: false },
          { x: right, y: yIn[1], end: false, strong: false },
          { x: N[2].x, y: cy(N[2]), end: true, strong: false },
          { x: N[1].x + N[1].w, y: cy(N[1]), end: false, strong: true },
          { x: S.x, y: cy(N[1]), end: true, strong: true },
        ],
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    el.querySelectorAll<HTMLElement>('[data-wire]').forEach((n) =>
      ro.observe(n),
    )
    wide.addEventListener('change', measure)
    return () => {
      ro.disconnect()
      wide.removeEventListener('change', measure)
    }
  }, [root, version])

  if (!geo) return null
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 0.55, delay, ease: EASE },
        }
  return (
    <svg
      key={version}
      data-testid="scenario-wires"
      width={geo.w}
      height={geo.h}
      viewBox={`0 0 ${geo.w} ${geo.h}`}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
    >
      {geo.inputs.map((d, i) => (
        <m.path
          key={`in${i}`}
          data-wire-path="input"
          d={d}
          className="fill-none stroke-purple-300"
          strokeWidth="1.5"
          strokeLinecap="round"
          {...draw(0.05 * i)}
        />
      ))}
      {geo.spine.map((d, i) => (
        <m.path
          key={`sp${i}`}
          data-wire-path="spine"
          d={d}
          className="fill-none stroke-purple-500"
          strokeWidth="1.5"
          {...draw(0.2 + 0.08 * i)}
        />
      ))}
      <path
        data-wire-path="output"
        d={geo.output}
        className="wire-flow fill-none stroke-purple-600"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {geo.anchors.map((a, i) => (
        <circle
          key={i}
          data-wire-anchor
          cx={a.x}
          cy={a.y}
          r="3.5"
          strokeWidth="1.5"
          className={cn(
            a.end
              ? a.strong
                ? 'fill-paper stroke-purple-600'
                : 'fill-purple-500 stroke-purple-500'
              : a.strong
                ? 'fill-purple-600 stroke-purple-600'
                : 'fill-paper stroke-purple-500',
          )}
        />
      ))}
    </svg>
  )
}
