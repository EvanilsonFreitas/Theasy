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
