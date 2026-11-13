import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { LayoutGroup, m, useInView, useReducedMotion } from 'framer-motion'
import type { IllustrativeCase } from '@/content/cases'
import { STAGES } from '@/content/stages'
import { cn } from '@/lib/utils'

/** Posições "fora de esquadro" das fontes no estágio Desafio. */
const SCATTER = [
  { rotate: -2.2, y: 0 },
  { rotate: 1.6, y: 7 },
  { rotate: -1, y: -2 },
  { rotate: 2.6, y: -5 },
  { rotate: -1.6, y: 5 },
]

const SNAP = { type: 'spring', stiffness: 260, damping: 30, mass: 0.9 } as const
const STAGE_MS = 5200

interface WorksheetProps {
  data: IllustrativeCase
  /** Avança sozinho entre as etapas (pausável; desligado com movimento reduzido). */
  autoPlay?: boolean
  className?: string
}

/**
 * Folha de trabalho — o componente-assinatura da ThEasy.
 *
 * Mostra um caso ilustrativo atravessando as quatro estações do método:
 * as fontes dispersas (Desafio) se encaixam em um modelo (Estrutura),
 * viram uma interface concreta (Solução) e terminam em uma frase (Decisão).
 * O "encaixe" usa animação de layout compartilhado: as mesmas etiquetas
 * saem tortas e assentam na grade.
 *
 * Acessível como abas (setas, Home/End), com botão de pausa (WCAG 2.2.2).
 */
export function Worksheet({
  data,
  autoPlay = false,
  className,
}: WorksheetProps) {
  const uid = useId()
  const reduceMotion = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const inView = useInView(rootRef, { amount: 0.4 })

  const [stage, setStage] = useState(0)
  const [userPaused, setUserPaused] = useState(!autoPlay)
  const [hovering, setHovering] = useState(false)

  const canAutoPlay = autoPlay && !reduceMotion
  const playing = canAutoPlay && !userPaused && !hovering && inView

  // Troca de caso: volta à primeira estação.
  const [caseKey, setCaseKey] = useState(data.area)
  if (caseKey !== data.area) {
    setCaseKey(data.area)
    setStage(0)
  }

  const advance = useCallback(
    () => setStage((s) => (s + 1) % STAGES.length),
    [],
  )

  useEffect(() => {
    if (!playing) return
    const t = window.setTimeout(advance, STAGE_MS)
    return () => window.clearTimeout(t)
  }, [playing, stage, advance])

  const select = (i: number, focus = false) => {
    setStage(i)
    setUserPaused(true)
    if (focus) tabRefs.current[i]?.focus()
  }

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = STAGES.length - 1
    const map: Record<string, number> = {
      ArrowRight: i === last ? 0 : i + 1,
      ArrowLeft: i === 0 ? last : i - 1,
      Home: 0,
      End: last,
    }
    if (e.key in map) {
      e.preventDefault()
      select(map[e.key], true)
    }
  }

  const tabId = (i: number) => `${uid}-tab-${i}`
  const panelId = `${uid}-panel`

  return (
    <div
      ref={rootRef}
      className={cn('border-ink bg-paper border', className)}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovering(false)
      }}
    >
      <div className="border-ink flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b px-4 py-3">
        <span className="type-mono">Folha de trabalho</span>
        <span className="type-mono text-ink-3">
          Caso ilustrativo · {data.area}
        </span>
      </div>

      <div
        role="tablist"
        aria-label={`Etapas do caso ilustrativo: ${data.area}`}
        className="border-rule grid grid-cols-4 border-b"
      >
        {STAGES.map((label, i) => {
          const selected = stage === i
          const isDecision = i === STAGES.length - 1
          return (
            <button
              key={label}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              id={tabId(i)}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                'border-rule relative min-h-14 overflow-hidden border-r px-2 py-2.5 text-left transition-colors duration-200 last:border-r-0 sm:px-3.5',
                selected
                  ? 'bg-ink text-white'
                  : 'bg-paper text-ink hover:bg-paper-2',
                !selected && isDecision && 'text-purple-600',
              )}
            >
              <span className="type-mono block text-[10px] opacity-80 sm:text-[11px]">
                0{i + 1}
              </span>
              <span className="mt-0.5 block text-[13px] font-semibold sm:text-[15px]">
                {label}
              </span>
              {selected && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-purple-600"
                  style={
                    playing
                      ? {
                          animation: `stage-progress ${STAGE_MS}ms linear both`,
                        }
                      : undefined
                  }
                />
              )}
            </button>
          )
        })}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(stage)}
        aria-live={playing ? 'off' : 'polite'}
        className="min-h-[23rem] p-5 sm:min-h-[22rem] sm:p-6"
      >
        <LayoutGroup id={`${uid}-${data.area}`}>
          {stage === 0 && <StageChallenge data={data} />}
          {stage === 1 && <StageStructure data={data} />}
          {stage === 2 && <StageSolution data={data} />}
          {stage === 3 && <StageDecision data={data} />}
        </LayoutGroup>
      </div>

      <div className="border-rule flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t px-4 py-2.5">
        <span className="type-mono text-ink-3">
          Exemplo ilustrativo, sem dados de clientes
        </span>
        <div className="flex items-center gap-1">
          {canAutoPlay && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="text-ink-2 hover:text-ink min-h-11 px-3 text-sm font-medium"
              aria-label={
                userPaused
                  ? 'Retomar avanço automático'
                  : 'Pausar avanço automático'
              }
            >
              {userPaused ? '▶ Retomar' : '❚❚ Pausar'}
            </button>
          )}
          <button
            type="button"
            onClick={() => select((stage + 1) % STAGES.length)}
            className="group/btn min-h-11 px-3 text-sm font-semibold text-purple-600 hover:text-purple-800"
          >
            {stage === STAGES.length - 1 ? 'Recomeçar' : 'Próxima etapa'}{' '}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-150 group-hover/btn:translate-x-1"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.42, ease: [0.2, 0.8, 0.2, 1] as const },
}

function Chip({
  id,
  children,
  className,
  style,
}: {
  id: string
  children: string
  className?: string
  style?: { rotate: number; y: number }
}) {
  return (
    <m.span
      layoutId={id}
      layout
      transition={SNAP}
      initial={false}
      animate={style ?? { rotate: 0, y: 0 }}
      className={cn(
        'inline-flex items-center px-3 py-2 text-[13px] sm:text-sm',
        className,
      )}
    >
      {children}
    </m.span>
  )
}

function StageChallenge({ data }: { data: IllustrativeCase }) {
  return (
    <div>
      <m.p {...fadeUp} className="type-mono text-ink-3 mb-3">
        Quem pergunta: {data.asker}
      </m.p>
      <m.p
        {...fadeUp}
        className="mb-7 text-[1.375rem] leading-[1.2] font-[560] tracking-[-0.015em] [font-stretch:88%] sm:text-[1.625rem]"
      >
        “{data.question}”
      </m.p>
      <p className="type-mono text-ink-3 mb-3">O que existe hoje</p>
      <div className="flex flex-wrap gap-2.5">
        {data.sources.map((s, i) => (
          <Chip
            key={s}
            id={`src-${i}`}
            style={SCATTER[i % SCATTER.length]}
            className="border-rule-strong bg-paper border border-dashed"
          >
            {s}
          </Chip>
        ))}
      </div>
    </div>
  )
}

function StageStructure({ data }: { data: IllustrativeCase }) {
  const [a, b, c, d, e] = data.sources
  return (
    <div>
      <m.p {...fadeUp} className="type-mono text-ink-3 mb-4">
        As mesmas fontes, organizadas em um modelo
      </m.p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
        {[a, b, c].map((s, i) =>
          s ? (
            <Chip
              key={s}
              id={`src-${i}`}
              className="border-ink bg-paper border"
            >
              {s}
            </Chip>
          ) : null,
        )}
        <m.div
          initial={{ opacity: 0, scaleX: 0.96 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
          className="col-span-2 border border-purple-600 bg-purple-50 p-3.5 sm:col-span-3"
        >
          <span className="type-mono text-purple-800">Fato central</span>
          <p className="mt-1 text-[15px] leading-snug">
            <strong className="font-[640]">{data.model.fact}</strong>
            <span className="text-ink-2"> = {data.model.formula}</span>
          </p>
        </m.div>
        {[d, e].map((s, i) =>
          s ? (
            <Chip
              key={s}
              id={`src-${i + 3}`}
              className="border-ink bg-paper border"
            >
              {s}
            </Chip>
          ) : null,
        )}
      </div>
      <m.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.35 }}
        className="text-ink-2 mt-5 text-[15px] leading-normal"
      >
        Uma única definição, aceita por todas as áreas envolvidas.
      </m.p>
    </div>
  )
}

function StageSolution({ data }: { data: IllustrativeCase }) {
  return (
    <div>
      <m.p {...fadeUp} className="type-mono text-ink-3 mb-4">
        Painel · {data.solution.title}
      </m.p>
      <ul className="flex flex-col gap-3" aria-label={data.solution.title}>
        {data.solution.rows.map((r, i) => (
          <li
            key={r.label}
            className="grid grid-cols-[6.5rem_1fr] items-center gap-3 text-sm sm:grid-cols-[7.5rem_1fr]"
          >
            <span className={cn(r.flag && 'font-semibold text-purple-800')}>
              {r.label}
              {r.flag && <span className="sr-only">, em destaque</span>}
            </span>
            <span className="bg-paper-2 relative h-3.5">
              <m.span
                aria-hidden="true"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 * i,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className={cn(
                  'absolute inset-y-0 left-0 origin-left',
                  r.flag ? 'bg-purple-600' : 'bg-ink',
                )}
                style={{ width: `${Math.round(r.value * 100)}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
      <m.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.4 }}
        className="text-ink-2 mt-5 text-[15px] leading-normal"
      >
        {data.solution.caption}
      </m.p>
    </div>
  )
}

function StageDecision({ data }: { data: IllustrativeCase }) {
  return (
    <div>
      <m.p {...fadeUp} className="type-mono mb-4 text-purple-600">
        Decisão
      </m.p>
      <div className="relative pl-4">
        <m.span
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-y-0 left-0 w-[3px] origin-top bg-purple-600"
        />
        <m.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.12 }}
          className="text-[1.375rem] leading-[1.2] font-[560] tracking-[-0.015em] [font-stretch:88%] sm:text-[1.625rem]"
        >
          {data.decision}
        </m.p>
      </div>
      <m.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.3 }}
        className="text-ink-2 mt-6 text-[15px] leading-normal"
      >
        {data.decisionNote}
      </m.p>
    </div>
  )
}
