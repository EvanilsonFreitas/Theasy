# ThEasy · handoff do projeto

Documento para retomar o projeto em outra máquina, outra conta ou outra
sessão, usando apenas o que está versionado neste repositório. Não depende de
histórico de conversa, memória local do Claude ou do canvas privado de design.

## 1. Identificação

| Item                  | Valor                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------- |
| Produto               | Site institucional da ThEasy                                                                 |
| Propósito             | Apresentar a consultoria, suas competências e captar contatos                                |
| Repositório           | https://github.com/EvanilsonFreitas/Theasy (público; nome anterior `oneb-website`)           |
| Branch principal      | `main`                                                                                       |
| Produção              | https://evanilsonfreitas.github.io/Theasy/ (GitHub Pages)                                    |
| Pasta local de origem | `C:\Desenvolvimento\ThEasy` (referência histórica; os procedimentos usam caminhos relativos) |

## 2. Arquitetura

- **Stack:** React 19, TypeScript strict, Vite 8, Tailwind CSS v4 (CSS first),
  React Router 7 (`createBrowserRouter`, basename `BASE_URL`), framer-motion
  (`LazyMotion` + `m`, `MotionConfig reducedMotion="user"`), react-hook-form + zod,
  Instrument Sans e IBM Plex Mono via Fontsource.
- **Qualidade:** ESLint (typescript-eslint com tipos, jsx-a11y), Prettier,
  Husky + lint-staged no pre-commit, Playwright + axe-core.
- **Pastas principais:**
  - `src/content/`: textos e dados tipados (serviços, cenários, áreas, etapas, princípios).
  - `src/components/system/`: mapa da arquitetura, estrela de junção, glifos, `Section`, `PageHero`.
  - `src/components/demos/`: BI, engenharia de dados, sistema, automação e precificação.
  - `src/components/scenario/`, `process/`, `areas/`: seções compartilhadas.
  - `src/components/brand/Logo.tsx`: símbolo e assinatura.
  - `src/features/`: páginas (home, soluções, aplicações, abordagem, sobre, contato, privacidade, 404).
  - `src/routes/index.tsx`: rotas, carregamento sob demanda e redirecionamentos legados.
  - `src/services/contactService.ts`: envio do formulário.
  - `e2e/`: testes de fumaça. `docs/`: design, deploy, handoff, capturas.
- Pastas que contêm apenas README (`src/app`, `config`, `constants`,
  `contexts`, `providers`, `styles`, `types`, `utils`, `assets/*`) são
  estrutura herdada sem uso.

## 3. Identidade

- **Nome:** THEASY. **Assinatura:** `Your data analytics` (texto exato).
- **Símbolo:** dois colchetes que se encaixam com estrela côncava central,
  vetorizado a partir da arte enviada pela ThEasy (`Logo.tsx`,
  `public/brand/*.svg`, `public/favicon.svg`). Ainda não há arquivo vetorial
  oficial no repositório: o desenho atual é um traçado fiel, não o original.
- **Cor oficial:** `#5D3BDA` (token `brand` e `purple-600`): símbolo, ações,
  conexões ativas. Auxiliares: `#8B6CF0` (`purple-500`), `#B9A8F8`
  (`purple-300`), `#F6F3FF` (`purple-50`), só em gráficos, luz e seleção.
  Sem amarelo na interface.
- **Tipografia:** Instrument Sans (texto e títulos), IBM Plex Mono (rótulos e dados).
- Tokens e utilitários (profundidade `e1` a `e4`, `stage`, `bracket`, `frame`)
  em `src/index.css`.

## 4. Design aprovado (não reabrir sem pedido explícito)

Direção **v2.1 "Arquitetura conectada"**:

- hero com a oferta em uma frase e o mapa fontes, integração, base,
  aplicações e decisão;
- cinco demonstrações distintas, todas rotuladas como demonstrativas;
- transformação em três tempos: contexto, intervenção, solução;
- método em cinco etapas com entregáveis;
- áreas e setores com fotos reais;
- composição institucional derivada do símbolo;
- profundidade suave (níveis E0 a E4; utilitários `e1` a `e4`), guias contínuas, nós em colchete e estrela de junção.

Registro completo em `docs/design/refinamento-v2.1.md`, benchmark em
`docs/design/benchmark-v2.md`, protótipos em `docs/design/prototypes/`.

**V2.2 (polimento pós publicação):** toggle, conectores medidos, `Select`
do design system, arquitetura compacta, rodapé, cursor, matriz de
priorização, header compacto no scroll e WhatsApp comercial. Registro em
`DESIGN.md` (seção 13).

## 5. Funcionalidades

- **Rotas:** `/`, `/solucoes`, `/aplicacoes` (`?area=` compartilhável),
  `/abordagem`, `/sobre`, `/contato` (`?assunto=`, `?area=`, texto vindo da
  home), `/privacidade` e 404.
- **Redirecionamentos legados:** 14 endereços do site ONEB.
- **Interações:** destaque do mapa por cursor e foco, abas com teclado, demos
  executáveis, seletores de cenário, etapa, área e setor, menu mobile modal.
- **Formulário:** validação (zod), honeypot, tempo limite de 15 s e mensagens
  de erro. Sem `VITE_CONTACT_ENDPOINT`, informa que **não** enviou e oferece
  copiar o texto.
- **WhatsApp comercial:** +55 (11) 96463-9228, link `wa.me` com mensagem
  inicial codificada. Fonte única em `src/content/site.ts` (`whatsapp`);
  para trocar número ou mensagem, altere só esse objeto. Aparece no botão
  flutuante (todas as páginas), na página de contato e no rodapé. Sem SDK,
  scripts ou cookies de terceiros.
- **Header:** compacta no scroll com histerese (48 px para compactar, 16 px
  para voltar), sem deslocar o conteúdo; congelado com o menu mobile aberto.

## 6. Testes

| Comando              | Cobertura                                              |
| -------------------- | ------------------------------------------------------ |
| `npm run lint`       | ESLint, inclusive acessibilidade estática              |
| `npm run typecheck`  | TypeScript em app, config e testes                     |
| `npm run build`      | build de produção                                      |
| `npm run test:smoke` | 48 testes Playwright contra o build (ver lista abaixo) |

Os 48 testes cobrem:

- as 7 rotas sem erros, com uma descrição por página e sem overflow;
- a página 404 e os redirecionamentos legados;
- a assinatura e a cor do símbolo;
- o favicon;
- o menu mobile e a navegação;
- as abas e as etapas;
- o formulário sem sucesso falso;
- o movimento reduzido;
- axe WCAG 2.2 A/AA nas 7 rotas;
- V2.2: indicador do toggle contido no trilho, âncoras dos conectores sobre
  as bordas (e recálculo ao mudar a largura), `Select` por mouse e teclado,
  nós da arquitetura compacta sem sobreposição, matriz (posição pelos
  valores, seleção e detalhe), texto do rodapé, cursor, header compacto
  (histerese, sem deslocamento, retorno, troca de rota, âncoras, menu
  mobile, movimento reduzido) e WhatsApp (todas as rotas, número e mensagem
  corretos, nome acessível, teclado, sem sobreposição no mobile).

Não há testes unitários nem testes com leitores de tela reais.

## 7. GitHub

- **CI:** `.github/workflows/ci.yml`, em PRs e pushes na `main`. Job 1 roda
  lint, typecheck e build; job 2 roda os testes de fumaça.
  Permissões de leitura, actions fixadas por SHA.
- **Política:** nada direto na `main`. Branch, PR, CI verde e merge commit.
  Conventional Commits, sem atribuições automáticas (`.claude/settings.json`).
- **PRs relevantes:**
  - #1 redesign v2.1, assinatura, CI (merge `72bbdb9`).
  - #2 encerramento: cor oficial, publicação e documentação.
- A proteção de branch não estava disponível quando o repositório era privado
  no plano gratuito; reavaliar agora que é público.

## 8. Publicação

Ver `docs/deployment/GITHUB_PAGES.md`.

- **Resumo:** Pages com fonte GitHub Actions e `deploy.yml` manual a partir da `main`.
- **Build:** `base` `/Theasy/`, com `VITE_SITE_URL` definido no workflow.
- **Homologação:** commit publicado mais impressão digital dos assets.

## 9. Decisões históricas

1. **Site ONEB substituído.** Tinha tema escuro genérico, métricas, cases e
   depoimentos inventados, e um formulário que simulava sucesso. Todo o conteúdo
   fictício foi removido.
2. **v1 "Caderno de decisão" reprovada.** Comunicava filosofia em vez de
   oferta, dependia de tipografia gigante e de galerias de fotos.
3. **v2 escolhida.** Entre Enterprise Systems, Connected Intelligence e Modern
   Technology Consultancy, venceu Connected Intelligence em base clara, com
   interfaces plausíveis e clareza consultiva.
4. **v2.1.** Adicionou profundidade, demos completas, seções 03 a 07 reconstruídas,
   fotos reais de áreas e setores, curvas suaves e ausência de amarelo.
5. **Marca:** assinatura "Your data analytics" e cor oficial `#5D3BDA`.
   Repositório renomeado para `Theasy`.
6. **Publicação:** manual; o deploy automático a cada push foi desativado.
7. **Publicação do benchmark:** capturas de sites de terceiros não são
   publicadas no repositório público. Ficam com o responsável e no histórico Git.

## 10. Pendências

**Resolvidas:** redesign, identidade, cor oficial, CI, auditorias,
publicação no Pages, documentação e handoff.

**Impeditivas (só para o formulário):** serviço de recebimento do
formulário (`VITE_CONTACT_ENDPOINT`) com um envio real validado. Enquanto
isso, o site informa que a mensagem não foi enviada. O WhatsApp comercial
já funciona como canal direto e não depende dessa configuração.

**Não impeditivas:**

- arquivo vetorial oficial do logotipo;
- `og-image.png` (1200 × 630);
- dados institucionais (razão social, CNPJ, endereço) e revisão jurídica da página de privacidade;
- email de contato público;
- 7 alertas moderados só em ferramentas de desenvolvimento (`minimatch`);
- código legado sem uso em `src/content/problems.ts`;
- `z.string().email()` em desuso no zod 4.

**Futuras melhorias:**

- domínio próprio (publicar na raiz);
- pré renderização das rotas para SEO;
- carregar as demos sob demanda;
- proteção de branch na `main`.

## 11. Continuidade

- Leia `CLAUDE.md` antes de qualquer alteração.
- Mudanças de conteúdo vão em `src/content/`. Mudanças visuais exigem pedido
  explícito, porque o design está aprovado.
- Cada mudança segue o ciclo branch, PR, CI verde, merge e deploy manual.
- Não mude o `base`, o roteamento ou o `404.html` sem testar o acesso direto às
  rotas em produção.

## 12. Recuperação

```bash
git clone https://github.com/EvanilsonFreitas/Theasy.git
cd Theasy
npm ci
npx playwright install chromium
npm run lint && npm run typecheck && npm run build
npm run test:smoke
npm run dev
```

Requisitos: Node.js 22 (o CI usa 22; o Vite 8 exige 20.19 ou mais recente) e Git.
Variáveis locais opcionais: copie `.env.example` para `.env.local`.

O canvas de design no Claude Design é privado da conta de origem e não é
acessível por outras contas. As fontes dos protótipos estão exportadas em
`docs/design/prototypes/`.
