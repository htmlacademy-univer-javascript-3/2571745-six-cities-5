import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import MainPage from '../../pages/main-page.tsx/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route.tsx';
import 'leaflet/dist/leaflet.css';
import { Provider } from 'react-redux';
import store from '../../store/index.ts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/index.ts';
import { checkAuth } from '../../action.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index.ts';
import Spinner from '../spinner/spinner.tsx';

function App(): JSX.Element {

  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  useEffect(() => {
    dispatch(checkAuth()); // Check user's authorization status on app load
  }, [dispatch]);

  // Show a spinner while checking authorization
  if (authorizationStatus === 'UNKNOWN') {
    return <Spinner />;
  }

  return (
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            {/* Главная страница */}
            <Route
              path={AppRoute.Main}
              element={
                <MainPage/>
              }
            />

            {/* Страница логина */}
            <Route path={AppRoute.Login} element={<LoginPage />} />

            {/* Страница избранного (доступ только авторизованным пользователям) */}
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />

            {/* Страница предложения */}
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferPage />}
            />

            {/* Страница 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
  );
}

export default App;
