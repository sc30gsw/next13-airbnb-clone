'use server'

import prisma from '@/libs/prismadb'

type TParams = {
  params: { id: string; userId: string }
}
const deleteListing = async ({ params }: TParams) => {
  try {
    if (!params.id || !params.userId) throw new Error('Invalid ID')

    const listing = await prisma.listing.delete({
      where: { id: params.id, userId: params.userId },
    })

    return { listing }
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default deleteListing
