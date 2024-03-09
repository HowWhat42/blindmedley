import './css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { Layout } from './components/Layout/layout'
import { ThemeProvider } from './components/theme_provider'

const appName = import.meta.env.VITE_APP_NAME || 'BlindMedley'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title: string) => `${title} - ${appName}`,

  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    return pages[`./pages/${name}.tsx`]
  },

  setup({ el, App, props }) {
    const root = createRoot(el)

    const user = props.initialPage.props.user
    root.render(
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout user={user}>
          <App {...props} />
        </Layout>
      </ThemeProvider>
    )
  },
})
