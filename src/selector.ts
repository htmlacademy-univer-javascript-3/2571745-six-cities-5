import { RootState } from './store';

export const selectOffersForCity = (state: RootState) =>
  state.offersList.filter((offer) => offer.city === state.city);
