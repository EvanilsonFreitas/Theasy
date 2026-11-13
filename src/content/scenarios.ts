import type { SolutionSlug } from './solutions'

/**
 * Situações ilustrativas por área da empresa: como costuma ser hoje e como a
 * solução se organiza. Compostas a partir de problemas frequentes; não
 * representam clientes específicos e não trazem resultados numéricos.
 */
export interface Scenario {
  slug: string
  area: string
  /** Complemento para frases como "um desafio de …". */
  phrase: string
  question: string
  today: string[]
  solution: { service: SolutionSlug; label: string; text: string }[]
  decision: string
  /** Artefatos do contexto atual: arquivo e assunto de mensagem. */
  artifacts: { file: string; mail: string; quote: string }
  /** Tipo de prévia da solução estruturada. */
  preview: 'margin' | 'lines' | 'funnel' | 'shipments' | 'scorecard'
  /** Foto ilustrativa em public/images (opcional). */
  image?: { name: string; alt: string }
}

export const scenarios: Scenario[] = [
  {
    slug: 'financeiro',
    area: 'Financeiro',
    phrase: 'da área financeira',
    question: 'O faturamento cresce, mas a margem não acompanha.',
    today: [
      'Custos espalhados em três planilhas diferentes',
      'Fechamento depende de uma única pessoa',
      'Preço definido sem conhecer a margem real',
      'Relatório chega depois da decisão',
    ],
    solution: [
      {
        service: 'dados-engenharia',
        label: 'Engenharia de dados',
        text: 'Integra ERP e planilhas de custo em uma base única.',
      },
      {
        service: 'bi-analytics',
        label: 'BI e Analytics',
        text: 'Painel de margem por produto, cliente e canal.',
      },
      {
        service: 'consultoria',
        label: 'Consultoria',
        text: 'Revisão da formação de preço e das regras de rateio.',
      },
    ],
    decision: 'Quais produtos e clientes realmente dão margem.',
    artifacts: {
      file: 'custos_v7_final.xlsx',
      mail: 'RE: número do fechamento',
      quote: 'Qual margem vale, 18% ou 23%?',
    },
    preview: 'margin',
    image: {
      name: 'area-financeiro',
      alt: 'Calculadora, óculos e relatórios financeiros sobre uma mesa',
    },
  },
  {
    slug: 'operacoes',
    area: 'Operações',
    phrase: 'de operações',
    question: 'A produção atrasa e ninguém sabe exatamente onde.',
    today: [
      'Apontamentos em papel e planilha',
      'Retrabalho sem causa registrada',
      'Indicadores calculados à mão',
      'Cada turno com um controle próprio',
    ],
    solution: [
      {
        service: 'sistemas',
        label: 'Sistemas sob medida',
        text: 'Aplicação de apontamento usada no chão de fábrica.',
      },
      {
        service: 'automacao',
        label: 'Automação',
        text: 'Consolida os turnos e dispara alertas de desvio.',
      },
      {
        service: 'bi-analytics',
        label: 'BI e Analytics',
        text: 'Painel de produtividade, perdas e retrabalho.',
      },
    ],
    decision: 'Onde a operação perde tempo, e por quê.',
    artifacts: {
      file: 'apontamento_turno_B.xlsx',
      mail: 'RE: parada da linha 2',
      quote: 'Alguém registrou o motivo?',
    },
    preview: 'lines',
    image: {
      name: 'area-operacoes',
      alt: 'Equipamentos de uma linha de produção industrial',
    },
  },
  {
    slug: 'comercial',
    area: 'Comercial',
    phrase: 'da área comercial',
    question: 'A equipe vende, mas a previsão nunca bate.',
    today: [
      'Funil vive em planilhas individuais',
      'Desconto concedido sem regra',
      'Meta acompanhada só no fim do mês',
      'CRM e ERP não conversam',
    ],
    solution: [
      {
        service: 'dados-engenharia',
        label: 'Engenharia de dados',
        text: 'Integra CRM e ERP: pedido, faturamento e carteira.',
      },
      {
        service: 'bi-analytics',
        label: 'BI e Analytics',
        text: 'Funil, carteira e desempenho por vendedor.',
      },
      {
        service: 'consultoria',
        label: 'Consultoria',
        text: 'Política comercial e regras de desconto.',
      },
    ],
    decision: 'Onde concentrar o esforço de vendas.',
    artifacts: {
      file: 'funil_vendedores_nov.xlsx',
      mail: 'RE: previsão do trimestre',
      quote: 'Esse desconto foi aprovado?',
    },
    preview: 'funnel',
    image: {
      name: 'area-comercial',
      alt: 'Equipe reunida em torno de uma mesa analisando informações em um tablet',
    },
  },
  {
    slug: 'logistica',
    area: 'Logística',
    phrase: 'de logística',
    question:
      'O pedido existe, mas o cliente descobre o atraso antes da empresa.',
    today: [
      'Pedidos digitados duas vezes',
      'Estoque diferente em cada sistema',
      'Frete calculado manualmente',
      'Atraso descoberto pelo cliente',
    ],
    solution: [
      {
        service: 'automacao',
        label: 'Automação',
        text: 'O pedido entra uma vez e segue para os demais sistemas.',
      },
      {
        service: 'sistemas',
        label: 'Sistemas sob medida',
        text: 'Painel de expedição com o status de cada pedido.',
      },
      {
        service: 'bi-analytics',
        label: 'BI e Analytics',
        text: 'Nível de serviço por rota, cliente e item.',
      },
    ],
    decision: 'Quais rotas, clientes e itens geram atraso e custo.',
    artifacts: {
      file: 'pedidos_digitados.xlsx',
      mail: 'RE: cadê meu pedido?',
      quote: 'O estoque do sistema bate?',
    },
    preview: 'shipments',
    image: {
      name: 'setor-logistica',
      alt: 'Corredor de armazém com prateleiras altas cheias de caixas',
    },
  },
  {
    slug: 'gestao',
    area: 'Gestão',
    phrase: 'de gestão',
    question: 'A reunião de resultados discute qual número está certo.',
    today: [
      'Cada área traz um número diferente',
      'Indicadores sem responsável',
      'Projetos sem acompanhamento',
      'Informação espalhada entre áreas',
    ],
    solution: [
      {
        service: 'dados-engenharia',
        label: 'Engenharia de dados',
        text: 'Base única com as informações de todas as áreas.',
      },
      {
        service: 'bi-analytics',
        label: 'BI e Analytics',
        text: 'Painel executivo com metas e responsáveis.',
      },
      {
        service: 'consultoria',
        label: 'Consultoria',
        text: 'Indicadores e rituais de gestão.',
      },
    ],
    decision: 'O que priorizar no próximo ciclo.',
    artifacts: {
      file: 'indicadores_reuniao_v3.pptx',
      mail: 'RE: número da diretoria',
      quote: 'Quem é o dono desse indicador?',
    },
    preview: 'scorecard',
    image: {
      name: 'area-gestao',
      alt: 'Duas pessoas discutindo um plano desenhado em um quadro branco',
    },
  },
]

export const scenarioBySlug = (slug: string | null) =>
  scenarios.find((s) => s.slug === slug)
