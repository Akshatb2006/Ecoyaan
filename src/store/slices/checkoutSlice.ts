import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckoutStep } from '@/types';

interface CheckoutState {
    currentStep: CheckoutStep;
    orderId: string | null;
}

const initialState: CheckoutState = {
    currentStep: 1,
    orderId: null,
};

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setStep(state, action: PayloadAction<CheckoutStep>) {
            state.currentStep = action.payload;
        },
        setOrderId(state, action: PayloadAction<string>) {
            state.orderId = action.payload;
        },
        resetCheckout(state) {
            state.currentStep = 1;
            state.orderId = null;
        },
        hydrateCheckout(state, action: PayloadAction<CheckoutState>) {
            state.currentStep = action.payload.currentStep;
            state.orderId = action.payload.orderId;
        },
    },
});

export const selectCurrentStep = (state: { checkout: CheckoutState }) =>
    state.checkout.currentStep;
export const selectOrderId = (state: { checkout: CheckoutState }) =>
    state.checkout.orderId;

export const { setStep, setOrderId, resetCheckout, hydrateCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
