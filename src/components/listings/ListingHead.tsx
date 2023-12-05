'use client'

import Image from 'next/image'
import React, { useMemo } from 'react'

import Heading from '@/components/Heading'
import HeartButton from '@/components/HeartButton'
import useCountries from '@/hooks/useCountries'
import type { SafeUser } from '@/types/SafeUser'

type ListingHeadProps = {
  id: string
  title: string
  imageSrc: string
  locationValue: string
  currentUser?: SafeUser | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}) => {
  const { getByValue } = useCountries()
  const location = useMemo(
    () => getByValue(locationValue),
    [getByValue, locationValue],
  )

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          fill
          alt="Image"
          src={imageSrc}
          className="w-full object-cover"
        />
        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
