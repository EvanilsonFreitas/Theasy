import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/instrument-sans/wght.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './index.css'
import App from './App.tsx'

// O título e a descrição estáticos do index.html servem a quem não executa
// JavaScript. Com a aplicação ativa, cada página declara os seus (Seo.tsx);
// os estáticos saem para não haver tags duplicadas.
document.querySelectorAll('[data-static-meta]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
