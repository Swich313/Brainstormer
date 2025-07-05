import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const x = 1

export const createIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(async ({ input, ctx }) => {
  const existingIdea = await ctx.prisma.idea.findUnique({
    where: {
      nick: input.nick,
    },
  })

  if (existingIdea) {
    throw Error('Idea with this nick already exists!')
  }

  await ctx.prisma.idea.create({
    data: input,
  })

  return true
})
