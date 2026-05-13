export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type AddressLabel = 'Home' | 'Work' | 'Other';

export type CouponType = 'percentage' | 'fixed';

export type NotificationType =
  | 'order_status'
  | 'flash_sale'
  | 'back_in_stock'
  | 'coupon';

export interface Address {
  id: string;
  user_id: string;
  label: AddressLabel;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  seller_id: string;
  price_original: number;
  price_sale: number;
  currency: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  images: string[];
  tags: string[];
  rating_avg: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  label: string;
  sku: string;
  price_override: number | null;
  stock_quantity: number;
  attributes: Record<string, string>;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  added_at: string;
  product?: Product;
  variant?: ProductVariant;
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  address_id: string;
  payment_intent_id: string | null;
  subtotal: number;
  shipping_fee: number;
  discount_amount: number;
  total: number;
  currency: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  order_id: string;
  rating: number;
  title: string | null;
  body: string | null;
  images: string[];
  helpful_count: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  default_address_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceResult<T> {
  data: T | null;
  error: string | null;
}
