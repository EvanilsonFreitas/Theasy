import { Seo } from '@/components/seo/Seo'
import { Hero } from './sections/Hero'
import { Capabilities } from './sections/Capabilities'
import {
  AboutSection,
  ApplicationsSection,
  AreasSection,
  ProcessSection,
} from './sections/HomeSections'
import { ClosingCta } from './sections/ClosingCta'

export function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Capabilities />
      <ApplicationsSection />
      <ProcessSection />
      <AreasSection />
      <AboutSection />
      <ClosingCta />
    </>
  )
}
