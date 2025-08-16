import { BrowserRouter, Route, Routes } from 'react-router'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/ideas/AllIdeasPage'
import { ViewIdeaPage } from './pages/ideas/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import { NewIdeaPage } from './pages/ideas/NewIdeaPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { LoginPage } from './pages/auth/LoginPage'
import { LogoutPage } from './pages/auth/LogoutPage'

import './styles/global.scss'
import { EditIdeaPage } from './pages/ideas/EditIdeaPage'
import { AppContextProvider } from './lib/ctx'
import { NotFoundPage } from './pages/other/NotFoundPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getLogoutRoute()} element={<LogoutPage />} />

            <Route element={<Layout />}>
              <Route path={routes.getSignupRoute()} element={<SignUpPage />} />
              <Route path={routes.getLoginRoute()} element={<LoginPage />} />
              <Route path={routes.getAllIdeasRoute()} element={<AllIdeasPage />} />
              <Route path={routes.getViewIdeaRoute(routes.viewIdeaRouteParams)} element={<ViewIdeaPage />} />
              <Route path={routes.getEditIdeaRoute(routes.editIdeaRouteParams)} element={<EditIdeaPage />} />
              <Route path={routes.getNewIdeaRoute()} element={<NewIdeaPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
