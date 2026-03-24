import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShippingAddress } from '@/types';

interface ShippingState {
    addresses: ShippingAddress[];
    selectedAddressId: string | null;
}

const initialState: ShippingState = {
    addresses: [],
    selectedAddressId: null,
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        addAddress(state, action: PayloadAction<ShippingAddress>) {
            state.addresses.push(action.payload);
            state.selectedAddressId = action.payload.id;
        },
        updateAddress(state, action: PayloadAction<ShippingAddress>) {
            const index = state.addresses.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.addresses[index] = action.payload;
            }
        },
        removeAddress(state, action: PayloadAction<string>) {
            state.addresses = state.addresses.filter(a => a.id !== action.payload);
            if (state.selectedAddressId === action.payload) {
                state.selectedAddressId = state.addresses[0]?.id ?? null;
            }
        },
        selectAddress(state, action: PayloadAction<string>) {
            state.selectedAddressId = action.payload;
        },
        setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
            const index = state.addresses.findIndex(a => a.id === action.payload.id);
            if (index !== -1) {
                state.addresses[index] = action.payload;
            } else {
                state.addresses.push(action.payload);
            }
            state.selectedAddressId = action.payload.id;
        },
        hydrateShipping(state, action: PayloadAction<ShippingState>) {
            state.addresses = action.payload.addresses;
            state.selectedAddressId = action.payload.selectedAddressId;
        },
        clearShippingAddress(state) {
            state.addresses = [];
            state.selectedAddressId = null;
        },
    },
});

export const selectShippingAddresses = (state: { shipping: ShippingState }) =>
    state.shipping.addresses;

export const selectSelectedAddressId = (state: { shipping: ShippingState }) =>
    state.shipping.selectedAddressId;

export const selectShippingAddress = (state: { shipping: ShippingState }) =>
    state.shipping.addresses.find(a => a.id === state.shipping.selectedAddressId) ?? null;

export const {
    addAddress,
    updateAddress,
    removeAddress,
    selectAddress,
    setShippingAddress,
    hydrateShipping,
    clearShippingAddress,
} = shippingSlice.actions;

export default shippingSlice.reducer;
