# ThEasy · site institucional

**THEASY · Your data analytics**

Site institucional da ThEasy, consultoria em dados, tecnologia e gestão: BI e
Analytics (Power BI), engenharia de dados, sistemas sob medida, automação de
processos e consultoria financeira e de gestão (controladoria, custos, preço
e rentabilidade).

Produção: **https://evanilsonfreitas.github.io/Theasy/** (GitHub Pages),
versão V2.2. Contato direto pelo WhatsApp comercial (+55 (11) 96463-9228);
o formulário tradicional ainda não tem serviço de recebimento e informa isso
ao visitante.

## Documentação

- [CLAUDE.md](./CLAUDE.md): porta de entrada e regras para sessões do Claude Code.
- [docs/handoff/NEW_SESSION_START.md](./docs/handoff/NEW_SESSION_START.md):
  prompt para iniciar uma nova sessão a partir do repositório.
- [docs/handoff/PROJECT_HANDOFF.md](./docs/handoff/PROJECT_HANDOFF.md): estado,
  decisões, pendências e recuperação do projeto.
- [docs/deployment/GITHUB_PAGES.md](./docs/deployment/GITHUB_PAGES.md):
  publicação, validação e rollback.
- [DESIGN.md](./DESIGN.md): direção aprovada, decisões, validações e V2.2.
- [docs/design/benchmark-v2.md](./docs/design/benchmark-v2.md): benchmark visual.
- [docs/design/refinamento-v2.1.md](./docs/design/refinamento-v2.1.md): sistema
  visual, componentes, movimento e decisões por seção.
- [docs/design/prototypes](./docs/design/prototypes): fontes dos protótipos
  (`v1` reprovada, `v2` aprovada).
- [docs/screenshots](./docs/screenshots): capturas antes e depois.
- [docs/historico/oneb](./docs/historico/oneb): planejamento do site
  anterior (OneB), mantido só como histórico.

## Stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS v4 · React Router ·
React Hook Form + Zod · Framer Motion · Instrument Sans e IBM Plex Mono
(Fontsource).

## Começando

Node.js 22 (o CI usa 22; o Vite 8 exige 20.19 ou mais recente).

```bash
npm ci
npx playwright install chromium
npm run dev
```

| Comando              | Descrição                                     |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento                   |
| `npm run build`      | Typecheck e build de produção em `dist/`      |
| `npm run typecheck`  | Verificação de tipos                          |
| `npm run lint`       | ESLint (inclui jsx-a11y); `lint:fix` corrige  |
| `npm run test:smoke` | 48 testes de fumaça Playwright contra o build |
| `npm run format`     | Prettier; `format:check` apenas verifica      |
| `npm run preview`    | Pré-visualização do build                     |

## Configuração

Copie `.env.example` para `.env.local`:

| Variável                | Efeito                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`         | Domínio público: ativa canonical, Open Graph absoluto e `sitemap.xml`                                      |
| `VITE_CONTACT_ENDPOINT` | Endpoint que recebe o formulário (POST JSON). Sem ele, o formulário informa que a mensagem não foi enviada |

## Deploy

- **CI** ([ci.yml](./.github/workflows/ci.yml)): em PRs e pushes na `main`,
  roda lint, typecheck, build e os testes de fumaça (`npm run test:smoke`).
- **Publicação** ([deploy.yml](./.github/workflows/deploy.yml)): GitHub Pages,
  disparo **manual** depois do merge, com `base` `/Theasy/`. Procedimento em
  [docs/deployment/GITHUB_PAGES.md](./docs/deployment/GITHUB_PAGES.md).

## Conteúdo

Sem clientes, cases, números ou depoimentos inventados. Demonstrações e
situações são identificadas como demonstrativas ou ilustrativas. Fotografias:
Unsplash License, créditos em
[`public/images/CREDITOS.md`](./public/images/CREDITOS.md).
