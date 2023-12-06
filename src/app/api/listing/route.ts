import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import type { ListingsParams } from '@/types/ListngsParams'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const guestCount = searchParams.get('guestCount')
    const roomCount = searchParams.get('roomCount')
    const bathroomCount = searchParams.get('bathroomCount')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const locationValue = searchParams.get('locationValue')
    const category = searchParams.get('category')

    const query: any = {}

    if (userId) query.userId = userId
    if (locationValue) query.locationValue = locationValue
    if (category) query.category = category
    if (guestCount)
      query.guestCount = {
        gte: +guestCount,
      }
    if (roomCount)
      query.roomCount = {
        gte: +roomCount,
      }
    if (bathroomCount)
      query.bathroomCount = {
        gte: +bathroomCount,
      }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(listings, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
