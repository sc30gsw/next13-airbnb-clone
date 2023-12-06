'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { useCallback } from 'react'

type CategoryBoxProps = {
  category: { label: string; icon: JSX.Element; description: string }
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ category, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) currentQuery = qs.parse(params.toString())

    const updateQuery: { category?: string } = {
      ...currentQuery,
      category: category.label,
    }

    if (params.get('category') === category.label) delete updateQuery.category

    const url = qs.stringifyUrl(
      { url: '/', query: updateQuery },
      { skipNull: true },
    )

    router.push(url)
  }, [category.label, params, router])

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected ? 'border-b-neutral-800' : 'border-transparent'
      } ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}
    >
      {category.icon}
      <div className="text-sm font-medium">{category.label}</div>
    </div>
  )
}

export default CategoryBox
