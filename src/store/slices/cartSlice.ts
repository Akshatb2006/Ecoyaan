import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/types';

interface CartState {
    items: CartItem[];
    shippingFee: number;
    discount: number;
    isLoaded: boolean;
}

const initialState: CartState = {
    items: [],
    shippingFee: 0,
    discount: 0,
    isLoaded: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        initializeCart(
            state,
            action: PayloadAction<{
                items: CartItem[];
                shippingFee: number;
                discount: number;
            }>
        ) {
            state.items = action.payload.items;
            state.shippingFee = action.payload.shippingFee;
            state.discount = action.payload.discount;
            state.isLoaded = true;
        },
        updateQuantity(
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) {
            const item = state.items.find(
                (i) => i.product_id === action.payload.productId
            );
            if (item) {
                item.quantity = Math.max(1, action.payload.quantity);
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(
                (i) => i.product_id !== action.payload
            );
        },
    },
});

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectShippingFee = (state: { cart: CartState }) =>
    state.cart.shippingFee;
export const selectDiscount = (state: { cart: CartState }) =>
    state.cart.discount;
export const selectIsCartLoaded = (state: { cart: CartState }) =>
    state.cart.isLoaded;
export const selectSubtotal = (state: { cart: CartState }) =>
    state.cart.items.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
export const selectGrandTotal = (state: { cart: CartState }) => {
    const subtotal = state.cart.items.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    return subtotal + state.cart.shippingFee - state.cart.discount;
};

export const { initializeCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
