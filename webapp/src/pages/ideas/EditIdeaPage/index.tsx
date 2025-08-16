import { useNavigate, useParams } from 'react-router'
import { getViewIdeaRoute, type EditIdeaRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import { pick } from 'lodash'
import { zUpdateIdeaTrpcInput } from '@brainstormer/backend/src/router/ideas/updateIdea/input'
import { Segment } from '../../../components/Segment'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Textarea } from '../../../components/Textarea'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { nick } = useParams() as EditIdeaRouteParams
    return trpc.getIdea.useQuery({
      nick,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found')
    checkAccess(ctx.me?.id === idea.authorId, 'An idea can only be edited by the author')
    return { idea }
  },
})(({ idea }) => {
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
})
