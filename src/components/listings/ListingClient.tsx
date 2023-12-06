'use client'

import type { Listing, Reservation, User } from '@prisma/client'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { Range } from 'react-date-range'
import toast from 'react-hot-toast'

import createReservation from '@/app/actions/createReservation'
import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'
import ListingReservation from '@/components/listings/ListingReservation'
import { categories } from '@/components/navbar/Categories'
import useLoginModal from '@/hooks/useLoginModal'
import type { SafeUser } from '@/types/SafeUser'

const initialDateRange: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

type ListingClientProps = {
  reservations?: Reservation[]
  listing: Listing & { user: User }
  currentUser?: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    const dates = reservations.flatMap((reservation) =>
      eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      }),
    )

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState(initialDateRange)

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen()

    try {
      setIsLoading(true)

      await createReservation({
        listingId: listing.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        userId: currentUser.id,
      })

      toast.success('Listing reserved!')
      setDateRange(initialDateRange)
      router.push('/trips')
      router.refresh()
    } catch (err) {
      toast.error('Something Went Wrong')
    } finally {
      setIsLoading(false)
    }
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    router,
    totalPrice,
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate,
      )

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price])

  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category],
  )

  return (
    <Container>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onChangeDate={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
