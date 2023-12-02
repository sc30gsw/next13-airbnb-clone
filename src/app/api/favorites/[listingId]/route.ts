import { type NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

type FavoritesListingParams = {
  params: { listingId: string }
}

export const POST = async (
  req: NextRequest,
  { params }: FavoritesListingParams,
) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request', status: 405 })

    const { userId } = await req.json()
    console.log('🚀 ~ file: route.ts:18 ~ userId:', userId, params.listingId)

    if (!userId || !params.listingId)
      return NextResponse.json({ message: 'Invalid ID', status: 400 })

    const currentUser = await prisma.user.findUnique({ where: { id: userId } })

    if (!currentUser)
      return NextResponse.json({ message: 'Not signed in', status: 403 })

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds.push(params.listingId)

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    })

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 })
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: FavoritesListingParams,
) => {
  try {
    if (req.method !== 'DELETE')
      return NextResponse.json({ message: 'Bad Request', status: 405 })

    const { userId } = await req.json()

    if (!userId || !params.listingId)
      return NextResponse.json({ message: 'Invalid ID', status: 400 })

    const currentUser = await prisma.user.findUnique({ where: { id: userId } })

    if (!currentUser)
      return NextResponse.json({ message: 'Not signed in', status: 403 })

    let favoriteIds = [...(currentUser.favoriteIds || [])]

    favoriteIds = favoriteIds.filter((id) => id !== params.listingId)

    const user = await prisma.user.update({
      where: { id: currentUser.id },
      data: { favoriteIds },
    })

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    return NextResponse.json({ message: 'Internal Server Error', status: 500 })
  }
}
