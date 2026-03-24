import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import shippingReducer from './slices/shippingSlice';
import checkoutReducer from './slices/checkoutSlice';

export const STORAGE_KEY = 'ecoyaan_checkout_state';

export function loadPersistedState() {
    if (typeof window === 'undefined') return undefined;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return undefined;
        return JSON.parse(raw);
    } catch {
        return undefined;
    }
}

function saveState(state: RootState) {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
                cart: state.cart,
                shipping: state.shipping,
                checkout: state.checkout,
            })
        );
    } catch {
        // ignore quota errors
    }
}

export const makeStore = () => {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
            shipping: shippingReducer,
            checkout: checkoutReducer,
        },
    });

    store.subscribe(() => {
        saveState(store.getState());
    });

    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
