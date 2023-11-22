import bcrypt from 'bcrypt'
import { type NextRequest, NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'

export const POST = async (req: NextRequest) => {
  try {
    if (req.method !== 'POST')
      return NextResponse.json({ message: 'Bad Request' }, { status: 405 })

    const { email, name, password } = await req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser)
      return NextResponse.json({ message: 'Email is taken' }, { status: 422 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
