import { getServerSession } from 'next-auth'

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/prismadb'

const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) return null

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!currentUser) return null

    return currentUser
  } catch (err) {
    return null
  }
}

export default getCurrentUser
