import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { areaPhotos, contexts, serviceTag } from '@/content/contexts'
import { AreaGlyph } from '@/components/system/Glyphs'
import { Photo } from '@/components/ui/Photo'
import { cn } from '@/lib/utils'
import { AreaIllustration } from './AreaIllustration'
import { SectorShowcase } from './SectorShowcase'

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Onde atuamos: seis áreas compactas à esquerda; a área escolhida abre um
 * painel de destaque com a aplicação representativa, desafios típicos,
 * frentes envolvidas e uma ilustração técnica própria.
 */
export function AreaExplorer({
  showSectors = true,
}: {
  showSectors?: boolean
}) {
  const [active, setActive] = useState(0)
  const a = contexts[active]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div
          role="group"
          aria-label="Área da empresa"
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-2"
        >
          {contexts.map((c, i) => {
            const on = i === active
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(i)}
                className={cn(
                  'group flex flex-col items-start gap-2.5 rounded-xl border p-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200 sm:p-4',
                  on
                    ? 'e3 bg-paper border-purple-600'
                    : 'border-rule bg-paper hover:border-line hover:bg-page',
                )}
              >
                <AreaGlyph
                  area={c.key}
                  className={cn(
                    'transition-colors',
                    on
                      ? 'text-purple-600'
                      : 'text-purple-500/70 group-hover:text-purple-500',
                  )}
                />
                <span className="text-[14.5px] leading-snug font-semibold">
                  {c.name}
                </span>
                <span className="text-ink-2 text-[12.5px] leading-snug">
                  {c.text}
                </span>
              </button>
            )
          })}
        </div>

        <div aria-live="polite" className="stage overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={a.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26, ease: EASE }}
              className="flex h-full flex-col"
            >
              <figure className="relative m-0 overflow-hidden">
                <Photo
                  name={areaPhotos[a.key].image}
                  alt={areaPhotos[a.key].alt}
                  ratio="16/9"
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="aspect-[16/7] sm:aspect-[16/6]"
                />
                <figcaption className="type-mono bg-ink/70 text-on-ink absolute right-3 bottom-2.5 rounded px-1.5 py-0.5 text-[9px]">
                  Fotografia ilustrativa
                </figcaption>
              </figure>
              <div className="grid flex-1 gap-6 p-5 sm:p-7 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <p className="type-mono text-purple-600">
                    Aplicação representativa
                  </p>
                  <h3 className="type-h3">{a.name}</h3>
                  <p className="text-ink-2 text-[14.5px] leading-relaxed">
                    {a.lead}
                  </p>
                  <ul className="flex flex-col gap-1.5 text-[13.5px]">
                    {a.challenges.map((ch) => (
                      <li key={ch} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="bg-warn mt-[7px] size-1.5 shrink-0 rounded-full"
                        />
                        {ch}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-2">
                    {a.services.map((s) => (
                      <span
                        key={s}
                        className="type-mono bracket-sm bg-purple-50 px-2 py-1 text-[9.5px] text-purple-700"
                      >
                        {serviceTag[s]}
                      </span>
                    ))}
                    {a.scenario && (
                      <Link
                        to={`/aplicacoes?area=${a.scenario}`}
                        className="decoration-line ml-auto inline-flex min-h-11 items-center gap-1.5 text-[13.5px] font-[560] underline underline-offset-4 hover:text-purple-600"
                      >
                        Ver a situação <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="win e2 border-line self-center rounded-xl border p-3">
                  <AreaIllustration area={a.key} />
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {showSectors && <SectorShowcase />}
    </div>
  )
}
