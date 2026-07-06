import z from 'zod'

export const userZodSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password cant not be more than 20' }),
})
