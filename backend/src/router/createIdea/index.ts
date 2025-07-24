import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const createIdeaTrpcRoute = trpc.procedure
  .meta({ description: 'Create an Idea' })
  .input(zCreateIdeaTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const existingIdea = await ctx.prisma.idea.findUnique({
      where: {
        nick: input.nick,
      },
    })

    if (existingIdea) {
      throw Error('Idea with this nick already exists!')
    }

    if (!ctx.me) {
      throw Error('UNAUTHORIZED')
    }

    await ctx.prisma.idea.create({
      data: {
        ...input,
        authorId: ctx.me.id,
      },
    })

    return true
  })
