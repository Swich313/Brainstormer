import { useState } from 'react'
import { trpc } from '../../lib/trpc'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { zLoginTrpcInput } from '@brainstormer/backend/src/router/login/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

import { Alert } from '../../components/Alert'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { FormItems } from '../../components/FormItems'
import { Button } from '../../components/Button'
import { getAllIdeasRoute } from '../../lib/routes'

export const LoginPage = () => {
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const login = trpc.login.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zLoginTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError
        const { token } = await login.mutateAsync(values)
        Cookies.set('token', token, { expires: 7 }) // Store token in cookies for 7 days
        trpcUtils.invalidate()
        navigate(getAllIdeasRoute())
      } catch (error: any) {
        setSubmittingError(error.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
  })

  return (
    <Segment title="Log In">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="password" label="Password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">Some fields are invalid</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          <Button>Log In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
