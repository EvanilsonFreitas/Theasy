import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Star } from '@/components/system/Star'
import { smoothPath, type Pt } from '@/lib/chart'
import { PriorityMatrix } from './PriorityMatrix'

/*
 * Entregáveis ilustrativos de cada etapa do método. Cada um usa a mesma
 * gramática (nós em colchete, conectores, estrela), com forma própria.
 */

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="win e2 border-line w-full overflow-hidden rounded-xl border">
      <div className="border-rule flex items-center justify-between border-b px-3.5 py-2.5">
        <span className="text-[13px] font-semibold">{title}</span>
        <span className="type-mono text-ink-3 text-[9px]">Ilustrativo</span>
      </div>
      {children}
    </div>
  )
}

/** 01 · Mapa de problemas e oportunidades: ver PriorityMatrix. */
export function Matrix() {
  return <PriorityMatrix />
}

/** 02 · Arquitetura da solução. */
export function Architecture() {
  return (
    <Frame title="Arquitetura da solução">
      <div className="stage m-3 rounded-lg border-0 p-4">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-[11.5px]">
          <div className="flex flex-col gap-1.5">
            {['ERP', 'Planilhas', 'CRM'].map((s) => (
              <span
                key={s}
                className="bracket-sm e1 border-line bg-paper border px-2 py-1.5 text-center font-semibold"
              >
                {s}
              </span>
            ))}
          </div>
          <span aria-hidden="true" className="h-px w-5 bg-purple-500" />
          <span className="bracket e3 bg-paper flex flex-col items-center gap-1 border border-purple-600 px-2 py-3 text-center font-semibold">
            <Star size={11} className="text-purple-600" />
            Base única
          </span>
          <span aria-hidden="true" className="h-px w-5 bg-purple-500" />
          <div className="flex flex-col gap-1.5">
            {[
              'Painel de margem',
              'Rotina de fechamento',
              'Regras de preço',
            ].map((s) => (
              <span
                key={s}
                className="bracket-sm e1 border-line bg-paper border px-2 py-1.5 text-center"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <dl className="border-line mt-4 grid grid-cols-3 gap-2 border-t border-dashed pt-3 text-[11px]">
          {[
            ['Escopo', '3 entregas'],
            ['Prazo', '3 ciclos'],
            ['Sucesso', 'margem confiável'],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="type-mono text-ink-3 text-[8.5px]">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Frame>
  )
}

/** 03 · Versões funcionando, ciclo a ciclo. */
export function Versions() {
  const v = [
    { n: 'v0.1', t: 'Protótipo navegável', st: 'validado' },
    { n: 'v0.2', t: 'Cadastros e regras de custo', st: 'validado' },
    { n: 'v0.3', t: 'Painel de margem', st: 'em validação' },
  ]
  return (
    <Frame title="Versões funcionando">
      <ol className="flex flex-col gap-2.5 p-4">
        {v.map((x, i) => (
          <li
            key={x.n}
            className={cn(
              'bracket flex items-center gap-3 border px-3 py-2.5',
              i === 2
                ? 'e3 bg-paper border-purple-600'
                : 'border-line bg-paper',
            )}
          >
            <span className="type-code w-9 text-[11px] text-purple-700">
              {x.n}
            </span>
            <span className="flex-1 text-[13px] font-semibold">{x.t}</span>
            <span
              className={cn(
                'rounded-[5px] px-1.5 py-0.5 text-[11px] font-semibold',
                i === 2 ? 'bg-purple-50 text-purple-700' : 'bg-ok-bg text-ok',
              )}
            >
              {x.st}
            </span>
          </li>
        ))}
        <li className="mt-1 grid grid-cols-3 gap-1.5" aria-hidden="true">
          {[1, 0.6, 0.3].map((o, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full bg-purple-600"
              style={{ opacity: o }}
            />
          ))}
        </li>
      </ol>
    </Frame>
  )
}

/** 04 · Implantação e integração. */
export function Rollout() {
  const items = [
    ['Integração com o ERP', true],
    ['Permissões por área', true],
    ['Treinamento das equipes', true],
    ['Documentação de uso e manutenção', false],
    ['Acompanhamento da primeira semana', false],
  ] as const
  return (
    <Frame title="Plano de implantação">
      <ul className="flex flex-col p-4">
        {items.map(([t, ok]) => (
          <li
            key={t}
            className="border-paper-2 flex items-center gap-3 border-b py-2 text-[13px] last:border-0"
          >
            <span
              aria-hidden="true"
              className={cn(
                'flex size-5 items-center justify-center rounded-md border text-[11px] font-bold',
                ok
                  ? 'border-purple-600 bg-purple-600 text-white'
                  : 'border-line',
              )}
            >
              {ok ? '✓' : ''}
            </span>
            <span className={ok ? '' : 'text-ink-2'}>{t}</span>
            <span className="sr-only">{ok ? 'concluído' : 'pendente'}</span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

/** 05 · Acompanhamento e melhoria contínua. */
export function Evolution() {
  // Uso semanal ilustrativo: cresce com oscilações (feriados, fechamento).
  const use = [18, 31, 27, 44, 52, 47, 61, 58, 69, 74, 70, 79]
  const pts: Pt[] = use.map((v, i) => [(i / (use.length - 1)) * 100, 96 - v])
  const line = smoothPath(pts)
  return (
    <Frame title="Acompanhamento de uso">
      <div className="grid gap-4 p-4 sm:grid-cols-[3fr_2fr]">
        <div>
          <p className="type-mono text-ink-3 mb-2 text-[9px]">
            Usuários ativos por semana
          </p>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="border-line h-32 w-full border-b border-l"
            role="img"
            aria-label="Gráfico ilustrativo de uso crescente, com oscilações, ao longo de doze semanas"
          >
            {[25, 50, 75].map((y) => (
              <line
                key={y}
                x1="0"
                x2="100"
                y1={y}
                y2={y}
                className="stroke-paper-3"
                strokeDasharray="2 2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={`${line}L100 100L0 100Z`} className="fill-purple-100/70" />
            <path
              d={line}
              fill="none"
              className="stroke-purple-600"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div>
          <p className="type-mono text-ink-3 mb-2 text-[9px]">
            Próximas melhorias
          </p>
          <ul className="flex flex-col gap-1.5 text-[12px]">
            {[
              'Alerta de margem baixa',
              'Visão por vendedor',
              'Exportação para a diretoria',
            ].map((t) => (
              <li
                key={t}
                className="bracket-sm border-line bg-paper border px-2 py-1.5"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  )
}
