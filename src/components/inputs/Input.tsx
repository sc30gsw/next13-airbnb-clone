'use client'

import React from 'react'
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

type InputProps = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
}

type ExtendInputProps<T extends FieldValues> = UseControllerProps<T> &
  InputProps

const Input = <T extends FieldValues>({
  name,
  label,
  type,
  control,
  disabled,
  formatPrice,
  rules,
}: ExtendInputProps<T>) => {
  const { field, fieldState } = useController<T>({ name, control, rules })
  const { error } = fieldState

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      // 入力値を数値に変換
      field.onChange(e.target.valueAsNumber)
    } else {
      field.onChange(e.target.value)
    }
  }

  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <input
        {...field}
        onChange={onChange}
        type={type}
        disabled={disabled}
        placeholder=" "
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${error ? 'border-rose-500' : 'border-neutral-300'} ${
          error ? 'focus:border-rose-500' : 'focus:border-black'
        }`}
      />
      <label
        className={`absolute left-4 top-3 z-10 origin-[0] -translate-y-3 font-medium transition-all duration-200 ease-in-out ${
          formatPrice ? 'left-9' : 'left-4'
        } peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-0 peer-focus:scale-75 ${
          error ? 'text-rose-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export default Input
