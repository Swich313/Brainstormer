import { zUpdateProfileTrpcInput } from '@brainstormer/backend/src/router/auth/updateProfile/input'
import { trpc } from '../../../lib/trpc'
import type { TrpcRouterOutput } from '@brainstormer/backend/src/router'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { useForm } from '../../../lib/form'
import { Segment } from '../../../components/Segment'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { z } from 'zod'
import { zUpdatePasswordTrpcInput } from '@brainstormer/backend/src/router/auth/updatePassword/input'

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
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
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Nick" name="nick" formik={formik} />
        <Input label="Name" name="name" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordConfirm: z.string().min(1),
      })
      .superRefine((values, ctx) => {
        if (values.newPassword !== values.newPasswordConfirm) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'New passwords do not match',
            path: ['newPasswordConfirm'],
          })
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'Password updated successfully!',
    resetOnSuccess: true,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="Old Password" name="oldPassword" type="password" formik={formik} />
        <Input label="New Password" name="newPassword" type="password" formik={formik} />
        <Input label="Confirm New Password" name="newPasswordConfirm" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Password</Button>
      </FormItems>
    </form>
  )
}

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({ me: getAuthorizedMe() }),
})(({ me }) => {
  return (
    <Segment title="Edit Profile">
      <Segment title="General" size={2}>
        <General me={me} />
      </Segment>
      <Segment title="Password" size={2}>
        <Password />
      </Segment>
    </Segment>
  )
})
