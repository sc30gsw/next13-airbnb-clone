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
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        {...field}
        onChange={onChange}
        type={type}
        disabled={disabled}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${error ? 'border-rose-500' : 'border-neutral-300'} ${
          error ? 'focus:border-rose-500' : 'focus:border-black'
        }`}
      />
      <label
        className={`absolute font-medium duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? 'left-9' : 'left-4'
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
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
