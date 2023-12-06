import type { Listing, Reservation } from '@prisma/client'

export type ReservationWithListing = Reservation & { listing: Listing }
