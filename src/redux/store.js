import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import { authApi } from './authApi';
import { storesApi } from './storeApi';
import { productApi } from './productApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,  //  storesApi reducer
    [productApi.reducerPath]: productApi.reducer,  //  product API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(storesApi.middleware)  //storesApi middleware
      .concat( productApi.middleware),  //productApi middleware
});

export default store;
