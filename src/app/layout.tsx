import NextAuthProvider from '@/app/providers/NextAuthProvider'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Header } from '../components/Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: 'Trips',
  description: 'Sistema de reserva de viagens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
