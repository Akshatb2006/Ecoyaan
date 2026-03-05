import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import shippingReducer from './slices/shippingSlice';
import checkoutReducer from './slices/checkoutSlice';

export const makeStore = () =>
    configureStore({
        reducer: {
            cart: cartReducer,
            shipping: shippingReducer,
            checkout: checkoutReducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
