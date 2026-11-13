import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ink' | 'on-ink' | 'text'
type Size = 'md' | 'lg'

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-lg font-[560] leading-tight transition-[background-color,color,box-shadow,border-color] duration-150 ease-snap disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-purple-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(21_19_27/0.2),0_8px_20px_-10px_rgb(63_39_163/0.6)] hover:bg-purple-800 active:bg-purple-800',
  secondary:
    'border border-ink bg-paper text-ink hover:bg-ink hover:text-white active:bg-ink',
  ink: 'bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-purple-800',
  'on-ink':
    'bg-purple-300 text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.5),0_10px_24px_-10px_rgb(139_108_240/0.7)] hover:bg-white',
  text: 'min-h-11 text-ink underline decoration-1 underline-offset-[6px] hover:text-purple-600',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-4 py-2.5 text-[15px]',
  lg: 'min-h-12 px-5 py-3 text-[15.5px]',
}

export function buttonClasses({
  variant = 'primary',
  size = 'lg',
  className,
}: {
  variant?: Variant
  size?: Size
  className?: string
}) {
  return cn(base, variants[variant], variant !== 'text' && sizes[size], className)
}

/** Seta que avança 4px no hover: o único "gesto" de botão do sistema. */
export function Arrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block transition-transform duration-150 ease-snap group-hover/btn:translate-x-1',
        className,
      )}
    >
      →
    </span>
  )
}

type LinkProps = ComponentProps<typeof Link> & {
  variant?: Variant
  size?: Size
  arrow?: boolean
  children: ReactNode
}

export function ButtonLink({
  variant,
  size,
  arrow = false,
  className,
  children,
  ...props
}: LinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </Link>
  )
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant
  size?: Size
  arrow?: boolean
}

export function Button({
  variant,
  size,
  arrow = false,
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...props}
    >
      <span>{children}</span>
      {arrow && <Arrow />}
    </button>
  )
}
