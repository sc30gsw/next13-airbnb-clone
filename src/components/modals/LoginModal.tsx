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

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import Modal from '@/components/modals/Modal'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { type LoginForm, loginSchema } from '@/types/LoginForm'

const LoginModal = () => {
  const router = useRouter()
  const LoginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, reset } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginForm> = useCallback(
    async (data) => {
      setIsLoading(true)
      try {
        await signIn('credentials', {
          ...data,
          redirect: false,
          callbackUrl: '/',
        })

        toast.success('Logged in.')
        router.refresh()
        LoginModal.onClose()
        reset()
      } catch (err) {
        toast.error('Something Went Wrong.')
      } finally {
        setIsLoading(false)
      }
    },
    [LoginModal, reset, router],
  )

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
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
    <div className="mt-3 flex flex-col gap-4">
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
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>First time using Airbnb?</div>
          <button
            className="cursor-pointer text-neutral-800 hover:underline"
            onClick={() => {
              LoginModal.onClose()
              registerModal.onOpen()
            }}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={LoginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
