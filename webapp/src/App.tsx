import { BrowserRouter, Route, Routes } from 'react-router'
import { TrpcProvider } from './lib/trpc'
import { AllIdeasPage } from './pages/AllIdeasPage'
import { ViewIdeaPage } from './pages/ViewIdeaPage'
import * as routes from './lib/routes'
import { Layout } from './components/Layout'
import { NewIdeaPage } from './pages/NewIdeaPage'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { LogoutPage } from './pages/LogoutPage'

import './styles/global.scss'
import { EditIdeaPage } from './pages/EditIdeaPage'
import { AppContextProvider } from './lib/ctx'

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
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
