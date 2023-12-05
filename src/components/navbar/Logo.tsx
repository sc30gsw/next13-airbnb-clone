'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logo = () => {
  const router = useRouter()

  return (
    <Image
      onClick={() => router.push('/')}
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height={100}
      width={100}
      src="/images/logo.png"
    />
  )
}

export default Logo
