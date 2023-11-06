'use client'

import React from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

import type { RegisterForm } from '@/types/RegisterForm'

type InputProps = {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<RegisterForm>
  errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id as 'name' | 'email' | 'password', { required })}
        placeholder=" "
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${
          errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
        }`}
      />
      <label
        className={`absolute font-medium duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
          formatPrice ? 'left-9' : 'left-4'
        } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors[id] ? 'text-rose-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
      {errors[id] && (
        <span className="text-red-500">{errors[id]?.message as string}</span>
      )}
    </div>
  )
}

export default Input
