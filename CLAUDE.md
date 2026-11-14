# CLAUDE.md · ThEasy

Instruções do projeto para sessões do Claude Code. Contexto completo em
[docs/handoff/PROJECT_HANDOFF.md](docs/handoff/PROJECT_HANDOFF.md).

## Produto

Site institucional da **ThEasy**, consultoria em dados, tecnologia e gestão.
Assinatura da marca: **THEASY · Your data analytics** (texto exato, com "Your"
em maiúscula e "data analytics" em minúsculas).

Competências apresentadas: BI e Analytics (Power BI), engenharia de dados,
sistemas sob medida, automação de processos e consultoria financeira e de
gestão (controladoria, custos, precificação, rentabilidade).

## Estado

- Redesign **v2.1 "Arquitetura conectada" aprovado e encerrado**. Não reabrir
  conceito, layout, identidade ou animações sem pedido explícito.
- Publicado em GitHub Pages: https://evanilsonfreitas.github.io/Theasy/
- Polimento **V2.2** (componentes, header compacto no scroll e WhatsApp
  comercial) registrado em `DESIGN.md` (seção 13).
- Formulário de contato sem serviço de recebimento configurado: informa que a
  mensagem **não** foi enviada. Nunca simular sucesso.
- WhatsApp comercial ativo: +55 (11) 96463-9228. Fonte única em
  `src/content/site.ts` (`whatsapp`); não duplicar número ou mensagem.

## Stack

React 19 · TypeScript strict · Vite 8 · Tailwind CSS v4 (CSS first, tokens em
`src/index.css`) · React Router 7 · framer-motion (`LazyMotion` + `m`) ·
react-hook-form + zod · Instrument Sans e IBM Plex Mono (Fontsource) ·
Playwright + axe-core (testes de fumaça).

## Estrutura

- `src/content/`: todo o texto e dados tipados (serviços, cenários, áreas, etapas).
- `src/components/system/`: gramática visual (mapa, estrela, glifos, seções, `PageHero`).
- `src/components/demos/`: as cinco demonstrações interativas.
- `src/components/{scenario,process,areas}/`: seções reutilizadas na home e nas páginas.
- `src/components/brand/Logo.tsx`: símbolo e assinatura (componente único,
  com estado `compact` usado pelo header).
- `src/components/ui/Select.tsx`: seletor acessível do design system (não
  usar `<select>` nativo nas demos).
- `src/components/contact/`: botão flutuante e glifo do WhatsApp.
- `src/features/`: páginas. `src/routes/index.tsx`: rotas e redirecionamentos legados.
- `e2e/smoke.spec.ts`: testes de fumaça. `docs/`: design, deploy e handoff.

## Comandos

```bash
npm ci                # instalação reproduzível (Node 22 no CI)
npm run dev           # desenvolvimento (porta 5173)
npm run lint          # ESLint com jsx-a11y
npm run typecheck     # tsc -b
npm run build         # typecheck + build em dist/
npx playwright install chromium   # uma vez por máquina
npm run test:smoke    # Playwright contra o build (rode npm run build antes)
```

## Regras

- **Git:** nunca push direto na `main`. Trabalhe em branch, abra PR, espere o
  CI (`.github/workflows/ci.yml`) verde e faça merge commit. Conventional
  Commits. Não reescrever histórico da `main`; não excluir branches de segurança.
- **Atribuição:** `.claude/settings.json` desativa atribuições automáticas em
  commits e PRs. Não adicionar trailers ou rodapés de ferramentas.
- **Deploy:** somente manual (`deploy.yml`, `workflow_dispatch`), depois do
  merge na `main`. Procedimento em
  [docs/deployment/GITHUB_PAGES.md](docs/deployment/GITHUB_PAGES.md).
- **Segurança:** nada de secrets no repositório. Variáveis `VITE_*` vão para o
  JavaScript público. `.env` e `.env.*` são ignorados (só `.env.example` é versionado).
- **Conteúdo:** sem clientes, números, cases, depoimentos ou certificações
  inventados. Números de demonstração sempre rotulados como demonstrativos.
  Textos visíveis sem travessões ou hífens decorativos. Sem amarelo na interface.
- **Identidade:** roxo oficial `#5D3BDA` (token `brand`/`purple-600`). Tons
  auxiliares (`purple-300`, `purple-500`) só em gráficos e efeitos. Não alterar
  a geometria do símbolo nem a estrela central. Detalhes em
  [docs/design/refinamento-v2.1.md](docs/design/refinamento-v2.1.md).
- **Acessibilidade:** manter WCAG 2.2 AA, `prefers-reduced-motion`, teclado e
  alvos de 24 px ou mais. Os testes de fumaça rodam axe em todas as rotas.
- **GitHub Pages:** `base` `/Theasy/` só quando `GITHUB_PAGES=true`; links e
  assets usam `import.meta.env.BASE_URL` (`asset()` em `src/lib/utils.ts`).

## Documentação

`README.md` (visão geral) · `DESIGN.md` (decisões e validações) ·
`docs/design/` (benchmark, refinamento, protótipos) ·
`docs/deployment/GITHUB_PAGES.md` · `docs/handoff/PROJECT_HANDOFF.md`.
