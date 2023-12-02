'use client'

import React from 'react'

type CategoryInputProps = {
  onClick: (category: string) => void
  selected?: boolean
  category: { label: string; icon: JSX.Element; description: string }
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  category,
}) => {
  const Icon = React.cloneElement(category.icon, { size: 30 })

  return (
    <div
      onClick={() => onClick(category.label)}
      className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${
        selected ? 'border-black' : 'border-neutral-200'
      }`}
    >
      {Icon}
      <div className="font-semibold">{category.label}</div>
    </div>
  )
}

export default CategoryInput
