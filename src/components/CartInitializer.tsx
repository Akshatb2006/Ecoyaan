'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { initializeCart, selectIsCartLoaded } from '@/store/slices/cartSlice';
import { CartData } from '@/types';

interface CartInitializerProps {
    cartData: CartData;
    children: React.ReactNode;
}

export default function CartInitializer({
    cartData,
    children,
}: CartInitializerProps) {
    const dispatch = useAppDispatch();
    const isLoaded = useAppSelector(selectIsCartLoaded);
    const [hydrationChecked, setHydrationChecked] = useState(false);

    // Wait one tick so StoreProvider's hydration useEffect runs first
    useEffect(() => {
        setHydrationChecked(true);
    }, []);

    useEffect(() => {
        if (hydrationChecked && !isLoaded) {
            dispatch(
                initializeCart({
                    items: cartData.cartItems,
                    shippingFee: cartData.shipping_fee,
                    discount: cartData.discount_applied,
                })
            );
        }
    }, [dispatch, cartData, isLoaded, hydrationChecked]);

    return <>{children}</>;
}
