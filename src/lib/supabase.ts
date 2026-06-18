import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// If env vars are missing the app still loads — Supabase calls will silently fail/return empty
export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

let _client: SupabaseClient | null = null

function getClient(): SupabaseClient {
  if (!_client) {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Return a proxy that makes every call resolve to { data: null, error: null }
      // so components can handle it gracefully without crashing
      const noop = () => ({
        select: () => noop(),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        delete: () => ({ eq: () => Promise.resolve({ data: null, error: null }) }),
        eq: () => noop(),
        order: () => noop(),
        limit: () => noop(),
        single: () => Promise.resolve({ data: null, error: null }),
        then: (cb: (v: { data: null; error: null }) => unknown) =>
          Promise.resolve({ data: null, error: null }).then(cb),
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return { from: () => noop() } as any
    }
    _client = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _client
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getClient()[prop as keyof SupabaseClient]
  },
})

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
