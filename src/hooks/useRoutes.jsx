import { Switch, Redirect, Route } from 'react-router-dom'
import PublicRoute from '../components/PublicRoute'
import PrivateRoute from '../components/PrivateRoute'
import { useSelector } from 'react-redux'
import { authSelectors } from '../redux/auth'
import { Suspense, lazy } from 'react'

const LoginPage = lazy(() => import('../views/HomeView'))
const MainPage = lazy(() => import('../views/BalanceView/BalanceView'))
const ReportPage = lazy(() =>
  import('../components/ChartsComponent/ChartComponent'),
)

export default function useRoutes() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated)
  return (
    <Suspense fallback={<h2>Загружаем...</h2>}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return isAuthenticated ? (
              <Redirect to="/balance" />
            ) : (
              <Redirect to="/login" />
            )
          }}
        />
        <PublicRoute exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/balance" component={MainPage} />
        <PrivateRoute exact path="/report" component={ReportPage} />
        <Redirect to="/login" />
      </Switch>
    </Suspense>
  )
}
