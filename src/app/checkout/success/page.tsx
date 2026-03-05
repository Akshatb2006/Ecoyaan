'use client';

import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { selectOrderId, resetCheckout } from '@/store/slices/checkoutSlice';
import { selectGrandTotal } from '@/store/slices/cartSlice';
import { formatCurrency } from '@/utils/format';
import StepIndicator from '@/components/StepIndicator';

export default function SuccessPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const orderId = useAppSelector(selectOrderId);
    const grandTotal = useAppSelector(selectGrandTotal);

    const handleContinueShopping = () => {
        dispatch(resetCheckout());
        router.push('/');
    };

    return (
        <main className="checkout-page">
            <StepIndicator currentStep={4} />

            <div className="checkout-page__content checkout-page__content--centered">
                <div className="success-card">
                    <div className="success-card__icon-wrapper">
                        <div className="success-card__circle">
                            <svg
                                className="success-card__checkmark"
                                viewBox="0 0 52 52"
                            >
                                <circle
                                    className="success-card__checkmark-circle"
                                    cx="26"
                                    cy="26"
                                    r="25"
                                    fill="none"
                                />
                                <path
                                    className="success-card__checkmark-check"
                                    fill="none"
                                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                />
                            </svg>
                        </div>
                    </div>

                    <h1 className="success-card__title">Order Successful!</h1>
                    <p className="success-card__subtitle">
                        Thank you for choosing eco-friendly products!
                    </p>

                    {orderId && (
                        <div className="success-card__order-info">
                            <div className="success-card__detail">
                                <span className="success-card__label">Order ID</span>
                                <span className="success-card__value">{orderId}</span>
                            </div>
                            <div className="success-card__detail">
                                <span className="success-card__label">Amount Paid</span>
                                <span className="success-card__value">
                                    {formatCurrency(grandTotal)}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="success-card__message">
                        <span className="success-card__leaf">🌱</span>
                        <p>
                            By choosing Ecoyaan, you&apos;ve contributed to reducing plastic waste.
                            Every small step counts towards a greener planet!
                        </p>
                    </div>

                    <button
                        id="continue-shopping"
                        onClick={handleContinueShopping}
                        className="btn btn--primary btn--full"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        </main>
    );
}
