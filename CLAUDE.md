# CLAUDE.md · ThEasy

Porta de entrada para sessões do Claude Code. Índice operacional: o detalhe
fica nos documentos linkados. Para retomar o projeto do zero, siga
[docs/handoff/NEW_SESSION_START.md](docs/handoff/NEW_SESSION_START.md).

## Identificação

- **Produto:** site institucional da **ThEasy**, consultoria em dados,
  tecnologia e gestão. Apresenta as competências e capta contatos.
- **Assinatura:** **THEASY · Your data analytics** (texto exato: "Your" com
  maiúscula, "data analytics" em minúsculas).
- **Repositório:** https://github.com/EvanilsonFreitas/Theasy (público).
- **Produção:** https://evanilsonfreitas.github.io/Theasy/ (GitHub Pages).
- **Competências:** BI e Analytics (Power BI), engenharia de dados, sistemas
  sob medida, automação de processos, consultoria financeira e de gestão.

## Estado

- **V2.2 publicada** (PR #3, merge `a1c36d1`, deploy manual em 14/11/2026).
  Direção visual v2.1 "Arquitetura conectada" **aprovada e encerrada**: não
  reabrir conceito, layout, identidade ou animações sem pedido explícito.
- **WhatsApp comercial operacional:** +55 (11) 96463-9228, fonte única em
  `src/content/site.ts` (`whatsapp`).
- **Formulário tradicional pendente:** sem `VITE_CONTACT_ENDPOINT`, informa
  que a mensagem **não** foi enviada. Nunca simular sucesso nem declarar o
  formulário operacional.
- Histórico das frentes e pendências:
  [docs/handoff/PROJECT_HANDOFF.md](docs/handoff/PROJECT_HANDOFF.md).

## Arquitetura (resumo)

React 19 · TypeScript strict · Vite 8 · Tailwind CSS v4 (CSS first, tokens em
`src/index.css`) · React Router 7 · framer-motion (`LazyMotion` + `m`) ·
react-hook-form + zod · Instrument Sans e IBM Plex Mono (Fontsource) ·
Playwright + axe-core.

| Caminho                                    | Conteúdo                                                        |
| ------------------------------------------ | --------------------------------------------------------------- |
| `src/routes/index.tsx`                     | 7 rotas, 404 e 14 redirecionamentos legados                     |
| `src/features/`                            | páginas: home, soluções, aplicações, abordagem, sobre, contato… |
| `src/content/`                             | todo o texto e dados tipados (incluindo `site.ts`)              |
| `src/components/system/`                   | gramática visual: mapa, estrela, glifos, seções, `PageHero`     |
| `src/components/demos/`                    | as cinco demonstrações interativas                              |
| `src/components/{scenario,process,areas}/` | seções reutilizadas (conectores, matriz, etapas, áreas)         |
| `src/components/brand/Logo.tsx`            | símbolo e assinatura (componente único, estado `compact`)       |
| `src/components/navigation/`               | header compacto no scroll, menu mobile, rodapé                  |
| `src/components/contact/`                  | botão flutuante e glifo do WhatsApp                             |
| `src/components/ui/Select.tsx`             | seletor acessível (não usar `<select>` nativo nas demos)        |
| `e2e/smoke.spec.ts`                        | 48 testes de fumaça (Playwright + axe)                          |

Detalhes: handoff, seção 2. Design: [DESIGN.md](DESIGN.md) e
[docs/design/refinamento-v2.1.md](docs/design/refinamento-v2.1.md).

## Comandos

```bash
npm ci                            # Node 22 (o CI usa 22)
npm run dev                       # desenvolvimento, porta 5173
npm run lint                      # ESLint com jsx-a11y
npm run typecheck                 # tsc -b
npm run build                     # typecheck + build em dist/
npx playwright install chromium   # uma vez por máquina
npm run test:smoke                # 48 testes contra o build (rode o build antes)
```

No Windows com Chrome instalado: `PW_CHANNEL=chrome npm run test:smoke`.

## Regras

- **Git:** nunca push direto na `main`. Branch curta, PR, CI verde
  (`.github/workflows/ci.yml`) e **merge commit**. Conventional Commits. Não
  reescrever o histórico da `main`, sem force push, não excluir branches de
  segurança.
- **Atribuição:** `.claude/settings.json` desativa atribuições automáticas em
  commits e PRs. Não adicionar trailers ou rodapés de ferramentas.
- **Deploy:** somente manual (`deploy.yml`, `workflow_dispatch`, branch
  `main`), depois do merge e com autorização do responsável. Procedimento em
  [docs/deployment/GITHUB_PAGES.md](docs/deployment/GITHUB_PAGES.md).
- **Segurança:** nada de secrets no repositório. Variáveis `VITE_*` vão para o
  JavaScript público. `.env` e `.env.*` são ignorados (só `.env.example` é
  versionado). Não expor nem alterar credenciais.
- **Conteúdo:** sem clientes, números, cases, depoimentos, certificações ou
  dados oficiais inventados. Números de demonstração sempre rotulados como
  demonstrativos. Textos visíveis sem travessões ou hífens decorativos. Sem
  amarelo na interface.
- **Identidade:** roxo oficial `#5D3BDA` (token `brand`/`purple-600`). Tons
  auxiliares (`purple-300`, `purple-500`) só em gráficos e efeitos. Não
  alterar a geometria do símbolo nem a estrela central.
- **Acessibilidade:** WCAG 2.2 AA, `prefers-reduced-motion`, teclado, foco
  visível, alvos de 24 px ou mais. Os testes rodam axe em todas as rotas.
- **GitHub Pages:** `base` `/Theasy/` só quando `GITHUB_PAGES=true`; links e
  assets usam `import.meta.env.BASE_URL` (`asset()` em `src/lib/utils.ts`).
  Não mudar `base`, roteamento ou `public/404.html` sem testar acesso direto
  às rotas em produção.

## Documentação

| Documento                                                              | Para quê                                                |
| ---------------------------------------------------------------------- | ------------------------------------------------------- |
| [docs/handoff/NEW_SESSION_START.md](docs/handoff/NEW_SESSION_START.md) | prompt curto para iniciar uma nova sessão               |
| [docs/handoff/PROJECT_HANDOFF.md](docs/handoff/PROJECT_HANDOFF.md)     | estado, arquitetura, histórico, pendências, recuperação |
| [DESIGN.md](DESIGN.md)                                                 | direção aprovada, decisões, validações, V2.2            |
| [docs/design/refinamento-v2.1.md](docs/design/refinamento-v2.1.md)     | sistema visual, componentes e movimento por seção       |
| [docs/deployment/GITHUB_PAGES.md](docs/deployment/GITHUB_PAGES.md)     | publicação, validação, rollback, limites do Pages       |
| [docs/README.md](docs/README.md)                                       | índice de `docs/` (protótipos, capturas, histórico)     |
| [README.md](README.md)                                                 | visão geral e primeiros passos                          |

## Retomada

1. Leia este arquivo e o handoff. 2. Confira `git status`, `git log` e o
   último deploy. 3. Não altere código sem uma solicitação nova. 4. Toda
   mudança: branch, PR, CI verde, merge commit e, se afetar o site, deploy
   manual autorizado e homologação.
