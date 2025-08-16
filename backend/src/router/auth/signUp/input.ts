import { z } from 'zod'

export const zSignUpTrpcInput = z.object({
  nick: z
    .string()
    .min(1, 'Nickname is Required!')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nickname can only contain letters, numbers, and dashes!'),
  password: z.string().min(1, 'Password is Required!'),
})
