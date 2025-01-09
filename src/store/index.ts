import { configureStore } from '@reduxjs/toolkit';
import { updateStore } from '../reducer';
import { AppState } from '../types/state';
import { createAPI } from '../services/api';

const api = createAPI();

const store = configureStore({
  reducer: updateStore,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = AppState;
export type AppDispatch = typeof store.dispatch;

export default store;
