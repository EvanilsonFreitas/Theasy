import type { ReactNode } from 'react'
import { SectionHeader } from './SectionHeader'

/** Abertura padrão das páginas internas: rótulo, título display e introdução. */
export function PageIntro({
  label,
  title,
  intro,
  children,
}: {
  label: string
  title: string
  intro?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="border-b border-rule">
      <div className="container-page pt-12 pb-14 sm:pt-16 lg:pt-24 lg:pb-20">
        <SectionHeader
          as="h1"
          size="display"
          label={label}
          title={title}
          intro={intro}
        />
        {children}
      </div>
    </section>
  )
}
