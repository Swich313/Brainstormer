import { useParams } from 'react-router'
import { format } from 'date-fns'

import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { Segment } from '../../components/Segment'

import styles from './index.module.scss'
import { LinkButton } from '../../components/Button'

export const ViewIdeaPage = () => {
  const { nick } = useParams() as ViewIdeaRouteParams
  const getIdeaResult = trpc.getIdea.useQuery({ nick })
  const getMeResult = trpc.getMe.useQuery()

  if (getIdeaResult.isLoading || getIdeaResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Idea not found</span>
  }

  const idea = getIdeaResult.data.idea
  const me = getMeResult.data?.me

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={styles.createdAt}>Created At: {format(idea.createdAt, 'dd MMMM yyyy HH:mm')}</div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      {me?.id === idea.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={getEditIdeaRoute({ nick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
}
