import { trpc } from '../../lib/trpc'
import { zUpdateIdeaTrpcInput } from './input'

export const updateIdeaTrpcRoute = trpc.procedure
  .meta({ description: 'Update an Idea' })
  .input(zUpdateIdeaTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const { ideaId, ...updateData } = input

    if (!ctx.me) {
      throw Error('UNAUTHORIZED')
    }

    const idea = await ctx.prisma.idea.findUnique({
      where: {
        id: ideaId,
      },
    })

    if (!idea) {
      throw Error('NOT_FOUND')
    }

    if (idea.authorId !== ctx.me.id) {
      throw Error('NOT_YOUR_IDEA')
    }

    if (idea.nick !== updateData.nick) {
      const prevIdea = await ctx.prisma.idea.findUnique({
        where: { nick: updateData.nick },
      })

      if (prevIdea) {
        throw Error('Idea with this nick already exists!')
      }
    }

    await ctx.prisma.idea.update({
      where: { id: ideaId },
      data: { ...updateData },
    })

    return true
  })
