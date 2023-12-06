import type { ReservationWithListing } from '@/types/ReservationWithListing'

type TParams = {
  params: { listingId?: string; userId?: string; authorId?: string }
}

const useFetchReservations = async ({ params }: TParams) => {
  try {
    let url = `${process.env.API_BASE_URL}/api/reservations`

    const queryParams = new URLSearchParams()

    if (params.listingId) queryParams.append('listingId', params.listingId)

    if (params.userId) queryParams.append('userId', params.userId)
    if (params.authorId) queryParams.append('authorId', params.authorId)

    url += '?' + queryParams.toString()

    const response = await fetch(url, { cache: 'no-store' })
    const reservations: ReservationWithListing[] = await response.json()

    return reservations
  } catch (err) {
    throw new Error('Something Went Wrong')
  }
}

export default useFetchReservations
