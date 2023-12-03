import type { Listing, User } from '@prisma/client'

const useFetchListing = async (listingId: string) => {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/api/listing/${listingId}`,
    )
    const listing: Listing & { user: User } = await response.json()

    return listing
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default useFetchListing
