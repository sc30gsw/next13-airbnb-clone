import { type NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const listingId = searchParams.get('listingId')
    const userId = searchParams.get('userId')
    const authorId = searchParams.get('authorId')

    const query: {
      listingId?: string
      userId?: string
      listing?: { userId?: string }
    } = {}

    if (listingId) query.listingId = listingId

    if (userId) query.userId = userId

    if (authorId) query.listing = { userId: authorId }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(reservations, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
