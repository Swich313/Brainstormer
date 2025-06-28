import { z } from 'zod'

import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(({ input }) => {
    const idea = ideas.find((idea) => idea.id === input.id)
    return { idea: idea || null }
  })
