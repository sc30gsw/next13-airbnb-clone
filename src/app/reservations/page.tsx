import { getServerSession } from 'next-auth'
import React from 'react'

import EmptyState from '@/components/EmptyState'
import ReservationsClient from '@/components/ReservationsClient'
import useFetchCurrentUser from '@/hooks/useFetchCurrentUser'
import useFetchReservations from '@/hooks/useFetchReservations'
import authOptions from '@/libs/authOptions'

const ReservationsPage = async () => {
  const session = await getServerSession(authOptions)
  const currentUser = await useFetchCurrentUser(session?.user?.id || '')
  const reservations = await useFetchReservations({
    params: { authorId: currentUser?.id },
  })

  if (!currentUser)
    return <EmptyState title="Unauthorized" subtitle="Please login" />

  if (reservations.length === 0)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties"
      />
    )

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  )
}

export default ReservationsPage
