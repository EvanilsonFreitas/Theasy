import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { Seo } from '@/components/seo/Seo'
import { PageIntro } from '@/components/ui/PageIntro'
import { ButtonLink } from '@/components/ui/Button'
import { approach } from '@/content/approach'
import { stepIcons } from '@/content/icons'
import { IconMark } from '@/components/ui/IconMark'
import { cn } from '@/lib/utils'

/**
 * Abordagem: índice fixo à esquerda (desktop) com progresso ligado ao
 * scroll e etapas detalhadas à direita. Sem sequestro de scroll: o índice
 * só reflete a posição e permite saltar para uma etapa.
 */
export function Approach() {
  const listRef = useRef<HTMLOListElement>(null)
  const [current, setCurrent] = useState(0)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 60%', 'end 60%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })
  const reduceMotion = useReducedMotion()
  const line = reduceMotion ? 1 : progress

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('[data-step]')
    if (!items) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting)
            setCurrent(Number((en.target as HTMLElement).dataset.step))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Seo
        title="Nossa abordagem"
        description="Entender, diagnosticar, desenhar e construir, implantar e evoluir: como a ThEasy conduz projetos de dados, sistemas e gestão a partir do problema de negócio."
      />
      <PageIntro
        label="Nossa abordagem"
        title={'Entender antes\nde recomendar.'}
        intro={
          <p>
            A tecnologia certa depende de uma pergunta bem feita. Por isso cada
            projeto começa ouvindo quem vive o problema e termina com uma
            solução que a sua equipe usa e consegue manter.
          </p>
        }
      />

      <section aria-label="Etapas" className="py-16 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20">
          <nav
            aria-label="Etapas da abordagem"
            className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
          >
            <div className="border-rule relative border-l">
              <m.span
                aria-hidden="true"
                className="absolute top-0 left-[-1px] h-full w-0.5 origin-top bg-purple-600"
                style={{ scaleY: line }}
              />
              <ol>
                {approach.map((s, i) => (
                  <li key={s.num}>
                    <a
                      href={`#etapa-${s.num}`}
                      aria-current={current === i ? 'step' : undefined}
                      className={cn(
                        'flex min-h-11 items-baseline gap-3 py-2 pl-5 transition-colors duration-200',
                        current === i
                          ? 'text-ink'
                          : 'text-ink-3 hover:text-ink',
                      )}
                    >
                      <span className="type-mono">{s.num}</span>
                      <span
                        className={cn(
                          'text-lg tracking-[-0.01em] [font-stretch:88%]',
                          current === i ? 'font-[640]' : 'font-[480]',
                        )}
                      >
                        {s.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <ol ref={listRef} className="border-ink grid gap-0 border-t">
            {approach.map((s, i) => (
              <li
                key={s.num}
                id={`etapa-${s.num}`}
                data-step={i}
                className="border-rule grid scroll-mt-28 gap-6 border-b py-10 sm:py-14 md:grid-cols-[6rem_minmax(0,1fr)]"
              >
                <span
                  className="flex items-start gap-4 md:flex-col"
                  aria-hidden="true"
                >
                  <span className="type-display text-purple-600 md:text-[4.5rem]">
                    {s.num}
                  </span>
                  <IconMark icon={stepIcons[i]} size="md" />
                </span>
                <div className="grid gap-6">
                  <h2 className="type-h2">
                    <span className="sr-only">Etapa {s.num}: </span>
                    {s.name}
                  </h2>
                  <p className="type-h3 text-ink max-w-[32em]">{s.summary}</p>
                  <p className="text-ink-2 max-w-[40em] leading-relaxed">
                    {s.detail}
                  </p>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="type-mono text-ink-3 mb-3">
                        Perguntas desta etapa
                      </h3>
                      <ul className="grid gap-2 leading-snug">
                        {s.questions.map((q) => (
                          <li key={q} className="border-rule border-l-2 pl-3">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="type-mono text-ink-3 mb-3">Você recebe</h3>
                      <p className="border-l-2 border-purple-600 pl-3 leading-snug font-semibold">
                        {s.output}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-ink bg-ink text-on-ink py-16 sm:py-24">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="type-h2 max-w-[13em]">
            O primeiro passo é uma conversa.
          </p>
          <ButtonLink to="/contato" variant="on-ink" arrow>
            Conversar sobre seu desafio
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
