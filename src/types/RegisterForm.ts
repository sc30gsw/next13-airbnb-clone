import z from 'zod'

export const registerSchema = z.object({
  name: z.string().min(8, 'please enter at latest 8 characters'),
  email: z.string().min(1, 'required').email('format is incorrect'),
  password: z
    .string()
    .min(8, 'please enter at least 8 characters')
    .refine(
      (password: string) => /[A-Za-z]/.test(password) && /[0-9]/.test(password),
      'password must contain both letters and numbers',
    ),
})

export type RegisterForm = z.infer<typeof registerSchema>
