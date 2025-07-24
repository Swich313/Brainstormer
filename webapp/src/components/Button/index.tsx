import cn from 'classnames'

import styles from './index.module.scss'
import { Link } from 'react-router'

export const Button = ({ children, loading = false }: { children: React.ReactNode; loading?: boolean }) => {
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
