import { trpc } from '../../lib/trpc'
import { zLoginTrpcInput } from '@brainstormer/backend/src/router/login/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router'

import { Alert } from '../../components/Alert'
import { Segment } from '../../components/Segment'
import { Input } from '../../components/Input'
import { FormItems } from '../../components/FormItems'
import { Button } from '../../components/Button'
import { getAllIdeasRoute } from '../../lib/routes'
import { useForm } from '../../lib/form'

export const LoginPage = () => {
  const trpcUtils = trpc.useUtils()
  const navigate = useNavigate()
  const login = trpc.login.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: zLoginTrpcInput,
    onSubmit: async (values) => {
      const { token } = await login.mutateAsync(values)
      Cookies.set('token', token, { expires: 7 }) // Store token in cookies for 7 days
      trpcUtils.invalidate()
      navigate(getAllIdeasRoute())
    },
    resetOnSuccess: false,
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
          <Alert {...alertProps} />
          <Button {...buttonProps}>Log In</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
