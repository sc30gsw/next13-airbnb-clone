'use server'

import { getServerSession } from 'next-auth'

import authOptions from '@/libs/authOptions'
import prisma from '@/libs/prismadb'
import type { ListingForm } from '@/types/ListingForm'

const createListing = async (data: ListingForm) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) return { error: 'User not found' }

    const {
      category,
      title,
      description,
      location,
      guestCount,
      roomCount,
      bathroomCount,
      price,
      imageSrc,
    } = data

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location?.value as string,
        price: parseInt(price.toString()),
        userId: session.user.id,
      },
    })

    return { listing }
  } catch (err) {
    return { error: 'Internal Server Error' }
  }
}

export default createListing
