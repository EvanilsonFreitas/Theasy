import type { CSSProperties } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Photo } from '@/components/ui/Photo'
import { IconMark } from '@/components/ui/IconMark'
import { sectors } from '@/content/sectors'
import { sectorIcons } from '@/content/icons'

/**
 * Segmentos: fotografia real + o tipo de desafio que costuma aparecer.
 * Não afirma carteira de clientes; mostra que o método vale para todos.
 */
export function Sectors() {
  return (
    <section
      aria-labelledby="setores-title"
      className="border-rule border-b py-16 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeader
          id="setores-title"
          label="§ 01 · Onde os problemas aparecem"
          title={'Os desafios mudam\nde nome. A lógica\nse repete.'}
          intro={
            <p>
              Margem, custo, prazo e retrabalho aparecem em qualquer segmento.
              Por isso partimos do problema de cada operação, e não de um pacote
              pronto para um setor.
            </p>
          }
        />

        <ul className="mt-12 grid grid-cols-2 gap-x-3 gap-y-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <li
              key={s.slug}
              data-rise=""
              style={{ '--i': i % 3 } as CSSProperties}
              className="group min-w-0"
            >
              <figure className="m-0 flex h-full flex-col">
                <div className="bg-paper-2 relative overflow-hidden">
                  <Photo
                    name={s.image}
                    alt={s.alt}
                    ratio="3/2"
                    sizes="(min-width: 1024px) 400px, 50vw"
                    className="ease-out-quart aspect-[3/2] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="type-mono bg-paper text-ink absolute top-0 left-0 px-2.5 py-1.5">
                    0{i + 1}
                  </span>
                </div>
                <figcaption className="border-rule flex items-start gap-3 border-b pt-3 pb-4 sm:pt-4 sm:pb-5">
                  <IconMark
                    icon={sectorIcons[s.slug]}
                    size="sm"
                    className="hidden sm:inline-flex"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="text-[1.0625rem] leading-tight font-[620] tracking-[-0.015em] [font-stretch:88%] sm:text-xl">
                      {s.name}
                    </span>
                    <span className="text-ink-2 text-[13px] leading-snug sm:text-[15px]">
                      {s.challenges}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="type-mono text-ink-3 mt-6 tracking-normal normal-case">
          Fotografias ilustrativas de segmentos.
        </p>
      </div>
    </section>
  )
}
