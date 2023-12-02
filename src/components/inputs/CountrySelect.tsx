'use client'

import React from 'react'
import Select from 'react-select'

import useCountries from '@/hooks/useCountries'
import type { CountrySelectValue } from '@/types/CountrySelectValue'

type CountrySelectProps = {
  value?: CountrySelectValue
  onChange: (value: CountrySelectValue) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries()

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(options: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>{options.flag}</div>
            <div>
              {options.label},{' '}
              <span className="text-neutral-500 ml-1">{options.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: { ...theme.colors, primary: 'black', primary25: '#ffe4e6' },
        })}
      />
    </div>
  )
}

export default CountrySelect
