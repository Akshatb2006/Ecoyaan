import type { CartData } from '@/types';

const mockCartData: CartData = {
    cartItems: [
        {
            product_id: 101,
            product_name: 'Bamboo Toothbrush (Pack of 4)',
            product_price: 299,
            quantity: 2,
            image: '/images/bamboo-toothbrush.webp',
        },
        {
            product_id: 102,
            product_name: 'Reusable Cotton Produce Bags',
            product_price: 450,
            quantity: 1,
            image: '/images/cotton-bags.webp',
        },
    ],
    shipping_fee: 50,
    discount_applied: 0,
};

export async function getCartData(): Promise<CartData> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockCartData;
}
