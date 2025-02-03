import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice'; // Adjust the path to where your cartSlice is located
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import productsApi from './features/products/productsApi';
import reviewApi from './features/reviews/reviewsApi';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware),
});

export default store;
