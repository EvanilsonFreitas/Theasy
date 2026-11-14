import type { SolutionSlug } from './solutions'

export type Area =
  | 'Financeiro'
  | 'Operações'
  | 'Comercial'
  | 'Logística'
  | 'Tecnologia'
  | 'Gestão'

export const areas: Area[] = [
  'Financeiro',
  'Operações',
  'Comercial',
  'Logística',
  'Tecnologia',
  'Gestão',
]

export interface Problem {
  text: string
  area: Area
  solution: SolutionSlug
}

/**
 * Situações típicas que levam empresas a procurar a ThEasy.
 * Não são depoimentos nem casos de clientes — são problemas recorrentes,
 * escritos na linguagem de quem os vive.
 */
export const problems: Problem[] = [
  {
    text: 'Cada área apresenta um número diferente para o mesmo indicador.',
    area: 'Gestão',
    solution: 'bi-analytics',
  },
  {
    text: 'Fechar o mês ainda depende de planilhas que só uma pessoa entende.',
    area: 'Financeiro',
    solution: 'dados-engenharia',
  },
  {
    text: 'Não sabemos com segurança quais produtos e clientes dão lucro.',
    area: 'Financeiro',
    solution: 'consultoria',
  },
  {
    text: 'A equipe passa horas copiando informação de um sistema para outro.',
    area: 'Operações',
    solution: 'automacao',
  },
  {
    text: 'O processo cresceu e o sistema atual não acompanha.',
    area: 'Tecnologia',
    solution: 'sistemas',
  },
  {
    text: 'O relatório de vendas chega tarde demais para mudar o resultado do mês.',
    area: 'Comercial',
    solution: 'bi-analytics',
  },
  {
    text: 'O preço é definido olhando o concorrente, não o nosso custo.',
    area: 'Financeiro',
    solution: 'consultoria',
  },
  {
    text: 'Ninguém consegue dizer em que etapa o processo está travando.',
    area: 'Operações',
    solution: 'bi-analytics',
  },
  {
    text: 'Os sistemas da empresa não conversam entre si.',
    area: 'Tecnologia',
    solution: 'dados-engenharia',
  },
  {
    text: 'Cada vendedor controla a carteira em uma planilha diferente.',
    area: 'Comercial',
    solution: 'sistemas',
  },
  {
    text: 'As metas existem, mas ninguém sabe quais estão em risco.',
    area: 'Gestão',
    solution: 'consultoria',
  },
]
