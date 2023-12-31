'use server'

import prisma from '@/libs/prismadb'

type TParams = {
  params: { id: string; userId: string }
}

const deleteReservation = async ({ params }: TParams) => {
  try {
    if (!params.id || !params.userId) throw new Error('Invalid ID')

    // 該当のreservationIdかつ予約したユーザー自身である場合に削除
    const reservation = await prisma.reservation.delete({
      where: {
        id: params.id,
        OR: [{ userId: params.userId }, { listing: { userId: params.userId } }],
      },
    })

    return { reservation }
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default deleteReservation
