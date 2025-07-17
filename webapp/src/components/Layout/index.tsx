import { Link, Outlet } from 'react-router'
import { trpc } from '../../lib/trpc'
import * as routes from '../../lib/routes'

import styles from './index.module.scss'

export const Layout = () => {
  const { data, isLoading, isFetching, isError } = trpc.getMe.useQuery()

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <div className={styles.logo}>Brainstormer</div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <Link className={styles.link} to={routes.getAllIdeasRoute()}>
              All Ideas
            </Link>
          </li>
          {isLoading || isFetching || isError ? null : data && data.me ? (
            <>
              <li className={styles.menuItem}>
                <Link className={styles.link} to={routes.getNewIdeaRoute()}>
                  Add Idea
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link className={styles.link} to={routes.getLogoutRoute()}>
                  Log out ({data.me.nick})
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.menuItem}>
                <Link className={styles.link} to={routes.getSignupRoute()}>
                  Sign Up
                </Link>
              </li>
              <li className={styles.menuItem}>
                <Link className={styles.link} to={routes.getLoginRoute()}>
                  Log In
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
