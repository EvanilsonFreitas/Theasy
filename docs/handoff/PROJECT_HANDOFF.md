# ThEasy · handoff do projeto

Documento principal de continuidade entre máquinas, contas e sessões. Usa
apenas o que está versionado neste repositório; não depende do histórico de
conversa, da memória local do Claude Code nem do canvas privado de design.
Estado registrado em 14/11/2026.

## 1. Resumo executivo

A **ThEasy** é uma consultoria em dados, tecnologia e gestão. Assinatura:
**THEASY · Your data analytics**. Proposta de valor exibida no site:
"Dados, BI e sistemas para fazer sua empresa funcionar melhor."

| Item             | Valor                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Produto          | Site institucional: apresenta as competências e capta contatos                                                     |
| Competências     | BI e Analytics (Power BI), engenharia de dados, sistemas sob medida, automação, consultoria financeira e de gestão |
| Público          | empresários e gestores, diretoria, líderes de tecnologia e operações, gestores de BI, finanças e controladoria     |
| Repositório      | https://github.com/EvanilsonFreitas/Theasy (público; nomes anteriores `onebi-website` e `oneb-website`)            |
| Branch principal | `main`                                                                                                             |
| Produção         | https://evanilsonfreitas.github.io/Theasy/ (GitHub Pages)                                                          |
| Versão publicada | **V2.2**, merge do PR #3 (`a1c36d1`), deploy manual em 14/11/2026                                                  |

**Estado:**

- site publicado e homologado nas 7 rotas;
- **WhatsApp comercial operacional** (+55 (11) 96463-9228);
- **formulário tradicional pendente**: valida, mas não envia enquanto não
  houver `VITE_CONTACT_ENDPOINT`, e informa isso ao visitante.

## 2. Arquitetura

- **Stack:** React 19, TypeScript strict, Vite 8, Tailwind CSS v4 (CSS first,
  tokens em `src/index.css`), React Router 7 (`createBrowserRouter`,
  basename `BASE_URL`, páginas carregadas sob demanda), framer-motion
  (`LazyMotion` + `m`, `MotionConfig reducedMotion="user"`), react-hook-form
  e zod, Instrument Sans e IBM Plex Mono via Fontsource.
- **Qualidade:** ESLint (typescript-eslint com tipos, react-hooks, jsx-a11y),
  Prettier (com plugin Tailwind), Husky e lint-staged no pre-commit,
  Playwright e axe-core.
- **Sem dependências de terceiros em tempo de execução:** fontes e imagens
  servidas pelo próprio site; WhatsApp por link `wa.me`, sem SDK.

**Rotas** (`src/routes/index.tsx`): `/`, `/solucoes`, `/aplicacoes`,
`/abordagem`, `/sobre`, `/contato`, `/privacidade`, 404 (`*`) e 14
redirecionamentos do site antigo (`quem-somos`, `missao`, `valores`,
`carreira`, `solucoes/:slug`, `tecnologias`, `cases`, `cases/:slug`,
`projetos`, `blog`, `blog/:slug`, `faq`, `termos`, `lgpd`).

**Diretórios:**

| Caminho                          | Conteúdo                                                                                                                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `src/features/`                  | páginas (home, solutions, applications, approach, about, contact, legal, errors)                                                                                               |
| `src/content/`                   | textos e dados tipados: `site.ts` (marca, navegação, WhatsApp), `solutions.ts`, `scenarios.ts`, `approach.ts`, `initiatives.ts`, `principles.ts`, `contexts.ts`, `problems.ts` |
| `src/components/system/`         | mapa da arquitetura (`SystemMap`, `SystemMapCompact`), estrela, glifos, `Section`, `PageHero`                                                                                  |
| `src/components/demos/`          | `BIDemo`, `DataDemo`, `SystemDemo`, `AutomationDemo`, `PricingDemo`, `DemoFrame`                                                                                               |
| `src/components/scenario/`       | `Transformation`: contexto, intervenção e solução com conectores medidos                                                                                                       |
| `src/components/process/`        | `ProcessStepper`, entregáveis e `PriorityMatrix`                                                                                                                               |
| `src/components/areas/`          | áreas e setores com fotografias                                                                                                                                                |
| `src/components/brand/Logo.tsx`  | símbolo e assinatura                                                                                                                                                           |
| `src/components/navigation/`     | `SiteHeader` (compacto no scroll, menu mobile modal), `SiteFooter`                                                                                                             |
| `src/components/contact/`        | `WhatsAppFloat`, `WhatsAppIcon`                                                                                                                                                |
| `src/components/ui/`             | `Button`, `Select` (combobox acessível em portal) e afins                                                                                                                      |
| `src/components/seo/Seo.tsx`     | título, descrição, canonical e Open Graph por página                                                                                                                           |
| `src/services/contactService.ts` | envio do formulário para `VITE_CONTACT_ENDPOINT`                                                                                                                               |
| `src/hooks/`, `src/lib/`         | `useScrollReveal`, `useRovingTabs`, `useFitScale`; `utils.ts` (`cn`, `asset`), `chart.ts`                                                                                      |
| `src/layouts/PublicLayout.tsx`   | header, `main`, rodapé, botão do WhatsApp, foco e scroll na troca de rota                                                                                                      |
| `public/`                        | `404.html` (fallback SPA), `brand/*.svg`, `favicon.svg`, `images/*.webp` e `CREDITOS.md`                                                                                       |
| `e2e/smoke.spec.ts`              | testes de fumaça                                                                                                                                                               |
| `vite.config.ts`                 | `base` condicional e geração de `robots.txt` e `sitemap.xml`                                                                                                                   |

Pastas que contêm apenas README (`src/app`, `config`, `constants`,
`contexts`, `providers`, `styles`, `types`, `utils`, `assets/*`) são
estrutura herdada sem uso.

## 3. Identidade visual

- **Nome:** THEASY. **Assinatura:** `Your data analytics` (texto exato).
- **Símbolo:** dois colchetes que se encaixam com estrela côncava central,
  vetorizado a partir da arte enviada pela ThEasy (`Logo.tsx`,
  `public/brand/*.svg`, `public/favicon.svg`). Não há arquivo vetorial
  oficial no repositório: o desenho é um traçado fiel. Não alterar a
  geometria nem a estrela.
- **Cor oficial:** `#5D3BDA` (token `brand` e `purple-600`): símbolo, ações,
  conexões ativas. Auxiliares só em gráficos, luz e seleção: `#8B6CF0`
  (`purple-500`), `#B9A8F8` (`purple-300`), `#F6F3FF` (`purple-50`). Sem
  amarelo.
- **Tipografia:** Instrument Sans (texto e títulos), IBM Plex Mono (rótulos e
  dados).
- **Gramática:** guias contínuas, nós em colchete, estrela como junção,
  profundidade E0 a E4 (`e1` a `e4`), utilitários `stage`, `win`, `bracket`,
  `frame`, `wire-flow` em `src/index.css`.
- **Movimento:** só `transform` e `opacity`, curva `cubic-bezier(.2,.8,.2,1)`;
  micro 140 a 200 ms, interface 240 a 280 ms, estado 300 a 380 ms, narrativo
  520 a 900 ms. Revelação no scroll (`data-reveal`, `data-rise`), sem
  sequestro de scroll. `prefers-reduced-motion` mostra o estado final.
- **Direção aprovada e descartes:** [DESIGN.md](../../DESIGN.md) (topo e
  seção 13) e [refinamento-v2.1.md](../design/refinamento-v2.1.md).

## 4. Funcionalidades implementadas

| Rota           | Conteúdo                                                                                                                                                                      |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`            | hero com o mapa da arquitetura (destaque por cursor e foco), abas das cinco competências com demos, transformação problema → solução, método em cinco etapas, áreas e setores |
| `/solucoes`    | as cinco competências com âncoras (`#bi-analytics`, `#dados-engenharia`, `#sistemas`, `#automacao`, `#consultoria`), cada uma com sua demo, e a arquitetura compacta          |
| `/aplicacoes`  | cenários ilustrativos por área (`?area=` compartilhável) com conectores medidos                                                                                               |
| `/abordagem`   | cinco etapas com entregáveis; a etapa 01 mostra a matriz impacto × esforço                                                                                                    |
| `/sobre`       | posicionamento, competências, público                                                                                                                                         |
| `/contato`     | formulário, cartão do WhatsApp, como funciona e perguntas frequentes (`?assunto=`, `?area=`)                                                                                  |
| `/privacidade` | tratamento dos dados do formulário                                                                                                                                            |

- **Demos (dados demonstrativos, rotulados):** painel de BI com seletor de
  unidade, carga de dados, sistema de pedidos com seletor de etapa, fluxo de
  automação com "Simular divergência", formação de preço.
- **Header:** compacta acima de 48 px de rolagem e volta abaixo de 16 px
  (histerese), sem deslocar o conteúdo; símbolo a 86%, descritor esmaece,
  brilho curto da estrela; congelado com o menu mobile aberto.
- **Menu mobile:** modal com foco preso, `Esc` fecha, conteúdo atrás inerte.
- **WhatsApp:** botão flutuante em todas as páginas (nome acessível "Falar
  pelo WhatsApp com a ThEasy", dica "Falar pelo WhatsApp", descrição "Abre em
  nova aba"), cartão "Conversar pelo WhatsApp" em `/contato` e canal no
  rodapé. Link `https://wa.me/5511964639228` com a mensagem inicial
  "Olá! Conheci a ThEasy pelo site e gostaria de conversar sobre uma solução
  para minha empresa." codificada. Sem SDK, scripts ou cookies de terceiros.
  Para trocar número ou mensagem, altere só `whatsapp` em
  `src/content/site.ts`.
- **Formulário:** validação (zod), honeypot, tempo limite de 15 s, foco no
  primeiro erro. Sem `VITE_CONTACT_ENDPOINT`, informa que a mensagem **não**
  foi enviada e oferece copiar o texto. O CTA "Falar com a ThEasy" do header
  leva a `/contato`, onde formulário e WhatsApp aparecem lado a lado.

## 5. Histórico das frentes

| Frente                       | PR     | Merge     | Resultado                                                                                                                                                   |
| ---------------------------- | ------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site anterior (OneB/ONEB)    | sem PR | `48ef679` | tema escuro, métricas, cases e depoimentos inventados, formulário que simulava sucesso                                                                      |
| V2.1 "Arquitetura conectada" | #1     | `72bbdb9` | redesign completo, assinatura "Your data analytics", repositório renomeado para `Theasy`, CI com testes de fumaça                                           |
| Encerramento de produção     | #2     | `a9ced32` | cor oficial `#5D3BDA`, publicação no Pages (fonte GitHub Actions, deploy manual), `CLAUDE.md`, handoff e guia de deploy                                     |
| V2.2 polimento de UX/UI      | #3     | `a1c36d1` | toggle, conectores ancorados, `Select` acessível, arquitetura compacta, copyright, cursor, matriz, header no scroll, WhatsApp, 8 correções de QA, 48 testes |

**Decisões que não devem ser reabertas sem pedido explícito:**

1. **Conteúdo fictício removido** do site antigo; nada de números, clientes
   ou depoimentos inventados.
2. **v1 "Caderno de decisão" reprovada:** comunicava filosofia em vez de
   oferta, dependia de tipografia gigante e galerias de fotos.
3. **v2 escolhida:** entre Enterprise Systems, Connected Intelligence e
   Modern Technology Consultancy, venceu Connected Intelligence em base clara,
   com interfaces plausíveis e clareza consultiva.
4. **v2.1:** profundidade suave, demos completas, fotos reais de áreas e
   setores, curvas suaves, sem amarelo.
5. **Publicação manual:** o deploy automático a cada push foi desativado.
6. **Benchmark de terceiros não publicado:** capturas de sites de terceiros
   saíram do repositório público (permanecem no histórico Git).
7. **V2.2:** verificações de teste geométricas em vez de comparação de pixels
   (Windows local e Linux no CI renderizam diferente); nome acessível do
   WhatsApp contém o texto da dica (WCAG 2.5.3).

Detalhes por frente: [DESIGN.md](../../DESIGN.md), seções 10 a 13.

## 6. Testes e qualidade

| Comando              | Cobertura                                 |
| -------------------- | ----------------------------------------- |
| `npm run lint`       | ESLint, inclusive acessibilidade estática |
| `npm run typecheck`  | TypeScript em app, config e testes        |
| `npm run build`      | build de produção                         |
| `npm run test:smoke` | **48 testes** Playwright contra o build   |

Os 48 testes (`e2e/smoke.spec.ts`) cobrem:

- as 7 rotas sem erros, com descrição por página e sem overflow; 404;
  redirecionamentos legados;
- assinatura, cor do símbolo e favicon; menu mobile e navegação; abas e
  etapas; formulário sem sucesso falso; movimento reduzido;
- axe WCAG 2.2 A/AA nas 7 rotas;
- V2.2: toggle contido no trilho, âncoras dos conectores nas bordas,
  `Select` (mouse, teclado, Esc, dentro de moldura com overflow), arquitetura
  compacta sem sobreposição, matriz (posição pelos valores, seleção,
  detalhe), rodapé, cursor, header (histerese, centralização, sem
  deslocamento, troca de rota, âncoras, menu mobile, movimento reduzido) e
  WhatsApp (7 rotas, link e mensagem, nome acessível, teclado, sem cobrir
  menu ou rodapé).

As medições esperam as revelações de entrada terminarem (função `settle`)
para não oscilar sob carga. Não há testes unitários nem testes com leitores
de tela reais.

## 7. GitHub e CI

- **CI** (`.github/workflows/ci.yml`): em pull requests para a `main` e push
  na `main`. Job `quality` (lint, typecheck, build, guarda `dist/`) e job
  `smoke` (Chromium e `npm run test:smoke`; relatório anexado em falha).
  Node 22, permissões de leitura, actions fixadas por SHA.
- **Deploy** (`.github/workflows/deploy.yml`): só `workflow_dispatch`,
  permissões `pages: write` e `id-token: write`, concorrência `pages`.
- **Política:** nada direto na `main`; branch curta, PR, CI verde, merge
  commit. Conventional Commits. Sem atribuições automáticas
  (`.claude/settings.json`). Sem force push; não excluir branches de
  segurança.
- **Proteção de branch:** não configurada (o repositório era privado no plano
  gratuito quando o fluxo foi criado). Reavaliar agora que é público.
- **Dependências:** `npm audit` aponta 7 alertas moderados só em ferramentas
  de desenvolvimento (`minimatch`); 0 em produção (`npm audit --omit=dev`).

## 8. Publicação

Procedimento completo, validação e rollback:
[docs/deployment/GITHUB_PAGES.md](../deployment/GITHUB_PAGES.md).

- GitHub Pages com fonte GitHub Actions; `deploy.yml` manual a partir da
  `main`, depois do merge e com autorização do responsável.
- `base` `/Theasy/` quando `GITHUB_PAGES=true`; `VITE_SITE_URL` definido no
  workflow (canonical, `og:url`, `sitemap.xml`).
- Estratégia SPA: `public/404.html` redireciona rotas internas para o app.
  O acesso direto a uma rota interna responde **HTTP 404** antes de o app
  renderizar a página; para o visitante a navegação é normal, para robôs não
  equivale a 200.
- Último deploy: `a1c36d1` (V2.2), 14/11/2026.

## 9. Limitações conhecidas

- Formulário sem serviço de recebimento (seção 10).
- Rotas internas respondem 404 na primeira requisição (fallback do Pages).
- Sem `og:image` até existir `public/og-image.png` (1200 × 630).
- `robots.txt` em site de projeto não tem efeito (só vale na raiz do domínio).
- Símbolo vetorizado, não o arquivo oficial.

**Armadilhas de desenvolvimento já encontradas:**

- `tailwind-merge` descarta `leading-*` quando uma classe `text-*` vem depois
  dela no mesmo `cn`; coloque a entrelinha depois do tamanho.
- O `useLayoutEffect` de um filho roda antes de o ref do pai ser anexado;
  para medir um contêiner do pai, use `useEffect` (ver `Wires` em
  `Transformation.tsx`).
- Medidas de layout devem usar `offsetLeft`/`offsetTop` (ignoram transforms
  de animação) e `ResizeObserver` para recalcular.
- Listas suspensas dentro das janelas das demos são cortadas por
  `overflow-hidden`; por isso o `Select` usa portal com posição fixa.
- O Git usa `core.autocrlf=true` no Windows e o Prettier grava LF: arquivos
  podem aparecer modificados só por fim de linha; normaliza no `git add`.
- Capturas de componente longas incluem o header fixo e o botão flutuante;
  oculte-os ao gerar evidências.

## 10. Pendências futuras

**Funcional (não bloqueia o site publicado):**

- **Recebimento do formulário.** Escolher e configurar um serviço que aceite
  POST JSON de origem pública, adicionar `VITE_CONTACT_ENDPOINT` ao build do
  `deploy.yml` por PR e validar um envio real antes de anunciar o canal.
  Nenhum fornecedor foi escolhido; não criar endpoint fictício. Enquanto
  isso, o WhatsApp é o canal direto.

**Dependem da ThEasy (conteúdo e legal):**

- arquivo vetorial oficial do logotipo;
- email de contato público;
- dados institucionais (razão social, CNPJ, endereço) e revisão jurídica da
  página de privacidade;
- `og-image.png` (1200 × 630);
- cases, depoimentos, números ou fotos próprias, se houver.

**Técnicas (não impeditivas):**

- 7 alertas moderados de desenvolvimento (`minimatch`);
- export `problems` sem uso em `src/content/problems.ts` (só `areas` é usado);
- `z.string().email()` em desuso no zod 4 (`ContactForm.tsx`);
- `vite.config.ts` fora do padrão do Prettier (`npm run format:check`
  acusa; o CI não roda essa verificação);
- ambiente `github-pages` ainda permite a branch antiga
  `feat/theasy-redesign` além da `main`.

**Melhorias opcionais:**

- domínio próprio (publicar na raiz e ajustar `base` e `VITE_SITE_URL`);
- pré renderização das rotas ou hospedagem com reescrita (resolve o 404
  inicial para SEO);
- carregar as demos sob demanda;
- proteção de branch na `main`.

## 11. Recuperação em outra máquina

Requisitos: Git, Node.js 22 (o Vite 8 exige 20.19 ou mais recente) e, para
publicar ou abrir PRs, o GitHub CLI (`gh`) autenticado com acesso ao
repositório.

```bash
git clone https://github.com/EvanilsonFreitas/Theasy.git
cd Theasy
npm ci
npx playwright install chromium
cp .env.example .env.local          # opcional; nada aqui é segredo
npm run lint
npm run typecheck
npm run build
npm run test:smoke                  # 48 testes
npm run dev                         # http://localhost:5173
```

**Claude Code:** abra o Claude Code na pasta do clone e use o prompt de
[NEW_SESSION_START.md](NEW_SESSION_START.md). O `CLAUDE.md` e o
`.claude/settings.json` (atribuições desativadas) são carregados do
repositório. Para validar o contexto, peça um resumo do estado e compare com
a seção 1 deste documento.
`.claude/launch.json` só define o servidor de desenvolvimento (`npm run dev`,
porta 5173) para o painel de pré-visualização do app desktop. Configurações
pessoais vão em `.claude/settings.local.json`, que é ignorado pelo Git.

**Nova mudança:**

```bash
git switch main && git pull
git switch -c fix/descricao-curta
# alterar, depois validar
npm run lint && npm run typecheck && npm run build && npm run test:smoke
git commit -m "fix(escopo): descrição"
git push -u origin fix/descricao-curta
gh pr create --base main
```

Espere o CI verde, faça o merge commit e, se a mudança afetar o site, publique
com `gh workflow run deploy.yml --ref main` depois da aprovação, validando
conforme o guia de deploy.

**O que não é transferido** para outra conta ou máquina: histórico desta
conversa, memória pessoal do Claude, sessões e canvas privados, credenciais,
configurações locais (`.claude/settings.local.json`) e plugins pessoais. Os
protótipos exportados estão em `docs/design/prototypes/` e as capturas em
`docs/screenshots/`.
