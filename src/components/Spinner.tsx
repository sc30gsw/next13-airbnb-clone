import React from 'react'

const Spinner = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <div className="relative h-10 w-10 animate-ping rounded-full border-2 border-red-500 ease-linear">
        <div className="absolute right-[10px] top-[10px] h-4 w-4 animate-ping rounded-full border border-red-500 ease-linear" />
      </div>
    </div>
  )
}

export default Spinner
