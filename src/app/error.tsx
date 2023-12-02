'use client'

import React, { useEffect } from 'react'

type ErrorProps = {
  error: Error
  reset: () => void
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    console.log('Error: ', error)
  }, [error])

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-3xl mb-4">Something went wrong</h1>
      <button className="text-rose-500 font-semibold" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}

export default Error
