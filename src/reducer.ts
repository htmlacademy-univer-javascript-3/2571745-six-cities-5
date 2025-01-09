import { createReducer } from '@reduxjs/toolkit';
import {
  setCurrentCityAction,
  loadOffersAction,
  setAuthorizationStatusAction,
  signOutAction,
  setUserEmailAction,
  setSortTypeAction,
  loadOfferDetailsAction,
  postReviewAction,
  loadReviewsAction,
} from './action';
import { AppState } from './types/state';
import { AuthorizationStatus } from './const';

const initialState: AppState = {
  city: 'Paris',
  offersList: [],
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.NoAuth,
  userEmail: '',
  sortType: 'popular',
  currentOffer: null,
  nearbyOffers: [],
  currentReviews: [],
  isLoadingCurrentOffer: false,
  isLoadingReviews: false,
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCityAction, (state, action) => {
      state.city = action.payload;
    })
    // LOAD OFFERS
    .addCase(loadOffersAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadOffersAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.offersList = action.payload;
    })
    .addCase(loadOffersAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })


    .addCase(setAuthorizationStatusAction, (state, action) => {
      if (action.payload === AuthorizationStatus.NoAuth) {
        state.userEmail = '';
      }
      state.authorizationStatus = action.payload;
    })
    .addCase(signOutAction, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      localStorage.removeItem('six-cities-token');
    })
    .addCase(setUserEmailAction, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(setSortTypeAction, (state, action) => {
      state.sortType = action.payload;
    })


    // LOAD DETAILS
    .addCase(loadOfferDetailsAction.pending, (state) => {
      state.isLoadingCurrentOffer = true;
      state.error = null;
    })
    .addCase(loadOfferDetailsAction.fulfilled, (state, action) => {
      state.isLoadingCurrentOffer = false;
      state.currentOffer = action.payload.offer;
      state.nearbyOffers = action.payload.nearbyOffers || [];
    })
    .addCase(loadOfferDetailsAction.rejected, (state, action) => {
      state.isLoadingCurrentOffer = false;
      state.error = action.payload as string;
    })

    // LOAD REVIEWS
    .addCase(loadReviewsAction.pending, (state) => {
      state.isLoadingReviews = true;
      state.error = null;
    })
    .addCase(loadReviewsAction.fulfilled, (state, action) => {
      console.log("loadReviewsAction result:", action.payload);
      state.isLoadingReviews = false;
      state.currentReviews = action.payload;
    })
    .addCase(loadReviewsAction.rejected, (state, action) => {
      state.isLoadingReviews = false;
      state.error = action.payload as string;
    })

    // POST REVIEWS
    .addCase(postReviewAction.pending, (state) => {
      state.isLoadingReviews = true;
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      state.isLoadingReviews = false;
      state.currentReviews = action.payload; // обновляем список комментариев
    })
    .addCase(postReviewAction.rejected, (state, action) => {
      state.isLoadingReviews = false;
      state.error = action.payload as string;
    });
});