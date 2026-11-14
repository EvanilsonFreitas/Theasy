import { Link } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { primaryNav, site, whatsapp } from '@/content/site'
import { WhatsAppIcon } from '@/components/contact/WhatsAppIcon'
import { solutions } from '@/content/solutions'
import { Star } from '@/components/system/Star'

const LAYERS = ['Fontes', 'Integração', 'Base', 'Aplicações', 'Decisão']

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-paper">
      <div className="frame border-rule grid gap-12 border-t pt-14 pb-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
        <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
          <Link
            to="/"
            aria-label="ThEasy, página inicial"
            className="self-start"
          >
            <Logo size="lg" tagline />
          </Link>
          <p className="text-ink-2 max-w-[24em]">{site.tagline}</p>
          <a
            href={whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            data-whatsapp-link="footer"
            className="group inline-flex min-h-10 items-center gap-2.5 self-start hover:text-purple-600"
          >
            <span className="bg-brand flex size-7 items-center justify-center rounded-full text-white">
              <WhatsAppIcon className="size-3.5" />
            </span>
            <span>
              WhatsApp{' '}
              <span className="text-ink-2 group-hover:text-purple-600">
                {whatsapp.display}
              </span>
              <span className="sr-only"> (abre em nova aba)</span>
            </span>
          </a>
          <ol
            className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1"
            aria-label="Arquitetura de uma solução ThEasy"
          >
            {LAYERS.map((l, i) => (
              <li
                key={l}
                className="type-mono text-ink-3 flex items-center gap-2.5 text-[10.5px]"
              >
                {i === LAYERS.length - 1 ? (
                  <span className="flex items-center gap-1.5 text-purple-600">
                    <Star size={9} />
                    {l}
                  </span>
                ) : (
                  l
                )}
                {i < LAYERS.length - 1 && (
                  <span aria-hidden="true" className="text-purple-500">
                    →
                  </span>
                )}
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
      <div className="frame border-rule text-ink-3 flex flex-wrap justify-between gap-4 border-t pt-6 pb-24 text-sm">
        <p>© {year} ThEasy. Todos os direitos reservados.</p>
        <p>Consultoria em dados, tecnologia e gestão</p>
      </div>
    </footer>
  )
}
