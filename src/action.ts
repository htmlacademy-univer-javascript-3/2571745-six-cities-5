import { createAction } from '@reduxjs/toolkit';

export const Action = {
    SET_CURRENT_CITY: 'SET_CURRENT_CITY',
    LOAD_OFFERS: 'LOAD_OFFERS',
};
  
export const setCurrentCityAction = createAction(Action.SET_CURRENT_CITY, (value) => {
    return {
    payload: value,
    };
});

export const loadOffersAction = createAction(Action.LOAD_OFFERS, (value) => {
    return {
    payload: value,
    };
});