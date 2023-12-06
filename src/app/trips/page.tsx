import { getServerSession } from 'next-auth'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import TripsClient from '@/components/TripsClient'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchReservations from '@/hooks/useFetchReservations'
import authOptions from '@/libs/authOptions'

const TripsPage = async () => {
  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')
  const reservations = await useFetchReservations({
    params: { userId: currentUser?.id },
  })

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips."
      />
    )

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripsPage
