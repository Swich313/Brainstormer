import { Link } from 'react-router'
import { trpc } from '../../lib/trpc'
import { getViewIdeaRoute } from '../../lib/routes'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>All Ideas</h1>
      {data?.ideas.map((idea) => {
        return (
          <div key={idea.id}>
            <h2>
              <Link to={getViewIdeaRoute({ id: idea.id })}>{idea.name}</Link>
            </h2>
            <p>{idea.description}</p>
          </div>
        )
      })}
    </div>
  )
}
