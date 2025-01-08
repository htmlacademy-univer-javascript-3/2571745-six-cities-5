import { createSelector } from 'reselect';
import { RootState } from './store';

// Input selectors
const selectOffersList = (state: RootState) => state.offersList;
export const selectCurrentCity = (state: RootState) => state.city;
const selectSortType = (state: RootState) => state.sortType;

// Memoized selector
export const selectOffersForCity = createSelector(
  [selectOffersList, selectCurrentCity],
  (offersList, currentCity) =>
    offersList.filter(
      (offer) => offer.city.name === currentCity,
    ),
);

export const selectOffersSorted = createSelector(
  [selectOffersForCity, selectSortType],
  (cityOffers, sortType) => {
    return [...cityOffers].sort((a, b) => {
      switch (sortType) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }
);

const selectCurrentOffer = (state: RootState) => state.currentOffer;
const selectReviews = (state: RootState) => state.currentReviews;
const selectNearbyOffers = (state: RootState) => state.nearbyOffers;

export const selectOfferPageData = createSelector(
  [selectCurrentOffer, selectReviews, selectNearbyOffers],
  (currentOffer = null, reviews = [], nearbyOffers = []) => ({
    currentOffer,
    reviews,
    nearbyOffers,
  })
);

