import React from 'react'

const Spinner = ({ color = 'border-rose-500' }: { color?: string }) => {
  return (
    <div className="my-24 flex justify-center">
      <div
        className={`h-10 w-10 animate-spin rounded-full border-4 ${color} border-t-transparent`}
      ></div>
    </div>
  )
}

export default Spinner
