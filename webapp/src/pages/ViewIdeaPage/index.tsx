import { useParams } from 'react-router'
import type { ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Segment } from '../../components/Segment'

import styles from './index.module.scss'

export const ViewIdeaPage = () => {
  const { nick } = useParams() as ViewIdeaRouteParams
  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery({ nick })

  if (isLoading || isFetching) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  if (!data?.idea) {
    return <div>Idea not found</div>
  }

  return (
    <Segment title={data.idea.name} description={data.idea.description}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.idea.text }} />
    </Segment>
  )
}
