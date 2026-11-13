# ThEasy v2 e v2.1 · Arquitetura conectada

Registro das decisões da direção v2 ("Connected Intelligence", escolhida) e do refino v2.1 ("Soft Technical Depth"). Benchmark em [benchmark-v2.md](benchmark-v2.md). Canvas do Claude Design: `https://claude.ai/artifact/2Pr62NYKHndPZ8QeUppLhk` (privado; cópia dos arquivos em `claude-design-v2/`).

## 1. Por que a v1 parecia genérica

- A primeira dobra vendia uma filosofia ("Começamos pelo problema") e não a oferta.
- O recurso visual principal era tipografia gigante condensada.
- Seções sem relação gráfica entre si; fotos de setores como linguagem principal.
- Demonstrações pequenas, ícones de biblioteca como ilustração, movimento só de entrada.

## 2. Exploração v2 no Claude Design

| Direção                           | Ideia                              | Por que não sozinha                                   |
| --------------------------------- | ---------------------------------- | ----------------------------------------------------- |
| A · Enterprise Systems            | Tela de sistema grande como hero   | Parece produto SaaS, não consultoria                  |
| B · Connected Intelligence        | Rede de fontes → base → aplicações | Fundo escuro e rede abstrata perdem clareza comercial |
| C · Modern Technology Consultancy | Índice de capacidades editorial    | Clara, mas sem demonstração técnica                   |

**Escolhida:** B em base clara, com as interfaces plausíveis de A e a clareza de C. Gate visual registrado como nota no canvas (avaliação heurística interna, sem participantes reais).

## 3. Sistema visual proprietário

**Gramática derivada do símbolo**

- _Nó em colchete_: raios opostos 12/4 px (`bracket`, `bracket-sm`), como os colchetes do símbolo. Usado em todo nó, chip e card técnico.
- _Estrela de junção_: a estrela côncava do símbolo marca decisão, conexão ativa e o cruzamento das guias de seção.
- _Conectores_: ortogonais com cotovelo de raio 6 (mapa) ou curvas suaves (topologias), traço 1,25 em repouso e 1,6 quando ativos.
- _Guias contínuas_: bordas laterais do container (`frame`) atravessam todas as seções; estrelas nos cruzamentos quando há margem lateral.

**Profundidade (v2.1)**

| Nível | Uso                       | Utilitário                              |
| ----- | ------------------------- | --------------------------------------- |
| E0    | integrado à superfície    | borda `rule`                            |
| E1    | cards e chips             | `e1`                                    |
| E2    | interfaces demonstrativas | `e2` (sombra ambiente + realce interno) |
| E3    | estado ativo, selecionado | `e3` (sombra com tom roxo)              |
| E4    | flutuante (tooltip)       | `e4`                                    |

- **Palco técnico** (`stage`): superfície rebaixada com malha de pontos e luz difusa roxa, onde as demonstrações acontecem.
- **Material de janela** (`win`): branco com gradiente mínimo.

**Cor**

- Neutros claros, com roxo como assinatura e sinal.
- Por pedido do cliente, **não há amarelo**: o tom de atenção usa o roxo oficial escuro (`warn` = #3F27A3 sobre `warn-bg` #EFEAFD).
- Verde e vermelho aparecem só como estado em interfaces demonstrativas.

**Tipografia**

- Instrument Sans (variável), com display até 56 px e H2 até 40 px.
- IBM Plex Mono para rótulos e dados.

## 4. Componentes vetoriais e demonstrativos

| Componente                      | Arquivo                                   | Função                                                                                                                                   |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Mapa da arquitetura             | `components/system/SystemMap.tsx`         | Hero: fontes → integração → base → aplicações → decisão, dentro da moldura da consultoria. Versão compacta própria para telas estreitas. |
| Glifos de competência e de área | `components/system/Glyphs.tsx`            | Miniaturas técnicas monocromáticas (não ícones de biblioteca).                                                                           |
| Composição de competências      | `components/system/CompetenceGraphic.tsx` | Colchete da consultoria e colchete da engenharia envolvendo as frentes.                                                                  |
| Ilustrações por área            | `components/areas/AreaIllustration.tsx`   | Cascata de preço, linhas de produção, funil, rota, painel e integração.                                                                  |
| Demonstrações                   | `components/demos/*`                      | Uma por competência (ver seção 5).                                                                                                       |
| Transformação                   | `components/scenario/*`                   | Contexto → intervenção → solução estruturada.                                                                                            |
| Percurso do método              | `components/process/*`                    | Cinco etapas com entregável próprio.                                                                                                     |
| Curvas suaves                   | `lib/chart.ts`                            | Cúbica monotônica e séries com oscilação determinística.                                                                                 |

## 5. Mudanças por seção (v2.1)

1. **Hero (preservado):**
   - Mesma composição.
   - Profundidade E2 no mapa e luz difusa.
   - Chaves de competência com estado E3.
   - Rótulos do mapa sem quebra.
   - Pausa do fluxo clicável (antes coberta pela camada de nós).
2. **Competências:**
   - Abas com glifos e um palco técnico.
   - **BI:** filtro de unidade, comparação com período anterior, eixo e escala, curva de margem suave com pontos, tooltip por barra (mouse e teclado), anotação, linha de meta e detalhe por cliente.
   - **Dados:** topologia fontes → ingestão → tratamento → estruturação → consumo, com execução animada e registro.
   - **Sistemas:** módulos, filtros por status, tabela e formulário editável.
   - **Automação:** gatilho, condição, ramos sim/não e simulação de divergência.
   - **Consultoria:** produtos, controles deslizantes e cascata do preço à margem.
3. **Do problema à solução:**
   - Três tempos: contexto desorganizado (arquivos, mensagens, lembretes) → intervenção (frentes em ordem, conectores desenhados) → solução estruturada (prévia de interface + decisão).
4. **Como trabalhamos:**
   - Etapas selecionáveis ligadas por conector que avança.
   - Painel compartilhado com entregável próprio: matriz impacto × esforço, arquitetura, versões, plano de implantação e acompanhamento de uso.
5. **Onde atuamos:**
   - Seis áreas com glifo próprio.
   - Painel de destaque com foto da área, ilustração técnica, desafios e frentes.
   - Seleção de setores com fotos reais (indústria, logística, varejo, agronegócio, saúde, serviços).
6. **Sobre:**
   - Composição derivada do símbolo e princípios em lista numerada, sem cards idênticos.
7. **Contato:**
   - Superfície escura com luz pontual e formulário elevado.
   - Áreas opcionais, contador de caracteres, validação e aviso de que nada é enviado nessa etapa.

As páginas internas (Soluções, Aplicações, Abordagem, Sobre, Contato e Privacidade) usam aberturas próprias (`PageHero`) com um elemento por página:

- Soluções: índice de competências.
- Aplicações: foto da área.
- Abordagem: etapas e entregáveis.
- Sobre: composição.
- Contato: formulário.
- Privacidade: índice jurídico com cláusulas numeradas.

## 6. Movimento

| Movimento                        | Gatilho                                | Duração e curva                                           | Movimento reduzido                  |
| -------------------------------- | -------------------------------------- | --------------------------------------------------------- | ----------------------------------- |
| Pacotes no mapa                  | contínuo, só visível em tela; pausável | 6 s linear                                                | não renderizado; sem botão de pausa |
| Destaque do mapa                 | foco ou cursor na competência          | 300 ms                                                    | instantâneo                         |
| Troca de demonstração            | seleção de aba                         | 260 ms, `cubic-bezier(.2,.8,.2,1)`, y 12 px, escala 0,985 | instantâneo                         |
| Execução de pipeline e automação | botão                                  | 750 a 950 ms por etapa                                    | concluída na hora                   |
| Conectores da intervenção        | troca de cenário                       | traço desenhado em 600 ms                                 | estáticos                           |
| Progresso do método              | seleção de etapa                       | 500 ms, `scaleX`                                          | instantâneo                         |
| Composição institucional         | entrada na viewport                    | 1,1 s                                                     | desenhada                           |

Sem scroll hijacking. Todas as interações funcionam por teclado e toque. O destaque do mapa por cursor também é acionado por foco, e cada chave é um link para a competência.

## 7. Limitações conhecidas

- **Pré-visualização do canvas:** o refino foi desenhado no canvas como comps de alta fidelidade (prancha "Refino v2.1"). As cinco demonstrações completas existem no código; no canvas, apenas a de BI está no nível v2.1.
- **Peso do JavaScript:** o JS inicial cresceu para cerca de 180 KB gzip (v1: cerca de 168 KB), principalmente pelas demonstrações. É possível carregar as demonstrações não visíveis sob demanda.
