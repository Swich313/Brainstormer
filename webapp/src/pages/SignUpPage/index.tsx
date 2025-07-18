import { useState } from 'react'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { zSignUpTrpcInput } from '@brainstormer/backend/src/router/signUp/input'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

import { Alert } from '../../components/Alert'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { FormItems } from '../../components/FormItems'
import { Button } from '../../components/Button'
import { getLoginRoute } from '../../lib/routes'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useUtils()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signUp = trpc.signUp.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
      confirmPassword: '',
    },
    validate: withZodSchema(
      zSignUpTrpcInput.extend({ confirmPassword: z.string().min(1) }).superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords do not match',
            path: ['confirmPassword'],
          })
        }
      }),
    ),
    onSubmit: async (values) => {
      try {
        setSubmittingError
        const { token } = await signUp.mutateAsync(values)
        Cookies.set('token', token, { expires: 7 }) // Store token in cookies for 7 days
        trpcUtils.invalidate()
        navigate(getLoginRoute())
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
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
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
