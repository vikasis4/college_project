import '@styles/globals.css'
import { Noto_Sans_JP } from 'next/font/google';
import Navbar from '@components/Navbar';
import { GeneralProvider } from '@context/general';

const notoSansJapanese = Noto_Sans_JP({
  preload: false,
  variable: '--font-inter',
})

export const metadata = {
  title: 'Bro is working',
  description: 'we will going towork on it'
}

function RootLayout({ children }) {
  return (

    <html>
      <body>
        <main className={`${notoSansJapanese.variable} font-sans `}>
          <GeneralProvider>
            <Navbar />
            {children}
          </GeneralProvider>
        </main>
      </body>
    </html>

  )
}

export default RootLayout