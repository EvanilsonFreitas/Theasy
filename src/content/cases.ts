import type { Area } from './problems'
import type { SolutionSlug } from './solutions'

/**
 * Casos ILUSTRATIVOS usados pela "folha de trabalho" (assinatura do site).
 * Cada um percorre as quatro estações: Desafio → Estrutura → Solução → Decisão.
 * São situações típicas, sem dados de clientes. As barras mostram proporções
 * relativas, nunca valores reais — por isso não exibem números.
 */

export interface IllustrativeCase {
  area: Area
  asker: string
  question: string
  sources: string[]
  model: { fact: string; formula: string }
  solution: {
    title: string
    rows: { label: string; value: number; flag?: boolean }[]
    caption: string
  }
  decision: string
  decisionNote: string
  solutions: SolutionSlug[]
  /** Aplicações típicas da área (página Aplicações). */
  applications: string[]
}

export const cases: IllustrativeCase[] = [
  {
    area: 'Financeiro',
    asker: 'Diretoria financeira',
    question:
      'O faturamento cresce, mas a margem não acompanha. Onde estamos perdendo dinheiro?',
    sources: [
      'Vendas no ERP',
      'custos_v7_FINAL.xlsx',
      'Tabela de preços',
      'Comissões',
      'Fretes e descontos',
    ],
    model: {
      fact: 'Margem de contribuição',
      formula: 'preço menos descontos, frete, comissão e custo',
    },
    solution: {
      title: 'Margem por linha de produto',
      rows: [
        { label: 'Linha A', value: 0.82 },
        { label: 'Linha B', value: 0.64 },
        { label: 'Linha C', value: 0.21, flag: true },
        { label: 'Linha D', value: 0.55 },
        { label: 'Linha E', value: 0.14, flag: true },
      ],
      caption:
        'Duas linhas abaixo da meta, abertas por canal, cliente e período.',
    },
    decision:
      'Revisar a política de preço das linhas C e E e renegociar descontos no canal distribuidor.',
    decisionNote:
      'A conversa deixa de ser “qual número está certo” e passa a ser “o que fazer com ele”.',
    solutions: ['consultoria', 'bi-analytics', 'dados-engenharia'],
    applications: [
      'Formação de preço e simulação de cenários',
      'Rentabilidade por produto, cliente e canal',
      'Fechamento mensal com dados integrados',
      'Gestão de custos e margens',
    ],
  },
  {
    area: 'Operações',
    asker: 'Gerência de operações',
    question:
      'Os pedidos atrasam, mas cada setor garante que a sua parte está em dia.',
    sources: [
      'Sistema de pedidos',
      'Planilha da expedição',
      'Aprovações por email',
      'Apontamentos da produção',
      'Agenda das transportadoras',
    ],
    model: {
      fact: 'Tempo por etapa do pedido',
      formula: 'tempo entre a entrada e a saída de cada etapa',
    },
    solution: {
      title: 'Tempo médio por etapa',
      rows: [
        { label: 'Entrada', value: 0.2 },
        { label: 'Aprovação', value: 0.78, flag: true },
        { label: 'Produção', value: 0.45 },
        { label: 'Expedição', value: 0.3 },
      ],
      caption: 'A espera está na aprovação manual, não na produção.',
    },
    decision:
      'Automatizar a aprovação de pedidos dentro da alçada e acionar pessoas apenas nas exceções.',
    decisionNote:
      'O gargalo deixa de ser opinião de cada setor e passa a ser um fato visível.',
    solutions: ['automacao', 'bi-analytics'],
    applications: [
      'Acompanhamento de etapas e prazos',
      'Automação de aprovações e conferências',
      'Integração entre pedidos, produção e expedição',
      'Indicadores de produtividade',
    ],
  },
  {
    area: 'Comercial',
    asker: 'Diretoria comercial',
    question:
      'Batemos a meta de faturamento, mas a carteira de clientes está encolhendo. Por quê?',
    sources: [
      'CRM',
      'Faturamento no ERP',
      'Planilhas dos vendedores',
      'Cadastro de clientes',
      'Metas por região',
    ],
    model: {
      fact: 'Clientes ativos por período',
      formula: 'clientes com compra nos últimos 90 dias',
    },
    solution: {
      title: 'Clientes sem compra recente, por região',
      rows: [
        { label: 'Sul', value: 0.3 },
        { label: 'Sudeste', value: 0.72, flag: true },
        { label: 'Centro Oeste', value: 0.25 },
        { label: 'Nordeste', value: 0.4 },
        { label: 'Norte', value: 0.18 },
      ],
      caption:
        'A perda se concentra em uma região e em clientes de ticket médio.',
    },
    decision:
      'Criar uma rotina de reativação para a carteira inativa do Sudeste, acompanhada semanalmente.',
    decisionNote:
      'A meta continua importante, mas agora a carteira também tem dono.',
    solutions: ['bi-analytics', 'sistemas'],
    applications: [
      'Painéis de desempenho comercial',
      'Gestão de carteira e reativação',
      'Metas e comissões calculadas automaticamente',
      'Integração entre CRM e ERP',
    ],
  },
  {
    area: 'Tecnologia',
    asker: 'Liderança de TI',
    question:
      'Temos cinco sistemas e ninguém confia totalmente em nenhum deles.',
    sources: [
      'ERP',
      'CRM',
      'Sistema legado',
      'Planilhas de controle',
      'Portal de clientes',
    ],
    model: {
      fact: 'Cadastro único de clientes e produtos',
      formula: 'uma chave por registro, sincronizada entre sistemas',
    },
    solution: {
      title: 'Divergências de cadastro por origem',
      rows: [
        { label: 'ERP', value: 0.2 },
        { label: 'CRM', value: 0.66, flag: true },
        { label: 'Legado', value: 0.8, flag: true },
        { label: 'Portal', value: 0.3 },
      ],
      caption: 'Duas origens concentram a maior parte das divergências.',
    },
    decision:
      'Definir o ERP como fonte oficial do cadastro, integrar os demais por API e desligar o legado em etapas.',
    decisionNote:
      'Integração deixa de ser um projeto eterno e vira um plano com ordem.',
    solutions: ['dados-engenharia', 'sistemas', 'automacao'],
    applications: [
      'APIs e integrações entre plataformas',
      'Aplicações web e sistemas sob medida',
      'Migração de sistemas legados',
      'Pipelines e bases de dados governadas',
    ],
  },
  {
    area: 'Gestão',
    asker: 'Diretoria geral',
    question: 'Quais metas estão em risco neste trimestre e quem precisa agir?',
    sources: [
      'Relatórios por área',
      'Planejamento anual',
      'Atas de reunião',
      'Indicadores em planilhas',
      'Orçamento',
    ],
    model: {
      fact: 'Meta × realizado por responsável',
      formula: 'realizado acumulado ÷ meta proporcional ao período',
    },
    solution: {
      title: 'Atingimento proporcional por área',
      rows: [
        { label: 'Comercial', value: 0.9 },
        { label: 'Operações', value: 0.62 },
        { label: 'Financeiro', value: 0.85 },
        { label: 'Pessoas', value: 0.4, flag: true },
      ],
      caption: 'Uma área fora da trajetória, com responsável e prazo visíveis.',
    },
    decision:
      'Levar à reunião mensal só os indicadores fora da trajetória, cada um com dono e plano de ação.',
    decisionNote: 'A reunião de resultados fica mais curta e mais útil.',
    solutions: ['consultoria', 'bi-analytics'],
    applications: [
      'Painel executivo com metas e responsáveis',
      'Diagnóstico de processos, pessoas e projetos',
      'Planejamento e acompanhamento orçamentário',
      'Rituais de gestão apoiados em indicadores',
    ],
  },
]
