import type { Listing } from '@prisma/client'

const useFetchListings = async (userId?: string) => {
  try {
    let url = `${process.env.API_BASE_URL}/api/listing`

    const queryParams = new URLSearchParams()

    if (userId) queryParams.append('userId', userId)

    url += '?' + queryParams.toString()

    const response = await fetch(url, { cache: 'no-store' })
    const listings: Listing[] = await response.json()

    return listings
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default useFetchListings
