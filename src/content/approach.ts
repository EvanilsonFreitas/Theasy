export interface ApproachStep {
  num: string
  name: string
  summary: string
  detail: string
  questions: string[]
  output: string
}

export const approach: ApproachStep[] = [
  {
    num: '01',
    name: 'Entender',
    summary:
      'Conversas com quem vive o problema: rotina, números, sistemas e restrições. Ainda sem falar de ferramenta.',
    detail:
      'Ouvimos as áreas envolvidas, olhamos os relatórios e planilhas que existem hoje e entendemos como a decisão é tomada na prática. O objetivo é chegar a uma pergunta central bem formulada.',
    questions: [
      'Que decisão está difícil de tomar?',
      'O que custa caro hoje: tempo, dinheiro ou confiança?',
      'Quem usa a informação e quem a produz?',
    ],
    output: 'Resumo da situação e da pergunta central',
  },
  {
    num: '02',
    name: 'Diagnosticar',
    summary:
      'Levantamento de dados, processos e custos para separar causa de sintoma e decidir o que resolver primeiro.',
    detail:
      'Avaliamos a qualidade dos dados, os processos e a estrutura de custos envolvida. Muitas vezes o problema aparente é sintoma de outro. O diagnóstico ordena prioridades pelo impacto no negócio, não pela complexidade técnica.',
    questions: [
      'Os dados necessários existem? São confiáveis?',
      'O problema é de processo, de informação ou de sistema?',
      'O que traz resultado mais cedo?',
    ],
    output: 'Diagnóstico com prioridades e proposta de escopo',
  },
  {
    num: '03',
    name: 'Desenhar e construir',
    summary:
      'A solução do tamanho do problema, construída em ciclos curtos e validada com quem vai usar.',
    detail:
      'Pode ser um modelo de precificação, um painel, um pipeline de dados, uma automação ou um sistema. Construímos em etapas que a sua equipe consegue avaliar, para corrigir a rota cedo.',
    questions: [
      'Qual é a menor entrega que já muda a rotina?',
      'Quem valida cada etapa?',
      'O que precisa estar documentado?',
    ],
    output: 'Entregas incrementais, testadas com a equipe',
  },
  {
    num: '04',
    name: 'Implantar',
    summary:
      'Colocar em uso de verdade: dados em produção, pessoas treinadas, rotina e responsáveis definidos.',
    detail:
      'Uma solução só existe quando entra na rotina. Cuidamos da publicação, das permissões, do treinamento e da documentação, e definimos quem é responsável pelo quê.',
    questions: [
      'Quem mantém a solução no dia a dia?',
      'Como a atualização acontece?',
      'Quais indicadores mostram que está funcionando?',
    ],
    output: 'Solução em operação, com documentação',
  },
  {
    num: '05',
    name: 'Evoluir',
    summary:
      'Acompanhar o uso, medir o efeito e ajustar conforme o negócio muda.',
    detail:
      'Negócios mudam e as perguntas também. Acompanhamos a adoção, revisamos o que não está sendo usado e planejamos as próximas etapas com base no que foi aprendido.',
    questions: [
      'A solução está sendo usada como previsto?',
      'O que mudou no negócio desde a implantação?',
      'Qual é o próximo problema que vale resolver?',
    ],
    output: 'Plano de evolução e suporte',
  },
]
