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

function App(): JSX.Element {

  return (
    <Provider store={store}>
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
                <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
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
    </Provider>
  );
}

export default App;
