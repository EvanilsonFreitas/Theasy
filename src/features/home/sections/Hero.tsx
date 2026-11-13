import type { CSSProperties } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { Worksheet } from '@/components/worksheet/Worksheet'
import { cases } from '@/content/cases'
import { contactCta } from '@/content/site'

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-rule border-b">
      <div className="container-page grid gap-12 pt-10 pb-14 sm:pt-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14 lg:pt-14 lg:pb-24 xl:pt-16">
        <div className="flex flex-col gap-6 xl:gap-7">
          <p className="type-mono text-ink-3">
            Consultoria e engenharia · dados, sistemas e gestão
          </p>
          <h1 id="hero-title" className="type-display" data-reveal="">
            <span className="reveal-line">
              <span>Começamos pelo</span>
            </span>
            <span className="reveal-line" style={{ '--i': 1 } as CSSProperties}>
              <span>problema.</span>
            </span>
            <span
              className="reveal-line text-ink-3"
              style={{ '--i': 2 } as CSSProperties}
            >
              <span>A tecnologia</span>
            </span>
            <span
              className="reveal-line text-ink-3"
              style={{ '--i': 3 } as CSSProperties}
            >
              <span>vem depois.</span>
            </span>
          </h1>
          <p className="type-lead text-ink-2 max-w-[33em]">
            A ThEasy entende o desafio da sua operação antes de recomendar
            qualquer ferramenta. Depois, constrói o que for preciso: indicadores
            confiáveis, dados organizados, sistemas sob medida, automações e
            análises de custo e preço que sustentam decisões.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink to={contactCta.to} arrow>
              {contactCta.label}
            </ButtonLink>
            <ButtonLink to="/#problemas" variant="secondary">
              Ver problemas que resolvemos
            </ButtonLink>
          </div>
        </div>

        <div className="lg:pt-2">
          <Worksheet data={cases[0]} autoPlay />
        </div>
      </div>
    </section>
  )
}
