'use server'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const GET = async (req: NextRequest) => {
  try {
    if (req.method !== 'GET')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId)
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 })

    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!currentUser)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })

    return NextResponse.json(
      {
        ...currentUser,
        createdAt: currentUser.createdAt.toISOString(),
        updatedAt: currentUser.updatedAt.toISOString(),
        emailVerified: currentUser.emailVerified?.toISOString() || null,
      },
      { status: 200 },
    )
  } catch (err) {
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
