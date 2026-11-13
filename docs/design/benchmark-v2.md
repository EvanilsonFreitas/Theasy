# Benchmark visual v2 · ThEasy

Data: 13/11/2026. Objetivo: entender **mecanismos** de design que explicam a qualidade percebida de cinco referências e traduzi-los para a ThEasy, sem copiar componentes, cores ou diagramas.

## Método

- Navegação real em Chrome (headless, Playwright) com viewport **1440 × 900** e **390 × 844** (modo móvel com toque).
- Nove quadros de viewport distribuídos ao longo da página desktop e três no mobile, rolando em passos para disparar observers e animações de entrada.
- Estados interativos capturados separadamente: tabs, mega menu e cards em hover.
- Arquivos: `docs/design/benchmark/refs/` (quadros) e `docs/design/benchmark/_sheet-*.jpg` (pranchas de contato por site). Repositório privado; capturas usadas apenas como material interno de análise.

### Limitações registradas

| Referência   | O que não foi possível observar                                                                                                                           |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supabase     | Hover nos cards do bento: o seletor expirou em headless (`locator.hover` timeout). Os cards foram observados em repouso.                                  |
| Cloudflare   | O globo da seção "Region: Earth" é renderizado em WebGL e apareceu vazio em headless. Analisei apenas a estrutura ao redor. Hover no menu também expirou. |
| Stripe       | A faixa em gradiente animado do hero é um canvas; foi observada como quadro estático.                                                                     |
| Vercel       | Página curta: os últimos quadros repetem o CTA final e o rodapé.                                                                                          |
| Thoughtworks | O vídeo do AI/works não foi reproduzido. Banner de cookies recusado antes das capturas.                                                                   |

Nenhuma referência foi analisada apenas pelo HTML: todas as observações abaixo partem dos quadros renderizados.

---

## A · Supabase (`supabase.com`)

Quadros: `supabase-d00` a `d08`, `i-supabase-cards-rest`.

**Seção 1 · Hero + bento de produtos.** Título em duas linhas com a segunda em cor de marca, parágrafo curto à direita listando literalmente os produtos (Auth, Data APIs, Edge Functions, Realtime, Storage, Vector). Logo abaixo, sem rolar, um bento de oito blocos.

- _Mecanismo:_ cada bloco tem **uma primitiva visual própria** que representa a capacidade: tabela de e-mails para Auth, globo com rota para Edge Functions, grade de arquivos para Storage, cursores para Realtime, cubo de vetores para Vector, lista de endpoints para Data APIs. Nenhum bloco usa ícone grande como ilustração.
- _Mecanismo:_ frase com **dois tons** ("Every project is **a full Postgres database**, the world's most trusted…"). O trecho escuro é o que se lê em 1 segundo.
- _Mecanismo:_ tamanhos de bloco desiguais (Postgres ocupa 2 colunas e 2 linhas), mas todos no mesmo grid, mesma borda de 1px e mesmo raio.

**Seção 2 · Table Editor / SQL Editor.** Tabs que trocam uma interface do produto em tamanho grande, com campos reais (Name, Description, RLS) e cursor.

- _Mecanismo:_ a interface demonstrativa é **plausível em nível de campo**: rótulos, estados, avisos. É isso que dá credibilidade técnica.

**Seção 3 · Frameworks, templates e comunidade.** Grade de templates em cards discretos e prova social.

- _Mecanismo:_ densidade alta com respiro controlado; títulos de seção pequenos (≈32px) porque o conteúdo carrega a seção.

**Para a ThEasy:** um bloco de competência = uma primitiva visual que mostra o serviço funcionando (painel, pipeline, tela de sistema, fluxo automatizado, simulação de preço). Frases em dois tons para a leitura rápida.
**Não copiar:** fundo e verde da Supabase, o elefante, o globo, o formato literal do bento de oito blocos, prova social com logos (a ThEasy não tem clientes públicos autorizados).

## B · Cloudflare (`cloudflare.com`)

Quadros: `cloudflare-d00` a `d08`, `i-cloudflare-tabs-a`, `i-cloudflare-tabs-b`.

**Seção 1 · Moldura contínua da página.** Linhas verticais finas tracejadas acompanham as bordas do container ao longo de toda a página; painéis têm pequenos marcadores nos cantos.

- _Mecanismo:_ **continuidade por estrutura**, não por decoração: todas as seções parecem pertencer à mesma prancha técnica porque compartilham as mesmas guias.

**Seção 2 · "Why choose": antes e depois lado a lado.** Metade esquerda mostra o caos (alertas, incidentes, latência, mensagens sobrepostas); metade direita, em cor de marca, mostra o estado resolvido com um único indicador. Uma linha tracejada atravessa as duas metades.

- _Mecanismo:_ o **contraste de densidade** (caótico versus limpo) explica o valor sem nenhum número de resultado.

**Seção 3 · "Pay only when your code runs": tabs que trocam um diagrama.** Ao trocar de "Network & CDN" para "SASE / Zero Trust", o painel muda de um diagrama de tráfego (CDN, DDoS, SSL, WAF, Bot) para um contador de usuários.

- _Mecanismo:_ **o mesmo enquadramento muda de estado** conforme a seleção. O usuário aprende comparando estados, não lendo parágrafos.

**Seção 4 · "Tailored to your team".** Bento com logs de deploy, agentes e painel de destaque.

**Para a ThEasy:** guias estruturais contínuas (grid visível em pontos chave), comparação "como é hoje / como fica" para aplicações, painéis que mudam de estado conforme a competência escolhida, conexões que representam fluxo real de informação.
**Não copiar:** laranja, gradiente de "nascer do sol", globo, nuvem, tom de "under attack", tabelas de preço.

## C · Stripe (`stripe.com/br`)

Quadros: `stripe-d00` a `d08`, `i-stripe-menu`.

- **Hero:** título longo em dois tons (frase escura que completa em cinza), sem bordão abstrato: diz exatamente o que a empresa faz. _Mecanismo:_ clareza comercial em uma frase, com o restante da frase como subtítulo integrado.
- **Grade de produtos:** cards de tamanhos diferentes com interfaces reais (checkout, cartão, mapa de fluxo de dinheiro). _Mecanismo:_ o card é uma janela para o produto, não um ícone com texto.
- **Mega menu:** produtos agrupados por necessidade (Pagamentos, Receita, Gestão de valores) com descrição de uma linha. _Mecanismo:_ a navegação já ensina o portfólio.
- **Transições:** blocos escuros alternam com claros; a faixa de gradiente ancora a identidade em pontos específicos, não em toda a página.

**Para a ThEasy:** headline que descreve a oferta, subtítulo que completa a frase, demonstrações como janelas de software, identidade concentrada em pontos de conexão.
**Não copiar:** gradiente iridescente, números de volume (US$ 1,9 tri etc.), logos de clientes.

## D · Vercel (`vercel.com`)

Quadros: `vercel-d00` a `d08`.

- **Hierarquia:** título de 48px, fundo quase branco, botões pequenos; o produto aparece em janelas com borda de 1px. _Mecanismo:_ sofisticação vem da **precisão** (alinhamentos, raios consistentes, cinzas calibrados), não de tamanho.
- **Produto + lista de recursos:** interface de cliente à esquerda, lista curta "Features" à direita em texto de 13px. _Mecanismo:_ a interface prova, a lista nomeia.
- **"Recently shipped":** bento com estados reais (chat de agente, sandbox).

**Para a ThEasy:** reduzir o tamanho dos títulos, aumentar a precisão do sistema (bordas, raios, grid de 12 colunas), usar listas curtas ao lado das demonstrações.
**Não copiar:** triângulo, preto e branco absoluto, linguagem de plataforma de autosserviço ("Deploy now").

## E · Thoughtworks (`thoughtworks.com/pt-br`)

Quadros: `thoughtworks-d00` a `d08`, `i-thoughtworks-menu`.

- **Navegação consultiva:** "O que fazemos · Como trabalhamos · Com quem trabalhamos · Insights · Engenharia". O menu "O que fazemos" lista capacidades por nome de problema empresarial (Modernização de sistemas legados, Modernização de dados, Engenharia de software). _Mecanismo:_ a consultoria vende **capacidades nomeadas pela necessidade do cliente**.
- **Prova por histórias:** carrosséis de casos e conteúdos. _Mecanismo:_ credibilidade por trabalho demonstrado.
- **CTA final:** faixa escura "Entre em contato" direta.

**Para a ThEasy:** nomear competências como necessidades ("Indicadores confiáveis", "Dados integrados", "Sistemas do tamanho da operação"), navegação que segue a lógica O que fazemos / Como trabalhamos / Onde aplicamos, CTA consultivo explícito.
**Não copiar:** imagens 3D artificiais (borboletas, cubos), carrosséis de conteúdo que a ThEasy não tem, logos de clientes.

---

## Comparação com a versão reprovada (v1)

Capturas: `docs/screenshots/v1-antes/`.

| Problema na v1                                    | Evidência                                                                   | Mecanismo de referência que resolve                                                   |
| ------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Primeira dobra comunica filosofia, não oferta     | "Começamos pelo problema. A tecnologia vem depois."                         | Stripe e Supabase: headline descreve o que é vendido; subtítulo lista as capacidades. |
| Título gigante como principal recurso visual      | Display de até 96px condensado em quatro linhas                             | Vercel: 48 a 64px com precisão; o produto é o visual.                                 |
| Galeria de seis fotos de setores logo após o hero | Seção § 01 com seis fotos                                                   | Supabase: o bloco mostra a capacidade; contexto de setor vira conteúdo secundário.    |
| Seções independentes                              | Cada seção tem um padrão visual próprio (fotos, lista, tabs, trilho escuro) | Cloudflare: guias contínuas e mesma gramática gráfica em toda a página.               |
| Demonstrações pequenas e genéricas                | Miniaturas de interface com barras cinza                                    | Supabase e Stripe: interfaces plausíveis em nível de campo, com estados.              |
| Ícones de biblioteca como linguagem               | Ícones Lucide em quase todos os blocos                                      | Supabase: primitiva visual por capacidade; ícone só como rótulo.                      |
| Movimento limitado a entradas                     | Revelação de linhas e fade                                                  | Cloudflare: o painel muda de estado; o movimento explica uma relação.                 |

## Princípios adotados para a ThEasy v2

1. **Oferta em uma frase.** Headline descritiva + subtítulo que completa + lista das cinco competências visível na primeira dobra.
2. **Mapa de sistema como assinatura.** Um diagrama próprio (Fontes → Integração → Base e inteligência → Aplicações → Decisão) aparece no hero e é a origem gráfica do resto da página.
3. **Uma primitiva visual por competência.** Painel de BI, pipeline, tela de sistema, fluxo automatizado e simulação de preço, todos demonstrativos e rotulados como tal.
4. **Estado sobre decoração.** Componentes mudam de estado conforme seleção (competência, área, etapa), como as tabs da Cloudflare.
5. **Continuidade estrutural.** Guias de grid contínuas, mesmos nós, conectores, raios e rótulos mono em todas as seções.
6. **Densidade controlada, títulos menores.** 40 a 60px no máximo; o conteúdo carrega a seção.
7. **Fotografia como contexto.** Uma ou duas imagens integradas a painéis, nunca galeria.
8. **Consultoria explícita.** Navegação e copy nomeiam necessidades do cliente; CTA consultivo.

## O que não será copiado (registro explícito)

Cores de marca das referências (verde, laranja, gradientes iridescentes), globos, nuvens, elefante, triângulo, ilustrações 3D, logos de clientes, números de escala, tabelas de preço, textos e formatos literais de bento. A gramática gráfica da ThEasy deriva do próprio símbolo (colchetes com cantos arredondados opostos e estrela côncava de quatro pontas).
