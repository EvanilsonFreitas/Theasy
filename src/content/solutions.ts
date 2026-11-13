/**
 * As cinco frentes de atuação da ThEasy.
 * Ferramentas citadas são as do briefing institucional (Power BI, SQL,
 * Python, Azure); a escolha real depende de cada projeto.
 */

export type SolutionSlug =
  'bi-analytics' | 'dados-engenharia' | 'sistemas' | 'automacao' | 'consultoria'

export type ArtifactKind = 'dashboard' | 'pipeline' | 'app' | 'flow' | 'pricing'

export interface Solution {
  slug: SolutionSlug
  num: string
  name: string
  /** Versão curta para listas e menus. */
  short: string
  lead: string
  when: string[]
  deliver: string[]
  tools: string[]
  artifact: ArtifactKind
}

export const solutions: Solution[] = [
  {
    slug: 'bi-analytics',
    num: '01',
    name: 'BI e analytics',
    short: 'Indicadores confiáveis e painéis para decidir.',
    lead: 'Indicadores que todas as áreas aceitam e painéis que respondem às perguntas da gestão, em vez de apenas exibir números.',
    when: [
      'Cada área apresenta um número diferente para o mesmo indicador',
      'Relatórios são montados à mão toda semana ou todo mês',
      'A diretoria decide com informação atrasada ou incompleta',
      'Ninguém sabe ao certo como um KPI é calculado',
    ],
    deliver: [
      'Definição de indicadores, metas e regras de cálculo',
      'Modelagem analítica (modelo semântico)',
      'Painéis gerenciais e executivos em Power BI',
      'Rotina de atualização, permissões e governança',
      'Capacitação de quem vai usar e manter',
    ],
    tools: ['Power BI', 'DAX', 'SQL'],
    artifact: 'dashboard',
  },
  {
    slug: 'dados-engenharia',
    num: '02',
    name: 'Dados e engenharia',
    short: 'Dados tratados, integrados e confiáveis.',
    lead: 'A base que sustenta qualquer análise: dados de várias origens tratados, integrados e organizados para serem confiáveis.',
    when: [
      'A informação está espalhada entre ERP, CRM e planilhas',
      'As cargas são manuais, frágeis e difíceis de repetir',
      'Não existe uma versão oficial dos dados',
      'As consultas são lentas e as bases não têm documentação',
    ],
    deliver: [
      'Mapeamento e integração das fontes de dados',
      'Pipelines de carga e tratamento',
      'Base analítica estruturada em camadas',
      'Regras de qualidade e governança de dados',
      'Documentação do modelo e das rotinas',
    ],
    tools: ['SQL', 'Python', 'Azure'],
    artifact: 'pipeline',
  },
  {
    slug: 'sistemas',
    num: '03',
    name: 'Sistemas sob medida',
    short: 'Aplicações para processos que software pronto não atende.',
    lead: 'Aplicações web e sistemas de gestão para processos que nenhum software pronto atende bem, desenhados a partir de como a sua operação funciona.',
    when: [
      'O processo é específico do seu negócio',
      'Planilhas compartilhadas viraram um sistema informal',
      'É preciso integrar plataformas que não conversam',
      'O sistema atual não acompanha o crescimento',
    ],
    deliver: [
      'Levantamento de requisitos a partir do processo real',
      'Aplicações web e soluções SaaS',
      'Sistemas de gestão e de operação',
      'APIs e integrações entre plataformas',
      'Evolução contínua e suporte',
    ],
    tools: ['Python', 'Azure', 'APIs', 'SQL'],
    artifact: 'app',
  },
  {
    slug: 'automacao',
    num: '04',
    name: 'Automação de processos',
    short: 'Menos retrabalho e tarefas manuais.',
    lead: 'Tarefas manuais e repetitivas passam a rodar sozinhas, com rastreabilidade, e a equipe volta a trabalhar no que exige julgamento.',
    when: [
      'Informação é copiada e colada entre sistemas',
      'Rotinas críticas dependem de uma única pessoa',
      'Há erros recorrentes de digitação e conferência',
      'Processos ainda correm em papel ou por email',
    ],
    deliver: [
      'Mapeamento do fluxo atual e dos gargalos',
      'Automação das etapas repetitivas',
      'Integração entre plataformas',
      'Digitalização de processos',
      'Monitoramento e alertas das rotinas',
    ],
    tools: ['Python', 'Azure', 'APIs'],
    artifact: 'flow',
  },
  {
    slug: 'consultoria',
    num: '05',
    name: 'Consultoria de negócios',
    short: 'Custos, preço, rentabilidade e desempenho.',
    lead: 'Controladoria, custos, preço e rentabilidade: a análise de negócio que define o que medir, onde agir e o que mudar.',
    when: [
      'O preço é definido sem clareza sobre o custo real',
      'A margem cai e ninguém consegue explicar por quê',
      'Não se sabe quais produtos, clientes ou contratos dão lucro',
      'Processos, pessoas e projetos não têm indicadores de desempenho',
    ],
    deliver: [
      'Formação de preço e política de precificação',
      'Análise de rentabilidade e de margens',
      'Estrutura e gestão de custos',
      'Apoio à controladoria e às finanças',
      'Diagnóstico de processos, pessoas e projetos',
    ],
    tools: ['Modelos de custeio', 'Precificação', 'Power BI'],
    artifact: 'pricing',
  },
]

export const solutionBySlug = (slug: string) =>
  solutions.find((s) => s.slug === slug)
