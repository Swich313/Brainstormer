import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: z.string().min(1, 'Name is Required!'),
  nick: z
    .string()
    .min(1, 'Nickname is Required!')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nickname can only contain letters, numbers, and dashes!'),
  description: z.string().min(1, 'Description is Required!'),
  text: z.string().min(100, 'Text must be at least 100 characters long!'),
})
