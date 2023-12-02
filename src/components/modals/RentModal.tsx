'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import createListing from '@/app/actions/createListing'
import Heading from '@/components/Heading'
import CategoryInput from '@/components/inputs/CategoryInput'
import Counter from '@/components/inputs/Counter'
import CountrySelect from '@/components/inputs/CountrySelect'
import ImageUpload from '@/components/inputs/ImageUpload'
import Input from '@/components/inputs/Input'
import Modal from '@/components/modals/Modal'
import { categories } from '@/components/navbar/Categories'
import useRentModal from '@/hooks/useRentModal'
import type { CountrySelectValue } from '@/types/CountrySelectValue'
import type { ListingForm } from '@/types/ListingForm'
import { listingSchema } from '@/types/ListingForm'

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const stepSchemas = {
    [STEPS.CATEGORY]: z.object({
      category: listingSchema.shape.category,
    }),
    [STEPS.LOCATION]: z.object({
      location: listingSchema.shape.location,
    }),
    [STEPS.INFO]: z.object({
      guestCount: listingSchema.shape.guestCount,
      roomCount: listingSchema.shape.roomCount,
      bathroomCount: listingSchema.shape.bathroomCount,
    }),
    [STEPS.IMAGES]: z.object({
      imageSrc: listingSchema.shape.imageSrc,
    }),
    [STEPS.DESCRIPTION]: z.object({
      title: listingSchema.shape.title,
      description: listingSchema.shape.description,
    }),
    [STEPS.PRICE]: z.object({
      price: listingSchema.shape.price,
    }),
  }

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ListingForm>({
    resolver: zodResolver(stepSchemas[step]),
    defaultValues: {
      category: '',
      location: undefined,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    },
  })

  const category = watch('category')
  const location = watch('location') as CountrySelectValue | undefined
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  const Map = useMemo(
    () => dynamic(() => import('../Map'), { ssr: false }),
    [location],
  )

  const setCustomValue = (
    id:
      | 'category'
      | 'location'
      | 'guestCount'
      | 'roomCount'
      | 'bathroomCount'
      | 'imageSrc',
    value: any,
  ) =>
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

  const onBack = () => setStep((prev) => prev - 1)
  const onNext = () => setStep((prev) => prev + 1)

  const onSubmit: SubmitHandler<ListingForm> = async (data) => {
    if (step !== STEPS.PRICE) return onNext()

    setIsLoading(true)

    try {
      const listingFormData = {
        category: getValues('category'),
        location: getValues('location'),
        guestCount: getValues('guestCount'),
        roomCount: getValues('roomCount'),
        bathroomCount: getValues('bathroomCount'),
        imageSrc: getValues('imageSrc'),
        title: getValues('title'),
        description: getValues('description'),
        price: getValues('price'),
      }

      const response = await createListing(listingFormData)

      if (response.error) return toast.error(response.error)

      toast.success('Listing create!')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()
    } catch (err) {
      toast.error('Something Went Wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const actionLabel = useMemo(
    () => (step === STEPS.PRICE ? 'Create' : 'Next'),
    [step],
  )

  const secondaryActionLabel = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : 'Back'),

    [step],
  )

  let bodyContent: React.ReactElement

  switch (step) {
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          {errors.location && (
            <span className="text-red-500">location is required</span>
          )}
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)}
          />
          <Map center={location?.latlng} />
        </div>
      )
      break

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about your place"
            subtitle="What amenities do you have?"
          />
          <Counter
            title="Guests"
            subtitle="How many guests do you Allow?"
            value={guestCount}
            onChange={(value) => setCustomValue('guestCount', value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you have?"
            value={roomCount}
            onChange={(value) => setCustomValue('roomCount', value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            value={bathroomCount}
            onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      )
      break

    case STEPS.IMAGES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue('imageSrc', value)}
          />
        </div>
      )
      break

    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place?"
            subtitle="Short and sweet works best!"
          />
          <Input
            id="title"
            label="Title"
            type="text"
            name="title"
            control={control}
            disabled={isLoading}
            required
          />
          <hr />
          <Input
            id="description"
            label="Description"
            type="text"
            name="description"
            control={control}
            disabled={isLoading}
            required
          />
          {/* Inputコンポーネントでfieldで一括展開しているため、hiddenとしてinputの紐づけを行う */}
          <div className="hidden">
            <Input
              id="price"
              label="Price"
              name="price"
              formatPrice
              type="number"
              control={control}
              disabled={isLoading}
            />
          </div>
        </div>
      )
      break

    case STEPS.PRICE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Now, set your price"
            subtitle="How much do you charge per night?"
          />
          {/* Inputコンポーネントでfieldで一括展開しているため、hiddenとしてinputの紐づけを行う */}
          <div className="hidden">
            <Input
              id="title"
              label="Title"
              type="text"
              name="title"
              control={control}
              disabled={isLoading}
              required
            />
            <Input
              id="description"
              label="Description"
              type="text"
              name="description"
              control={control}
              disabled={isLoading}
              required
            />
          </div>
          <Input
            id="price"
            label="Price"
            name="price"
            formatPrice
            type="number"
            control={control}
            disabled={isLoading}
            required
          />
        </div>
      )
      break

    default:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          {errors.category && (
            <span className="text-red-500">{errors.category.message}</span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category: string) =>
                    setCustomValue('category', category)
                  }
                  selected={category === item.label}
                  category={item}
                />
              </div>
            ))}
          </div>
        </div>
      )
      break
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  )
}

export default RentModal
