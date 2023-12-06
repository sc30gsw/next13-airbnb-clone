'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'
import { BsSnow } from 'react-icons/bs'
import { FaSkiing } from 'react-icons/fa'
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from 'react-icons/gi'
import { IoDiamond } from 'react-icons/io5'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'

import CategoryBox from '@/components/CategoryBox'
import Container from '@/components/Container'
import type { Category } from '@/types/Category'

export const categories: Category[] = [
  {
    label: 'Beach',
    icon: <TbBeach size={26} />,
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    icon: <GiWindmill size={26} />,
    description: 'This property has windmills!',
  },
  {
    label: 'Modern',
    icon: <MdOutlineVilla size={26} />,
    description: 'This property is modern!',
  },
  {
    label: 'Country',
    icon: <TbMountain size={26} />,
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    icon: <TbPool size={26} />,
    description: 'This property has a pool!',
  },
  {
    label: 'Islands',
    icon: <GiIsland size={26} />,
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    icon: <GiBoatFishing size={26} />,
    description: 'This property is close to lake!',
  },
  {
    label: 'Skiing',
    icon: <FaSkiing size={26} />,
    description: 'This property has skiing activities!',
  },
  {
    label: 'Castles',
    icon: <GiCastle size={26} />,
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    icon: <GiCaveEntrance size={26} />,
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    icon: <GiForestCamp size={26} />,
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    icon: <BsSnow size={26} />,
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    icon: <GiCactus size={26} />,
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    icon: <GiBarn size={26} />,
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    icon: <IoDiamond size={26} />,
    description: 'This property is brand new and luxurious!',
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params.get('category')
  const pathname = usePathname()

  const isMiniPage = pathname === '/'

  if (!isMiniPage) return null
  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            category={item}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  )
}

export default Categories
