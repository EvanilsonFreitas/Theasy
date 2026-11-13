import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ink' | 'on-ink' | 'text'
type Size = 'md' | 'lg'

const base =
  'group/btn inline-flex items-center justify-center gap-3 font-[580] leading-tight transition-colors duration-150 ease-snap disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-800 active:bg-purple-800',
  secondary:
    'border border-ink text-ink hover:bg-ink hover:text-white active:bg-ink',
  ink: 'bg-ink text-white hover:bg-purple-800',
  'on-ink': 'bg-purple-300 text-ink hover:bg-white',
  text: 'text-ink underline decoration-1 underline-offset-[6px] hover:text-purple-600',
}

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-[18px] py-3 text-[15px]',
  lg: 'min-h-13 px-[22px] py-4 text-base',
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

/** Seta que avança 4px no hover — o único "gesto" de botão do sistema. */
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
