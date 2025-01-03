import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCityAction, loadOffersAction } from './action';
import { AppState } from './types/state';

const initialState: AppState = {
city: 'Paris',
offersList: [],
isLoading: false,
error: null,
};

export const updateStore = createReducer(initialState, (builder) => {
builder
    .addCase(setCurrentCityAction, (state, action) => {
    state.city = action.payload;
    })
    .addCase(loadOffersAction.pending, (state) => {
        state.isLoading = true;
        console.log('Loading offers...');
      })
      .addCase(loadOffersAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offersList = action.payload;
      })
      .addCase(loadOffersAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.error('Error loading offers:', action.payload);
      });
});
  