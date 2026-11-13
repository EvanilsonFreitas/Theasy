import { Link } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { primaryNav, site } from '@/content/site'
import { solutions } from '@/content/solutions'
import { STAGES } from '@/content/stages'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-ink bg-paper border-t">
      <div className="container-page grid gap-12 pt-14 pb-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-8">
        <div className="flex flex-col gap-5">
          <Link
            to="/"
            aria-label="ThEasy, página inicial"
            className="self-start"
          >
            <Logo size="lg" tagline />
          </Link>
          <p className="text-ink-2 max-w-[24em]">{site.tagline}</p>
          <ol
            className="mt-2 flex flex-wrap gap-x-3 gap-y-1"
            aria-label="Como trabalhamos"
          >
            {STAGES.map((s, i) => (
              <li
                key={s}
                className="type-mono text-ink-3 flex items-center gap-3"
              >
                <span
                  className={
                    i === STAGES.length - 1 ? 'text-purple-600' : undefined
                  }
                >
                  0{i + 1} {s}
                </span>
                {i < STAGES.length - 1 && <span aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </div>

        <nav aria-labelledby="footer-sol">
          <p id="footer-sol" className="type-mono text-ink-3 mb-4">
            Soluções
          </p>
          <ul className="grid gap-1">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/solucoes#${s.slug}`}
                  className="inline-flex min-h-10 items-center hover:text-purple-600"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-co">
          <p id="footer-co" className="type-mono text-ink-3 mb-4">
            Empresa
          </p>
          <ul className="grid gap-1">
            {[
              ...primaryNav.filter((n) => n.to !== '/solucoes'),
              { to: '/contato', label: 'Contato' },
            ].map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className="inline-flex min-h-10 items-center hover:text-purple-600"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/privacidade"
                className="inline-flex min-h-10 items-center hover:text-purple-600"
              >
                Privacidade
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-page border-rule text-ink-3 flex flex-wrap justify-between gap-4 border-t py-6 text-sm">
        <p>© {year} ThEasy</p>
        <p>Consultoria em dados, sistemas e gestão</p>
      </div>
    </footer>
  )
}
