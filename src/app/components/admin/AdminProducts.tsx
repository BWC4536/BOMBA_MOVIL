import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, Pencil, Trash2, Save, X, Star, Package, ToggleLeft, ToggleRight } from 'lucide-react'
import { supabase, type Product } from '../../../lib/supabase'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

const EMPTY: Omit<Product, 'id' | 'created_at'> = {
  name: '', brand: 'Apple', storage: '128GB', ram: '8GB',
  condition: 'Precintado', price: 0, original_price: null,
  tag: null, discount: null, image_url: '', rating: 4.8,
  reviews: 0, stock: 1, featured: false, featured_order: null,
}

const tagColors: Record<string, string> = {
  'OFERTA BOMBA': ORANGE, 'NUEVO': NAVY, 'BOMBA PRECIO': '#10b981', 'MÁS VENDIDO': '#6366f1', 'OFERTA': '#f59e0b',
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partial<Product> | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('products').select('*').order('featured_order', { ascending: true, nullsFirst: false }).order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  async function save() {
    if (!editing) return
    setSaving(true)
    if (isNew) {
      const { id: _id, created_at: _c, ...payload } = editing as Product
      await supabase.from('products').insert(payload)
    } else {
      const { created_at: _c, ...payload } = editing as Product
      await supabase.from('products').update(payload).eq('id', payload.id)
    }
    setSaving(false)
    setEditing(null)
    load()
  }

  async function remove(id: string) {
    setDeleting(id)
    await supabase.from('products').delete().eq('id', id)
    setDeleting(null)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  async function toggleFeatured(product: Product) {
    const updates = { featured: !product.featured, featured_order: !product.featured ? 99 : null }
    await supabase.from('products').update(updates).eq('id', product.id)
    load()
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label style={{ fontWeight: 600, fontSize: '0.78rem', color: NAVY, display: 'block', marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</label>
      {children}
    </div>
  )

  const inp = "w-full px-3 py-2.5 rounded-xl text-sm outline-none border"
  const inpStyle = { border: '1.5px solid rgba(10,17,40,0.12)', color: NAVY }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.875rem' }}>{products.length} productos en catálogo</p>
        <button
          onClick={() => { setEditing({ ...EMPTY }); setIsNew(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-white transition-all hover:opacity-90"
          style={{ background: ORANGE, fontSize: '0.875rem' }}
        >
          <Plus size={16} /> Nuevo producto
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-16" style={{ color: 'rgba(10,17,40,0.4)' }}>Cargando...</div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(10,17,40,0.06)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(10,17,40,0.07)', background: '#F8F9FA' }}>
                  {['Producto', 'Stock', 'Precio', 'Estado', 'Inicio', 'Acciones'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: 'rgba(10,17,40,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(10,17,40,0.05)' }} className="hover:bg-gray-50 transition-colors">
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div className="flex items-center gap-3">
                        <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-xl object-contain" style={{ background: '#F8F9FA' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        <div>
                          <p style={{ fontWeight: 700, color: NAVY, fontSize: '0.875rem' }}>{p.name}</p>
                          <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.45)' }}>{p.brand} · {p.storage} · {p.ram} RAM</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span
                        className="px-2.5 py-1 rounded-full font-bold"
                        style={{
                          background: p.stock === 0 ? 'rgba(239,68,68,0.1)' : p.stock <= 2 ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                          color: p.stock === 0 ? '#ef4444' : p.stock <= 2 ? '#f59e0b' : '#10b981',
                          fontSize: '0.78rem',
                        }}
                      >
                        {p.stock === 0 ? 'Sin stock' : p.stock}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <p style={{ fontWeight: 800, color: NAVY, fontSize: '0.9rem' }}>{p.price}€</p>
                      {p.original_price && <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)', textDecoration: 'line-through' }}>{p.original_price}€</p>}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      {p.tag ? (
                        <span className="px-2.5 py-1 rounded-full text-white" style={{ background: tagColors[p.tag] || NAVY, fontSize: '0.65rem', fontWeight: 800 }}>{p.tag}</span>
                      ) : <span style={{ color: 'rgba(10,17,40,0.25)', fontSize: '0.78rem' }}>—</span>}
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <button onClick={() => toggleFeatured(p)} title={p.featured ? 'Quitar del inicio' : 'Poner en inicio'}>
                        {p.featured
                          ? <ToggleRight size={22} style={{ color: ORANGE }} />
                          : <ToggleLeft size={22} style={{ color: 'rgba(10,17,40,0.25)' }} />}
                      </button>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditing({ ...p }); setIsNew(false) }} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                          <Pencil size={15} style={{ color: NAVY }} />
                        </button>
                        <button
                          onClick={() => remove(p.id)}
                          disabled={deleting === p.id}
                          className="p-2 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Create Modal */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: 'rgba(10,17,40,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setEditing(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 z-50 overflow-y-auto rounded-3xl bg-white"
              style={{ maxWidth: 640, maxHeight: '90vh', padding: '2rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', transform: undefined }}
            >
              <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 z-50 overflow-y-auto rounded-3xl bg-white"
                style={{ maxWidth: 640, width: '100%', maxHeight: '90vh', padding: '2rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', margin: 'auto' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontWeight: 900, color: NAVY, fontSize: '1.1rem' }}>{isNew ? 'Nuevo producto' : 'Editar producto'}</h2>
                  <button onClick={() => setEditing(null)} className="p-2 rounded-xl hover:bg-gray-100"><X size={20} /></button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <Field label="Nombre"><input className={inp} style={inpStyle} value={editing.name || ''} onChange={e => setEditing(p => ({ ...p!, name: e.target.value }))} /></Field>
                  <Field label="Marca">
                    <select className={inp} style={inpStyle} value={editing.brand || 'Apple'} onChange={e => setEditing(p => ({ ...p!, brand: e.target.value }))}>
                      {['Apple', 'Samsung', 'Xiaomi', 'Google'].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Almacenamiento"><input className={inp} style={inpStyle} value={editing.storage || ''} onChange={e => setEditing(p => ({ ...p!, storage: e.target.value }))} placeholder="128GB" /></Field>
                  <Field label="RAM"><input className={inp} style={inpStyle} value={editing.ram || ''} onChange={e => setEditing(p => ({ ...p!, ram: e.target.value }))} placeholder="8GB" /></Field>
                  <Field label="Estado">
                    <select className={inp} style={inpStyle} value={editing.condition || 'Precintado'} onChange={e => setEditing(p => ({ ...p!, condition: e.target.value }))}>
                      {['Precintado', 'Reacondicionado A+', 'Reacondicionado A', 'Reacondicionado B'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Stock"><input type="number" min={0} className={inp} style={inpStyle} value={editing.stock ?? 0} onChange={e => setEditing(p => ({ ...p!, stock: +e.target.value }))} /></Field>
                  <Field label="Precio (€)"><input type="number" min={0} className={inp} style={inpStyle} value={editing.price ?? 0} onChange={e => setEditing(p => ({ ...p!, price: +e.target.value }))} /></Field>
                  <Field label="Precio original (€)"><input type="number" min={0} className={inp} style={inpStyle} value={editing.original_price ?? ''} onChange={e => setEditing(p => ({ ...p!, original_price: e.target.value ? +e.target.value : null }))} placeholder="Dejar vacío si no hay" /></Field>
                  <Field label="Etiqueta">
                    <select className={inp} style={inpStyle} value={editing.tag || ''} onChange={e => setEditing(p => ({ ...p!, tag: e.target.value || null }))}>
                      <option value="">Sin etiqueta</option>
                      {Object.keys(tagColors).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Descuento"><input className={inp} style={inpStyle} value={editing.discount || ''} onChange={e => setEditing(p => ({ ...p!, discount: e.target.value || null }))} placeholder="-20%" /></Field>
                  <div className="sm:col-span-2">
                    <Field label="URL de imagen"><input className={inp} style={inpStyle} value={editing.image_url || ''} onChange={e => setEditing(p => ({ ...p!, image_url: e.target.value }))} placeholder="/images/iphone16promax.png" /></Field>
                  </div>
                  <Field label="Rating">
                    <input type="number" step={0.1} min={0} max={5} className={inp} style={inpStyle} value={editing.rating ?? 4.8} onChange={e => setEditing(p => ({ ...p!, rating: +e.target.value }))} />
                  </Field>
                  <Field label="Nº reseñas"><input type="number" min={0} className={inp} style={inpStyle} value={editing.reviews ?? 0} onChange={e => setEditing(p => ({ ...p!, reviews: +e.target.value }))} /></Field>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-2xl mb-6" style={{ background: '#F8F9FA' }}>
                  <input type="checkbox" id="featured" checked={!!editing.featured} onChange={e => setEditing(p => ({ ...p!, featured: e.target.checked }))} className="w-4 h-4 accent-orange-500" />
                  <label htmlFor="featured" style={{ fontWeight: 600, color: NAVY, fontSize: '0.875rem', cursor: 'pointer' }}>
                    Mostrar en página de inicio
                  </label>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setEditing(null)} className="flex-1 py-3 rounded-2xl font-semibold" style={{ background: '#F0F2F5', color: NAVY }}>Cancelar</button>
                  <button onClick={save} disabled={saving} className="flex-1 py-3 rounded-2xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90" style={{ background: ORANGE }}>
                    <Save size={16} />{saving ? 'Guardando...' : 'Guardar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
