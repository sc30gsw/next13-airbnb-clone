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
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          fill
          alt="Image"
          src={imageSrc}
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
