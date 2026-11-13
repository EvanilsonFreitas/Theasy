import { Seo } from '@/components/seo/Seo'
import { Hero } from './sections/Hero'
import { Sectors } from './sections/Sectors'
import { ProblemIndex } from './sections/ProblemIndex'
import { SolutionExplorer } from './sections/SolutionExplorer'
import { ApproachRail } from './sections/ApproachRail'
import { NotSection } from './sections/NotSection'
import { ClosingCta } from './sections/ClosingCta'

export function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Sectors />
      <ProblemIndex />
      <SolutionExplorer />
      <ApproachRail />
      <NotSection />
      <ClosingCta />
    </>
  )
}
