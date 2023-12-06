import type { Range } from 'react-date-range'
import z from 'zod'

const dateRangeSchema = z
  .object({
    startDate: z.date(),
    endDate: z.date(),
    key: z.string(),
  })
  .refine((value) => value.startDate <= value.endDate, {
    message: 'startDate must be less than or equal to endDate',
    path: ['dateRange'],
  })

export const searchSchema = z.object({
  location: z
    .object({
      value: z.string().max(128, 'please enter at max 128 characters'),
    })
    .optional(),
  guestCount: z.number().min(1, 'The number must be greater than 0'),
  roomCount: z.number().min(1, 'The number must be greater than 0'),
  bathroomCount: z.number().min(1, 'The number must be greater than 0'),
  dateRange: dateRangeSchema,
})

export type SearchForm = z.infer<typeof searchSchema>
