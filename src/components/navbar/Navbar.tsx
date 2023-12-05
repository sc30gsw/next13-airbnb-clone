import React from 'react'

import Container from '@/components/Container'
import Categories from '@/components/navbar/Categories'
import Logo from '@/components/navbar/Logo'
import Search from '@/components/navbar/Search'
import UserMenu from '@/components/navbar/UserMenu'
import type { SafeUser } from '@/types/SafeUser'

type NavbarProps = {
  currentUser?: SafeUser | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
