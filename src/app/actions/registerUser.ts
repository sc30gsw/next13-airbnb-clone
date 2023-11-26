'use server'

import bcrypt from 'bcrypt'
import { revalidateTag } from 'next/cache'

import prisma from '@/libs/prismadb'
import type { RegisterForm } from '@/types/RegisterForm'

const registerUser = async (data: RegisterForm) => {
  try {
    const { name, email, password } = data

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) return { error: 'Email is taken' }

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

    revalidateTag('layout')
    return { user }
  } catch (err) {
    return { error: 'Internal Server Error' }
  }
}

export default registerUser
