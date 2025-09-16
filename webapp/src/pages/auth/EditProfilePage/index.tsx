import { zUpdateProfileTrpcInput } from '@brainstormer/backend/src/router/auth/updateProfile/input'
import { trpc } from '../../../lib/trpc'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { useForm } from '../../../lib/form'
import { Segment } from '../../../components/Segment'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ ctx }) => ({ me: ctx.me! }),
})(({ me }) => {
  const trpcUtils = trpc.useUtils()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'Profile updated successfully!',
    resetOnSuccess: false,
  })

  return (
    <Segment title="Edit Profile">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Name" name="name" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Profile</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
