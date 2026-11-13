/**
 * Utilitários de desenho para os gráficos demonstrativos.
 * Curvas suaves (cúbica monotônica, Fritsch–Carlson): passam por todos os
 * pontos sem criar picos falsos entre eles.
 */
export type Pt = [number, number]

export function smoothPath(pts: Pt[]): string {
  const n = pts.length
  if (n < 2) return ''
  if (n === 2) return `M${pts[0][0]} ${pts[0][1]}L${pts[1][0]} ${pts[1][1]}`
  const dx: number[] = []
  const m: number[] = []
  for (let i = 0; i < n - 1; i++) {
    dx[i] = pts[i + 1][0] - pts[i][0]
    m[i] = (pts[i + 1][1] - pts[i][1]) / dx[i]
  }
  const t: number[] = [m[0]]
  for (let i = 1; i < n - 1; i++) {
    t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2
  }
  t[n - 1] = m[n - 2]
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0
      t[i + 1] = 0
      continue
    }
    const a = t[i] / m[i]
    const b = t[i + 1] / m[i]
    const s = a * a + b * b
    if (s > 9) {
      const k = 3 / Math.sqrt(s)
      t[i] = k * a * m[i]
      t[i + 1] = k * b * m[i]
    }
  }
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3
    d += `C${pts[i][0] + h} ${pts[i][1] + t[i] * h} ${pts[i + 1][0] - h} ${pts[i + 1][1] - t[i + 1] * h} ${pts[i + 1][0]} ${pts[i + 1][1]}`
  }
  return d
}

/**
 * Série determinística com tendência e oscilação (sem aleatoriedade em
 * tempo de execução, para o gráfico ser sempre o mesmo).
 */
export function wave(
  n: number,
  start: number,
  end: number,
  amp: number,
  phase = 0,
) {
  return Array.from({ length: n }, (_, i) => {
    const p = i / (n - 1)
    const trend = start + (end - start) * p
    const osc =
      Math.sin(i * 1.7 + phase) * amp +
      Math.sin(i * 0.9 + phase * 2) * amp * 0.5
    return trend + (i === 0 || i === n - 1 ? 0 : osc)
  })
}
