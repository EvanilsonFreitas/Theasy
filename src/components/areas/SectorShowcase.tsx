import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { sectors } from '@/content/contexts'
import { Photo } from '@/components/ui/Photo'
import { cn } from '@/lib/utils'

const EASE = [0.2, 0.8, 0.2, 1] as const

/**
 * Setores com fotografia real: a lista à direita troca a foto e os
 * desafios típicos do setor. Não é lista de clientes: mostra onde os
 * mesmos tipos de problema aparecem.
 */
export function SectorShowcase() {
  const [active, setActive] = useState(0)
  const s = sectors[active]

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <figure className="e2 bg-ink relative m-0 overflow-hidden rounded-2xl">
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            key={s.slug}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Photo
              name={s.image}
              alt={s.alt}
              ratio="3/2"
              sizes="(min-width: 1024px) 720px, 100vw"
              className="aspect-[3/2] lg:aspect-[16/10]"
            />
          </m.div>
        </AnimatePresence>
        <figcaption className="from-ink/90 via-ink/50 text-on-ink absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t to-transparent px-5 pt-16 pb-4 sm:px-6 sm:pb-5">
          <span className="type-mono text-on-ink-2 text-[9.5px]">
            Fotografia ilustrativa · {s.name}
          </span>
          <span
            aria-live="polite"
            className="max-w-[34em] text-[15px] leading-snug sm:text-[17px]"
          >
            {s.challenges}
          </span>
        </figcaption>
      </figure>

      <div className="border-rule bg-paper flex flex-col gap-3 rounded-2xl border p-4 sm:p-5">
        <p className="type-mono text-ink-3 px-1">
          Setores em que esses problemas aparecem
        </p>
        <div
          role="group"
          aria-label="Setor"
          className="xs:grid-cols-2 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-2"
        >
          {sectors.map((sec, i) => {
            const on = i === active
            return (
              <div key={sec.slug}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group flex w-full items-center gap-2.5 rounded-xl border p-1.5 pr-2.5 text-left transition-[border-color,box-shadow,background-color] duration-200',
                    on
                      ? 'e3 bg-paper border-purple-600'
                      : 'border-rule hover:border-line hover:bg-page',
                  )}
                >
                  <span className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                    <Photo
                      name={sec.image}
                      alt=""
                      ratio="3/2"
                      sizes="88px"
                      className={cn(
                        'size-full transition-[filter] duration-300',
                        on ? '' : 'grayscale-[60%] group-hover:grayscale-0',
                      )}
                    />
                  </span>
                  <span className="text-[13.5px] leading-tight font-semibold">
                    {sec.name}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
        <p className="text-ink-2 mt-auto px-1 pt-1 text-[13.5px]">
          O problema muda de nome entre setores; a lógica de solução se repete.
        </p>
      </div>
    </div>
  )
}
