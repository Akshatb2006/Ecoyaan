'use client';

import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, loadPersistedState } from '@/store';
import { hydrateShipping } from '@/store/slices/shippingSlice';
import { hydrateCart } from '@/store/slices/cartSlice';
import { hydrateCheckout } from '@/store/slices/checkoutSlice';

interface StoreProviderProps {
    children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
    const storeRef = useRef<AppStore>(undefined);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        const persisted = loadPersistedState();
        if (!persisted || !storeRef.current) return;

        if (persisted.cart) {
            storeRef.current.dispatch(hydrateCart(persisted.cart));
        }
        if (persisted.shipping) {
            storeRef.current.dispatch(hydrateShipping(persisted.shipping));
        }
        if (persisted.checkout) {
            storeRef.current.dispatch(hydrateCheckout(persisted.checkout));
        }
    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
