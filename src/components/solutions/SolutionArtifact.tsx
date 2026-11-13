import type { ReactNode } from 'react'
import type { ArtifactKind } from '@/content/solutions'
import { cn } from '@/lib/utils'

/**
 * Representações ILUSTRATIVAS de entregáveis, desenhadas em HTML/CSS.
 * Não são capturas de projetos reais nem exibem números: mostram a forma
 * de cada entrega (um painel, um pipeline, um sistema, uma automação,
 * uma formação de preço). Visual decorativo para leitores de tela —
 * o significado está na legenda.
 */

const captions: Record<ArtifactKind, string> = {
  dashboard: 'Painel gerencial com indicadores, tendência e recorte por área',
  pipeline: 'Fontes integradas em uma base analítica confiável',
  app: 'Sistema de gestão desenhado a partir do processo',
  flow: 'Etapas manuais substituídas por uma rotina automática',
  pricing: 'Formação de preço a partir da estrutura de custos',
}

export function SolutionArtifact({
  kind,
  className,
}: {
  kind: ArtifactKind
  className?: string
}) {
  return (
    <figure className={cn('group/art m-0', className)}>
      <div
        aria-hidden="true"
        className="border-ink bg-paper relative overflow-hidden border"
      >
        <div className="border-rule flex items-center gap-2 border-b px-3 py-2">
          <span className="bg-rule-strong size-2" />
          <span className="bg-rule size-2" />
          <span className="bg-rule size-2" />
          <span className="type-mono text-ink-3 ml-2 text-[10px]">
            {kindLabel[kind]}
          </span>
        </div>
        <div className="p-4 sm:p-5">{renderers[kind]()}</div>
      </div>
      <figcaption className="text-ink-3 mt-3 flex gap-2 text-sm">
        <span className="type-mono shrink-0 text-[11px] leading-5">
          Ilustrativo
        </span>
        <span>{captions[kind]}</span>
      </figcaption>
    </figure>
  )
}

const kindLabel: Record<ArtifactKind, string> = {
  dashboard: 'painel · visão executiva',
  pipeline: 'dados · fluxo de carga',
  app: 'sistema · pedidos',
  flow: 'automação · conciliação',
  pricing: 'preço · composição',
}

function Bar({ w, accent }: { w: number; accent?: boolean }) {
  return (
    <span className="bg-paper-2 block h-2">
      <span
        className={cn('block h-full', accent ? 'bg-purple-600' : 'bg-ink')}
        style={{ width: `${w}%` }}
      />
    </span>
  )
}

const renderers: Record<ArtifactKind, () => ReactNode> = {
  dashboard: () => (
    <div className="grid gap-4">
      <div className="grid grid-cols-3 gap-2">
        {['Receita', 'Margem', 'Meta'].map((l, i) => (
          <div key={l} className="border-rule border p-2.5">
            <span className="type-mono text-ink-3 block text-[10px]">{l}</span>
            <span
              className={cn(
                'mt-2 block h-3',
                i === 1 ? 'w-3/5 bg-purple-600' : 'bg-ink w-4/5',
              )}
            />
          </div>
        ))}
      </div>
      <svg
        viewBox="0 0 300 80"
        className="h-20 w-full"
        preserveAspectRatio="none"
      >
        <polyline
          points="0,62 30,58 60,60 90,48 120,50 150,40 180,44 210,30 240,34 270,22 300,18"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <polyline
          points="0,66 30,64 60,66 90,60 120,62 150,58 180,62 210,56 240,60 270,58 300,60"
          fill="none"
          stroke="var(--color-purple-600)"
          strokeWidth="2"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="grid gap-2">
        <Bar w={78} />
        <Bar w={56} />
        <Bar w={24} accent />
      </div>
    </div>
  ),
  pipeline: () => (
    <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-[12px] sm:text-[13px]">
      <div className="grid gap-1.5">
        {['ERP', 'CRM', 'Planilhas'].map((s) => (
          <span
            key={s}
            className="border-rule-strong border border-dashed px-2 py-1.5"
          >
            {s}
          </span>
        ))}
      </div>
      <Connector />
      <div className="grid gap-1.5">
        <span className="border-ink border px-2 py-1.5">Tratamento</span>
        <span className="border-ink border px-2 py-1.5">Qualidade</span>
      </div>
      <Connector accent />
      <div className="grid gap-1.5">
        <span className="border border-purple-600 bg-purple-50 px-2 py-3 font-semibold">
          Base analítica
        </span>
        <span className="type-mono text-ink-3 text-[10px]">
          → painéis · sistemas
        </span>
      </div>
    </div>
  ),
  app: () => (
    <div className="grid grid-cols-[4.5rem_1fr] gap-3 text-[12px]">
      <div className="grid content-start gap-1.5">
        {['Pedidos', 'Clientes', 'Estoque', 'Relatórios'].map((s, i) => (
          <span
            key={s}
            className={cn(
              'px-1.5 py-1',
              i === 0 ? 'bg-ink text-white' : 'text-ink-2',
            )}
          >
            {s}
          </span>
        ))}
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Pedidos em aberto</span>
          <span className="bg-purple-600 px-2 py-1 text-[11px] text-white">
            + Novo
          </span>
        </div>
        {[
          ['Aguardando aprovação', true],
          ['Em produção', false],
          ['Expedido', false],
          ['Em produção', false],
        ].map(([s, flag], i) => (
          <div
            key={i}
            className="border-rule grid grid-cols-[1fr_auto] items-center gap-2 border-b py-1.5"
          >
            <span className="bg-paper-3 block h-2 w-3/4" />
            <span
              className={cn(
                'type-mono px-1.5 py-0.5 text-[9px]',
                flag ? 'bg-purple-50 text-purple-800' : 'bg-paper-2 text-ink-2',
              )}
            >
              {s as string}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
  flow: () => (
    <div className="grid gap-4 text-[12px] sm:text-[13px]">
      <div>
        <span className="type-mono text-ink-3 text-[10px]">Antes</span>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {[
            'Baixar extrato',
            'Copiar',
            'Colar',
            'Conferir',
            'Enviar email',
          ].map((s) => (
            <span
              key={s}
              className="border-rule-strong text-ink-3 border border-dashed px-2 py-1 line-through"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div>
        <span className="type-mono text-[10px] text-purple-600">Depois</span>
        <div className="mt-1.5 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5">
          <span className="border-ink border px-2 py-1.5">
            Coleta automática
          </span>
          <Connector />
          <span className="border-ink border px-2 py-1.5">
            Regras de conferência
          </span>
          <Connector accent />
          <span className="border border-purple-600 bg-purple-50 px-2 py-1.5">
            Só as exceções
          </span>
        </div>
      </div>
    </div>
  ),
  pricing: () => {
    const parts: [string, number, boolean?][] = [
      ['Custo direto', 42],
      ['Despesas variáveis', 16],
      ['Tributos', 18],
      ['Margem', 24, true],
    ]
    return (
      <div className="grid gap-4 text-[12px] sm:text-[13px]">
        <div className="flex h-10 w-full">
          {parts.map(([l, w, accent]) => (
            <span
              key={l}
              className={cn(
                'border-paper h-full border-r',
                accent ? 'bg-purple-600' : 'bg-ink',
              )}
              style={{ width: `${w}%`, opacity: accent ? 1 : 0.55 + w / 100 }}
            />
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {parts.map(([l, , accent]) => (
            <li key={l} className="flex items-center gap-2">
              <span
                className={cn('size-2.5', accent ? 'bg-purple-600' : 'bg-ink')}
              />
              {l}
            </li>
          ))}
        </ul>
        <div className="border-ink flex items-baseline justify-between border-t pt-2">
          <span className="font-semibold">Preço de venda</span>
          <span className="type-mono text-ink-3 text-[10px]">
            = soma das partes
          </span>
        </div>
      </div>
    )
  },
}

function Connector({ accent }: { accent?: boolean }) {
  return (
    <span className="bg-rule-strong relative block h-px w-4 overflow-hidden sm:w-6">
      <span
        className={cn(
          'absolute inset-y-0 left-0 w-1/3 [animation-play-state:paused] group-hover/art:[animation-play-state:running]',
          accent ? 'bg-purple-600' : 'bg-ink',
        )}
        style={{ animation: 'travel 2.4s var(--ease-snap) infinite' }}
      />
    </span>
  )
}
