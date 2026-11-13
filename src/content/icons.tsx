import {
  AppWindow,
  Building2,
  Calculator,
  ChartColumn,
  Compass,
  Cpu,
  Database,
  Factory,
  HeartPulse,
  MessagesSquare,
  PencilRuler,
  RefreshCcw,
  Rocket,
  SearchCheck,
  ShoppingCart,
  Sprout,
  TrendingUp,
  Truck,
  Wallet,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import type { Area } from './problems'
import type { SolutionSlug } from './solutions'

/**
 * Iconografia do site: um único conjunto (Lucide), traço fino, sempre
 * acompanhado de texto. Ícones identificam categorias; nunca substituem
 * o conteúdo nem aparecem como enfeite isolado.
 */

export const solutionIcons: Record<SolutionSlug, LucideIcon> = {
  'bi-analytics': ChartColumn,
  'dados-engenharia': Database,
  sistemas: AppWindow,
  automacao: Workflow,
  consultoria: Calculator,
}

export const areaIcons: Record<Area, LucideIcon> = {
  Financeiro: Wallet,
  Operações: Factory,
  Comercial: TrendingUp,
  Tecnologia: Cpu,
  Gestão: Compass,
}

export const stepIcons: LucideIcon[] = [
  MessagesSquare,
  SearchCheck,
  PencilRuler,
  Rocket,
  RefreshCcw,
]

export const sectorIcons = {
  industria: Factory,
  logistica: Truck,
  varejo: ShoppingCart,
  agronegocio: Sprout,
  saude: HeartPulse,
  servicos: Building2,
} satisfies Record<string, LucideIcon>
