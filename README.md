# ThEasy · site institucional

**THEASY · Your data analytics**

Site institucional da ThEasy, consultoria em dados, tecnologia e gestão: BI e
Analytics (Power BI), engenharia de dados, sistemas sob medida, automação de
processos e consultoria financeira e de gestão (controladoria, custos, preço
e rentabilidade).

## Documentação

- [DESIGN.md](./DESIGN.md): visão geral, pendências e validação.
- [docs/design/benchmark-v2.md](./docs/design/benchmark-v2.md): benchmark visual.
- [docs/design/refinamento-v2.1.md](./docs/design/refinamento-v2.1.md): sistema
  visual, componentes, movimento e decisões por seção.
- [docs/design/prototypes](./docs/design/prototypes): fontes dos protótipos
  (`v1` reprovada, `v2` aprovada).
- [docs/screenshots](./docs/screenshots): capturas antes e depois.
- `docs/01` a `docs/06`: planejamento da fase anterior (ONEB), mantido como
  histórico.

## Stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS v4 · React Router ·
React Hook Form + Zod · Framer Motion · Instrument Sans e IBM Plex Mono
(Fontsource).

## Começando

Node.js 20 ou superior.

```bash
npm install
npm run dev
```

| Comando             | Descrição                                |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento              |
| `npm run build`     | Typecheck e build de produção em `dist/` |
| `npm run typecheck` | Verificação de tipos                     |
| `npm run lint`      | ESLint (inclui jsx-a11y)                 |
| `npm run format`    | Prettier                                 |
| `npm run preview`   | Pré-visualização do build                |

## Configuração

Copie `.env.example` para `.env.local`:

| Variável                | Efeito                                                                                                     |
| ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`         | Domínio público: ativa canonical, Open Graph absoluto e `sitemap.xml`                                      |
| `VITE_CONTACT_ENDPOINT` | Endpoint que recebe o formulário (POST JSON). Sem ele, o formulário informa que a mensagem não foi enviada |

## Deploy

GitHub Pages via GitHub Actions a cada push em `main`
([workflow](./.github/workflows/deploy.yml)): lint, typecheck, build e
publicação, com `base` `/Theasy/`. O `public/404.html` mantém o roteamento
client side em links diretos.

## Conteúdo

Sem clientes, cases, números ou depoimentos inventados. Demonstrações e
situações são identificadas como demonstrativas ou ilustrativas. Fotografias:
Unsplash License, créditos em
[`public/images/CREDITOS.md`](./public/images/CREDITOS.md).
