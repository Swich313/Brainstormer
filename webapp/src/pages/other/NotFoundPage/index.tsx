import { ErrorPageComponent } from '../../../components/ErrorPageComponent'

export const NotFoundPage = ({
  title = 'Page Not Found',
  message = 'The page you are looking for does not exist',
}: {
  title?: string
  message?: string
}) => {
  return <ErrorPageComponent title={title} message={message} />
}
