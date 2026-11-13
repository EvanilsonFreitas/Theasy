# ThEasy · site institucional

Site da **ThEasy**, consultoria em dados, sistemas e gestão: BI e Analytics,
Dados e Engenharia, Sistemas sob medida, Automação de processos e Consultoria
de negócios (controladoria, custos, preço e rentabilidade).

> Repositório herdado do site da ONEB (nome anterior). O nome técnico do
> repositório e o caminho de deploy `/oneb-website/` foram mantidos.

Decisões de design, sistema visual, movimento, arquitetura e pendências:
**[DESIGN.md](./DESIGN.md)**. Os artboards do Claude Design estão em
[`docs/design/claude-design`](./docs/design/claude-design). A documentação em
`docs/01` a `docs/06` descreve a fase ONEB e é mantida como histórico.

## Stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS v4 · React Router ·
React Hook Form + Zod · Framer Motion · Archivo Variable e IBM Plex Mono
(Fontsource) · Lucide.

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

| Variável                | Efeito                                                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_URL`         | Domínio público: ativa canonical, Open Graph absoluto e `sitemap.xml`                                                      |
| `VITE_CONTACT_ENDPOINT` | Endpoint que recebe o formulário (POST JSON). Sem ele o formulário informa que o envio não está ativo e não simula sucesso |

## Deploy

GitHub Pages via GitHub Actions a cada push em `main`
([workflow](./.github/workflows/deploy.yml)): lint, typecheck, build e
publicação. O `public/404.html` mantém o roteamento client side funcionando
em links diretos.

## Conteúdo

Nada de clientes, cases, números ou depoimentos inventados. Os casos da
página Aplicações e da folha de trabalho são **ilustrativos** e identificados
como tais. Fotografias: Unsplash License, créditos em
[`public/images/CREDITOS.md`](./public/images/CREDITOS.md).
