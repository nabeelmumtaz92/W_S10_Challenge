// /frontend/state/store.js
import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from './pizzaSlice';
import { pizzaApi } from './pizzaApi';

export const resetStore = () => 
configureStore({
  reducer: {
    pizza: pizzaReducer, // Make sure this matches the slice name used in the state
    [pizzaApi.reducerPath]: pizzaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pizzaApi.middleware),
});

export const store = resetStore();
