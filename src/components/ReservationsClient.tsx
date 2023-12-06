'use client'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'

import deleteReservation from '@/app/actions/deleteReservation'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import useOnCancel from '@/hooks/useOnCancel'
import type { ReservationWithListing } from '@/types/ReservationWithListing'
import type { SafeUser } from '@/types/SafeUser'

type ReservationsClientProps = {
  reservations: ReservationWithListing[]
  currentUser?: SafeUser | null
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const { deletingId, onCancel } = useOnCancel(deleteReservation, currentUser)

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default ReservationsClient
