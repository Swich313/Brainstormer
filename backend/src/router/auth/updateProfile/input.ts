import { z } from 'zod'

export const zUpdateProfileTrpcInput = z.object({
  nick: z
    .string()
    .min(1, 'Nickname is Required!')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nickname can only contain letters, numbers, and dashes!'),
  name: z.string().max(50).default(''),
})
