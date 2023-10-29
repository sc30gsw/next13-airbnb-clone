import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import Navbar from '@/components/navbar/Navbar'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={nunito.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
