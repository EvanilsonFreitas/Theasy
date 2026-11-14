import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { expect, test, type Page } from '@playwright/test'

const require = createRequire(import.meta.url)
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8')

const ROUTES = [
  {
    path: '/',
    h1: 'Dados, BI e sistemas para fazer sua empresa funcionar melhor.',
  },
  {
    path: '/solucoes',
    h1: 'Cinco competências, combinadas conforme o problema.',
  },
  { path: '/aplicacoes', h1: 'Problemas comuns, resolvidos com estrutura.' },
  {
    path: '/abordagem',
    h1: 'Um método em cinco etapas, do diagnóstico à evolução.',
  },
  {
    path: '/sobre',
    h1: 'Consultoria que entende o negócio. Engenharia que entrega a solução.',
  },
  { path: '/contato', h1: 'Vamos entender a situação.' },
  { path: '/privacidade', h1: 'Como tratamos os seus dados.' },
]

const LEGACY = [
  'quem-somos',
  'missao',
  'valores',
  'carreira',
  'solucoes/bi',
  'tecnologias',
  'cases',
  'cases/exemplo',
  'projetos',
  'blog',
  'blog/exemplo',
  'faq',
  'termos',
  'lgpd',
]

const TAGLINE = 'Your data analytics'

/** Coleta erros de execução e de console durante o teste. */
function trackErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  return errors
}

async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  )
}

test.describe('rotas', () => {
  for (const route of ROUTES) {
    test(`renderiza ${route.path} sem erros`, async ({ page }) => {
      const errors = trackErrors(page)
      await page.goto(route.path)
      await expect(page.locator('h1')).toHaveText(route.h1)
      await expect(page).toHaveTitle(/ThEasy/)
      await expect(page.locator('meta[name="description"]')).toHaveCount(1)
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })
  }

  test('página inexistente mostra o 404', async ({ page }) => {
    await page.goto('/rota-que-nao-existe')
    await expect(page.locator('h1')).toContainText('Esta página não existe')
  })

  test('endereços antigos redirecionam', async ({ page }) => {
    for (const path of LEGACY) {
      await page.goto(`/${path}`)
      await expect(page).not.toHaveURL(new RegExp(`/${path}$`))
      await expect(page.locator('h1')).toBeVisible()
    }
  })
})

test.describe('identidade', () => {
  test('assinatura no cabeçalho e no rodapé (desktop)', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header').first()
    await expect(header.getByText('THEASY', { exact: true })).toBeVisible()
    await expect(header.getByText(TAGLINE, { exact: true })).toBeVisible()
    await expect(
      page.locator('footer').getByText(TAGLINE, { exact: true }),
    ).toBeVisible()
    await expect(
      page.getByText('Business Intelligence & Consulting'),
    ).toHaveCount(0)
    // Símbolo na cor institucional oficial #5D3BDA
    const color = await header
      .locator('svg[viewBox="160 160 704 704"]')
      .evaluate((el) => getComputedStyle(el).color)
    expect(color).toBe('rgb(93, 59, 218)')
    await expect(page).toHaveTitle('ThEasy | Your data analytics')
  })

  test('favicon responde', async ({ page, request }) => {
    await page.goto('/')
    const href = await page.locator('link[rel="icon"]').getAttribute('href')
    expect(href).toBeTruthy()
    const res = await request.get(href!)
    expect(res.ok()).toBe(true)
  })
})

test.describe('mobile', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })

  test('assinatura e menu', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header').first()
    await expect(header.getByText(TAGLINE, { exact: true })).toBeVisible()
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0)

    await page.getByRole('button', { name: 'Menu' }).tap()
    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()

    await page.getByRole('button', { name: 'Menu' }).tap()
    await page.getByRole('dialog').getByRole('link', { name: 'Sobre' }).tap()
    await expect(page).toHaveURL(/\/sobre$/)
    await expect(page.getByRole('dialog')).toBeHidden()
  })
})

test.describe('interações', () => {
  test('navegação pelo cabeçalho', async ({ page }) => {
    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Soluções' })
      .click()
    await expect(page).toHaveURL(/\/solucoes$/)
    await expect(page.locator('h1')).toHaveText(ROUTES[1].h1)
  })

  test('abas de competências trocam a demonstração', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: /Engenharia de dados/ }).click()
    const panel = page.locator('#painel-competencia')
    await expect(
      panel.getByRole('button', { name: 'Executar carga' }),
    ).toBeVisible()
    await page.getByRole('tab', { name: /Consultoria financeira/ }).click()
    await expect(panel.getByText('Formação de preço')).toBeVisible()
  })

  test('etapas do método são selecionáveis', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: /Implantação/ }).click()
    await expect(
      page.locator('#painel-etapa').getByText('Plano de implantação'),
    ).toBeVisible()
  })

  test('formulário sem endpoint não simula sucesso', async ({ page }) => {
    await page.goto('/contato')
    await page.getByRole('button', { name: /Enviar mensagem/ }).click()
    await expect(page.locator('[aria-invalid="true"]').first()).toBeVisible()

    await page
      .getByRole('textbox', { name: 'A situação' })
      .fill('O fechamento mensal leva duas semanas.')
    await page.getByRole('textbox', { name: 'Nome' }).fill('Teste Automatizado')
    await page
      .getByRole('textbox', { name: 'Email corporativo' })
      .fill('teste@example.com')
    await page.getByRole('textbox', { name: 'Empresa' }).fill('Empresa Teste')
    await page.getByRole('button', { name: /Enviar mensagem/ }).click()
    await expect(
      page.getByText('não foi enviada', { exact: false }),
    ).toBeVisible()
    await expect(page.getByText('Recebemos sua mensagem')).toHaveCount(0)
  })
})

test.describe('movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })

  test('fluxo do mapa não é animado', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('animateMotion')).toHaveCount(0)
    await expect(
      page.getByRole('button', { name: /Pausar fluxo/ }),
    ).toHaveCount(0)
  })
})

test.describe('acessibilidade automatizada (axe, WCAG 2.2 A/AA)', () => {
  for (const route of ROUTES) {
    test(`sem violações em ${route.path}`, async ({ page }) => {
      await page.goto(route.path)
      await expect(page.locator('h1')).toBeVisible()
      // Espera as animações finitas de entrada terminarem: o axe deve avaliar
      // o estado que o leitor vê, não um quadro intermediário de fade.
      await page.waitForFunction(() =>
        document
          .getAnimations()
          .every(
            (a) =>
              a.playState !== 'running' ||
              a.effect?.getTiming().iterations === Infinity,
          ),
      )
      await page.addScriptTag({ content: axeSource })
      const violations = await page.evaluate(async () => {
        const w = window as unknown as {
          axe: {
            run: (
              ctx: Document,
              opts: object,
            ) => Promise<{ violations: { id: string; nodes: unknown[] }[] }>
          }
        }
        const result = await w.axe.run(document, {
          runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
        })
        return result.violations.map((v) => `${v.id} (${v.nodes.length})`)
      })
      expect(violations).toEqual([])
    })
  }
})

/* Refinamento V2.2: regressões de componentes, header e WhatsApp. */

type Box = { x: number; y: number; width: number; height: number }
const inside = (a: Box, b: Box, tol = 0.5) =>
  a.x >= b.x - tol &&
  a.y >= b.y - tol &&
  a.x + a.width <= b.x + b.width + tol &&
  a.y + a.height <= b.y + b.height + tol
const overlaps = (a: Box, b: Box) =>
  a.x < b.x + b.width - 0.5 &&
  b.x < a.x + a.width - 0.5 &&
  a.y < b.y + b.height - 0.5 &&
  b.y < a.y + a.height - 0.5

/**
 * Antes de medir: os blocos de entrada visíveis já receberam `.is-in` e
 * nenhuma animação ou transição finita está em curso (getAnimations força o
 * cálculo de estilo, então a transição recém iniciada também conta).
 */
const settle = (page: Page) =>
  page.waitForFunction(() => {
    const pending = [
      ...document.querySelectorAll('[data-reveal], [data-rise]'),
    ].some((el) => {
      if (el.classList.contains('is-in')) return false
      const r = el.getBoundingClientRect()
      // só o que está bem dentro da área observada (rootMargin de -8%)
      return r.bottom > innerHeight * 0.2 && r.top < innerHeight * 0.75
    })
    return (
      !pending &&
      document
        .getAnimations()
        .every(
          (a) =>
            a.playState !== 'running' ||
            a.effect?.getTiming().iterations === Infinity,
        )
    )
  })

const WA_URL = `https://wa.me/5511964639228?text=${encodeURIComponent(
  'Olá! Conheci a ThEasy pelo site e gostaria de conversar sobre uma solução para minha empresa.',
)}`

test.describe('V2.2 · componentes', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('toggle: o indicador fica contido no trilho nos dois estados', async ({
    page,
  }) => {
    await page.goto('/solucoes#automacao')
    const sw = page.getByRole('switch', { name: /Simular divergência/ })
    await sw.scrollIntoViewIfNeeded()
    const track = sw.locator('[data-switch-track]')
    const thumb = sw.locator('[data-switch-thumb]')
    for (const state of ['false', 'true', 'false']) {
      await expect(sw).toHaveAttribute('aria-checked', state)
      await settle(page) // fim da transição do indicador e da entrada
      const t = (await thumb.boundingBox())!
      const r = (await track.boundingBox())!
      expect(inside(t, r)).toBe(true)
      await sw.click()
    }
  })

  test('conectores do cenário nascem e terminam nas bordas dos cards', async ({
    page,
  }) => {
    await page.goto('/aplicacoes')
    const check = async () => {
      const wires = page.getByTestId('scenario-wires')
      await expect(wires).toBeVisible()
      await expect(wires.locator('[data-wire-path]')).toHaveCount(5)
      await settle(page)
      const misses = await page.evaluate(() => {
        const svg = document.querySelector('[data-testid="scenario-wires"]')!
        const s = svg.getBoundingClientRect()
        const boxes = [...document.querySelectorAll('[data-wire]')].map((e) =>
          e.getBoundingClientRect(),
        )
        const onEdge = (x: number, y: number) =>
          boxes.some(
            (b) =>
              (Math.abs(x - b.left) <= 2 || Math.abs(x - b.right) <= 2) &&
              y >= b.top - 2 &&
              y <= b.bottom + 2,
          )
        return [...svg.querySelectorAll('circle')]
          .map((c) => ({
            x: s.left + Number(c.getAttribute('cx')),
            y: s.top + Number(c.getAttribute('cy')),
          }))
          .filter((p) => !onEdge(p.x, p.y)).length
      })
      expect(misses).toBe(0)
    }
    await check()
    // Recalcula ao mudar a largura.
    await page.setViewportSize({ width: 1180, height: 900 })
    await check()
    // Abaixo de lg o layout empilha e os conectores medidos saem.
    await page.setViewportSize({ width: 820, height: 1000 })
    await expect(page.getByTestId('scenario-wires')).toHaveCount(0)
  })

  test('select do design system: mouse, teclado e Esc', async ({ page }) => {
    await page.goto('/solucoes#bi-analytics')
    const combo = page.getByRole('combobox', { name: /Unidade/ })
    await combo.scrollIntoViewIfNeeded()
    await expect(combo).toHaveText('Todas as unidades')
    await expect(combo).toHaveAttribute('aria-expanded', 'false')

    await combo.click()
    const list = page.getByRole('listbox')
    await expect(list).toBeVisible()
    await list.getByRole('option', { name: 'Unidade Sul' }).click()
    await expect(list).toBeHidden()
    await expect(combo).toHaveText('Unidade Sul')
    await expect(page.getByText('Receita e margem · unidade Sul')).toBeVisible()

    await combo.focus()
    await page.keyboard.press('Enter')
    await expect(list).toBeVisible()
    await expect(combo).toHaveAttribute('aria-activedescendant', /.+/)
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(combo).toHaveText('Unidade Sudeste')

    await page.keyboard.press('ArrowDown')
    await expect(list).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(list).toBeHidden()
    await expect(combo).toBeFocused()
    await expect(combo).toHaveText('Unidade Sudeste')
    await expect(page.locator('select')).toHaveCount(0)
  })

  test('arquitetura compacta: nós sem sobreposição e dentro da moldura', async ({
    page,
  }) => {
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/solucoes')
      const map = page.getByTestId('system-map-compact')
      await map.scrollIntoViewIfNeeded()
      await settle(page)
      const frame = (await map.boundingBox())!
      const nodes = await map.locator('[data-map-node]').evaluateAll((els) =>
        els.map((e) => {
          const r = e.getBoundingClientRect()
          return { x: r.x, y: r.y, width: r.width, height: r.height }
        }),
      )
      expect(nodes.length).toBe(11)
      for (const [i, a] of nodes.entries()) {
        expect(inside(a, frame)).toBe(true)
        for (const b of nodes.slice(i + 1)) expect(overlaps(a, b)).toBe(false)
      }
    }
  })

  test('matriz: posição derivada dos valores e painel de detalhe', async ({
    page,
  }) => {
    await page.goto('/abordagem')
    const matrix = page.getByTestId('priority-matrix')
    await matrix.scrollIntoViewIfNeeded()
    await settle(page)
    const plot = (await matrix.getByTestId('matrix-plot').boundingBox())!
    // Valores em src/content/initiatives.ts: ERP impacto 2,2 e esforço 4,7.
    const pct = (v: number) => 6 + ((v - 1) / 4) * 88
    const erp = matrix.locator('[data-initiative="erp"]')
    await expect(erp).toHaveAttribute('data-x', pct(4.7).toFixed(1))
    await expect(erp).toHaveAttribute('data-y', (100 - pct(2.2)).toFixed(1))
    const box = (await erp.boundingBox())!
    const cx = plot.x + (plot.width * pct(4.7)) / 100
    const cy = plot.y + (plot.height * (100 - pct(2.2))) / 100
    expect(Math.abs(box.x + box.width / 2 - cx)).toBeLessThan(1.5)
    expect(Math.abs(box.y + box.height / 2 - cy)).toBeLessThan(1.5)

    const detail = matrix.getByTestId('matrix-detail')
    await expect(erp).toHaveAttribute('aria-pressed', 'false')
    await erp.click()
    await expect(erp).toHaveAttribute('aria-pressed', 'true')
    await expect(detail).toContainText('Reavaliar')
    // Ganho rápido fica no quadrante superior esquerdo.
    const base = matrix.locator('[data-initiative="base"]')
    expect(Number(await base.getAttribute('data-x'))).toBeLessThan(50)
    expect(Number(await base.getAttribute('data-y'))).toBeLessThan(50)
  })

  test('rodapé: direitos reservados com ano dinâmico', async ({ page }) => {
    await page.goto('/')
    const year = new Date().getFullYear()
    await expect(page.locator('footer')).toContainText(
      `© ${year} ThEasy. Todos os direitos reservados.`,
    )
  })

  test('cursor de mão só em elementos interativos', async ({ page }) => {
    await page.goto('/')
    const cursor = (sel: string) =>
      page
        .locator(sel)
        .first()
        .evaluate((el) => getComputedStyle(el).cursor)
    expect(await cursor('[role="tab"]')).toBe('pointer')
    expect(await cursor('header nav a')).toBe('pointer')
    expect(await cursor('main button:not(:disabled)')).toBe('pointer')
    expect(await cursor('h1')).not.toBe('pointer')
    expect(await cursor('main p')).not.toBe('pointer')
    await page.goto('/solucoes#automacao')
    expect(await cursor('[role="switch"]')).toBe('pointer')
  })
})

test.describe('V2.2 · header no scroll', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  const state = (page: Page) =>
    page.evaluate(() => {
      const h = document.querySelector('header')!
      return {
        compact: h.hasAttribute('data-compact'),
        bottom: h.getBoundingClientRect().bottom,
        h1: document.querySelector('h1')!.getBoundingClientRect().top + scrollY,
      }
    })
  const scrollTo = async (page: Page, y: number) => {
    await page.evaluate(
      (top) => window.scrollTo({ top, behavior: 'instant' }),
      y,
    )
    await page.waitForTimeout(120)
  }

  test('compacta, mantém o layout, usa histerese e volta no topo', async ({
    page,
  }) => {
    await page.goto('/')
    const top = await state(page)
    expect(top.compact).toBe(false)
    const header = page.locator('header')
    const tagline = header.getByText(TAGLINE, { exact: true })
    await expect(tagline).toHaveCSS('opacity', '1')

    await scrollTo(page, 400)
    const down = await state(page)
    expect(down.compact).toBe(true)
    expect(down.h1).toBe(top.h1) // sem deslocamento de layout
    expect(down.bottom).toBeLessThan(top.bottom)
    await expect(tagline).toHaveCSS('opacity', '0')
    await expect(header.getByText('THEASY', { exact: true })).toBeVisible()

    // Faixa de histerese: entre 16 e 48 px mantém o estado anterior.
    await scrollTo(page, 30)
    expect((await state(page)).compact).toBe(true)
    await scrollTo(page, 10)
    expect((await state(page)).compact).toBe(false)
    await scrollTo(page, 30)
    expect((await state(page)).compact).toBe(false)

    // Rolagem rápida e alternância repetida terminam no estado certo.
    for (let i = 0; i < 12; i++) await scrollTo(page, i % 2 ? 2000 : 0)
    await scrollTo(page, 0)
    const back = await state(page)
    expect(back.compact).toBe(false)
    expect(back.h1).toBe(top.h1)
    await expect(tagline).toHaveCSS('opacity', '1')
  })

  test('âncora fica abaixo do header e o foco do logotipo é visível', async ({
    page,
  }) => {
    await page.goto('/solucoes#automacao')
    const target = page.locator('#automacao')
    await expect(target).toBeFocused()
    await page.waitForTimeout(400)
    const header = (await page.locator('header').boundingBox())!
    const t = (await target.boundingBox())!
    expect(t.y).toBeGreaterThanOrEqual(header.y + header.height - 1)

    const home = page
      .locator('header')
      .getByRole('link', { name: 'ThEasy, página inicial' })
    await page.keyboard.press('Tab')
    await home.focus()
    await expect(home).toHaveCSS('outline-style', 'solid')
  })

  test('rota nova restaura o header completo', async ({ page }) => {
    await page.goto('/')
    await scrollTo(page, 1200)
    expect((await state(page)).compact).toBe(true)
    await page
      .getByRole('navigation', { name: 'Principal' })
      .getByRole('link', { name: 'Sobre' })
      .click()
    await expect(page).toHaveURL(/\/sobre$/)
    await expect.poll(async () => (await state(page)).compact).toBe(false)
  })
})

test.describe('V2.2 · header mobile', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })

  test('menu aberto congela o header e o painel encosta na borda', async ({
    page,
  }) => {
    await page.goto('/')
    await page.evaluate(() =>
      window.scrollTo({ top: 600, behavior: 'instant' }),
    )
    const header = page.locator('header')
    await expect(header).toHaveAttribute('data-compact', 'true')
    await page.getByRole('button', { name: 'Menu' }).tap()
    const menu = page.getByRole('dialog', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await settle(page)
    const hb = await header.evaluate((h) => h.getBoundingClientRect().bottom)
    const pt = await menu.evaluate((m) => m.getBoundingClientRect().top)
    expect(Math.abs(hb - pt)).toBeLessThanOrEqual(1)
    await expect(header).toHaveAttribute('data-compact', 'true')
    // O botão do WhatsApp fica inerte atrás do painel.
    const inert = await page
      .locator('[data-whatsapp-float]')
      .evaluate((el) => (el as HTMLElement).inert)
    expect(inert).toBe(true)
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
  })
})

test.describe('V2.2 · header com movimento reduzido', () => {
  test.use({ reducedMotion: 'reduce' })

  test('transições do header ficam instantâneas', async ({ page }) => {
    await page.goto('/')
    const symbol = page.locator('header svg[viewBox="160 160 704 704"]')
    const ms = await symbol.evaluate(
      (el) => parseFloat(getComputedStyle(el).transitionDuration) * 1000,
    )
    expect(ms).toBeLessThan(1)
    await page.evaluate(() =>
      window.scrollTo({ top: 600, behavior: 'instant' }),
    )
    await expect(page.locator('header')).toHaveAttribute('data-compact', 'true')
  })
})

test.describe('V2.2 · WhatsApp comercial', () => {
  for (const route of ROUTES) {
    test(`botão flutuante em ${route.path}`, async ({ page }) => {
      await page.goto(route.path)
      const link = page.getByRole('link', {
        name: 'Conversar com a ThEasy pelo WhatsApp',
        exact: true,
      })
      await expect(link).toHaveCount(1)
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('href', WA_URL)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      // Nenhum outro número, encurtador ou link de telefone no documento.
      const hrefs = await page
        .locator('a[href*="wa.me"], a[href*="whatsapp"], a[href^="tel:"]')
        .evaluateAll((els) => els.map((e) => e.getAttribute('href')))
      for (const h of hrefs) expect(h).toBe(WA_URL)
      expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0)
    })
  }

  test('canais na página de contato e no rodapé, com teclado', async ({
    page,
  }) => {
    await page.goto('/contato')
    const card = page.getByTestId('contact-whatsapp')
    await expect(card).toContainText('+55 (11) 96463-9228')
    await expect(
      card.getByRole('link', { name: /Conversar pelo WhatsApp/ }),
    ).toHaveAttribute('href', WA_URL)
    await expect(
      page.locator('footer [data-whatsapp-link="footer"]'),
    ).toHaveAttribute('href', WA_URL)

    const float = page.locator('[data-whatsapp-float]')
    await float.focus()
    await expect(float).toBeFocused()
    await expect(float).toHaveCSS('outline-style', 'solid')
  })

  test('mobile: não cobre o menu nem a linha final do rodapé', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({
      baseURL: test.info().project.use.baseURL,
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    })
    const page = await ctx.newPage()
    await page.goto('/')
    const float = page.locator('[data-whatsapp-float]')
    const f1 = (await float.boundingBox())!
    const menu = (await page
      .getByRole('button', { name: 'Menu' })
      .boundingBox())!
    expect(overlaps(f1, menu)).toBe(false)
    expect(f1.x + f1.width).toBeLessThanOrEqual(390 - 12)
    await page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }),
    )
    await page.waitForTimeout(200)
    const copyright = (await page
      .locator('footer')
      .getByText(/Todos os direitos reservados/)
      .boundingBox())!
    expect(overlaps((await float.boundingBox())!, copyright)).toBe(false)
    await ctx.close()
  })
})
