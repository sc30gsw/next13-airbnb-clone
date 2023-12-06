import { type NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.json([], { status: 200 })

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) return NextResponse.json([], { status: 200 })

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favoriteIds || [])],
        },
      },
    })

    return NextResponse.json(favorites, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
