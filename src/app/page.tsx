import CartInitializer from '@/components/CartInitializer';
import CartPageClient from '@/components/CartPageClient';
import { getCartData } from '@/lib/cart';

export default async function CartPage() {
  const cartData = await getCartData();

  return (
    <CartInitializer cartData={cartData}>
      <CartPageClient />
    </CartInitializer>
  );
}
