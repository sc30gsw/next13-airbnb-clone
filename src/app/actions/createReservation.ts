'use server'

import prisma from '@/libs/prismadb'

type CreateReservationInput = {
  listingId: string
  totalPrice: number
  startDate?: Date
  endDate?: Date
  userId: string
}

const createReservation = async (data: CreateReservationInput) => {
  try {
    const { listingId, totalPrice, startDate, endDate, userId } = data

    if (!listingId || !totalPrice || !startDate || !endDate || !userId)
      throw new Error('Invalid Request')

    const listingAndReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: { create: { totalPrice, startDate, endDate, userId } },
      },
    })

    return { listingAndReservation }
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default createReservation
