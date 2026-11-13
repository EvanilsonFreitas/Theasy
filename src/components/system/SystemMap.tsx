import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useFitScale } from '@/hooks/useFitScale'
import type { SolutionSlug } from '@/content/solutions'
import { cn } from '@/lib/utils'
import { Star } from './Star'

/*
 * Mapa da arquitetura ThEasy: fontes → integração → base estruturada →
 * aplicações → decisão, dentro da moldura da consultoria. É a assinatura
 * visual do site: os mesmos nós, conectores e a estrela reaparecem nas
 * demais seções. Coordenadas desenhadas em 640 × 560 e escaladas.
 */

const W = 640
const H = 560
const CENTER = 360
const COLS = [159, 293, 427, 561] // centros das colunas (fontes e aplicações)
const COL_LEFT = [100, 234, 368, 502]

type Part =
  | 'frame'
  | 'src'
  | 'int'
  | 'base'
  | 'bi'
  | 'sis'
  | 'aut'
  | 'pre'
  | 'dec'
  | 'p_src'
  | 'p_int'
  | `p_${'bi' | 'sis' | 'aut' | 'pre'}`
  | `d_${'bi' | 'sis' | 'aut' | 'pre'}`

/** O que cada competência acende no mapa. */
const LIT: Record<SolutionSlug, Part[]> = {
  'bi-analytics': ['base', 'bi', 'dec', 'p_bi', 'd_bi'],
  'dados-engenharia': ['src', 'int', 'base', 'p_src', 'p_int'],
  sistemas: ['base', 'sis', 'dec', 'p_sis', 'd_sis'],
  automacao: ['src', 'base', 'aut', 'p_aut', 'd_aut'],
  consultoria: ['frame', 'pre', 'dec', 'p_pre', 'd_pre'],
}

const APPS = ['bi', 'sis', 'aut', 'pre'] as const

/** Desce de uma coluna até o barramento e converge para o centro. */
function down(x: number, y1: number, bus: number, y2: number) {
  const s = x < CENTER ? 1 : -1
  return `M${x} ${y1}V${bus - 6}Q${x} ${bus} ${x + 6 * s} ${bus}H${CENTER - 6 * s}Q${CENTER} ${bus} ${CENTER} ${bus + 6}V${y2}`
}

/** Sai do centro pelo barramento e desce até uma coluna. */
function fan(x: number, y1: number, bus: number, y2: number) {
  const s = x < CENTER ? -1 : 1
  return `M${CENTER} ${y1}V${bus - 6}Q${CENTER} ${bus} ${CENTER + 6 * s} ${bus}H${x - 6 * s}Q${x} ${bus} ${x} ${bus + 6}V${y2}`
}

/** Caminho completo de um pacote: fonte → … → aplicação → decisão. */
function route(src: number, app: number) {
  return (
    down(COLS[src], 96, 120, 296) +
    fan(COLS[app], 296, 320, 344).replace(`M${CENTER} 296`, '') +
    'V424' +
    down(COLS[app], 424, 448, 496).replace(/^M\d+ 424/, '')
  )
}

const PATHS: { d: string; part: Part }[] = [
  ...COLS.map((x): { d: string; part: Part } => ({
    d: down(x, 96, 120, 140),
    part: 'p_src',
  })),
  { d: `M${CENTER} 204V232`, part: 'p_int' },
  ...COLS.map((x, i) => ({
    d: fan(x, 296, 320, 344),
    part: `p_${APPS[i]}` as Part,
  })),
  ...COLS.map((x, i) => ({
    d: down(x, 424, 448, 472),
    part: `d_${APPS[i]}` as Part,
  })),
]

const ROUTES = [
  { d: route(0, 0), begin: '0s' },
  { d: route(1, 1), begin: '1.5s' },
  { d: route(3, 2), begin: '3s' },
  { d: route(2, 3), begin: '4.5s' },
]

const LAYERS = [
  ['Fontes', 70],
  ['Integração', 165],
  ['Base', 257],
  ['Aplicações', 377],
  ['Decisão', 489],
] as const

const SOURCES = ['ERP', 'CRM', 'Planilhas', 'Banco SQL']

const DESCRIPTION =
  'Mapa ilustrativo de uma solução ThEasy: dados de ERP, CRM, planilhas e bancos SQL passam por integração e tratamento, formam uma base estruturada que alimenta painéis de BI, sistemas, automações e análises de preço e margem, e apoiam decisões com informação confiável. A consultoria define o contexto e a direção.'

export function SystemMap({ active }: { active: SolutionSlug | null }) {
  const reduce = useReducedMotion()
  const wrap = useRef<HTMLDivElement>(null)
  const svg = useRef<SVGSVGElement>(null)
  const scale = useFitScale(wrap, W)
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(true)

  // Pacotes só se movem quando o mapa está visível e não foi pausado.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const s = svg.current
    if (!s || reduce) return
    if (paused || !inView) s.pauseAnimations()
    else s.unpauseAnimations()
  }, [paused, inView, reduce])

  const lit = (p: Part) => !active || LIT[active].includes(p)
  const on = (p: Part) => !!active && LIT[active].includes(p)
  const node = (p: Part) =>
    cn(
      'absolute box-border bracket border bg-paper transition-[opacity,border-color] duration-300',
      lit(p) ? 'opacity-100' : 'opacity-35',
    )

  return (
    <div
      className={cn(
        'bracket overflow-hidden border transition-colors duration-300',
        on('frame')
          ? 'border-purple-600 bg-purple-50/60'
          : 'border-rule bg-paper',
      )}
    >
      <div className="border-line flex min-h-11 items-center justify-between gap-3 border-b border-dashed px-4">
        <span className="type-mono truncate text-[10.5px] whitespace-nowrap text-purple-600">
          Consultoria · contexto e direção
        </span>
        <span className="flex shrink-0 items-center gap-3">
          <span className="type-mono text-ink-3 hidden text-[10.5px] whitespace-nowrap xl:inline">
            Arquitetura ilustrativa
          </span>
          {!reduce && (
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((p) => !p)}
              className="type-mono text-ink-2 -mr-2 inline-flex min-h-11 items-center gap-1.5 px-2 text-[10.5px] whitespace-nowrap hover:text-purple-600"
            >
              <span aria-hidden="true" className="flex gap-[3px]">
                {paused ? (
                  <svg
                    width="8"
                    height="9"
                    viewBox="0 0 8 9"
                    className="fill-current"
                  >
                    <path d="M0 0l8 4.5L0 9z" />
                  </svg>
                ) : (
                  <>
                    <span className="h-[9px] w-[2.5px] bg-current" />
                    <span className="h-[9px] w-[2.5px] bg-current" />
                  </>
                )}
              </span>
              {paused ? 'Retomar fluxo' : 'Pausar fluxo'}
            </button>
          )}
        </span>
      </div>

      <div ref={wrap} style={{ height: (H - 36) * scale }}>
        <div
          role="img"
          aria-label={DESCRIPTION}
          className="relative origin-top-left"
          style={{ width: W, height: H - 36, transform: `scale(${scale})` }}
        >
          <svg
            ref={svg}
            width={W}
            height={H - 36}
            viewBox={`0 36 ${W} ${H - 36}`}
            aria-hidden="true"
            className="absolute inset-0"
          >
            <line x1="90" y1="70" x2="90" y2="500" className="stroke-rule" />
            {LAYERS.map(([, y]) => (
              <line
                key={y}
                x1="86"
                y1={y + 7}
                x2="94"
                y2={y + 7}
                className="stroke-line"
              />
            ))}
            {PATHS.map((p, i) => (
              <path
                key={i}
                d={p.d}
                fill="none"
                strokeWidth={on(p.part) ? 1.6 : 1.25}
                strokeLinejoin="round"
                className={cn(
                  'transition-[stroke] duration-300',
                  on(p.part) ? 'stroke-purple-600' : 'stroke-wire',
                )}
              />
            ))}
            {!reduce &&
              ROUTES.map((r) => (
                <circle key={r.begin} r="3" className="fill-purple-600">
                  <animateMotion
                    dur="6s"
                    begin={r.begin}
                    repeatCount="indefinite"
                    path={r.d}
                  />
                </circle>
              ))}
          </svg>

          <div
            className="pointer-events-none absolute inset-0"
            style={{ top: -36 }}
            aria-hidden="true"
          >
            {LAYERS.map(([label, y]) => (
              <span
                key={label}
                className="type-mono text-ink-3 absolute left-[18px] text-[10px]"
                style={{ top: y }}
              >
                {label}
              </span>
            ))}

            {SOURCES.map((label, i) => (
              <div
                key={label}
                className={cn(
                  node('src'),
                  'flex h-10 w-[118px] items-center gap-2 px-3 text-[13.5px] font-[560]',
                  on('src') ? 'border-purple-600' : 'border-line',
                )}
                style={{ left: COL_LEFT[i], top: 56 }}
              >
                <span className="size-[7px] rounded-[2px] bg-purple-500" />
                {label}
              </div>
            ))}

            <div
              className={cn(
                node('int'),
                'h-16 w-[280px] px-3.5 py-2.5',
                on('int') ? 'border-purple-600' : 'border-line',
              )}
              style={{ left: 220, top: 140 }}
            >
              <div className="text-[13.5px] font-semibold">
                Integração e tratamento
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="type-code text-ink-3 text-[9.5px]">
                  extrair
                </span>
                <span className="h-[3px] flex-1 rounded-sm bg-purple-600" />
                <span className="type-code text-ink-3 text-[9.5px]">
                  limpar
                </span>
                <span className="h-[3px] flex-1 rounded-sm bg-purple-300" />
                <span className="type-code text-ink-3 text-[9.5px]">
                  modelar
                </span>
              </div>
            </div>

            <div
              className={cn(
                node('base'),
                'h-16 w-[250px] border-purple-600 px-3.5 py-2.5',
              )}
              style={{ left: 235, top: 232 }}
            >
              <div className="flex items-center gap-2 text-[13.5px] font-semibold">
                <Star size={12} className="text-purple-600" />
                Base estruturada
              </div>
              <div className="type-code text-ink-3 mt-2 truncate text-[10px] whitespace-nowrap">
                fato_vendas · dim_cliente
              </div>
            </div>

            <AppNode
              part="bi"
              i={0}
              title="Painéis de BI"
              lit={lit}
              on={on}
              node={node}
            >
              <div className="mt-2 flex h-[30px] items-end gap-1">
                {[40, 65, 52, 88, 72].map((h, k) => (
                  <span
                    key={k}
                    className={cn(
                      'flex-1',
                      k === 3 ? 'bg-purple-600' : 'bg-purple-300',
                    )}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </AppNode>
            <AppNode
              part="sis"
              i={1}
              title="Sistemas"
              lit={lit}
              on={on}
              node={node}
            >
              <div className="mt-2.5 flex flex-col gap-[5px]">
                <span className="h-1.5 rounded-sm bg-purple-100" />
                <span className="bg-paper-2 h-1.5 w-4/5 rounded-sm" />
                <span className="bg-paper-2 h-1.5 w-[90%] rounded-sm" />
              </div>
            </AppNode>
            <AppNode
              part="aut"
              i={2}
              title="Automações"
              lit={lit}
              on={on}
              node={node}
            >
              <div className="mt-4 flex items-center">
                <span className="size-2 rounded-full border-[1.5px] border-purple-600" />
                <span className="h-[1.5px] flex-1 bg-purple-600" />
                <span className="size-2 rounded-full bg-purple-600" />
                <span className="h-[1.5px] flex-1 bg-purple-600" />
                <span className="size-2 rounded-full bg-purple-600" />
              </div>
            </AppNode>
            <AppNode
              part="pre"
              i={3}
              title="Preço e margem"
              lit={lit}
              on={on}
              node={node}
            >
              <div className="mt-2 flex h-[30px] items-end gap-[3px]">
                <span className="bg-line h-[90%] flex-1" />
                <span className="mb-[18px] h-[30%] flex-1 bg-purple-300" />
                <span className="mb-[11px] h-[22%] flex-1 bg-purple-300" />
                <span className="h-[38%] flex-1 bg-purple-600" />
              </div>
            </AppNode>

            <div
              className={cn(
                node('dec'),
                'border-ink flex h-12 w-[440px] items-center gap-2.5 px-4',
              )}
              style={{ left: 140, top: 472 }}
            >
              <Star size={14} className="text-purple-600" />
              <span className="text-[14px] font-semibold">Decisão</span>
              <span className="text-ink-2 text-[13px]">
                com informação confiável, no tempo certo
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AppNode({
  part,
  i,
  title,
  children,
  on,
  node,
}: {
  part: Part
  i: number
  title: string
  children: ReactNode
  lit: (p: Part) => boolean
  on: (p: Part) => boolean
  node: (p: Part) => string
}) {
  return (
    <div
      className={cn(
        node(part),
        'h-20 w-[118px] px-3 py-2.5',
        on(part) ? 'border-purple-600' : 'border-line',
      )}
      style={{ left: COL_LEFT[i], top: 344 }}
    >
      <div className="text-[12px] font-semibold tracking-[-0.01em] whitespace-nowrap">
        {title}
      </div>
      {children}
    </div>
  )
}

/**
 * Versão vertical do mapa para telas estreitas: a mesma sequência de
 * camadas, empilhada, em vez de uma redução ilegível do desenho largo.
 */
export function SystemMapCompact({ active }: { active: SolutionSlug | null }) {
  const lit = (p: Part) => !active || LIT[active].includes(p)
  const box = (p: Part, extra?: string) =>
    cn(
      'bracket-sm border bg-paper px-2.5 py-2 text-[13px] font-[560] transition-[opacity,border-color] duration-300',
      active && LIT[active].includes(p) ? 'border-purple-600' : 'border-line',
      lit(p) ? 'opacity-100' : 'opacity-40',
      extra,
    )
  const wire = (
    <span
      aria-hidden="true"
      className="mx-auto block h-3.5 w-[1.25px] bg-purple-600"
    />
  )
  return (
    <div
      role="img"
      aria-label={DESCRIPTION}
      className={cn(
        'bracket border p-3.5 transition-colors',
        active === 'consultoria'
          ? 'border-purple-600 bg-purple-50/60'
          : 'border-rule bg-paper',
      )}
    >
      <p className="type-mono border-line border-b border-dashed pb-2.5 text-[10px] text-purple-600">
        Consultoria · contexto e direção
      </p>
      <p className="type-mono text-ink-3 mt-3 text-[10px]">Fontes</p>
      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        {['ERP', 'CRM', 'Planilhas', 'SQL'].map((s) => (
          <span
            key={s}
            className={box('src', 'px-1 text-center text-[11.5px]')}
          >
            {s}
          </span>
        ))}
      </div>
      {wire}
      <p className={box('int', 'text-center')}>Integração e tratamento</p>
      {wire}
      <p
        className={box(
          'base',
          'flex items-center justify-center gap-2 border-purple-600',
        )}
      >
        <Star size={11} className="text-purple-600" />
        Base estruturada
      </p>
      {wire}
      <div className="grid grid-cols-2 gap-1.5">
        <span className={box('bi')}>Painéis de BI</span>
        <span className={box('sis')}>Sistemas</span>
        <span className={box('aut')}>Automações</span>
        <span className={box('pre')}>Preço e margem</span>
      </div>
      {wire}
      <p className={box('dec', 'border-ink flex items-center gap-2')}>
        <Star size={12} className="text-purple-600" />
        Decisão com informação confiável
      </p>
    </div>
  )
}
