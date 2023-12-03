import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const GET = async (req: NextRequest) => {
  try {
    const listings = await prisma.listing.findMany({
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
