import type { AreaKey } from '@/content/contexts'
import { STAR_PATH } from '@/components/system/Star'

/*
 * Ilustrações técnicas por área (painel de destaque de "Onde atuamos").
 * Vetores próprios no vocabulário do sistema: traço 1.25/1.5, raios 3,
 * roxo só no ponto de decisão. Sem números de resultado.
 */

const star = (x: number, y: number, s = 0.045) => (
  <path
    transform={`translate(${x} ${y}) scale(${s}) translate(-512 -512)`}
    d={STAR_PATH}
    className="fill-purple-600"
  />
)

export function AreaIllustration({ area }: { area: AreaKey }) {
  return (
    <svg viewBox="0 0 320 190" className="h-auto w-full" aria-hidden="true">
      {area === 'financeiro' && (
        <g>
          <path d="M20 168H300" className="stroke-line" />
          {[
            { x: 34, y: 28, h: 140, c: 'fill-ink', l: 'Preço' },
            { x: 92, y: 28, h: 26, c: 'fill-purple-300', l: 'Var.' },
            { x: 150, y: 54, h: 18, c: 'fill-purple-500', l: 'Fixas' },
            { x: 208, y: 72, h: 74, c: 'fill-line', l: 'Custo' },
            { x: 266, y: 146, h: 22, c: 'fill-purple-600', l: 'Margem' },
          ].map((b, i, all) => (
            <g key={b.l}>
              <rect
                x={b.x - 16}
                y={b.y}
                width="32"
                height={b.h}
                rx="3"
                className={b.c}
              />
              {i < all.length - 1 && (
                <path
                  d={`M${b.x + 16} ${b.y + (i === 0 ? 0 : b.h)}H${all[i + 1].x - 16}`}
                  className="stroke-ink-3"
                  strokeDasharray="2 3"
                />
              )}
              <text
                x={b.x}
                y="184"
                textAnchor="middle"
                className="fill-ink-3 font-mono text-[8px] uppercase"
              >
                {b.l}
              </text>
            </g>
          ))}
          {star(266, 132)}
        </g>
      )}
      {area === 'operacoes' && (
        <g>
          {[40, 95, 150].map((y, r) => (
            <g key={y}>
              <text
                x="18"
                y={y + 4}
                className="fill-ink-2 font-mono text-[8px]"
              >
                L{r + 1}
              </text>
              <path
                d={`M40 ${y}H290`}
                className="stroke-line"
                strokeWidth="1.25"
              />
              {[70, 130, 190, 250].map((x, k) => (
                <rect
                  key={x}
                  x={x - 14}
                  y={y - 12}
                  width="28"
                  height="24"
                  rx="4"
                  className={
                    r === 1 && k === 2
                      ? 'fill-warn-bg stroke-warn'
                      : 'fill-paper stroke-line'
                  }
                  strokeWidth="1.25"
                />
              ))}
              <circle cx="290" cy={y} r="5" className="fill-purple-600" />
            </g>
          ))}
          <path
            d="M190 107V128H232"
            className="stroke-warn"
            strokeWidth="1.25"
            strokeDasharray="2 3"
          />
          <rect
            x="232"
            y="120"
            width="70"
            height="18"
            rx="4"
            className="fill-paper stroke-warn"
            strokeWidth="1"
          />
          <text
            x="267"
            y="132"
            textAnchor="middle"
            className="fill-warn font-mono text-[7.5px]"
          >
            parada: setup
          </text>
        </g>
      )}
      {area === 'comercial' && (
        <g>
          {[
            [20, 300, 'Prospecção'],
            [55, 265, 'Proposta'],
            [90, 230, 'Negociação'],
            [125, 195, 'Fechado'],
          ].map(([a, b, l], i) => (
            <g key={l as string}>
              <path
                d={`M${a} ${20 + i * 40}H${b}L${(b as number) - 18} ${52 + i * 40}H${(a as number) + 18}Z`}
                className={
                  i === 3
                    ? 'fill-purple-600'
                    : i === 2
                      ? 'fill-purple-300'
                      : 'fill-purple-100 stroke-purple-300'
                }
              />
              <text
                x="160"
                y={40 + i * 40}
                textAnchor="middle"
                className={`font-mono text-[8.5px] uppercase ${i === 3 ? 'fill-white' : 'fill-ink-2'}`}
              >
                {l}
              </text>
            </g>
          ))}
          <path
            d="M262 100H300"
            className="stroke-ink-3"
            strokeDasharray="2 3"
          />
          <text
            x="300"
            y="94"
            textAnchor="end"
            className="fill-ink-3 font-mono text-[7.5px]"
          >
            regra de desconto
          </text>
        </g>
      )}
      {area === 'logistica' && (
        <g>
          <path
            d="M30 150C80 150 70 50 130 50S190 140 240 120S280 40 296 40"
            className="fill-none stroke-purple-500"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          {[
            [30, 150, 'CD'],
            [130, 50, 'Rota A'],
            [240, 120, 'Rota B'],
            [296, 40, 'Cliente'],
          ].map(([x, y, l], i) => (
            <g key={l as string}>
              <circle
                cx={x as number}
                cy={y as number}
                r="7"
                className={
                  i === 3 ? 'fill-purple-600' : 'fill-paper stroke-purple-600'
                }
                strokeWidth="1.5"
              />
              <text
                x={x as number}
                y={(y as number) + (i === 1 || i === 3 ? -14 : 22)}
                textAnchor="middle"
                className="fill-ink-2 font-mono text-[8px]"
              >
                {l}
              </text>
            </g>
          ))}
          <rect
            x="164"
            y="152"
            width="120"
            height="26"
            rx="5"
            className="fill-paper stroke-line"
          />
          <text x="176" y="169" className="fill-ink-2 font-mono text-[8px]">
            status visível ao cliente
          </text>
          {star(30, 128, 0.04)}
        </g>
      )}
      {area === 'gestao' && (
        <g>
          {[
            [16, 16, 'Receita', true],
            [114, 16, 'Margem', false],
            [212, 16, 'Prazo', true],
          ].map(([x, y, l, ok]) => (
            <g key={l as string}>
              <rect
                x={x as number}
                y={y as number}
                width="90"
                height="62"
                rx="6"
                className="fill-paper stroke-line"
              />
              <text
                x={(x as number) + 10}
                y={(y as number) + 18}
                className="fill-ink-3 font-mono text-[7.5px] uppercase"
              >
                {l}
              </text>
              <circle
                cx={(x as number) + 14}
                cy={(y as number) + 40}
                r="5"
                className={ok ? 'fill-ok' : 'fill-warn'}
              />
              <rect
                x={(x as number) + 26}
                y={(y as number) + 36}
                width="50"
                height="8"
                rx="2"
                className="fill-paper-2"
              />
            </g>
          ))}
          <rect
            x="16"
            y="92"
            width="286"
            height="84"
            rx="6"
            className="fill-paper stroke-line"
          />
          <path
            d="M30 156L80 138L130 146L180 122L230 128L288 104"
            className="fill-none stroke-purple-600"
            strokeWidth="1.5"
          />
          <path
            d="M30 128H288"
            className="stroke-ink-3"
            strokeDasharray="2 3"
          />
          <text
            x="286"
            y="122"
            textAnchor="end"
            className="fill-ink-3 font-mono text-[7.5px]"
          >
            meta
          </text>
          {star(288, 104, 0.04)}
        </g>
      )}
      {area === 'tecnologia' && (
        <g>
          {[
            [16, 22, 'ERP legado'],
            [16, 82, 'CRM'],
            [16, 142, 'Planilhas'],
          ].map(([x, y, l]) => (
            <g key={l as string}>
              <rect
                x={x as number}
                y={y as number}
                width="84"
                height="30"
                rx="5"
                className="fill-paper stroke-line"
              />
              <text
                x={(x as number) + 42}
                y={(y as number) + 19}
                textAnchor="middle"
                className="fill-ink-2 font-mono text-[8px]"
              >
                {l}
              </text>
              <path
                d={`M100 ${(y as number) + 15}C130 ${(y as number) + 15} 120 97 150 97`}
                className="fill-none stroke-purple-500"
                strokeWidth="1.25"
              />
            </g>
          ))}
          <rect
            x="150"
            y="74"
            width="76"
            height="46"
            rx="8"
            className="fill-purple-600"
          />
          <text
            x="188"
            y="94"
            textAnchor="middle"
            className="fill-white font-mono text-[8px]"
          >
            API
          </text>
          <text
            x="188"
            y="107"
            textAnchor="middle"
            className="fill-purple-100 font-mono text-[7px]"
          >
            monitorada
          </text>
          <path
            d="M226 97H252"
            className="stroke-purple-600"
            strokeWidth="1.5"
          />
          <rect
            x="252"
            y="80"
            width="54"
            height="34"
            rx="5"
            className="fill-paper stroke-purple-600"
            strokeWidth="1.25"
          />
          <text
            x="279"
            y="100"
            textAnchor="middle"
            className="fill-ink-2 font-mono text-[8px]"
          >
            base
          </text>
        </g>
      )}
    </svg>
  )
}
