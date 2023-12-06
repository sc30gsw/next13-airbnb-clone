import { getServerSession } from 'next-auth'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import FavoritesClient from '@/components/FavoritesClient'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchFavoriteListings from '@/hooks/useFetchFavoriteListings'
import authOptions from '@/libs/authOptions'

const FavoritesPage = async () => {
  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')
  const listings = await useFetchFavoriteListings(currentUser?.id)

  if (listings.length === 0)
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings"
      />
    )
  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage
