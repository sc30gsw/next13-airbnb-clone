'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { formatISO } from 'date-fns'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { useCallback, useMemo, useState } from 'react'
import type { Range } from 'react-date-range'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Heading from '@/components/Heading'
import Calendar from '@/components/inputs/Calendar'
import Counter from '@/components/inputs/Counter'
import CountrySelect from '@/components/inputs/CountrySelect'
import Modal from '@/components/modals/Modal'
import useSearchModal from '@/hooks/useSearchModal'
import type { CountrySelectValue } from '@/types/CountrySelectValue'
import type { SearchForm } from '@/types/SearchForm'
import { searchSchema } from '@/types/SearchForm'

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION)

  const stepSchemas = {
    [STEPS.LOCATION]: z.object({
      location: searchSchema.shape.location,
    }),
    [STEPS.DATE]: z.object({
      dateRange: searchSchema.shape.dateRange,
    }),
    [STEPS.INFO]: z.object({
      guestCount: searchSchema.shape.guestCount,
      roomCount: searchSchema.shape.roomCount,
      bathroomCount: searchSchema.shape.bathroomCount,
    }),
  }

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchForm>({
    resolver: zodResolver(stepSchemas[step]),
    defaultValues: {
      location: undefined,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      dateRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    },
  })

  const location = watch('location') as CountrySelectValue | undefined
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const dateRange: Range = watch('dateRange')

  const setCustomValue = (
    id: 'location' | 'guestCount' | 'roomCount' | 'bathroomCount' | 'dateRange',
    value: any,
  ) =>
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location],
  )

  const onBack = useCallback(() => setStep((prev) => prev - 1), [])
  const onNext = useCallback(() => setStep((prev) => prev + 1), [])

  const onSubmit: SubmitHandler<SearchForm> = useCallback(
    async (data) => {
      if (step !== STEPS.INFO) return onNext()

      let currentQuery = {}

      if (searchParams) currentQuery = qs.parse(searchParams.toString())

      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      }

      if (dateRange.startDate)
        updatedQuery.startDate = formatISO(dateRange.startDate)

      if (dateRange.endDate) updatedQuery.endDate = formatISO(dateRange.endDate)

      const url = qs.stringifyUrl(
        {
          url: '/',
          query: updatedQuery,
        },
        { skipNull: true },
      )

      setStep(STEPS.LOCATION)
      searchModal.onClose()
      router.push(url)
    },
    [
      bathroomCount,
      dateRange.endDate,
      dateRange.startDate,
      guestCount,
      location?.value,
      onNext,
      roomCount,
      router,
      searchModal,
      searchParams,
      step,
    ],
  )

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) return 'Search'

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) return undefined

    return 'Back'
  }, [step])

  let bodyContent: React.ReactElement

  switch (step) {
    case STEPS.DATE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everyone is free!"
          />
          <Calendar
            onChange={(value) => setCustomValue('dateRange', value.selection)}
            value={dateRange}
          />
        </div>
      )
      break

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="More information"
            subtitle="Find your perfect place!"
          />
          {errors.guestCount && (
            <span className="text-red-500">{errors.guestCount.message}</span>
          )}
          {errors.roomCount && (
            <span className="text-red-500">{errors.roomCount.message}</span>
          )}
          {errors.bathroomCount && (
            <span className="text-red-500">{errors.bathroomCount.message}</span>
          )}
          <Counter
            onChange={(value) => setCustomValue('guestCount', value)}
            value={guestCount}
            title="Guests"
            subtitle="How many guests are coming?"
          />
          <hr />
          <Counter
            onChange={(value) => setCustomValue('roomCount', value)}
            value={roomCount}
            title="Rooms"
            subtitle="How many rooms do you need?"
          />
          <hr />
          <Counter
            onChange={(value) => {
              setCustomValue('bathroomCount', value)
            }}
            value={bathroomCount}
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
          />
        </div>
      )
      break

    default:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where do you wanna go?"
            subtitle="Find the perfect location!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      )
      break
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  )
}

export default SearchModal
