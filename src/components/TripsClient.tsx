'use client'

import React from 'react'

import deleteReservation from '@/app/actions/deleteReservation'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import useOnCancel from '@/hooks/useOnCancel'
import type { ReservationWithListing } from '@/types/ReservationWithListing'
import type { SafeUser } from '@/types/SafeUser'

type TripsClientProps = {
  reservations: ReservationWithListing[]
  currentUser?: SafeUser | null
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const { deletingId, onCancel } = useOnCancel(deleteReservation, currentUser)

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
