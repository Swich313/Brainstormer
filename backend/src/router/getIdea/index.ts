import { z } from 'zod'

import { trpc } from '../../lib/trpc'

export const getIdeaTrpcRoute = trpc.procedure
  .meta({ description: 'Get a signle Idea' })
  .input(
    z.object({
      nick: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const idea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    })

    return { idea }
  })
