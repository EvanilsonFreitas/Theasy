import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Avança etapas de uma execução demonstrativa (pipeline, automação).
 * Com movimento reduzido a execução termina imediatamente.
 */
export function useStepper(total: number, interval = 800) {
  const reduce = useReducedMotion()
  const [done, setDone] = useState(total)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearInterval(timer.current), [])

  const run = useCallback(() => {
    window.clearInterval(timer.current)
    if (reduce) {
      setDone(total)
      return
    }
    setDone(0)
    timer.current = window.setInterval(() => {
      setDone((d) => {
        if (d + 1 >= total) window.clearInterval(timer.current)
        return Math.min(total, d + 1)
      })
    }, interval)
  }, [reduce, total, interval])

  return { done, running: done < total, run }
}
