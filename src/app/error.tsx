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
    <div className="mt-20 flex flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl">Something went wrong</h1>
      <button className="font-semibold text-rose-500" onClick={() => reset()}>
        Try again
      </button>
    </div>
  )
}

export default Error
