import { createReducer } from '@reduxjs/toolkit';
import { setCurrentCityAction, loadOffersAction } from './action';
import { AppState } from './types/state';

const initialState: AppState = {
city: 'Paris',
offersList: [],
};

export const updateStore = createReducer(initialState, (builder) => {
builder
    .addCase(setCurrentCityAction, (state, action) => {
    state.city = action.payload;
    })
    .addCase(loadOffersAction, (state, action) => {
    state.offersList = action.payload;
    });
});
  