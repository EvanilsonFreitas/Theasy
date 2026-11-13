import { useRef, type CSSProperties } from 'react'
import { m, useScroll, useSpring } from 'framer-motion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/Button'
import { approach } from '@/content/approach'
import { stepIcons } from '@/content/icons'
import { IconMark } from '@/components/ui/IconMark'

/**
 * Abordagem em cinco etapas, em fundo tinta. A linha do trilho é desenhada
 * conforme a seção atravessa a viewport (scroll-linked, sem sequestrar o
 * scroll). Com movimento reduzido a linha aparece completa.
 */
export function ApproachRail() {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 55%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section
      id="abordagem"
      aria-labelledby="abordagem-title"
      className="on-ink bg-ink text-on-ink py-16 sm:py-24 lg:py-32"
    >
      <div className="container-page">
        <SectionHeader
          id="abordagem-title"
          tone="on-ink"
          label="§ 03 · Abordagem"
          title={'Entender antes\nde recomendar.'}
          intro={
            <p>
              Cada etapa termina com algo concreto nas suas mãos e com a decisão
              de seguir, ajustar ou parar.
            </p>
          }
        />

        <ol
          ref={ref}
          className="border-ink-line relative mt-14 grid gap-0 border-l pl-6 md:grid-cols-5 md:border-t md:border-l-0 md:pl-0 lg:mt-20"
        >
          <m.span
            aria-hidden="true"
            className="absolute top-[-1px] left-0 hidden h-0.5 w-full origin-left bg-purple-300 md:block"
            style={{ scaleX: progress }}
          />
          <m.span
            aria-hidden="true"
            className="absolute top-0 left-[-1px] h-full w-0.5 origin-top bg-purple-300 md:hidden"
            style={{ scaleY: progress }}
          />
          {approach.map((step, i) => (
            <li
              key={step.num}
              data-rise=""
              style={{ '--i': i } as CSSProperties}
              className="md:border-ink-line flex flex-col gap-3 py-6 md:border-r md:pt-7 md:pr-6 md:pb-2 md:pl-6 md:last:border-r-0 md:first-of-type:pl-0"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="type-mono text-purple-300">{step.num}</span>
                <IconMark icon={stepIcons[i]} tone="on-ink" size="sm" />
              </span>
              <h3 className="text-2xl font-[620] tracking-[-0.02em] [font-stretch:85%]">
                {step.name}
              </h3>
              <p className="text-on-ink-2 text-[15px] leading-normal">
                {step.summary}
              </p>
              <p className="text-on-ink-3 mt-auto pt-2 text-[13px] leading-snug">
                <span className="type-mono block text-[11px]">Você recebe</span>
                {step.output}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <ButtonLink to="/abordagem" variant="on-ink" arrow>
            Ver a abordagem em detalhe
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
