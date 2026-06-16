import { useState, useEffect } from 'react'
import { supabase, type Order } from '../../../lib/supabase'
import { Plus, X, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

const statusColors: Record<string, string> = {
  pendiente: '#f59e0b', confirmado: '#6366f1', enviado: '#3b82f6',
  entregado: '#10b981', cancelado: '#ef4444',
}
const statuses = ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado']

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Order | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newOrder, setNewOrder] = useState({ customer_name: '', customer_email: '', customer_phone: '', product_name: '', notes: '', status: 'pendiente' })
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('todos')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status as Order['status'] } : o))
    if (editing?.id === id) setEditing(prev => prev ? { ...prev, status: status as Order['status'] } : null)
  }

  async function createOrder() {
    setSaving(true)
    await supabase.from('orders').insert(newOrder)
    setSaving(false)
    setShowNew(false)
    setNewOrder({ customer_name: '', customer_email: '', customer_phone: '', product_name: '', notes: '', status: 'pendiente' })
    load()
  }

  async function deleteOrder(id: string) {
    await supabase.from('orders').delete().eq('id', id)
    setOrders(prev => prev.filter(o => o.id !== id))
    setEditing(null)
  }

  const filtered = filter === 'todos' ? orders : orders.filter(o => o.status === filter)

  const inp = "w-full px-3 py-2.5 rounded-xl text-sm outline-none"
  const inpStyle = { border: '1.5px solid rgba(10,17,40,0.12)', color: NAVY }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-2 flex-wrap">
          {['todos', ...statuses].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded-full text-sm font-semibold capitalize transition-all"
              style={{ background: filter === s ? NAVY : '#F0F2F5', color: filter === s ? 'white' : 'rgba(10,17,40,0.6)' }}>
              {s}
            </button>
          ))}
        </div>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-white" style={{ background: ORANGE, fontSize: '0.875rem' }}>
          <Plus size={16} /> Nuevo pedido
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16" style={{ color: 'rgba(10,17,40,0.4)' }}>Cargando...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl" style={{ color: 'rgba(10,17,40,0.4)' }}>No hay pedidos</div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-5 flex flex-wrap items-center gap-4 cursor-pointer hover:shadow-md transition-all"
              style={{ boxShadow: '0 2px 12px rgba(10,17,40,0.05)' }}
              onClick={() => setEditing(order)}>
              <div className="flex-1 min-w-0">
                <p style={{ fontWeight: 700, color: NAVY, fontSize: '0.9rem' }}>{order.customer_name}</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.5)' }}>{order.product_name} · {order.customer_email}</p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.35)', marginTop: 2 }}>
                  {new Date(order.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={order.status}
                  onClick={e => e.stopPropagation()}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className="px-3 py-2 rounded-xl font-semibold text-white text-sm outline-none cursor-pointer"
                  style={{ background: statusColors[order.status] || NAVY, border: 'none' }}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: 'rgba(10,17,40,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setEditing(null)} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 z-50 bg-white rounded-3xl overflow-y-auto"
              style={{ maxWidth: 480, width: '100%', maxHeight: '90vh', padding: '2rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', margin: 'auto' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontWeight: 800, color: NAVY }}>Detalle del pedido</h2>
                <button onClick={() => setEditing(null)}><X size={20} /></button>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { l: 'Cliente', v: editing.customer_name },
                  { l: 'Email', v: editing.customer_email },
                  { l: 'Teléfono', v: editing.customer_phone || '—' },
                  { l: 'Producto', v: editing.product_name },
                  { l: 'Notas', v: editing.notes || '—' },
                  { l: 'Fecha', v: new Date(editing.created_at).toLocaleString('es-ES') },
                ].map(({ l, v }) => (
                  <div key={l} className="flex gap-3">
                    <span style={{ fontWeight: 600, color: 'rgba(10,17,40,0.45)', fontSize: '0.8rem', minWidth: 80 }}>{l}</span>
                    <span style={{ fontWeight: 600, color: NAVY, fontSize: '0.875rem' }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <label style={{ fontWeight: 600, fontSize: '0.8rem', color: NAVY, display: 'block', marginBottom: '0.4rem' }}>Estado</label>
                <select value={editing.status} onChange={e => updateStatus(editing.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl font-semibold text-white outline-none"
                  style={{ background: statusColors[editing.status], fontSize: '0.9rem' }}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <button onClick={() => deleteOrder(editing.id)} className="w-full py-3 rounded-2xl font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                Eliminar pedido
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New order modal */}
      <AnimatePresence>
        {showNew && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: 'rgba(10,17,40,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setShowNew(false)} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 z-50 bg-white rounded-3xl overflow-y-auto"
              style={{ maxWidth: 480, width: '100%', maxHeight: '90vh', padding: '2rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', margin: 'auto' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontWeight: 800, color: NAVY }}>Nuevo pedido</h2>
                <button onClick={() => setShowNew(false)}><X size={20} /></button>
              </div>
              <div className="flex flex-col gap-4 mb-6">
                {([['Nombre', 'customer_name', 'text'], ['Email', 'customer_email', 'email'], ['Teléfono', 'customer_phone', 'tel'], ['Producto', 'product_name', 'text'], ['Notas', 'notes', 'text']] as [string, keyof typeof newOrder, string][]).map(([label, key, type]) => (
                  <div key={key}>
                    <label style={{ fontWeight: 600, fontSize: '0.78rem', color: NAVY, display: 'block', marginBottom: '0.3rem' }}>{label}</label>
                    <input type={type} className={inp} style={inpStyle} value={newOrder[key]} onChange={e => setNewOrder(p => ({ ...p, [key]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <button onClick={createOrder} disabled={saving} className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2" style={{ background: ORANGE }}>
                <Save size={16} />{saving ? 'Guardando...' : 'Crear pedido'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
