'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectCartItems,
  selectShippingFee,
  selectDiscount,
  selectGrandTotal,
} from '@/store/slices/cartSlice';
import { selectShippingAddress } from '@/store/slices/shippingSlice';
import { setOrderId } from '@/store/slices/checkoutSlice';
import OrderSummaryCard from '@/components/OrderSummaryCard';
import StepIndicator from '@/components/StepIndicator';
import { formatCurrency, generateOrderId } from '@/utils/format';

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);
  const shippingFee = useAppSelector(selectShippingFee);
  const discount = useAppSelector(selectDiscount);
  const grandTotal = useAppSelector(selectGrandTotal);
  const address = useAppSelector(selectShippingAddress);

  const [isProcessing, setIsProcessing] = useState(false);

  if (!address || items.length === 0) {
    return (
      <main className="checkout-page">
        <StepIndicator currentStep={3} />
        <div className="checkout-page__content checkout-page__content--centered">
          <div className="empty-state">
            <span className="empty-state__icon">!</span>
            <h2>Missing Information</h2>
            <p>Please complete the previous steps first.</p>
            <button
              onClick={() => router.push('/')}
              className="btn btn--primary"
            >
              Return to Cart
            </button>
          </div>
        </div>
      </main>
    );
  }

  const handlePayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const orderId = generateOrderId();
    dispatch(setOrderId(orderId));
    router.push('/checkout/success');
  };

  return (
    <main className="checkout-page checkout-page--has-sticky-bar">
      <StepIndicator currentStep={3} />

      <div className="payment-layout">
        <div className="payment-layout__main">
          <OrderSummaryCard
            items={items}
            shippingFee={shippingFee}
            discount={discount}
            compact
          />

          <div className="address-card">
            <h3 className="address-card__title">Shipping To</h3>
            <div className="address-card__content">
              <p className="address-card__name">{address.fullName}</p>
              <p>{address.email}</p>
              <p>{address.phone}</p>
              <p>
                {address.city}, {address.state} - {address.pinCode}
              </p>
            </div>
            <button
              onClick={() => router.push('/checkout/shipping')}
              className="address-card__edit"
            >
              Edit Address
            </button>
          </div>
        </div>

        <aside className="payment-layout__sidebar">
          <div className="payment-card">
            <h3 className="payment-card__title">Payment</h3>

            <div className="payment-card__methods">
              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  defaultChecked
                  className="payment-method__radio"
                />
                <span className="payment-method__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </span>
                <span className="payment-method__label">UPI / Mobile Pay</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  className="payment-method__radio"
                />
                <span className="payment-method__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </span>
                <span className="payment-method__label">Credit / Debit Card</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  className="payment-method__radio"
                />
                <span className="payment-method__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </span>
                <span className="payment-method__label">Cash on Delivery</span>
              </label>
            </div>

            <div className="payment-card__total">
              <span>Total</span>
              <span className="payment-card__amount">
                {formatCurrency(grandTotal)}
              </span>
            </div>

            <p className="payment-card__secure">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Your payment information is secure and encrypted
            </p>
          </div>
        </aside>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky-bottom-bar">
        <div className="sticky-bottom-bar__inner">
          <button
            type="button"
            onClick={() => router.push('/checkout/shipping')}
            className="btn btn--outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          <button
            id="pay-securely"
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn btn--primary btn--pay"
          >
            {isProcessing ? (
              <span className="btn__spinner">
                <span className="spinner" />
                Processing...
              </span>
            ) : (
              <>Pay Securely {formatCurrency(grandTotal)}</>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
