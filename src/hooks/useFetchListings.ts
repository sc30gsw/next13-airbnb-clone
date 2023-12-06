import type { Listing } from '@prisma/client'

import type { ListingsParams } from '@/types/ListngsParams'

const useFetchListings = async (params?: ListingsParams) => {
  try {
    let url = `${process.env.API_BASE_URL}/api/listing`

    const queryParams = new URLSearchParams()

    if (params?.userId) queryParams.append('userId', params.userId)
    if (params?.guestCount)
      queryParams.append('guestCount', params.guestCount.toString())
    if (params?.roomCount)
      queryParams.append('roomCount', params.roomCount.toString())
    if (params?.bathroomCount)
      queryParams.append('bathroomCount', params.bathroomCount.toString())
    if (params?.startDate) queryParams.append('startDate', params.startDate)
    if (params?.endDate) queryParams.append('endDate', params.endDate)
    if (params?.locationValue)
      queryParams.append('locationValue', params.locationValue)
    if (params?.category) queryParams.append('category', params.category)

    url += '?' + queryParams.toString()

    const response = await fetch(url, { cache: 'no-store' })
    const listings: Listing[] = await response.json()

    return listings
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

export default useFetchListings
