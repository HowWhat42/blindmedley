// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../adonisrc.ts" />

import './css/app.css'

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

import { ThemeProvider } from './components/theme_provider'
import { Toaster } from './components/ui/sonner'

const appName = import.meta.env.VITE_APP_NAME || 'BlindMedley'

createInertiaApp({
  progress: { color: '#7D00FA', delay: 250, includeCSS: true, showSpinner: false },

  title: (title: string) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    let page = pages[`./pages/${name}.tsx`]
    if (!page) {
      page = pages[`./pages/not_found.tsx`]
    }
    return page
  },

  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App {...props} />
        <Toaster />
      </ThemeProvider>
    )
  },
})
