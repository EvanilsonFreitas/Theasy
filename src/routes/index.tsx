/* eslint-disable react-refresh/only-export-components -- a configuração de rotas mistura bindings lazy() com o export do router */
import { lazy } from 'react'
import {
  Navigate,
  createBrowserRouter,
  type RouteObject,
} from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { Home } from '@/features/home/Home'

const Solutions = lazy(() =>
  import('@/features/solutions/Solutions').then((m) => ({
    default: m.Solutions,
  })),
)
const Approach = lazy(() =>
  import('@/features/approach/Approach').then((m) => ({ default: m.Approach })),
)
const Applications = lazy(() =>
  import('@/features/applications/Applications').then((m) => ({
    default: m.Applications,
  })),
)
const About = lazy(() =>
  import('@/features/about/About').then((m) => ({ default: m.About })),
)
const Contact = lazy(() =>
  import('@/features/contact/Contact').then((m) => ({ default: m.Contact })),
)
const Privacy = lazy(() =>
  import('@/features/legal/Privacy').then((m) => ({ default: m.Privacy })),
)
const NotFound = lazy(() =>
  import('@/features/errors/NotFound').then((m) => ({ default: m.NotFound })),
)

/** Rotas públicas indexáveis — também usadas para gerar o sitemap. */
export const publicPaths = [
  '/',
  '/solucoes',
  '/abordagem',
  '/aplicacoes',
  '/sobre',
  '/contato',
  '/privacidade',
]

/**
 * Endereços do site anterior (ONEB) redirecionados para o conteúdo
 * equivalente, para não quebrar links e favoritos existentes.
 * Conteúdo fictício (cases, blog, depoimentos) foi removido.
 */
const legacyRedirects: Record<string, string> = {
  'quem-somos': '/sobre',
  missao: '/sobre',
  valores: '/sobre',
  carreira: '/sobre',
  'solucoes/:slug': '/solucoes',
  tecnologias: '/solucoes',
  cases: '/aplicacoes',
  'cases/:slug': '/aplicacoes',
  projetos: '/aplicacoes',
  blog: '/',
  'blog/:slug': '/',
  faq: '/contato',
  termos: '/privacidade',
  lgpd: '/privacidade',
}

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'solucoes', element: <Solutions /> },
      { path: 'abordagem', element: <Approach /> },
      { path: 'aplicacoes', element: <Applications /> },
      { path: 'sobre', element: <About /> },
      { path: 'contato', element: <Contact /> },
      { path: 'privacidade', element: <Privacy /> },
      ...Object.entries(legacyRedirects).map(([path, to]) => ({
        path,
        element: <Navigate to={to} replace />,
      })),
      { path: '*', element: <NotFound /> },
    ],
  },
]

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
})
