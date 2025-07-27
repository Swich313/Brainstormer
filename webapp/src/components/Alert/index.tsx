import cn from 'classnames'

import styles from './index.module.scss'

export type AlertProps = { color: 'red' | 'green'; hidden?: boolean; children: React.ReactNode }
export const Alert = ({ color, hidden, children }: AlertProps) => {
  if (hidden) {
    return null
  }
  return <div className={cn({ [styles.alert]: true, [styles[color]]: true })}>{children}</div>
}
