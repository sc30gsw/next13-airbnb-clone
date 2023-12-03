import type { Listing } from '@prisma/client'

const useFetchListings = async () => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/listing`, {
      cache: 'no-store',
    })

    const listings: Listing[] = await response.json()

    return listings
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default useFetchListings
