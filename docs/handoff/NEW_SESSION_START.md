# Iniciar uma nova sessão do Claude Code

Use este prompt na primeira mensagem de uma sessão nova, aberta na raiz de
um clone do repositório. Ele não depende de nenhuma conversa anterior.

```text
Você está retomando o projeto ThEasy (site institucional) a partir apenas
deste repositório. Não altere nenhum arquivo nem execute comandos que mudem
o estado do repositório até eu fazer uma solicitação nova.

1. Leia CLAUDE.md.
2. Leia docs/handoff/PROJECT_HANDOFF.md.
3. Consulte DESIGN.md (direção aprovada no topo e seção 13).
4. Consulte docs/deployment/GITHUB_PAGES.md.
5. Verifique o estado Git: branch atual, git status, git log -5 da main e
   se a main local está sincronizada com origin/main.
6. Identifique as pendências registradas no handoff (seção 10).
7. Resuma em até 15 linhas: projeto e objetivo, arquitetura, identidade,
   funcionalidades, estado de produção, última frente concluída, política de
   Git, como rodar os testes, como publicar e pendências conhecidas.
   Aponte qualquer divergência entre os documentos e o estado real.
8. Aguarde minha próxima solicitação.
```

## Conferência rápida

A resposta esperada deve coincidir com a seção 1 do handoff:

- ThEasy, assinatura "Your data analytics", cor `#5D3BDA`;
- React 19, Vite 8, Tailwind v4, publicado no GitHub Pages em
  https://evanilsonfreitas.github.io/Theasy/;
- última frente: V2.2 (PR #3);
- WhatsApp operacional, formulário tradicional pendente;
- 48 testes de fumaça; deploy manual por `deploy.yml`.

Se algo divergir, o estado real do repositório (código, `git log`, Actions)
prevalece sobre o texto; corrija a documentação por PR.
