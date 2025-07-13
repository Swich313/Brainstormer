import { trpc } from '../../lib/trpc'
import { getPasswordHash } from '../../utils/getPasswordHash'
import { zLoginTrpcInput } from './input'

export const loginTrpcRoute = trpc.procedure
  .meta({ description: 'Login' })
  .input(zLoginTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    })

    if (!user) {
      throw Error('Invalid credentials!')
    }

    return true
  })
