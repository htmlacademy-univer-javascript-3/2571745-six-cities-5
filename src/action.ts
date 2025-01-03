import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { AccomodationOffer } from './types/offer';
import { AxiosInstance } from 'axios';

export const Action = {
    SET_CURRENT_CITY: 'SET_CURRENT_CITY',
    LOAD_OFFERS: 'LOAD_OFFERS',
};

export const loadOffersAction = createAsyncThunk<
  AccomodationOffer[],
  undefined,
  { extra: AxiosInstance }
>('data/loadOffers', async (_, { extra: api, rejectWithValue }) => {
    try {
        const { data } = await api.get<AccomodationOffer[]>('/offers');
        return data;

      } catch (error) {
        const err = error as { message: string };
        return rejectWithValue(err.message);
      }
    });

export const setCurrentCityAction = createAction(Action.SET_CURRENT_CITY, (value) => {
    return {
    payload: value,
    };
});




  
// export const setCurrentCityAction = createAction(Action.SET_CURRENT_CITY, (value) => {
//     return {
//     payload: value,
//     };
// });

// export const loadOffersAction = createAction(Action.LOAD_OFFERS, (value) => {
//     return {
//     payload: value,
//     };
// });