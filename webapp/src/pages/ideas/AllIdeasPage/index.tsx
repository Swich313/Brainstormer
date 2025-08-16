import { Link } from 'react-router'
import { trpc } from '../../../lib/trpc'
import { getViewIdeaRoute } from '../../../lib/routes'
import { Segment } from '../../../components/Segment'

import styles from './index.module.scss'

export const AllIdeasPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getIdeas.useQuery()

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Segment title="All ideas">
      <div className={styles.ideas}>
        {data?.ideas.map((idea) => (
          <div className={styles.idea} key={idea.nick}>
            <Segment
              title={
                <Link className={styles.ideaLink} to={getViewIdeaRoute({ nick: idea.nick })}>
                  {idea.name}
                </Link>
              }
              size={2}
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  )
}
