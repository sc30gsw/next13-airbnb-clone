import type { Listing } from '@prisma/client'

const useFetchFavoriteListings = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/favorites?userId=${userId}`,
      { cache: 'no-store' },
    )
    const listings: Listing[] = await response.json()

    return listings
  } catch (err) {
    throw new Error('Something Went Wrong')
  }
}

export default useFetchFavoriteListings
