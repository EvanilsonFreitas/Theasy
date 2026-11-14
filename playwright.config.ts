import { defineConfig, devices } from '@playwright/test'

/**
 * Testes de fumaça contra o build de produção (`dist/`, servido por
 * `vite preview`). Rode `npm run build` antes de `npm run test:smoke`.
 * Localmente, `PW_CHANNEL=chrome` usa o Chrome instalado em vez do
 * Chromium do Playwright.
 */
const channel = process.env.PW_CHANNEL

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? [['github'], ['list']] : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], ...(channel ? { channel } : {}) },
    },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
