'use client'

import type { User } from '@prisma/client'
import dynamic from 'next/dynamic'
import React from 'react'

import Avatar from '@/components/Avatar'
import ListingCategory from '@/components/listings/ListingCategory'
import useCountries from '@/hooks/useCountries'
import type { Category } from '@/types/Category'

const Map = dynamic(() => import('../Map'), { ssr: false })

type ListingInfoProps = {
  user: User
  category?: Category
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries()
  const coordinates = getByValue(locationValue)?.latlng

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div>Hosted by {user.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          label={category.label}
          icon={category.icon}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  )
}

export default ListingInfo
