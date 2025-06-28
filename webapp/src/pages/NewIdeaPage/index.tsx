import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { trpc } from '../../lib/trpc'

export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1, 'Name is Required!'),
        nick: z
          .string()
          .min(1, 'Nickname is Required!')
          .regex(/^[a-zA-Z0-9-]+$/, 'Nickname can only contain letters, numbers, and dashes!'),
        description: z.string().min(1, 'Description is Required!'),
        text: z.string().min(100, 'Text must be at least 100 characters long!'),
      }),
    ),
    // Uncomment the following lines to use the Formik validation function instead of zod
    // validate: (values) => {
    //   const errors: Partial<typeof values> = {}
    //   if (!values.name) {
    //     errors.name = 'Name is Required!'
    //   }
    //   if (!values.nick) {
    //     errors.nick = 'Nickname is Required!'
    //   } else if(!values.nick.match(/^[a-zA-Z0-9-]+$/)) {
    //     errors.nick = 'Nickname can only contain letters, numbers, and dashes!'
    //   }
    //   if (!values.description) {
    //     errors.description = 'Description is Required!'
    //   }
    //   if (!values.text) {
    //     errors.text = 'Text is Required!'
    //   } else if (values.text.length < 10) {
    //     errors.text = 'Text must be at least 100 characters long!'
    //   }
    //   return errors
    // },
    onSubmit: async (values) => {
      createIdea.mutateAsync(values)
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fields are invalid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
