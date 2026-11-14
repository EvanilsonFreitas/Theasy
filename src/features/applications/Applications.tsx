import { useSearchParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { PageHero } from '@/components/system/PageHero'
import { Section, SectionHead } from '@/components/system/Section'
import { Transformation } from '@/components/scenario/Transformation'
import { AreaExplorer } from '@/components/areas/AreaExplorer'
import { scenarios } from '@/content/scenarios'

export function Applications() {
  const [params, setParams] = useSearchParams()
  // A URL é a fonte da verdade da área escolhida (links compartilháveis).
  const index = Math.max(
    0,
    scenarios.findIndex((s) => s.slug === params.get('area')),
  )
  const sc = scenarios[index]

  const choose = (i: number) =>
    setParams(
      { area: scenarios[i].slug },
      { replace: true, preventScrollReset: true },
    )

  return (
    <>
      <Seo
        title="Aplicações"
        description="Como dados, BI, sistemas, automação e consultoria se aplicam às áreas financeira, de operações, comercial, de logística e de gestão, com situações ilustrativas."
      />
      <PageHero
        id="aplicacoes-title"
        label="Aplicações"
        title="Problemas comuns, resolvidos com estrutura."
        intro={
          <p>
            Situações ilustrativas, compostas a partir de problemas que aparecem
            em empresas de vários setores. Para cada uma: como costuma ser hoje,
            como a ThEasy intervém e o que passa a ser possível decidir.
          </p>
        }
        aside={
          sc.image && (
            <figure className="e2 relative m-0 overflow-hidden rounded-2xl">
              <Photo
                key={sc.image.name}
                name={sc.image.name}
                alt={sc.image.alt}
                ratio={sc.image.name.startsWith('area-') ? '16/9' : '3/2'}
                sizes="(min-width: 1024px) 520px, 100vw"
                priority
                className="animate-fade-in aspect-[4/3]"
              />
              <figcaption className="from-ink/85 text-on-ink absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t to-transparent px-4 pt-10 pb-3">
                <span className="text-[15px] font-semibold">{sc.area}</span>
                <span className="type-mono text-on-ink-2 text-[9.5px]">
                  Fotografia ilustrativa
                </span>
              </figcaption>
            </figure>
          )
        }
      />

      <Section tone="paper" labelledBy="situacoes-title">
        <SectionHead
          id="situacoes-title"
          label="Situações por área"
          title="Do contexto à decisão."
          intro={
            <p>
              Escolha uma área. O endereço da página muda junto, para você
              compartilhar a situação.
            </p>
          }
        />
        <div className="mt-10">
          <Transformation value={index} onChange={choose} />
        </div>
        <div className="border-rule mt-8 flex flex-wrap items-center gap-4 border-t pt-6">
          <p className="text-ink-2 text-[15px]">
            Reconheceu a situação {sc.phrase}?
          </p>
          <ButtonLink to={`/contato?area=${sc.slug}`} size="md" arrow>
            Conversar sobre um desafio {sc.phrase}
          </ButtonLink>
        </div>
      </Section>

      <Section labelledBy="areas-title">
        <SectionHead
          id="areas-title"
          label="Onde atuamos"
          title="As mesmas competências, em cada área da empresa."
          intro={
            <p>
              Desafios típicos por área e as frentes que costumam entrar na
              solução.
            </p>
          }
        />
        <div className="mt-10">
          <AreaExplorer />
        </div>
      </Section>
    </>
  )
}
