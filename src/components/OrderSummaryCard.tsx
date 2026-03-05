'use client';

import Image from 'next/image';
import { CartItem } from '@/types';
import { formatCurrency } from '@/utils/format';

interface OrderSummaryCardProps {
    items: CartItem[];
    shippingFee: number;
    discount: number;
    compact?: boolean;
}

export default function OrderSummaryCard({
    items,
    shippingFee,
    discount,
    compact = false,
}: OrderSummaryCardProps) {
    const subtotal = items.reduce(
        (sum, item) => sum + item.product_price * item.quantity,
        0
    );
    const grandTotal = subtotal + shippingFee - discount;

    return (
        <div className="order-summary-card">
            <h2 className="order-summary-card__title">
                {compact ? 'Order Summary' : 'Your Cart'}
            </h2>

            <ul className="order-summary-card__items">
                {items.map((item) => (
                    <li key={item.product_id} className="order-summary-card__item">
                        <div className="order-summary-card__image-wrapper">
                            <Image
                                src={item.image}
                                alt={item.product_name}
                                width={compact ? 56 : 80}
                                height={compact ? 56 : 80}
                                className="order-summary-card__image"
                            />
                        </div>
                        <div className="order-summary-card__details">
                            <h3 className="order-summary-card__product-name">
                                {item.product_name}
                            </h3>
                            <div className="order-summary-card__meta">
                                <span className="order-summary-card__price">
                                    {formatCurrency(item.product_price)}
                                </span>
                                <span className="order-summary-card__quantity">
                                    x {item.quantity}
                                </span>
                            </div>
                            <span className="order-summary-card__line-total">
                                {formatCurrency(item.product_price * item.quantity)}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="order-summary-card__totals">
                <div className="order-summary-card__row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="order-summary-card__row">
                    <span>Shipping</span>
                    <span>{formatCurrency(shippingFee)}</span>
                </div>
                {discount > 0 && (
                    <div className="order-summary-card__row order-summary-card__row--discount">
                        <span>Discount</span>
                        <span>-{formatCurrency(discount)}</span>
                    </div>
                )}
                <div className="order-summary-card__row order-summary-card__row--total">
                    <span>Grand Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                </div>
            </div>
        </div>
    );
}
