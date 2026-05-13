import { useCartStore } from '@/stores/cartStore';
import { Config } from '@/constants/config';

export function useCart() {
  const store = useCartStore();

  const subtotal = store.items.reduce(
    (sum, item) => sum + (item.product?.price_sale ?? 0) * item.quantity,
    0
  );
  const shippingFee = subtotal >= Config.freeShippingThreshold ? 0 : 4.99;
  const total = subtotal + shippingFee - store.discountAmount;

  return {
    ...store,
    subtotal,
    shippingFee,
    total,
  };
}
