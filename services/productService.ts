import { supabase } from '@/lib/supabase';
import { Product, ServiceResult } from '@/types';
import { Config } from '@/constants/config';

export async function fetchProducts(params: {
  categoryId?: string;
  search?: string;
  page?: number;
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'rating';
}): Promise<ServiceResult<Product[]>> {
  const { categoryId, search, page = 0, sortBy = 'newest' } = params;

  let query = supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .range(page * Config.paginationPageSize, (page + 1) * Config.paginationPageSize - 1);

  if (categoryId) query = query.eq('category_id', categoryId);
  if (search) query = query.ilike('name', `%${search}%`);

  if (sortBy === 'price_asc') query = query.order('price_sale', { ascending: true });
  else if (sortBy === 'price_desc') query = query.order('price_sale', { ascending: false });
  else if (sortBy === 'rating') query = query.order('rating_avg', { ascending: false });
  else query = query.order('created_at', { ascending: false });

  const { data, error } = await query;
  return { data: data as Product[] | null, error: error?.message ?? null };
}

export async function fetchProductById(id: string): Promise<ServiceResult<Product>> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  return { data: data as Product | null, error: error?.message ?? null };
}

export async function fetchFeaturedProducts(): Promise<ServiceResult<Product[]>> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(10);
  return { data: data as Product[] | null, error: error?.message ?? null };
}
