export interface ApproachStep {
  num: string
  name: string
  /** Frase curta para a linha do tempo da home. */
  short: string
  summary: string
  detail: string
  questions: string[]
  output: string
}

/** Método de trabalho: cinco etapas, cada uma com uma entrega concreta. */
export const approach: ApproachStep[] = [
  {
    num: '01',
    name: 'Diagnóstico',
    short: 'Entendemos o negócio, os processos e os dados disponíveis.',
    summary:
      'Conversas com quem vive o problema e leitura dos números, sistemas e planilhas que existem hoje. Ainda sem falar de ferramenta.',
    detail:
      'Ouvimos as áreas envolvidas, avaliamos a qualidade dos dados e entendemos como a decisão é tomada na prática. Muitas vezes o problema aparente é sintoma de outro; o diagnóstico separa causa de sintoma e ordena prioridades pelo impacto no negócio.',
    questions: [
      'Que decisão está difícil de tomar?',
      'O problema é de processo, de informação ou de sistema?',
      'Os dados necessários existem e são confiáveis?',
    ],
    output: 'Mapa do problema e prioridades',
  },
  {
    num: '02',
    name: 'Desenho da solução',
    short: 'Definimos arquitetura, escopo e indicadores de sucesso.',
    summary:
      'A solução do tamanho do problema: o que entra, o que fica de fora e como saberemos que funcionou.',
    detail:
      'Combinamos as competências necessárias (dados, BI, sistemas, automação, gestão) em uma arquitetura única e definimos escopo, etapas e critérios de aceite com quem vai usar.',
    questions: [
      'Qual é a menor entrega que já muda a rotina?',
      'Que fontes, telas e regras fazem parte do escopo?',
      'Quais indicadores mostram que deu certo?',
    ],
    output: 'Proposta e arquitetura',
  },
  {
    num: '03',
    name: 'Desenvolvimento',
    short: 'Construímos em ciclos curtos, validando cada entrega.',
    summary:
      'Construção em etapas que a sua equipe consegue avaliar, para corrigir a rota cedo.',
    detail:
      'Pode ser um modelo de precificação, um painel, um pipeline de dados, uma automação ou um sistema. Cada ciclo termina com algo funcionando e validado por quem usa.',
    questions: [
      'Quem valida cada etapa?',
      'O que precisa estar documentado?',
      'Que dados reais usamos para testar?',
    ],
    output: 'Versões funcionando',
  },
  {
    num: '04',
    name: 'Implantação',
    short: 'Colocamos em uso, com treinamento e documentação.',
    summary:
      'Colocar em uso de verdade: dados em produção, pessoas treinadas, rotina e responsáveis definidos.',
    detail:
      'Uma solução só existe quando entra na rotina. Cuidamos da publicação, das permissões, do treinamento e da documentação, e definimos quem é responsável pelo quê.',
    questions: [
      'Quem mantém a solução no dia a dia?',
      'Como a atualização acontece?',
      'O que fazer quando algo foge da regra?',
    ],
    output: 'Solução em uso',
  },
  {
    num: '05',
    name: 'Evolução',
    short: 'Acompanhamos o uso e ajustamos conforme o negócio muda.',
    summary:
      'Acompanhar o uso, medir o efeito e ajustar conforme o negócio muda.',
    detail:
      'Negócios mudam e as perguntas também. Acompanhamos a adoção, revisamos o que não está sendo usado e planejamos as próximas etapas com base no que foi aprendido.',
    questions: [
      'A solução está sendo usada como previsto?',
      'O que mudou no negócio desde a implantação?',
      'Qual é o próximo problema que vale resolver?',
    ],
    output: 'Melhorias contínuas',
  },
]
