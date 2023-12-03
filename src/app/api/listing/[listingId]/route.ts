import { type NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

type TParams = {
  params: { listingId: string }
}

export const GET = async (req: NextRequest, { params }: TParams) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    if (!params.listingId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const listing = await prisma.listing.findUnique({
      where: { id: params.listingId },
      include: { user: true },
    })

    if (!listing)
      return NextResponse.json(
        { message: 'Listing not found' },
        { status: 404 },
      )

    return NextResponse.json(listing, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
