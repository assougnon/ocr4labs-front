// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
// eslint-disable-next-line import/order
import { Figtree, Poppins } from 'next/font/google'


const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-primary',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-secondary',
});

export const metadata = {
  title: 'Ocr4Labs',
  description:
    'Optimisez le traitement des prescriptions avec la technologie avancée OCR et NLP'
}

const RootLayout = async (props: ChildrenType) => {
  const { children } = props

  // Vars

  const systemMode = await getSystemMode()
  const direction = 'ltr'

  return (
    <html id='__next'  dir={direction} suppressHydrationWarning>
      <body className={`flex is-full min-bs-full flex-auto flex-col ${figtree.variable} ${poppins.variable}`}>
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
