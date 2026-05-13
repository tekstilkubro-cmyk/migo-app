import { supabase } from '@/lib/supabase';
import { Order, ServiceResult } from '@/types';

export async function fetchOrders(userId: string): Promise<ServiceResult<Order[]>> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data: data as Order[] | null, error: error?.message ?? null };
}

export async function fetchOrderById(id: string): Promise<ServiceResult<Order>> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .single();
  return { data: data as Order | null, error: error?.message ?? null };
}

export async function cancelOrder(id: string): Promise<ServiceResult<void>> {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'cancelled' })
    .eq('id', id)
    .eq('status', 'pending');
  return { data: null, error: error?.message ?? null };
}
