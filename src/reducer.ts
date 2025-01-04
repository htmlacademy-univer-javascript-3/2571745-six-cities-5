import { createReducer } from '@reduxjs/toolkit';
import {
  setCurrentCityAction,
  loadOffersAction,
  setAuthorizationStatusAction,
  signOutAction,
  setUserEmailAction,
  setSortTypeAction,
} from './action';
import { AppState } from './types/state';
import { AuthorizationStatus } from './const';

const initialState: AppState = {
  city: 'Paris',
  offersList: [],
  isLoading: false,
  error: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
  sortType: 'popular',
};

export const updateStore = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentCityAction, (state, action) => {
      state.city = action.payload;
    })
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
    });
});
