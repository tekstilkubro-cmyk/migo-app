import { supabase } from '@/lib/supabase';
import { CartItem, ServiceResult } from '@/types';

export async function fetchCartItems(userId: string): Promise<ServiceResult<CartItem[]>> {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, product:products(*), variant:product_variants(*)')
    .eq('user_id', userId)
    .order('added_at', { ascending: false });
  return { data: data as CartItem[] | null, error: error?.message ?? null };
}

export async function addCartItem(
  userId: string,
  productId: string,
  variantId: string | null,
  quantity: number
): Promise<ServiceResult<CartItem>> {
  const { data, error } = await supabase
    .from('cart_items')
    .upsert(
      { user_id: userId, product_id: productId, variant_id: variantId, quantity },
      { onConflict: 'user_id,product_id,variant_id' }
    )
    .select()
    .single();
  return { data: data as CartItem | null, error: error?.message ?? null };
}

export async function removeCartItem(id: string): Promise<ServiceResult<void>> {
  const { error } = await supabase.from('cart_items').delete().eq('id', id);
  return { data: null, error: error?.message ?? null };
}

export async function updateCartItemQuantity(
  id: string,
  quantity: number
): Promise<ServiceResult<void>> {
  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', id);
  return { data: null, error: error?.message ?? null };
}
