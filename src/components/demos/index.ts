import type { ComponentType } from 'react'
import type { SolutionSlug } from '@/content/solutions'
import { BIDemo } from './BIDemo'
import { DataDemo } from './DataDemo'
import { SystemDemo } from './SystemDemo'
import { AutomationDemo } from './AutomationDemo'
import { PricingDemo } from './PricingDemo'

/** Uma demonstração própria por competência. */
export const demoBySlug: Record<SolutionSlug, ComponentType> = {
  'bi-analytics': BIDemo,
  'dados-engenharia': DataDemo,
  sistemas: SystemDemo,
  automacao: AutomationDemo,
  consultoria: PricingDemo,
}
