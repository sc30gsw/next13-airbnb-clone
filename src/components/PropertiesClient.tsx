'use client'

import type { Listing } from '@prisma/client'
import React from 'react'

import deleteListing from '@/app/actions/deleteListing'
import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import useOnDelete from '@/hooks/useOnDelete'
import type { SafeUser } from '@/types/SafeUser'

type PropertiesClientProps = {
  listings: Listing[]
  currentUser?: SafeUser | null
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const { deletingId, onDelete } = useOnDelete(deleteListing, currentUser)

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div
        className="
        mt-10
        grid 
        grid-cols-1 
        gap-8 
        sm:grid-cols-2 
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      "
      >
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onDelete}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
