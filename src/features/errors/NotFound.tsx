import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'

export function NotFound() {
  return (
    <>
      <Seo title="Página não encontrada" noindex />
      <section className="frame bg-paper flex min-h-[70vh] flex-col justify-center gap-7 py-20">
        <p className="type-mono text-ink-3">Erro 404</p>
        <h1 className="type-display max-w-[16ch]">
          Esta página não existe{' '}
          <span className="text-ink-3">ou mudou de lugar.</span>
        </h1>
        <p className="type-lead text-ink-2 max-w-[32em]">
          O site foi reorganizado. O conteúdo que você procura provavelmente
          está em uma destas páginas:
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink to="/" arrow>
            Página inicial
          </ButtonLink>
          <ButtonLink to="/solucoes" variant="secondary">
            Soluções
          </ButtonLink>
          <ButtonLink to="/contato" variant="secondary">
            Contato
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
