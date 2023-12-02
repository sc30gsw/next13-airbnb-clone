import z from 'zod'

export const listingSchema = z.object({
  category: z
    .string()
    .min(1, 'category is required')
    .max(128, 'please enter at max 128 characters'),
  title: z
    .string()
    .min(1, 'title is required')
    .max(128, 'please enter at max 128 characters'),
  description: z
    .string()
    .min(1, 'description is required')
    .max(256, 'please enter at max 256 characters'),
  location: z.object({
    value: z
      .string()
      .min(1, 'location is required')
      .max(128, 'please enter at max 128 characters'),
  }),
  guestCount: z.number().min(1, 'The number must be greater than 0'),
  roomCount: z.number().min(1, 'The number must be greater than 0'),
  bathroomCount: z.number(),
  price: z.number().min(1, 'The number must be greater than 0'),
  imageSrc: z.string().min(1, 'image is required').max(224, 'please enter at'),
})

export type ListingForm = z.infer<typeof listingSchema>
