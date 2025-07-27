import cn from 'classnames'

import styles from './index.module.scss'
import { Link } from 'react-router'

export type ButtonProps = { children: React.ReactNode; loading?: boolean }
export const Button = ({ children, loading = false }: ButtonProps) => {
  return (
    <button className={cn({ [styles.button]: true, [styles.disabled]: loading })} type="submit" disabled={loading}>
      {loading ? 'Submitting...' : children}
    </button>
  )
}

export const LinkButton = ({ children, to }: { children: React.ReactNode; to: string }) => {
  return (
    <Link className={styles.button} to={to}>
      {children}
    </Link>
  )
}
