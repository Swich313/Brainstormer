import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

// const ideas = [
//   { id: 'cool-idea-nick-1', name: 'Idea 1', description: 'Description of Idea 1...' },
//   { id: 'cool-idea-nick-2', name: 'Idea 2', description: 'Description of Idea 2...' },
//   { id: 'cool-idea-nick-3', name: 'Idea 3', description: 'Description of Idea 3...' },
//   { id: 'cool-idea-nick-4', name: 'Idea 4', description: 'Description of Idea 4...' },
//   { id: 'cool-idea-nick-5', name: 'Idea 5', description: 'Description of Idea 5...' },
// ]

const ideas = _.times(100, (i) => ({
  id: `cool-idea-nick-${i + 1}`,
  name: `Idea ${i + 1}`,
  description: `Description of Idea ${i + 1}...`,
  text: _.times(100, (j) => `<p>Text paragraph ${j + 1} of the idea ${i + 1}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas: ideas.map((idea) => _.pick(idea, ['id', 'name', 'description'])) }
  }),
  getIdea: trpc.procedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.id === input.id)
      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
