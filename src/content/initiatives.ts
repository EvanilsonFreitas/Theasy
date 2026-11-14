/*
 * Iniciativas demonstrativas da matriz de priorização (impacto × esforço,
 * escala qualitativa de 1 a 5). Não representam clientes nem projetos reais.
 */

export interface Initiative {
  id: string
  name: string
  impact: number
  effort: number
  description: string
  rationale: string
}

export const INITIATIVES: Initiative[] = [
  {
    id: 'base',
    name: 'Base de custos única',
    impact: 4.6,
    effort: 1.8,
    description:
      'Consolida custos do ERP e das planilhas em uma base, com regras de rateio documentadas.',
    rationale: 'Destrava o painel de margem e a revisão de preço.',
  },
  {
    id: 'painel',
    name: 'Painel de margem',
    impact: 4.0,
    effort: 2.4,
    description:
      'Margem por produto, cliente e canal, atualizada todos os dias.',
    rationale:
      'Responde à pergunta central do diagnóstico; depende da base única.',
  },
  {
    id: 'pedidos',
    name: 'Novo sistema de pedidos',
    impact: 3.6,
    effort: 4.3,
    description:
      'Aplicação para registrar e acompanhar pedidos de ponta a ponta.',
    rationale:
      'Valor alto, mas exige desenho de processo; entra no segundo ciclo.',
  },
  {
    id: 'fechamento',
    name: 'Automatizar fechamento',
    impact: 2.6,
    effort: 1.9,
    description:
      'Rotina que consolida lançamentos e confere totais antes do fechamento.',
    rationale: 'Ganho operacional rápido, com efeito menor sobre a decisão.',
  },
  {
    id: 'erp',
    name: 'Trocar o ERP',
    impact: 2.2,
    effort: 4.7,
    description: 'Substituição do sistema de gestão atual.',
    rationale:
      'Custo e risco altos para o problema diagnosticado; reavaliar depois.',
  },
]

/** Escala 1 a 5 → posição em % dentro da área útil (6% a 94%). */
export const toPercent = (v: number) => 6 + ((v - 1) / 4) * 88

export const level = (v: number) =>
  v >= 3.5 ? 'alto' : v >= 2.5 ? 'médio' : 'baixo'

export const quadrantOf = (i: Initiative) =>
  i.impact >= 3
    ? i.effort < 3
      ? 'Ganho rápido'
      : 'Projeto estratégico'
    : i.effort < 3
      ? 'Ajuste pontual'
      : 'Reavaliar'
