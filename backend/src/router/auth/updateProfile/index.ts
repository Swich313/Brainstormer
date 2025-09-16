import { toClientMe } from '../../../lib/models'
import { trpc } from '../../../lib/trpc'
import { zUpdateProfileTrpcInput } from './input'

export const updateProfileTrpcRoute = trpc.procedure.input(zUpdateProfileTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }

  if (ctx.me.nick !== input.nick) {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (existingUser) {
      throw new Error('User with this nick already exists!')
    }
  }

  const updatedMe = await ctx.prisma.user.update({
    where: {
      id: ctx.me.id,
    },
    data: input,
  })

  ctx.me = updatedMe
  return toClientMe(updatedMe)
})
