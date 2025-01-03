import { configureStore } from "@reduxjs/toolkit";
import { updateStore } from "../reducer";
import { AppState } from "../types/state";
import { offers } from "../mocks/offers";
import { loadOffersAction } from "../action";

const store = configureStore({
    reducer: updateStore,
});

store.dispatch(loadOffersAction(offers));

export type RootState = AppState;
export type AppDispatch = typeof store.dispatch;

export default store;