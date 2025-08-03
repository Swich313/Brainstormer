import { trpc } from '../../lib/trpc'
import { zSignUpTrpcInput } from '@brainstormer/backend/src/router/signUp/input'
import { z } from 'zod'
import Cookies from 'js-cookie'

import { Alert } from '../../components/Alert'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { FormItems } from '../../components/FormItems'
import { Button } from '../../components/Button'
import { useForm } from '../../lib/form'
import { withPageWrapper } from '../../lib/pageWrapper'

export const SignUpPage = withPageWrapper({
  redirectAuthorized: true,
})(() => {
  const trpcUtils = trpc.useUtils()
  const signUp = trpc.signUp.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: zSignUpTrpcInput.extend({ confirmPassword: z.string().min(1) }).superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match',
          path: ['confirmPassword'],
        })
      }
    }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('token', token, { expires: 7 }) // Store token in cookies for 7 days
      trpcUtils.invalidate()
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="Sign Up">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} />
          <Input name="confirmPassword" label="Confirm Password" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
