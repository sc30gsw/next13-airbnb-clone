import React from 'react'

import Container from '@/components/Container'
import Logo from '@/components/navbar/Logo'
import Search from '@/components/navbar/Search'
import UserMenu from '@/components/navbar/UserMenu'
import type { SafeUser } from '@/types/SafeUser'

type NavbarProps = {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
