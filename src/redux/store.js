import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import dropdownReducer from './slices/dropdownSlice';

import { authApi } from './APIs/authApi';
import { storesApi } from './APIs/storeApi';
import { productApi } from './APIs/productApi';
import { categoryApi } from './categoryApi';
import { staffApi } from './staffApi';
import { profilePictureApi } from './APIs/profilePictureUploadApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dropdown: dropdownReducer,
    [authApi.reducerPath]: authApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [profilePictureApi.reducerPath]: profilePictureApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(storesApi.middleware)
      .concat(productApi.middleware)
      .concat(categoryApi.middleware)
      .concat(staffApi.middleware)
      .concat(profilePictureApi.middleware),
});

export default store;
