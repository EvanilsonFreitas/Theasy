import { forwardRef, useId, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const control =
  'w-full border border-rule-strong bg-paper px-4 py-3.5 text-base text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] duration-150 hover:border-ink focus:border-purple-600 focus:outline-none focus-visible:outline-none focus:shadow-[0_0_0_2px_var(--color-purple-600)] aria-[invalid=true]:border-danger aria-[invalid=true]:shadow-none aria-[invalid=true]:focus:shadow-[0_0_0_2px_var(--color-danger)]'

interface FieldShellProps {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
  children: ReactNode
}

function FieldShell({ id, label, hint, error, optional, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-mono flex justify-between gap-4 text-ink">
        <span>{label}</span>
        {optional && <span className="text-ink-3 normal-case tracking-normal">opcional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-ink-3">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-2 text-sm text-danger">
          <span aria-hidden="true">✕</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

function describedBy(id: string, hint?: string, error?: string) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

type InputProps = ComponentProps<'input'> & {
  label: string
  hint?: string
  error?: string
  optional?: boolean
}

export const TextField = forwardRef<HTMLInputElement, InputProps>(
  function TextField({ label, hint, error, optional, className, id, ...props }, ref) {
    const auto = useId()
    const fieldId = id ?? auto
    return (
      <FieldShell id={fieldId} label={label} hint={hint} error={error} optional={optional}>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cn(control, 'min-h-13', className)}
          {...props}
        />
      </FieldShell>
    )
  },
)

type TextAreaProps = ComponentProps<'textarea'> & {
  label: string
  hint?: string
  error?: string
  optional?: boolean
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextAreaField({ label, hint, error, optional, className, id, ...props }, ref) {
    const auto = useId()
    const fieldId = id ?? auto
    return (
      <FieldShell id={fieldId} label={label} hint={hint} error={error} optional={optional}>
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(fieldId, hint, error)}
          className={cn(control, 'min-h-36 resize-y leading-relaxed', className)}
          {...props}
        />
      </FieldShell>
    )
  },
)

type SelectProps = ComponentProps<'select'> & {
  label: string
  hint?: string
  error?: string
  optional?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
}

export const SelectField = forwardRef<HTMLSelectElement, SelectProps>(
  function SelectField(
    { label, hint, error, optional, className, id, options, placeholder, ...props },
    ref,
  ) {
    const auto = useId()
    const fieldId = id ?? auto
    return (
      <FieldShell id={fieldId} label={label} hint={hint} error={error} optional={optional}>
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy(fieldId, hint, error)}
            className={cn(control, 'min-h-13 appearance-none pr-12', className)}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-3"
          >
            ↓
          </span>
        </div>
      </FieldShell>
    )
  },
)
