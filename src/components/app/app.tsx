import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import MainPage from '../../pages/main-page.tsx/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import OfferPage from '../../pages/offer-page/offer-page';
import PrivateRoute from '../private-route/private-route.tsx';
import { AccomodationOffer } from '../../types/offer.ts';
import 'leaflet/dist/leaflet.css';

type RentalOffersProps = {
  rentalOffersAmount: number;
  accomodationOffers: AccomodationOffer[];
};

function App({ rentalOffersAmount, accomodationOffers }: RentalOffersProps): JSX.Element {
  const favoriteOffers = accomodationOffers.filter((offer) => offer.isFavorite);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Главная страница */}
          <Route
            path={AppRoute.Main}
            element={
              <MainPage
                rentalOffersAmount={rentalOffersAmount}
                accomodationOffers={accomodationOffers}
              />
            }
          />

          {/* Страница логина */}
          <Route path={AppRoute.Login} element={<LoginPage />} />

          {/* Страница избранного (доступ только авторизованным пользователям) */}
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesPage favoriteOffers={favoriteOffers} />
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
