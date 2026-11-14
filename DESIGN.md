# ThEasy · Design e decisões técnicas

Documento de referência do redesign do site institucional (integrado à
`main` pelos PRs #1 e #2).

> **Versão atual: v2.1 "Arquitetura conectada".** A direção v1 ("Caderno de
> decisão", seções 1 a 7 abaixo) foi reprovada e substituída. Decisões da
> versão atual: [docs/design/benchmark-v2.md](docs/design/benchmark-v2.md)
> (benchmark visual) e
> [docs/design/refinamento-v2.1.md](docs/design/refinamento-v2.1.md)
> (direção, sistema visual, componentes, movimento). As seções 1 a 7 ficam
> como histórico da v1; as seções 8, 10, 11 e 12 valem para a versão atual.

## 1. Diagnóstico do site anterior (ONEB)

| Problema                                                                                   | Impacto                                                   |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| Tema escuro "espacial" com partículas, glow e vidro em todas as seções                     | Aparência de template gerado; nada comunicava o negócio   |
| Hero centralizado com palavras em gradiente e dois botões                                  | Composição genérica, sem proposta de valor clara          |
| Métricas inventadas (100M+, 99,9%, 50+ clientes, 18%), cases, depoimentos e blog fictícios | Risco reputacional e jurídico para uma empresa real       |
| Grades de cards idênticos com ícones                                                       | Serviços indiferenciados; leitura cansativa               |
| Formulário "enviava" para localStorage e gerava link de reunião falso                      | Sucesso simulado: o lead se perdia sem ninguém saber      |
| 17 rotas, várias rasas (missão, valores, carreira, termos)                                 | Arquitetura inflada, jornada difusa                       |
| Lenis (scroll suavizado), Three.js, GSAP, axios, react-query sem uso real                  | 621 kB de JS (193 kB gzip) e scroll fora do padrão nativo |
| Contato, redes sociais e e-mails fictícios                                                 | Links que não levavam a lugar nenhum                      |

## 2. Prototipação (v1)

Os protótipos foram desenhados em canvas (Claude Design) antes da
implementação:

- Canvas privado do proprietário.
- Fontes dos artboards versionadas em `docs/design/prototypes/v1/`.
- Artboards: três direções exploratórias (A: relatório editorial,
  B: estúdio de produto, C: mapa de decisão), a síntese escolhida (Home
  desktop interativa), Home mobile com menu e o design system.
- Crítica aplicada no próprio canvas: a seção "Princípios" falhava no teste
  "trocar o logotipo e continuar igual"; virou "Três frases que você não vai
  ouvir da ThEasy".
- Depois que a ThEasy enviou a arte institucional, o canvas recebeu o
  logotipo oficial, a paleta derivada do símbolo e a remoção de travessões.

**Limitações registradas.** Não houve sincronização automática entre canvas
e código: a transferência foi feita pelos arquivos dos artboards e por este
documento. A crítica visual final foi feita sobre o site implementado.

## 3. Conceito: "Caderno de decisão"

Síntese das três direções: o ritmo editorial de um relatório (A), interfaces
concretas como prova (B) e a passagem problema → decisão (C).

**Assinatura: as quatro estações.** `Desafio → Estrutura → Solução → Decisão`
organizam a narrativa do site inteiro:

- A **folha de trabalho** (`components/worksheet/Worksheet.tsx`) mostra um
  caso ilustrativo atravessando as quatro estações. As fontes de dados
  aparecem tortas e se **encaixam** na grade do modelo (animação de layout
  compartilhado): o único gesto de movimento do sistema.
- O rodapé, a página Sobre e o fluxo de contato repetem as estações.
- O **símbolo oficial** (dois colchetes que se encaixam ao redor de uma
  estrela) conversa com o mesmo gesto: na página Sobre e no encerramento da
  Home ele é montado peça por peça.

**Gramática de relatório.** Rótulos mono numerados (`§ 01 · Problemas
reais`), réguas finas como pauta, títulos comprimidos, listas em formato de
índice. Nenhum card com sombra, nenhum gradiente, nenhum vidro.

**Teste do logotipo.** Sem o logotipo e com outra cor, o site continua
reconhecível pela folha de trabalho, pelo índice de problemas filtrável,
pelas frases riscadas e pela numeração editorial.

## 4. Identidade

### Logotipo

`components/brand/Logo.tsx` e `public/brand/theasy-symbol.svg`.
O símbolo foi **vetorizado a partir da arte institucional enviada** (vídeo),
preservando a geometria: colchetes com simetria de rotação de 180° e estrela
de quatro pontas com lados côncavos. O nome "THEASY" e o descritor
"Business Intelligence & Consulting" são compostos em Archivo, a família mais
próxima disponível. **Substituir pelos arquivos vetoriais oficiais** assim
que existirem.

### Cor

O roxo marca **o ponto de resolução**: ação principal, estado ativo,
a decisão. Nunca fundo de página inteira.

| Token           | HEX                   | Uso                                  | Contraste                                  |
| --------------- | --------------------- | ------------------------------------ | ------------------------------------------ |
| `purple-500`    | `#8B6CF0`             | Cor do símbolo (gráfico)             | 3,8:1 sobre branco (só elementos gráficos) |
| `purple-600`    | `#5B3CD6`             | Botão primário, texto roxo, ativo    | 6,9:1                                      |
| `purple-800`    | `#3F27A3`             | Hover / pressionado                  | 10:1                                       |
| `purple-300`    | `#B9A8F8`             | Acento sobre fundo tinta             | 8,7:1 sobre `ink`                          |
| `purple-50/100` | `#F3F0FE` / `#E7E1FD` | Realces                              | decorativo                                 |
| `ink`           | `#16131D`             | Texto, réguas fortes, seções escuras | 18:1                                       |
| `ink-2`         | `#4A4654`             | Texto secundário                     | 9:1                                        |
| `ink-3`         | `#6E6A78`             | Rótulos e metadados                  | 5,3:1 (4,8:1 sobre `paper-2`)              |
| `rule-strong`   | `#8E8999`             | Bordas de campos                     | 3,4:1 (WCAG 1.4.11)                        |

O `#8B6CF0` foi **aproximado visualmente** da arte de referência; o HEX
oficial continua pendente de validação.

### Tipografia

- **Archivo Variable** (eixos de peso e largura 62 a 125%), servida
  localmente via Fontsource. Títulos em largura 78%, peso 620, entreletra
  negativa e espaçamento de palavras levemente aberto: ritmo de relatório
  sem perder legibilidade. Texto corrido em largura normal.
  Por que não Inter: a largura variável é o que cria a identidade tipográfica,
  e a Archivo tem desenho firme em português (acentos, ç).
- **IBM Plex Mono** para rótulos, numeração e anotações.
- Escala: `type-display` (46 a 96 px), `type-h2` (36 a 64 px), `type-h3`
  (22 a 28 px), `type-lead` (17 a 20 px), `type-mono` (12 px).

### Iconografia e imagens

- Ícones: um único conjunto (Lucide, traço 1,5), sempre com texto, em
  moldura quadrada (`IconMark`). Mapeamento em `content/icons.tsx`.
- Fotografias reais de segmentos e áreas (Unsplash License), recortadas e
  convertidas para WebP em duas larguras, servidas localmente, com `alt`
  descritivo. Créditos em `public/images/CREDITOS.md`. As pessoas retratadas
  não são equipe nem clientes da ThEasy e a interface não sugere o contrário.
- Ilustrações: interfaces ilustrativas dos entregáveis
  (`SolutionArtifact.tsx`: painel, pipeline, sistema, automação, formação de
  preço) desenhadas em HTML/CSS, e o símbolo animado.

### Redação

Português brasileiro, consultivo, sem clichês de "transformação digital".
**Sem travessões nem hífens no texto do site** (pedido da ThEasy): separadores
usam "·", fórmulas são escritas por extenso e "e-mail" vira "email".

## 5. Movimento

| Tipo      | Duração                                | Uso                                                             |
| --------- | -------------------------------------- | --------------------------------------------------------------- |
| Micro     | 140 a 200 ms                           | Hover, seta que avança 4px, sublinhado da navegação             |
| Interface | 240 a 280 ms                           | Troca de painel, menu, filtros                                  |
| Encaixe   | spring (rigidez 260, amortecimento 30) | Fontes → modelo na folha de trabalho                            |
| Narrativo | 520 a 900 ms                           | Revelação por máscara dos títulos de seção, montagem do símbolo |
| Estado    | 300 a 380 ms                           | Header compacto no scroll, brilho da estrela (620 ms, uma vez)  |

Regras: só `transform` e `opacity`; curva `cubic-bezier(.2,.8,.2,1)`; sem
sequestro de scroll (o trilho da Abordagem só **reflete** o scroll);
avanço automático da folha de trabalho com botão Pausar, pausado no hover,
no foco e fora da viewport; `prefers-reduced-motion` mostra tudo no estado
final e desliga o avanço automático. Sem JS, nada fica escondido (estados
iniciais só existem sob `.js`).

**Header no scroll (V2.2).** Estado discreto, não contínuo: compacta acima
de 48 px de rolagem e só volta abaixo de 16 px (histerese), com leitura
limitada a um quadro (`requestAnimationFrame`) e mudança de estado apenas ao
cruzar um limiar, então não há renderização por pixel nem oscilação. A
altura do header no fluxo não muda: ele fica preso 12 px (8 px no mobile)
acima da viewport, a faixa visível passa de 72 para 60 px (64 para 56 no
mobile) e a linha interna se recentra com `transform`. No compacto o símbolo
vai a 86%, o descritor "Your data analytics" esmaece, o nome THEASY se
recentra e entram sombra ambiente e separador. A estrela recebe um brilho
curto (opacidade e escala, 620 ms, uma vez por troca de estado; não toca na
montagem). Com o menu mobile aberto o estado fica congelado e o painel começa
exatamente na borda visível do header. Com movimento reduzido, as mudanças
são instantâneas e o brilho não aparece.

## 6. Arquitetura da informação

| Rota           | Papel na jornada                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/`            | Proposta de valor, segmentos, índice de problemas, soluções, abordagem, posicionamento, primeira conversa         |
| `/solucoes`    | As cinco frentes em profundidade, com âncoras (`#bi-analytics` etc.)                                              |
| `/abordagem`   | Cinco etapas, índice fixo com progresso                                                                           |
| `/aplicacoes`  | Casos ilustrativos por área (Financeiro, Operações, Comercial, Tecnologia, Gestão); a área fica na URL (`?area=`) |
| `/sobre`       | Posicionamento, competências, público                                                                             |
| `/contato`     | Formulário, como funciona, perguntas frequentes                                                                   |
| `/privacidade` | Tratamento dos dados do formulário                                                                                |

Rotas antigas da ONEB redirecionam para o conteúdo equivalente
(`routes/index.tsx`, `legacyRedirects`). Conteúdo fictício foi removido.

## 7. Engenharia

- Stack mantida: React 19, TypeScript (agora `strict`), Vite 8, Tailwind v4
  CSS-first, React Router, React Hook Form + Zod, Framer Motion
  (`LazyMotion` + `m`, `MotionConfig reducedMotion="user"`).
- Removidos por falta de uso ou por conflitar com o briefing: three,
  @react-three/*, gsap, lenis, axios, @tanstack/react-query, @base-ui/react,
  shadcn, tw-animate-css, class-variance-authority, Plus Jakarta Sans.
- Estrutura: `content/` (todo o texto e dados, tipados), `components/`
  (brand, navigation, seo, ui, worksheet, solutions), `features/` (páginas),
  `services/contactService.ts`, `hooks/useScrollReveal.ts`.
- SEO: `<title>`, description, Open Graph por página com o suporte nativo do
  React 19 (`components/seo/Seo.tsx`). Canonical, `og:url`, `og:image` e
  `sitemap.xml` só são gerados com `VITE_SITE_URL` definido; `robots.txt`
  sempre. Nenhum structured data, porque não há dados verificados.
- Deploy: `base` `/Theasy/` no GitHub Pages, igual ao nome do repositório
  (renomeado de `oneb-website` para `Theasy`).

### Contato

`VITE_CONTACT_ENDPOINT` recebe um POST JSON (Formspree, Getform ou função
própria). Sem a variável, o formulário valida normalmente, mas informa que
**a mensagem não foi enviada** e oferece copiá-la. Nunca simula sucesso.
Testado localmente: sucesso (endpoint simulado recebeu o JSON), erro HTTP 500
(dados mantidos, alerta focado) e ambiente sem endpoint.

**WhatsApp comercial (V2.2).** Canal direto informado pela ThEasy:
+55 (11) 96463-9228. Configuração única em `src/content/site.ts`
(`whatsapp`: número internacional, exibição, mensagem inicial e URL
`https://wa.me/5511964639228?text=...` com a mensagem codificada). Sem SDK,
scripts ou cookies de terceiros, sem encurtadores; links com
`target="_blank"` e `rel="noopener noreferrer"`. Pontos de contato: botão
flutuante em todas as páginas (nome acessível "Conversar com a ThEasy pelo
WhatsApp", dica "Falar pelo WhatsApp" no hover e no foco, áreas seguras do
mobile, inerte atrás do menu mobile), cartão "Conversar pelo WhatsApp" na
página de contato e canal no rodapé. O CTA do header continua levando a
`/contato`: a página oferece as duas jornadas (formulário e WhatsApp) lado a
lado, sem mudar o layout aprovado do header. O formulário não foi alterado e
continua informando que a mensagem não foi enviada enquanto não houver
endpoint.

## 8. Pendências que dependem da ThEasy

1. Arquivos vetoriais oficiais do logotipo (SVG) e confirmação da fonte do
   nome "THEASY"; hoje o símbolo é uma vetorização fiel da arte enviada.
2. ~~HEX oficial do roxo~~: resolvido, `#5D3BDA` (ver seção 12).
3. Endpoint ou serviço de recebimento do formulário (`VITE_CONTACT_ENDPOINT`)
   e um email de contato para exibir no site. O WhatsApp comercial já está
   ativo (seção 7).
4. Imagem `og-image.png` (1200×630); a tag `og:image` só deve ser reativada
   em `Seo.tsx` quando o arquivo existir. A URL pública já está definida
   (`VITE_SITE_URL` no `deploy.yml`).
5. Dados institucionais (razão social, CNPJ, endereço) para rodapé e página
   de privacidade, e validação jurídica do texto de privacidade.
6. Cases, depoimentos ou números reais, se houver, para substituir os
   exemplos ilustrativos.
7. Fotos próprias (equipe, escritório, projetos), se houver, para substituir
   parte das fotografias de banco de imagens.

## 9. Validação da v1 (histórico)

| Verificação                                                                                                | Resultado                                                    |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `npm run lint` (ESLint + jsx-a11y)                                                                         | sem erros nem avisos                                         |
| `npm run typecheck` (strict)                                                                               | sem erros                                                    |
| `npm run build`                                                                                            | ok; JS inicial ≈ 168 kB gzip (antes 219 kB), CSS 9,4 kB gzip |
| axe-core 4.12 (WCAG 2.0 a 2.2 A/AA + boas práticas), 8 rotas, 1440 e 390 px                                | 0 violações                                                  |
| Overflow horizontal em 360, 390, 768, 1024, 1440 e 1920 px, todas as rotas                                 | nenhum                                                       |
| Redirecionamentos das 14 rotas antigas                                                                     | todos corretos                                               |
| Links internos e âncoras (30)                                                                              | todos resolvem                                               |
| Formulário: validação, foco no 1º erro, envio com sucesso (endpoint simulado), erro HTTP 500, sem endpoint | ok nos três caminhos                                         |
| Menu mobile: foco, Esc, trava de scroll, `inert`, fecha em link da mesma página                            | ok                                                           |
| Navegação por âncora move o foco para o destino                                                            | ok                                                           |
| Web Vitals de laboratório (build de produção, local, sem limitação de rede/CPU)                            | LCP 720 ms · CLS 0,0001 · FCP 604 ms                         |

Não validado nesta etapa: métricas de campo (dependem de usuários reais),
leitores de tela físicos (NVDA/VoiceOver), zoom de 200% em navegador real
(o layout é fluido e sem overflow a 360 px, que equivale ao zoom de 400% em
1440 px), emulação de `prefers-reduced-motion` (comportamento verificado no
código: CSS sob `no-preference`, `MotionConfig reducedMotion="user"`,
`useReducedMotion` no avanço automático e nas linhas de progresso).

Auditorias independentes (subagentes): frontend/QA e UX/conteúdo. Todos os
itens apontados foram corrigidos (menu modal, foco em âncoras, honeypot,
timeout de envio, movimento reduzido nas linhas de progresso, padronização
de "etapas" × "momentos", textos alternativos, foto da área Comercial,
português e alvos de toque de 24 px).

## 10. Validação da v2.1 (13/11/2026, ambiente local)

| Verificação                                                                  | Resultado                                                                                                                                                        |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`, `npm run typecheck`, `npm run build`                         | sem erros nem avisos                                                                                                                                             |
| axe-core 4.12 (WCAG 2.0 a 2.2 A/AA + boas práticas), 8 rotas, 1440 e 390 px  | 0 violações na varredura padrão. Um alerta de `target-size` só aparece quando o cabeçalho fixo cobre um chip do hero após rolagem programática; o chip tem 44 px |
| Overflow horizontal: 7 rotas × 360, 390, 768, 1024, 1440, 1920 px            | nenhum (as estrelas das guias vazavam 5 px entre 768 e 1279 px: corrigido)                                                                                       |
| Texto saindo de cards e nós de diagrama: 6 rotas × 360, 768, 1024, 1440 px   | nenhum (corrigidos: rótulo da base no mapa, regras do tratamento, títulos da automação, setor "Agronegócio" a 360 px)                                            |
| Movimento reduzido (emulado no Chrome)                                       | pacotes do mapa não renderizados, sem botão de pausa, pipeline conclui na hora                                                                                   |
| Teclado: abas de competências (setas, Home, End), etapas do método, cenários | ok                                                                                                                                                               |
| Pausa do fluxo do mapa por clique                                            | ok (estava bloqueada pela camada de nós: corrigido)                                                                                                              |
| CTA final → /contato com texto e área preenchidos                            | ok                                                                                                                                                               |
| Formulário sem endpoint: informa que **não** foi enviado e oferece cópia     | ok                                                                                                                                                               |
| Validação do formulário e foco no primeiro erro                              | ok                                                                                                                                                               |
| `?area=` em Aplicações e redirecionamento legado (/cases)                    | ok                                                                                                                                                               |
| Menu mobile: diálogo, conteúdo inerte, Esc fecha                             | ok                                                                                                                                                               |
| Web Vitals de laboratório (build local, sem limitação)                       | 1440 px: LCP 552 ms · CLS 0,0002 · FCP 552 ms. 390 px: LCP 456 ms · CLS 0 · FCP 372 ms                                                                           |
| JS inicial                                                                   | ≈ 180 kB gzip (index 123 + compartilhado 43 + motion 14)                                                                                                         |

Não validado: envio com endpoint real (a lógica de envio não mudou desde a
v1, onde foi testada contra um endpoint simulado), métricas de campo,
leitores de tela físicos, Safari e Firefox reais (SMIL do mapa tem suporte
amplo, mas não foi inspecionado nesses motores).

Capturas: `docs/screenshots/v1-antes/` (antes), `docs/screenshots/v2-depois/`
(home em seis larguras e páginas internas em 1440 e 390 px) e as comparações
`docs/screenshots/comparacao-home-1440.jpg` e `comparacao-home-390.jpg`.

## 11. Assinatura e repositório (finalização)

- Assinatura da marca: **THEASY** com a legenda **Your data analytics**, em
  substituição a "Business Intelligence & Consulting". Aplicada no componente
  único `components/brand/Logo.tsx`, que atende cabeçalho (desktop e mobile)
  e rodapé. O símbolo e a estrela central não mudaram (a cor foi atualizada
  depois para o HEX oficial; ver seção 12).
- Título padrão da home: `ThEasy | Your data analytics`. As demais páginas
  mantêm títulos e descrições próprios dos serviços.
- Repositório renomeado de `oneb-website` para `Theasy`; o `base` do build de
  GitHub Pages passou a `/Theasy/`.
- As referências à ONEB nas seções 1 a 7 e em `docs/01` a `docs/06` são
  registro histórico do site anterior e foram mantidas.

## 12. Publicação e cor oficial (encerramento)

- Cor institucional oficial: **`#5D3BDA`** (token `brand` e `purple-600`),
  aplicada ao símbolo, favicon, ações e conexões ativas. `#8B6CF0`
  (`purple-500`) permanece como tom auxiliar de gráficos e efeitos. Contraste
  de `#5D3BDA` sobre as superfícies do site: 6,1:1 a 6,8:1. A seção 4
  acima registra o valor provisório da v1.
- Publicação: GitHub Pages com fonte GitHub Actions, deploy manual, URL
  https://evanilsonfreitas.github.io/Theasy/. Procedimento e evidências em
  `docs/deployment/GITHUB_PAGES.md`.
- Capturas de sites de terceiros usadas no benchmark não são publicadas no
  repositório público.
- Handoff do projeto: `docs/handoff/PROJECT_HANDOFF.md`; instruções para o
  Claude Code: `CLAUDE.md`.

## 13. Refinamento V2.2 (evolução pontual da v2.1)

Correções de interface depois da publicação, sem reabrir conceito, layout
ou identidade. Especificação visual no board "Refino V2.2" do canvas
(`docs/design/prototypes/v2/Refine22.dc.html`). Evidências em
`docs/screenshots/v2.2-antes/` (produção) e `docs/screenshots/v2.2-depois/`
(build local; nas capturas de componentes o header fixo e o botão flutuante
ficam ocultos para não sobrepor o recorte).

| Item                         | Correção                                                                                                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Toggle "Simular divergência" | Trilho 36 × 20 com respiro de 3 px; indicador de 14 px desloca 16 px. Fica contido nos dois estados                                                                  |
| Do problema à solução        | Conectores medidos nas caixas reais (ResizeObserver), nascem e terminam nas bordas, com âncoras; só no layout de três colunas                                        |
| Seletor de unidade           | `Select` do design system (combobox WAI-ARIA: setas, Home, End, Enter, Espaço, Esc, busca por letra, abre para cima quando falta espaço). Também na demo de sistemas |
| Arquitetura compacta         | Camadas com respiro, rótulos de camada e barramentos alinhados à grade (descidas no centro de cada caixa)                                                            |
| Rodapé                       | "© {ano} ThEasy. Todos os direitos reservados." com ano dinâmico                                                                                                     |
| Cursor e affordance          | `cursor: pointer` só em botões, abas, switches, opções, `summary` e `label[for]`; `not-allowed` em desabilitados. Cards estáticos sem mão                            |
| Matriz impacto × esforço     | Quadrantes nomeados, posição derivada dos valores (`src/content/initiatives.ts`), marcadores selecionáveis, painel de detalhe e lista numerada em contêiner estreito |
| Header no scroll             | Ver seção 5                                                                                                                                                          |
| WhatsApp comercial           | Ver seção 7                                                                                                                                                          |

Validação: lint, typecheck e build sem erros; 48 testes Playwright (24
anteriores e 24 da V2.2, com axe WCAG 2.2 A/AA nas 7 rotas) aprovados
localmente, repetidos sob carga para eliminar instabilidade. As
verificações são geométricas (indicador dentro do trilho, âncoras sobre as
bordas, nós sem sobreposição, marcador na posição dos valores, header sem
deslocar o conteúdo) em vez de comparação de pixels, que falharia entre o
Windows local e o Linux do CI.

Revisão independente de QA (acessibilidade e UX) antes do PR encontrou e
corrigiu: lista do `Select` cortada pela moldura das demos (agora em portal
com posição fixa e rolagem interna), linha do header fora do centro entre o
topo e o estado compacto (agora acompanha o deslocamento real do sticky e o
logotipo é alinhado por flex), rodapé coberto pelo botão flutuante em telas
largas, região viva do detalhe da matriz que remontava, nome do `Select`
repetindo o valor, painel do menu sem acompanhar redimensionamento e
contraste do trilho desligado do toggle (agora `rule-strong`, 3,4:1). O
nome acessível do botão flutuante segue o texto pedido ("Conversar com a
ThEasy pelo WhatsApp"), com a descrição "Abre em nova aba".
