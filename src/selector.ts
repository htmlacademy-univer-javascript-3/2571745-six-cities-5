import { createSelector } from 'reselect';
import { RootState } from './store';

// Input selectors
const selectOffersList = (state: RootState) => state.offersList;
const selectCurrentCity = (state: RootState) => state.city;

// Memoized selector
export const selectOffersForCity = createSelector(
  [selectOffersList, selectCurrentCity],
  (offersList, currentCity) =>
    offersList.filter(
      (offer) => offer.city.name.toLowerCase() === currentCity.toLowerCase()
    )
);
