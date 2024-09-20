import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import { authApi } from './APIs/authApi'
import { storesApi } from './APIs/storeApi'
import { productApi } from './APIs/productApi'
import { categoryApi } from './categoryApi'
import { staffApi } from './staffApi'
import { salesRecordApi } from './APIs/salesRecordApi'
import { passwordReset } from './APIs/passwordResetApi'



const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer, //  storesApi reducer
    [productApi.reducerPath]: productApi.reducer, //  product API reducer
    [categoryApi.reducerPath]: categoryApi.reducer, //  category API reducer
    [staffApi.reducerPath]: staffApi.reducer, //  staff API reducer 
    [salesRecordApi.reducerPath]: salesRecordApi.reducer, //  salesRecord API reducer
    [passwordReset.reducerPath]: passwordReset.reducer, //  passwordReset API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(storesApi.middleware) //storesApi middleware
      .concat(productApi.middleware) //productApi middleware
      .concat(categoryApi.middleware) //categoryApi middleware
      .concat(staffApi.middleware)//staffApi middleware
      .concat(salesRecordApi.middleware) //salesRecordApi middleware
      .concat(passwordReset.middleware) //passwordReset middleware
})



export default store;

