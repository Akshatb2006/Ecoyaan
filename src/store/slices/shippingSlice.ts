import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShippingAddress } from '@/types';

interface ShippingState {
    address: ShippingAddress | null;
}

const initialState: ShippingState = {
    address: null,
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
            state.address = action.payload;
        },
        clearShippingAddress(state) {
            state.address = null;
        },
    },
});

export const selectShippingAddress = (state: { shipping: ShippingState }) =>
    state.shipping.address;

export const { setShippingAddress, clearShippingAddress } =
    shippingSlice.actions;
export default shippingSlice.reducer;
