import { useNavigate, useParams } from 'react-router'
import { getViewIdeaRoute, type EditIdeaRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import type { TrpcRouterOutput } from '@brainstormer/backend/src/router'
import { pick } from 'lodash'
import { zUpdateIdeaTrpcInput } from '@brainstormer/backend/src/router/updateIdea/input'
import { Segment } from '../../components/Segment'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { useForm } from '../../lib/form'

const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']['idea']> }) => {
  const navigate = useNavigate()
  const updateIdea = trpc.updateIdea.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync({
        ...values,
        ideaId: idea.id,
      })
      navigate(getViewIdeaRoute({ nick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditIdeaPage = () => {
  const { nick } = useParams() as EditIdeaRouteParams

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

  if (!me) {
    return <span>You are not logged in</span>
  }

  if (me.id !== idea.authorId) {
    return <span>You are not authorized to edit this idea</span>
  }

  return <EditIdeaComponent idea={idea} />
}
