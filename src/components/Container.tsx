'use client'

import React from 'react'

type ContainerProps = {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="xl:px20 mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10">
      {children}
    </div>
  )
}

export default Container
