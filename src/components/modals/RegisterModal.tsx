'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React, { useCallback, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import registerUser from '@/app/actions/registerUser'
import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import Modal from '@/components/modals/Modal'
import useRegisterModal from '@/hooks/useRegisterModal'
import type { RegisterForm } from '@/types/RegisterForm'
import { registerSchema } from '@/types/RegisterForm'

const RegisterModal = () => {
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { handleSubmit, control, reset, setError } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<RegisterForm> = useCallback(
    async (data) => {
      setIsLoading(true)
      try {
        const response = await registerUser(data)

        if (response.error) {
          response.error === 'Email is taken'
            ? setError('email', { type: 'manual', message: response.error })
            : toast('Something Went Wrong')

          return
        }

        toast.success('Account created.')

        await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
          callbackUrl: '/',
        })

        registerModal.onClose()
        reset()
        router.refresh()
      } catch (err) {
        toast.error('Something Went Wrong.')
      } finally {
        setIsLoading(false)
      }
    },
    [registerModal, setError, reset, router],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="email"
        name="email"
        label="Email"
        type="email"
        control={control}
        disabled={isLoading}
        required
      />
      <Input
        id="name"
        name="name"
        label="Name"
        type="text"
        control={control}
        disabled={isLoading}
        required
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type="password"
        control={control}
        disabled={isLoading}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google', { callbackUrl: '/' })}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github', { callbackUrl: '/' })}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Already have an account</div>
          <button
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={registerModal.onClose}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
