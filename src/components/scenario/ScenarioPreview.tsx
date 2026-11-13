import type { Scenario } from '@/content/scenarios'
import { cn } from '@/lib/utils'

/*
 * Prévia ilustrativa da solução estruturada em cada cenário. Interfaces
 * pequenas, mas plausíveis: rótulos, estados e metas. Valores fictícios.
 */

const dot = (ok: boolean) => (
  <span
    className={cn('inline-block size-2 rounded-full', ok ? 'bg-ok' : 'bg-warn')}
    aria-hidden="true"
  />
)

export function ScenarioPreview({ type }: { type: Scenario['preview'] }) {
  const title = {
    margin: 'Margem por produto',
    lines: 'Produção por linha',
    funnel: 'Funil do trimestre',
    shipments: 'Expedição de hoje',
    scorecard: 'Painel executivo',
  }[type]

  return (
    <div className="win e2 border-line overflow-hidden rounded-xl border">
      <div className="border-rule flex items-center justify-between border-b px-3.5 py-2.5">
        <span className="text-[13px] font-semibold">{title}</span>
        <span className="type-mono bg-warn-bg text-warn rounded-[5px] px-1.5 py-0.5 text-[9px]">
          Ilustrativo
        </span>
      </div>

      {type === 'margin' && (
        <table className="w-full text-left text-[12px]">
          <thead>
            <tr className="type-mono text-ink-3 text-[9px]">
              <th scope="col" className="px-3.5 py-2 font-normal">
                Produto
              </th>
              <th scope="col" className="px-2 py-2 font-normal">
                Margem
              </th>
              <th scope="col" className="px-2 py-2 font-normal">
                Meta
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {[
              ['Linha premium', '37%', true],
              ['Serviços', '30%', true],
              ['Reposição', '24%', false],
              ['Acessórios', '18%', false],
            ].map(([n, v, ok]) => (
              <tr
                key={n as string}
                className={cn(
                  'border-paper-2 border-t',
                  !ok && 'bg-warn-bg/50',
                )}
              >
                <td className="px-3.5 py-1.5">{n}</td>
                <td className="px-2 py-1.5">{v}</td>
                <td className="px-2 py-1.5">
                  {dot(ok as boolean)}{' '}
                  <span className="sr-only">
                    {ok ? 'acima' : 'abaixo'} da meta
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {type === 'lines' && (
        <ul className="flex flex-col gap-2.5 p-3.5 text-[12px]">
          {[
            ['Linha 1', 86, 'ok', 'sem parada'],
            ['Linha 2', 61, 'warn', 'parada: setup'],
            ['Linha 3', 78, 'ok', 'sem parada'],
          ].map(([n, v, st, why]) => (
            <li
              key={n as string}
              className="grid grid-cols-[52px_minmax(0,1fr)_auto] items-center gap-2.5"
            >
              <span className="font-semibold">{n}</span>
              <span className="bg-paper-2 h-2 overflow-hidden rounded-sm">
                <span
                  className={cn(
                    'block h-full origin-left',
                    st === 'ok' ? 'bg-purple-600' : 'bg-warn',
                  )}
                  style={{ transform: `scaleX(${(v as number) / 100})` }}
                />
              </span>
              <span
                className={cn(
                  'type-code text-[10.5px]',
                  st === 'ok' ? 'text-ink-3' : 'text-warn',
                )}
              >
                {why}
              </span>
            </li>
          ))}
          <li className="type-code border-line text-ink-3 border-t border-dashed pt-2 text-[10.5px]">
            motivo registrado no apontamento · turno B
          </li>
        </ul>
      )}

      {type === 'funnel' && (
        <ul className="flex flex-col gap-1.5 p-3.5 text-[12px]">
          {[
            ['Prospecção', 100],
            ['Proposta', 68],
            ['Negociação', 41],
            ['Fechado', 22],
          ].map(([n, w], i) => (
            <li key={n as string} className="flex items-center gap-2.5">
              <span className="text-ink-2 w-[72px]">{n}</span>
              <span
                className={cn(
                  'h-5 rounded-[4px]',
                  i === 3 ? 'bg-purple-600' : 'bg-purple-300',
                )}
                style={{ width: `${(w as number) * 0.62}%` }}
              />
            </li>
          ))}
          <li className="type-code border-line text-ink-3 mt-1 border-t border-dashed pt-2 text-[10.5px]">
            desconto acima da política exige aprovação
          </li>
        </ul>
      )}

      {type === 'shipments' && (
        <ul className="divide-paper-2 divide-y text-[12px]">
          {[
            ['Pedido 7310', 'Separação', 'bg-paper-2 text-ink-2'],
            ['Pedido 7311', 'Em rota', 'bg-purple-50 text-purple-700'],
            ['Pedido 7312', 'Entregue', 'bg-ok-bg text-ok'],
            ['Pedido 7313', 'Atrasado', 'bg-danger-bg text-danger'],
          ].map(([n, s, cls]) => (
            <li
              key={n}
              className="flex items-center justify-between px-3.5 py-2"
            >
              <span className="tabular-nums">{n}</span>
              <span
                className={cn(
                  'rounded-[5px] px-1.5 py-0.5 text-[11px] font-semibold',
                  cls,
                )}
              >
                {s}
              </span>
            </li>
          ))}
        </ul>
      )}

      {type === 'scorecard' && (
        <dl className="bg-rule grid grid-cols-2 gap-px text-[12px]">
          {[
            ['Receita', 'no alvo', true, 'Comercial'],
            ['Margem', 'abaixo', false, 'Financeiro'],
            ['Prazo de entrega', 'no alvo', true, 'Logística'],
            ['Projetos', '2 em atraso', false, 'PMO'],
          ].map(([k, v, ok, owner]) => (
            <div
              key={k as string}
              className="bg-paper flex flex-col gap-0.5 px-3 py-2.5"
            >
              <dt className="type-mono text-ink-3 text-[9px]">{k}</dt>
              <dd className="flex items-center gap-1.5 font-semibold">
                {dot(ok as boolean)}
                {v}
              </dd>
              <dd className="text-ink-3 text-[10.5px]">responsável: {owner}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  )
}
