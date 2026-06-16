import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Types ────────────────────────────────────────────
export interface Product {
  id: string
  name: string
  brand: string
  storage: string
  ram: string
  condition: string
  price: number
  original_price: number | null
  tag: string | null
  discount: string | null
  image_url: string
  rating: number
  reviews: number
  stock: number
  featured: boolean
  featured_order: number | null
  created_at: string
}

export interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  product_id: string | null
  product_name: string
  status: 'pendiente' | 'confirmado' | 'enviado' | 'entregado' | 'cancelado'
  notes: string | null
  created_at: string
}

export interface FormSubmission {
  id: string
  name: string
  email: string
  phone: string
  brand: string | null
  model: string | null
  repair_type: string | null
  notes: string | null
  status: 'nuevo' | 'leido' | 'contactado' | 'cerrado'
  created_at: string
}

export interface HeroConfig {
  id: string
  hero_image_url: string
  hero_title: string
  hero_subtitle: string
  updated_at: string
}
