import type { Listing } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import ListingClient from '@/components/listings/ListingClient'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchListing from '@/hooks/useFetchListing'
import authOptions from '@/libs/authOptions'

type ListingPageParams = {
  params: { listingId: string }
}

export const generateStaticParams = async () => {
  const listings: Listing[] = await fetch(
    `${process.env.API_BASE_URL}/api/listing`,
  ).then((res) => res.json())

  return listings.map((listing) => ({
    listingId: listing.id,
  }))
}

const ListingPage: React.FC<ListingPageParams> = async ({ params }) => {
  const listing = await useFetchListing(params.listingId)

  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')

  if (!listing) return <EmptyState />

  return <ListingClient listing={listing} currentUser={currentUser} />
}

export default ListingPage
