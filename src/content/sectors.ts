import type { sectorIcons } from './icons'

export interface Sector {
  slug: keyof typeof sectorIcons
  name: string
  /** Desafios típicos do segmento (não são casos de clientes). */
  challenges: string
  image: string
  alt: string
}

/**
 * Segmentos ilustrados com fotografias reais de banco de imagens livre
 * (Unsplash License). Créditos em public/images/CREDITOS.md.
 * A seção NÃO afirma que a ThEasy atende clientes desses segmentos: mostra
 * que os mesmos tipos de problema aparecem em todos eles.
 */
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
    alt: 'Trator trabalhando em um campo de feno durante a colheita',
  },
  {
    slug: 'saude',
    name: 'Saúde',
    challenges: 'Ocupação, custos assistenciais e indicadores de atendimento.',
    image: 'setor-saude',
    alt: 'Profissional de saúde conduzindo um equipamento por um corredor de hospital',
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

/** Fotografia de cada área de negócio (página Aplicações). */
export const areaImages: Record<string, { image: string; alt: string }> = {
  Financeiro: {
    image: 'area-financeiro',
    alt: 'Calculadora, óculos e relatórios financeiros sobre uma mesa',
  },
  Operações: {
    image: 'area-operacoes',
    alt: 'Equipamentos de uma linha de produção industrial',
  },
  Comercial: {
    image: 'area-comercial',
    alt: 'Corredor de supermercado com produtos expostos nas gôndolas',
  },
  Tecnologia: {
    image: 'area-tecnologia',
    alt: 'Racks de servidores com cabos de rede em um data center',
  },
  Gestão: {
    image: 'area-gestao',
    alt: 'Duas pessoas discutindo um plano desenhado em um quadro branco',
  },
}
