import { useParams } from 'react-router'
import { format } from 'date-fns'

import { getEditIdeaRoute, type ViewIdeaRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { Segment } from '../../../components/Segment'

import styles from './index.module.scss'
import { LinkButton } from '../../../components/Button'
import { withPageWrapper } from '../../../lib/pageWrapper'

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { nick } = useParams() as ViewIdeaRouteParams
    return trpc.getIdea.useQuery({ nick })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    idea: checkExists(queryResult.data.idea),
    me: ctx.me,
  }),
})(({ idea, me }) => {
  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={styles.createdAt}>Created At: {format(idea.createdAt, 'dd MMMM yyyy HH:mm')}</div>
      <div className={styles.author}>
        Author: {idea.author.nick}
        {idea.author.name ? ` (${idea.author.name})` : ''}
      </div>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: idea.text }} />
      {me?.id === idea.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={getEditIdeaRoute({ nick: idea.nick })}>Edit Idea</LinkButton>
        </div>
      )}
    </Segment>
  )
})
