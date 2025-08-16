import { trpc } from '../../../lib/trpc'
import { getPasswordHash } from '../../../utils/getPasswordHash'
import { signJWT } from '../../../utils/signJWT'
import { zSignUpTrpcInput } from './input'

export const signUpTrpcRoute = trpc.procedure
  .meta({ description: 'Sign up' })
  .input(zSignUpTrpcInput)
  .mutation(async ({ input, ctx }) => {
    const existingUser = await ctx.prisma.user.findUnique({
      where: {
        nick: input.nick,
      },
    })

    if (existingUser) {
      throw Error('User with this nick already exists!')
    }

    const user = await ctx.prisma.user.create({
      data: {
        nick: input.nick,
        password: getPasswordHash(input.password),
      },
    })

    const token = signJWT(user.id)
    return { token }
  })
