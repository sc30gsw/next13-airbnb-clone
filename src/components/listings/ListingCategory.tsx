'use client'

import React from 'react'

type ListingCategoryProps = {
  label: string
  icon: React.JSX.Element
  description: string
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  label,
  icon,
  description,
}) => {
  const Icon = React.cloneElement(icon, {
    size: 40,
    className: 'text-neutral-600',
  })
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        {Icon}
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="font-light text-neutral-500">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory
