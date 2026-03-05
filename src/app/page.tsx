import CartInitializer from '@/components/CartInitializer';
import CartPageClient from '@/components/CartPageClient';
import { CartData } from '@/types';

async function getCartData(): Promise<CartData> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/cart`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch cart data');
  }

  return res.json();
}

export default async function CartPage() {
  const cartData = await getCartData();

  return (
    <CartInitializer cartData={cartData}>
      <CartPageClient />
    </CartInitializer>
  );
}
