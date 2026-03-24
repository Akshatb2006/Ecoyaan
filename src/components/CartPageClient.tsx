'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectCartItems,
  selectShippingFee,
  selectDiscount,
  selectSubtotal,
  selectGrandTotal,
  updateQuantity,
  removeItem,
} from '@/store/slices/cartSlice';
import {
  selectShippingAddress,
  selectShippingAddresses,
} from '@/store/slices/shippingSlice';
import StepIndicator from '@/components/StepIndicator';
import { formatCurrency } from '@/utils/format';

export default function CartPageClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const shippingFee = useAppSelector(selectShippingFee);
  const discount = useAppSelector(selectDiscount);
  const subtotal = useAppSelector(selectSubtotal);
  const grandTotal = useAppSelector(selectGrandTotal);
  const selectedAddress = useAppSelector(selectShippingAddress);
  const allAddresses = useAppSelector(selectShippingAddresses);

  const handleProceed = () => {
    router.push('/checkout/shipping');
  };

  return (
    <main className="checkout-page checkout-page--has-sticky-bar">
      <StepIndicator currentStep={1} />

      <h1 className="checkout-page__title">Your Cart</h1>

      {/* Top summary */}
      <div className="cart-summary">
        <div className="cart-summary__row">
          <span className="cart-summary__row--label">Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="cart-summary__row">
          <span>Delivery Fee:</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>
        {discount > 0 && (
          <div className="cart-summary__row">
            <span>Discount:</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="cart-summary__row cart-summary__row--total">
          <span className="cart-summary__row--label">Total:</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {/* WhatsApp link */}
      <div className="whatsapp-link">
        <svg className="whatsapp-link__icon" viewBox="0 0 24 24" fill="#25d366">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat with us on WhatsApp
      </div>

      {/* Savings banner */}
      {discount > 0 && (
        <div className="savings-banner">
          <span className="savings-banner__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0d7a5f" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </span>
          <div className="savings-banner__text">
            <span className="savings-banner__amount">You saved {formatCurrency(discount)} in total</span>
            <span className="savings-banner__subtitle">Great choice! You&apos;re making sustainable shopping more rewarding.</span>
          </div>
        </div>
      )}

      {/* Delivery address section */}
      <div className="delivery-section">
        <div className="delivery-section__header">
          <span className="delivery-section__title">Delivery address:</span>
          <button
            className="delivery-section__add-btn"
            onClick={() => router.push('/checkout/shipping')}
          >
            {allAddresses.length > 0 ? 'Manage addresses' : 'Add address'}
          </button>
        </div>
        {selectedAddress ? (
          <div className="delivery-section__saved">
            <div className="delivery-section__saved-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d7a5f">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div className="delivery-section__saved-details">
              <span className="delivery-section__saved-name">{selectedAddress.fullName}</span>
              <span className="delivery-section__saved-line">
                {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}
              </span>
            </div>
            {allAddresses.length > 1 && (
              <span className="delivery-section__badge">+{allAddresses.length - 1} more</span>
            )}
          </div>
        ) : (
          <p className="delivery-section__message">
            No default address set. Please add an address.
          </p>
        )}
      </div>

      {/* Items list */}
      <div className="items-list">
        <div className="items-list__header">
          <span className="items-list__title">List of added Items</span>
          <label className="items-list__select-all">
            <input type="checkbox" className="items-list__checkbox" defaultChecked />
            Deselect All Products
          </label>
        </div>

        {items.map((item) => (
          <div key={item.product_id} className="cart-item">
            <div className="cart-item__checkbox">
              <input type="checkbox" defaultChecked />
            </div>
            <div className="cart-item__image-wrapper">
              <Image
                src={item.image}
                alt={item.product_name}
                width={100}
                height={100}
                className="cart-item__image"
              />
            </div>
            <div className="cart-item__content">
              <h3 className="cart-item__name">{item.product_name}</h3>
              <p className="cart-item__description">
                Eco-friendly and sustainable. Made with natural materials for everyday use.
              </p>
              <div className="cart-item__price-row">
                <span className="cart-item__price">{formatCurrency(item.product_price)}</span>
              </div>
              <div className="cart-item__quantity">
                <span className="cart-item__qty-label">Qty:</span>
                <button
                  className="cart-item__qty-btn cart-item__qty-btn--minus"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.product_id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="cart-item__qty-value">{item.quantity}</span>
                <button
                  className="cart-item__qty-btn cart-item__qty-btn--plus"
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        productId: item.product_id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item__actions">
              <button className="cart-item__action-btn" title="Wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
              <button className="cart-item__action-btn" title="Share">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
              <button
                className="cart-item__action-btn cart-item__action-btn--delete"
                title="Remove"
                onClick={() => dispatch(removeItem(item.product_id))}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
            <button className="cart-item__save-later">Save for later</button>
          </div>
        ))}
      </div>

      {/* Bottom totals */}
      <div className="cart-totals">
        <p className="cart-totals__items-count">Total items: {items.length}</p>
        <div className="cart-totals__row">
          <span className="cart-totals__row--label">Subtotal:</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="cart-totals__row">
          <span>Delivery Fee:</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>
        {discount > 0 && (
          <div className="cart-totals__row">
            <span>Discount:</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="cart-totals__row cart-totals__row--grand">
          <span>Grand Total:</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky-bottom-bar">
        <div className="sticky-bottom-bar__inner">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn btn--outline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </button>
          <div className="sticky-bottom-bar__right">
            <div className="sticky-bottom-bar__total">
              <span className="sticky-bottom-bar__total-label">Total</span>
              <span className="sticky-bottom-bar__total-amount">{formatCurrency(grandTotal)}</span>
            </div>
            <button
              id="proceed-to-checkout"
              onClick={handleProceed}
              className="btn btn--primary"
              disabled={items.length === 0}
            >
              Next Step
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
