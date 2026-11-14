# Publicação no GitHub Pages

## Resumo

| Item                  | Valor                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------- |
| URL pública           | https://evanilsonfreitas.github.io/Theasy/                                                                     |
| Repositório           | https://github.com/EvanilsonFreitas/Theasy (público)                                                           |
| Branch de origem      | `main`                                                                                                         |
| Fonte do Pages        | GitHub Actions (`build_type: workflow`)                                                                        |
| Workflow              | [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml), **somente manual** (`workflow_dispatch`) |
| Ambiente              | `github-pages` (branches permitidas: `main` e `feat/theasy-redesign`)                                          |
| Base path             | `/Theasy/` (definido quando `GITHUB_PAGES=true`, em `vite.config.ts`)                                          |
| Domínio personalizado | nenhum (sem CNAME)                                                                                             |
| HTTPS                 | ativo e forçado pelo GitHub (`*.github.io`)                                                                    |

O CI (`.github/workflows/ci.yml`) roda em pull requests e pushes na `main`,
mas **não publica**. A publicação é sempre uma ação manual depois do merge.

## Variáveis de build

Somente nomes e finalidades. Variáveis `VITE_*` ficam visíveis no JavaScript
entregue ao navegador: nunca use secrets nelas.

| Variável                | Onde               | Finalidade                                                                                                 |
| ----------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `GITHUB_PAGES`          | `deploy.yml`       | Ativa o `base` `/Theasy/`                                                                                  |
| `VITE_SITE_URL`         | `deploy.yml`       | URL pública sem barra final. Gera canonical, `og:url` e `sitemap.xml`                                      |
| `VITE_CONTACT_ENDPOINT` | ainda não definida | Endpoint que recebe o formulário (POST JSON). Sem ela, o formulário informa que a mensagem não foi enviada |

Para ativar o formulário: contrate ou configure um serviço que aceite POST
JSON de origem pública (por exemplo Formspree, Getform ou uma função própria),
adicione `VITE_CONTACT_ENDPOINT` ao passo de build do `deploy.yml` (via PR) e
valide um envio real antes de anunciar o canal.

## Procedimento de deploy

1. Garanta que a mudança foi integrada à `main` por PR com CI verde.
2. Actions → **Deploy to GitHub Pages** → **Run workflow** → branch `main`.
   Pela CLI: `gh workflow run deploy.yml --ref main`.
3. Aguarde os jobs `build` (lint, typecheck, build) e `deploy`.
4. Valide conforme a seção abaixo.

## Validação após o deploy

1. Confirme o commit publicado: Actions → execução do deploy (campo do commit)
   ou `gh api repos/EvanilsonFreitas/Theasy/deployments -q '.[0].sha'`.
2. Compare a impressão digital do build: o nome do arquivo
   `assets/index-<hash>.js` referenciado em
   https://evanilsonfreitas.github.io/Theasy/ deve ser igual ao gerado por
   `GITHUB_PAGES=true VITE_SITE_URL=https://evanilsonfreitas.github.io/Theasy npm run build`
   no mesmo commit.
3. Rode os testes de fumaça contra o build local (`npm run test:smoke`) e
   confira em produção, nas larguras 390, 768, 1024, 1440 e 1920 px:
   - home e todas as rotas, incluindo **acesso direto e refresh** de
     `/Theasy/solucoes`, `/Theasy/aplicacoes`, `/Theasy/abordagem`,
     `/Theasy/sobre`, `/Theasy/contato` e `/Theasy/privacidade`;
   - assinatura "Your data analytics", favicon e menu mobile;
   - console sem erros e nenhum asset respondendo 404;
   - `robots.txt` e `sitemap.xml` em `/Theasy/`.

## Rollback

- **Preferencial:** reverta a mudança na `main` por PR (`git revert`), espere
  o CI verde, faça o merge e execute o deploy novamente.
- **Emergência:** em Actions, abra uma execução anterior e bem sucedida do
  **Deploy to GitHub Pages** e use **Re-run all jobs**. A reexecução usa o
  commit original daquela execução e republica a versão anterior. Depois,
  alinhe a `main` por PR.

## Roteamento e restrições da hospedagem estática

- GitHub Pages não tem reescrita de rotas. Um acesso direto a uma rota
  interna recebe `public/404.html` (status HTTP 404), que redireciona para
  `index.html` com o caminho codificado; o script em `index.html` restaura a
  URL e o React Router renderiza a página. Para o usuário a navegação é normal;
  para robôs, a resposta inicial dessas URLs é 404. Mitigação: sitemap com as
  URLs canônicas e, no futuro, pré renderização ou hospedagem com reescrita.
- `robots.txt` só é lido na raiz do domínio (`evanilsonfreitas.github.io`);
  em um site de projeto o arquivo em `/Theasy/` não tem efeito. Use o
  `sitemap.xml` no Google Search Console.
- Não há servidor: o formulário depende de um serviço externo
  (`VITE_CONTACT_ENDPOINT`).
- Sem imagem de compartilhamento (`og:image`) até existir `og-image.png`
  (1200 × 630). A tag só deve ser reativada em `Seo.tsx` com o arquivo publicado.

## Erros frequentes

| Sintoma                               | Causa                                              | Correção                                                    |
| ------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------- |
| Página em branco e `src/main.tsx` 404 | Pages em modo legado (publicando a branch)         | Settings → Pages → Source: **GitHub Actions** e novo deploy |
| Assets 404 com caminho sem `/Theasy/` | Build sem `GITHUB_PAGES=true`                      | Publicar só pelo `deploy.yml`                               |
| Deploy recusado pelo ambiente         | Branch fora da política do ambiente `github-pages` | Publicar a partir da `main`                                 |
| Canonical ausente                     | `VITE_SITE_URL` não definida no build              | Conferir o passo de build do `deploy.yml`                   |
| Domínio personalizado configurado     | `base` `/Theasy/` deixa de valer                   | Publicar na raiz (`base: '/'`) e ajustar `VITE_SITE_URL`    |

## Dependências externas

Nenhuma em tempo de execução: fontes e imagens são servidas pelo próprio site
(Fontsource e WebP locais). Fotografias sob Unsplash License
(`public/images/CREDITOS.md`).

## Histórico de publicação

- Até 17/07/2026: site anterior (ONEB), publicado de `main` (`48ef679`).
- 14/11/2026: o Pages estava em modo legado publicando o código fonte (página
  em branco). A fonte foi trocada para GitHub Actions e a versão aprovada
  `72bbdb9` foi publicada pela execução
  https://github.com/EvanilsonFreitas/Theasy/actions/runs/43549168656.
- Implantações seguintes: Settings → Environments → `github-pages` ou
  https://github.com/EvanilsonFreitas/Theasy/deployments.
