import { NextResponse } from 'next/server';
import { getCartData } from '@/lib/cart';

export async function GET() {
    const cartData = await getCartData();
    return NextResponse.json(cartData);
}
