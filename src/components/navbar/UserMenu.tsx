'use client'

import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import Avatar from '@/components/Avatar'
import MenuItem from '@/components/navbar/MenuItem'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import useRentModal from '@/hooks/useRentModal'
import type { SafeUser } from '@/types/SafeUser'

type UserMenuProps = {
  currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  const toggleOpen = useCallback(() => setIsOpen((value) => !value), [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <div>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => router.push('/favorites')}
                  label="My favorites"
                />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => router.push('/properties')}
                  label="My properties"
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </div>
            ) : (
              <div>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
