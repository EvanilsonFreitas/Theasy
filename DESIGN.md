# ThEasy · Design e decisões técnicas

Documento de referência do redesign do site institucional (branch
`feat/theasy-redesign`). Explica a direção de arte, o sistema visual, a
arquitetura e o que ainda depende de informação externa.

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

## 2. Claude Design

O design foi concebido no **Claude Design** (tipo de artefato "Design", o
canvas do Claude) antes da implementação:

- Canvas: `ThEasy — Redesign do site` (artefato privado do proprietário).
- Fontes dos artboards versionadas em `docs/design/claude-design/`.
- Artboards: três direções exploratórias (A: relatório editorial,
  B: estúdio de produto, C: mapa de decisão), a síntese escolhida (Home
  desktop interativa), Home mobile com menu e o design system.
- Crítica aplicada no próprio canvas: a seção "Princípios" falhava no teste
  "trocar o logotipo e continuar igual"; virou "Três frases que você não vai
  ouvir da ThEasy".
- Depois que a ThEasy enviou a arte institucional, o canvas recebeu o
  logotipo oficial, a paleta derivada do símbolo e a remoção de travessões.

**Limitações registradas.** A sincronização automática `/design-sync`
(ferramenta DesignSync) serve para bibliotecas de design system e não estava
habilitada como skill nesta sessão; o handoff foi feito pelos arquivos dos
artboards e por este documento. O plugin `frontend-design` não estava
disponível no ambiente. A pré-visualização renderizada do canvas exige login
no claude.ai no navegador da sessão, então a crítica visual final foi feita
sobre o site implementado.

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

Regras: só `transform` e `opacity`; curva `cubic-bezier(.2,.8,.2,1)`; sem
sequestro de scroll (o trilho da Abordagem só **reflete** o scroll);
avanço automático da folha de trabalho com botão Pausar, pausado no hover,
no foco e fora da viewport; `prefers-reduced-motion` mostra tudo no estado
final e desliga o avanço automático. Sem JS, nada fica escondido (estados
iniciais só existem sob `.js`).

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
- Deploy: o `base` `/oneb-website/` do GitHub Pages foi mantido (identificador
  técnico, não renomeado).

### Contato

`VITE_CONTACT_ENDPOINT` recebe um POST JSON (Formspree, Getform ou função
própria). Sem a variável, o formulário valida normalmente, mas informa que
**a mensagem não foi enviada** e oferece copiá-la. Nunca simula sucesso.
Testado localmente: sucesso (endpoint simulado recebeu o JSON), erro HTTP 500
(dados mantidos, alerta focado) e ambiente sem endpoint.

## 8. Pendências que dependem da ThEasy

1. Arquivos vetoriais oficiais do logotipo (SVG) e confirmação da fonte do
   nome "THEASY"; hoje o símbolo é uma vetorização fiel da arte enviada.
2. HEX oficial do roxo (usado `#8B6CF0`, aproximado da arte).
3. Endpoint ou serviço de recebimento do formulário (`VITE_CONTACT_ENDPOINT`)
   e um email de contato para exibir no site.
4. Domínio público (`VITE_SITE_URL`) para canonical, sitemap e Open Graph,
   e uma imagem `og-image.png` (1200×630).
5. Dados institucionais (razão social, CNPJ, endereço) para rodapé e página
   de privacidade, e validação jurídica do texto de privacidade.
6. Cases, depoimentos ou números reais, se houver, para substituir os
   exemplos ilustrativos.
