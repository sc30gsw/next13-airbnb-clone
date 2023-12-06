'use client'

import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import useFavorite from '@/hooks/useFavorite'
import type { SafeUser } from '@/types/SafeUser'

type HeaderButtonProps = {
  listingId: string
  currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeaderButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { favorited, toggleFavorite } = useFavorite({ listingId, currentUser })

  return (
    <div
      onClick={toggleFavorite}
      className="relative cursor-pointer transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />
      <AiFillHeart
        size={24}
        className={favorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default HeartButton
