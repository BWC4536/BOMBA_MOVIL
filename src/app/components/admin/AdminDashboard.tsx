import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  LayoutDashboard, Package, ShoppingCart, MessageSquare,
  Settings, LogOut, Zap, Menu, X, ChevronRight,
  TrendingUp, Users, AlertCircle, CheckCircle2,
} from 'lucide-react'
import { supabase, type Product, type Order, type FormSubmission } from '../../../lib/supabase'
import AdminProducts from './AdminProducts'
import AdminOrders from './AdminOrders'
import AdminSubmissions from './AdminSubmissions'
import AdminSettings from './AdminSettings'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

type Tab = 'dashboard' | 'products' | 'orders' | 'submissions' | 'settings'

interface Stats {
  totalProducts: number
  outOfStock: number
  pendingOrders: number
  newSubmissions: number
  totalRevenue: number
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState<Stats>({ totalProducts: 0, outOfStock: 0, pendingOrders: 0, newSubmissions: 0, totalRevenue: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    setLoadingStats(true)
    const [products, orders, submissions] = await Promise.all([
      supabase.from('products').select('id,stock,price'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('form_submissions').select('id,status'),
    ])
    const prods = (products.data || []) as { stock: number; price: number }[]
    const ords = (orders.data || []) as Order[]
    const subs = (submissions.data || []) as { status: string }[]
    setStats({
      totalProducts: prods.length,
      outOfStock: prods.filter(p => p.stock === 0).length,
      pendingOrders: ords.filter(o => o.status === 'pendiente').length,
      newSubmissions: subs.filter(s => s.status === 'nuevo').length,
      totalRevenue: 0,
    })
    setRecentOrders(ords)
    setLoadingStats(false)
  }

  const navItems: { id: Tab; icon: React.ElementType; label: string; badge?: number }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'products', icon: Package, label: 'Productos' },
    { id: 'orders', icon: ShoppingCart, label: 'Pedidos', badge: stats.pendingOrders || undefined },
    { id: 'submissions', icon: MessageSquare, label: 'Formularios', badge: stats.newSubmissions || undefined },
    { id: 'settings', icon: Settings, label: 'Configuración' },
  ]

  const statusColors: Record<string, string> = {
    pendiente: '#f59e0b', confirmado: '#6366f1', enviado: '#3b82f6',
    entregado: '#10b981', cancelado: '#ef4444',
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ORANGE }}>
          <Zap size={16} fill="white" className="text-white" />
        </div>
        <div>
          <p style={{ fontWeight: 900, color: 'white', fontSize: '1rem', letterSpacing: '-0.03em' }}>
            Bomba<span style={{ color: ORANGE }}>Móvil</span>
          </p>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', marginTop: -1 }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ id, icon: Icon, label, badge }) => (
          <button
            key={id}
            onClick={() => { setTab(id); setSidebarOpen(false) }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
            style={{
              background: tab === id ? 'rgba(255,107,0,0.15)' : 'transparent',
              color: tab === id ? ORANGE : 'rgba(255,255,255,0.6)',
            }}
          >
            <Icon size={18} />
            <span style={{ fontSize: '0.9rem', fontWeight: tab === id ? 700 : 500, flex: 1 }}>{label}</span>
            {badge !== undefined && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: ORANGE, fontSize: '0.65rem', fontWeight: 800 }}>{badge}</span>
            )}
            {tab === id && <ChevronRight size={14} style={{ color: ORANGE }} />}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 pb-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:bg-white/5"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <LogOut size={18} />
          <span style={{ fontSize: '0.9rem' }}>Cerrar sesión</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F0F2F5' }}>
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0" style={{ background: NAVY }}>
        <SidebarContent />
      </aside>

      {/* Sidebar mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-64 lg:hidden flex flex-col"
              style={{ background: NAVY }}
            >
              <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 p-2 rounded-xl" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <X size={20} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b" style={{ borderColor: 'rgba(10,17,40,0.08)' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100">
              <Menu size={20} style={{ color: NAVY }} />
            </button>
            <h1 style={{ fontWeight: 800, color: NAVY, fontSize: '1.1rem' }}>
              {navItems.find(n => n.id === tab)?.label}
            </h1>
          </div>
          <a href="/#/" target="_blank" rel="noopener" className="text-sm font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors" style={{ color: 'rgba(10,17,40,0.5)' }}>
            Ver web ↗
          </a>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {tab === 'dashboard' && (
                <div>
                  {/* Stat cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Productos', value: stats.totalProducts, icon: Package, color: ORANGE, sub: `${stats.outOfStock} sin stock` },
                      { label: 'Pedidos pendientes', value: stats.pendingOrders, icon: ShoppingCart, color: '#6366f1', sub: 'Por confirmar' },
                      { label: 'Formularios nuevos', value: stats.newSubmissions, icon: MessageSquare, color: '#10b981', sub: 'Sin leer' },
                      { label: 'Sin stock', value: stats.outOfStock, icon: AlertCircle, color: '#ef4444', sub: 'Requieren reposición' },
                    ].map(({ label, value, icon: Icon, color, sub }) => (
                      <div key={label} className="rounded-3xl p-5 bg-white" style={{ boxShadow: '0 2px 16px rgba(10,17,40,0.06)' }}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: `${color}18` }}>
                            <Icon size={20} style={{ color }} />
                          </div>
                        </div>
                        <p style={{ fontSize: '2rem', fontWeight: 900, color: NAVY, lineHeight: 1, letterSpacing: '-0.04em' }}>
                          {loadingStats ? '—' : value}
                        </p>
                        <p style={{ fontWeight: 600, color: NAVY, fontSize: '0.85rem', marginTop: 4 }}>{label}</p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(10,17,40,0.4)', marginTop: 2 }}>{sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent orders */}
                  <div className="bg-white rounded-3xl p-6" style={{ boxShadow: '0 2px 16px rgba(10,17,40,0.06)' }}>
                    <div className="flex items-center justify-between mb-5">
                      <h2 style={{ fontWeight: 800, color: NAVY, fontSize: '1rem' }}>Últimos pedidos</h2>
                      <button onClick={() => setTab('orders')} style={{ fontSize: '0.8rem', color: ORANGE, fontWeight: 600 }}>
                        Ver todos →
                      </button>
                    </div>
                    {recentOrders.length === 0 ? (
                      <p style={{ color: 'rgba(10,17,40,0.4)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem 0' }}>
                        No hay pedidos aún
                      </p>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {recentOrders.map(order => (
                          <div key={order.id} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: '#F8F9FA' }}>
                            <div className="flex-1 min-w-0">
                              <p style={{ fontWeight: 700, color: NAVY, fontSize: '0.875rem' }}>{order.customer_name}</p>
                              <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.5)' }}>{order.product_name}</p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-white" style={{ background: statusColors[order.status] || NAVY, fontSize: '0.7rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {tab === 'products' && <AdminProducts />}
              {tab === 'orders' && <AdminOrders />}
              {tab === 'submissions' && <AdminSubmissions />}
              {tab === 'settings' && <AdminSettings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
