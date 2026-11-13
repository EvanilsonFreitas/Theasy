import { useLayoutEffect, useState, type RefObject } from 'react'

/**
 * Escala uniforme para encaixar uma composição de largura fixa no espaço
 * disponível (diagramas desenhados em coordenadas absolutas). Mede antes
 * da pintura para não haver salto de layout.
 */
export function useFitScale(
  ref: RefObject<HTMLElement | null>,
  baseWidth: number,
  max = 1,
) {
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () =>
      setScale(Math.min(max, el.clientWidth / baseWidth) || 1)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, baseWidth, max])
  return scale
}
