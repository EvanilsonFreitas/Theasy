import type { SolutionSlug } from './solutions'

export type AreaKey =
  | 'financeiro'
  | 'operacoes'
  | 'comercial'
  | 'logistica'
  | 'gestao'
  | 'tecnologia'

/** Áreas da empresa onde os problemas aparecem, com as frentes que costumam se aplicar. */
export interface BusinessContext {
  key: AreaKey
  name: string
  text: string
  services: SolutionSlug[]
  /** Aplicação representativa (painel de destaque). */
  lead: string
  challenges: string[]
  /** Cenário correspondente na página Aplicações, quando houver. */
  scenario?: string
}

export const contexts: BusinessContext[] = [
  {
    key: 'financeiro',
    name: 'Financeiro e controladoria',
    text: 'Custos, margem, fechamento e preço',
    services: ['consultoria', 'bi-analytics', 'dados-engenharia'],
    lead: 'Custos rateados por critério claro, margem por produto e cliente e preço formado a partir do custo real.',
    challenges: [
      'Margem que cai sem explicação',
      'Fechamento lento e manual',
      'Preço sem base de custo',
    ],
    scenario: 'financeiro',
  },
  {
    key: 'operacoes',
    name: 'Operações e produção',
    text: 'Apontamentos, perdas e retrabalho',
    services: ['sistemas', 'automacao', 'bi-analytics'],
    lead: 'Apontamento digital no ponto de trabalho, causas de parada registradas e produtividade visível por linha e turno.',
    challenges: [
      'Paradas sem causa registrada',
      'Controles diferentes por turno',
      'Indicadores calculados à mão',
    ],
    scenario: 'operacoes',
  },
  {
    key: 'comercial',
    name: 'Comercial e vendas',
    text: 'Funil, carteira, desconto e metas',
    services: ['dados-engenharia', 'bi-analytics', 'consultoria'],
    lead: 'CRM e ERP integrados, funil acompanhado durante o mês e política de desconto com regra e aprovação.',
    challenges: [
      'Previsão que nunca bate',
      'Desconto sem critério',
      'Meta vista só no fim do mês',
    ],
    scenario: 'comercial',
  },
  {
    key: 'logistica',
    name: 'Logística e suprimentos',
    text: 'Pedidos, estoque, frete e prazo',
    services: ['automacao', 'sistemas', 'bi-analytics'],
    lead: 'Pedido digitado uma vez, estoque único entre sistemas e status de expedição visível antes do cliente perguntar.',
    challenges: [
      'Pedidos digitados duas vezes',
      'Estoque divergente',
      'Atraso descoberto pelo cliente',
    ],
    scenario: 'logistica',
  },
  {
    key: 'gestao',
    name: 'Gestão e diretoria',
    text: 'Indicadores, metas e projetos',
    services: ['bi-analytics', 'consultoria', 'dados-engenharia'],
    lead: 'Um painel executivo com metas, responsáveis e ritos de acompanhamento, alimentado por uma base única.',
    challenges: [
      'Cada área com um número',
      'Indicadores sem dono',
      'Projetos sem acompanhamento',
    ],
    scenario: 'gestao',
  },
  {
    key: 'tecnologia',
    name: 'Tecnologia e TI',
    text: 'Integrações, legado e bases',
    services: ['dados-engenharia', 'sistemas', 'automacao'],
    lead: 'Sistemas legados conectados por APIs e rotinas de integração monitoradas, sem cópia manual entre bases.',
    challenges: [
      'Sistemas que não conversam',
      'Rotinas frágeis e sem registro',
      'Bases sem documentação',
    ],
  },
]

/**
 * Setores em que esses problemas aparecem (não é lista de clientes).
 * Fotografias reais de banco de imagens livre (Unsplash License);
 * créditos em public/images/CREDITOS.md.
 */
export interface Sector {
  slug: string
  name: string
  challenges: string
  image: string
  alt: string
}

export const sectors: Sector[] = [
  {
    slug: 'industria',
    name: 'Indústria',
    challenges:
      'Custo por produto, eficiência de linha e planejamento da produção.',
    image: 'setor-industria',
    alt: 'Linha de produção automatizada em um galpão industrial iluminado',
  },
  {
    slug: 'logistica',
    name: 'Logística e distribuição',
    challenges: 'Prazos, estoque, frete e rastreabilidade de pedidos.',
    image: 'setor-logistica',
    alt: 'Corredor de armazém com prateleiras altas cheias de caixas',
  },
  {
    slug: 'varejo',
    name: 'Varejo',
    challenges: 'Margem por loja e por categoria, ruptura e giro de estoque.',
    image: 'setor-varejo',
    alt: 'Corredor de supermercado com prateleiras abastecidas',
  },
  {
    slug: 'agronegocio',
    name: 'Agronegócio',
    challenges: 'Custo por safra, insumos, produtividade e comercialização.',
    image: 'setor-agronegocio',
    alt: 'Trator enfardando feno em um campo',
  },
  {
    slug: 'saude',
    name: 'Saúde',
    challenges: 'Ocupação, custos assistenciais e indicadores de atendimento.',
    image: 'setor-saude',
    alt: 'Profissional de saúde empurrando uma incubadora por um corredor de hospital',
  },
  {
    slug: 'servicos',
    name: 'Serviços',
    challenges:
      'Rentabilidade por contrato, produtividade das equipes e faturamento.',
    image: 'setor-servicos',
    alt: 'Profissionais trabalhando em computadores em um escritório',
  },
]

export const sectorNames = sectors.map((s) => s.name)

/** Fotografia de cada área (painel de destaque de "Onde atuamos"). */
export const areaPhotos: Record<AreaKey, { image: string; alt: string }> = {
  financeiro: {
    image: 'area-financeiro',
    alt: 'Calculadora, óculos e relatórios financeiros sobre uma mesa',
  },
  operacoes: {
    image: 'area-operacoes',
    alt: 'Equipamentos de uma linha de produção industrial',
  },
  comercial: {
    image: 'area-comercial',
    alt: 'Equipe reunida em torno de uma mesa analisando informações em um tablet',
  },
  logistica: {
    image: 'setor-logistica',
    alt: 'Corredor de armazém com prateleiras altas cheias de caixas',
  },
  gestao: {
    image: 'area-gestao',
    alt: 'Duas pessoas discutindo um plano desenhado em um quadro branco',
  },
  tecnologia: {
    image: 'area-tecnologia',
    alt: 'Racks de servidores com cabos de rede em um data center',
  },
}

/** Rótulo curto de cada frente, usado em etiquetas. */
export const serviceTag: Record<SolutionSlug, string> = {
  'bi-analytics': 'BI',
  'dados-engenharia': 'Dados',
  sistemas: 'Sistemas',
  automacao: 'Automação',
  consultoria: 'Consultoria',
}
