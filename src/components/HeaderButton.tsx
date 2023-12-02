'use client'

import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import type { SafeUser } from '@/types/SafeUser'

type HeaderButtonProps = {
  listingId: string
  currentUser?: SafeUser | null
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const hasFavorited = false
  const toggleFavorite = () => {}

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}

export default HeaderButton
