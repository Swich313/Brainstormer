import { Link, Outlet } from 'react-router'
import * as routes from '../../lib/routes'

import styles from './index.module.scss'

export const Layout = () => {
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
          <li className={styles.menuItem}>
            <Link className={styles.link} to={routes.getNewIdeaRoute()}>
              Add Idea
            </Link>
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.link} to={routes.getSignupRoute()}>
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  )
}
