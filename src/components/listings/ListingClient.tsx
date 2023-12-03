'use client'

import type { Listing, Reservation, User } from '@prisma/client'
import React, { useMemo } from 'react'

import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'
import { categories } from '@/components/navbar/Categories'
import type { SafeUser } from '@/types/SafeUser'

type ListingClientProps = {
  reservations?: Reservation[]
  listing: Listing & { user: User }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations,
  listing,
  currentUser,
}) => {
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category],
  )

  return (
    <Container>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
