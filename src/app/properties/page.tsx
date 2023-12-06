import { getServerSession } from 'next-auth'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import PropertiesClient from '@/components/PropertiesClient'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchListings from '@/hooks/useFetchListings'
import authOptions from '@/libs/authOptions'

const PropertiesPage = async () => {
  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')
  const listings = await useFetchListings({ userId: currentUser?.id })

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />

  if (listings.length === 0)
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    )

  return <PropertiesClient listings={listings} currentUser={currentUser} />
}

export default PropertiesPage
