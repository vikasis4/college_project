import '@styles/globals.css'
import { Noto_Sans_JP } from 'next/font/google';
import Navbar from '@components/Navbar';
import { GeneralProvider } from '@context/general';
import { PreFunction } from '@preFunctions/preFunction';

const notoSansJapanese = Noto_Sans_JP({
  preload: false,
  variable: '--font-inter',
})

export const metadata = {
  title: 'Nit Kkr - pyq & notes',
  description: 'nit kkr - pyq & notes',
  icons:{
    icon:['/images/favicon.ico?v=4']
  }
}

function RootLayout({ children }) {


  return (

    <html>
      <body>
        <main className={`${notoSansJapanese.variable} font-sans `}>
          <GeneralProvider>

              <Navbar />
              {children}
              <PreFunction />

          </GeneralProvider>
        </main>
      </body>
    </html>

  )
}

export default RootLayout