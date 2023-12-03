import './globals.css'

import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { getServerSession } from 'next-auth'

import ToasterProvider from '@/app/providers/ToasterProvider'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
import Navbar from '@/components/navbar/Navbar'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import authOptions from '@/libs/authOptions'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  const currentUser = await useFetchCurrentUser(session?.user?.id || '')
  return (
    <html lang="ja">
      <body className={nunito.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
