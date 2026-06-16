import { useState, useEffect } from 'react'
import { supabase, type FormSubmission } from '../../../lib/supabase'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

const statusColors: Record<string, string> = {
  nuevo: '#ef4444', leido: '#f59e0b', contactado: '#6366f1', cerrado: '#10b981',
}
const statuses = ['nuevo', 'leido', 'contactado', 'cerrado']

export default function AdminSubmissions() {
  const [items, setItems] = useState<FormSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<FormSubmission | null>(null)
  const [filter, setFilter] = useState('todos')

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('form_submissions').select('*').order('created_at', { ascending: false })
    setItems(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('form_submissions').update({ status }).eq('id', id)
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: status as FormSubmission['status'] } : i))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: status as FormSubmission['status'] } : null)
  }

  async function deleteItem(id: string) {
    await supabase.from('form_submissions').delete().eq('id', id)
    setItems(prev => prev.filter(i => i.id !== id))
    setSelected(null)
  }

  const filtered = filter === 'todos' ? items : items.filter(i => i.status === filter)

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-5">
        {['todos', ...statuses].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className="px-3 py-1.5 rounded-full text-sm font-semibold capitalize transition-all"
            style={{ background: filter === s ? NAVY : '#F0F2F5', color: filter === s ? 'white' : 'rgba(10,17,40,0.6)' }}>
            {s}
            {s !== 'todos' && (
              <span className="ml-1.5 opacity-70">({items.filter(i => i.status === s).length})</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-16" style={{ color: 'rgba(10,17,40,0.4)' }}>Cargando...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl" style={{ color: 'rgba(10,17,40,0.4)' }}>
          No hay formularios en esta categoría
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 flex flex-wrap items-center gap-4 cursor-pointer hover:shadow-md transition-all"
              style={{ boxShadow: '0 2px 12px rgba(10,17,40,0.05)', borderLeft: `4px solid ${statusColors[item.status] || NAVY}` }}
              onClick={() => { setSelected(item); updateStatus(item.id, item.status === 'nuevo' ? 'leido' : item.status) }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                style={{ background: NAVY, fontSize: '0.8rem' }}>
                {item.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p style={{ fontWeight: 700, color: NAVY, fontSize: '0.9rem' }}>{item.name}</p>
                  {item.status === 'nuevo' && (
                    <span className="px-2 py-0.5 rounded-full text-white" style={{ background: '#ef4444', fontSize: '0.62rem', fontWeight: 800 }}>NUEVO</span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.5)' }}>
                  {item.brand && `${item.brand}`}{item.model && ` · ${item.model}`}{item.repair_type && ` · ${item.repair_type}`}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.35)', marginTop: 2 }}>
                  {new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <select
                value={item.status}
                onClick={e => e.stopPropagation()}
                onChange={e => updateStatus(item.id, e.target.value)}
                className="px-3 py-2 rounded-xl font-semibold text-white text-sm outline-none cursor-pointer"
                style={{ background: statusColors[item.status] || NAVY, border: 'none' }}>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: 'rgba(10,17,40,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSelected(null)} />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 z-50 bg-white rounded-3xl overflow-y-auto"
              style={{ maxWidth: 480, width: '100%', maxHeight: '90vh', padding: '2rem', boxShadow: '0 30px 80px rgba(0,0,0,0.3)', margin: 'auto' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontWeight: 800, color: NAVY }}>Solicitud de reparación</h2>
                <button onClick={() => setSelected(null)}><X size={20} /></button>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { l: 'Nombre', v: selected.name },
                  { l: 'Email', v: selected.email },
                  { l: 'Teléfono', v: selected.phone || '—' },
                  { l: 'Marca', v: selected.brand || '—' },
                  { l: 'Modelo', v: selected.model || '—' },
                  { l: 'Reparación', v: selected.repair_type || '—' },
                  { l: 'Notas', v: selected.notes || '—' },
                  { l: 'Fecha', v: new Date(selected.created_at).toLocaleString('es-ES') },
                ].map(({ l, v }) => (
                  <div key={l} className="flex gap-3">
                    <span style={{ fontWeight: 600, color: 'rgba(10,17,40,0.45)', fontSize: '0.8rem', minWidth: 90 }}>{l}</span>
                    <span style={{ fontWeight: 600, color: NAVY, fontSize: '0.875rem' }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label style={{ fontWeight: 600, fontSize: '0.8rem', color: NAVY, display: 'block', marginBottom: '0.4rem' }}>Estado</label>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl font-semibold text-white outline-none"
                  style={{ background: statusColors[selected.status], fontSize: '0.9rem' }}>
                  {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="flex gap-3">
                <a href={`tel:${selected.phone}`} className="flex-1 py-3 rounded-2xl font-semibold text-center transition-all hover:opacity-90" style={{ background: ORANGE, color: 'white' }}>
                  Llamar
                </a>
                <a href={`mailto:${selected.email}`} className="flex-1 py-3 rounded-2xl font-semibold text-center transition-all hover:bg-gray-100" style={{ background: '#F0F2F5', color: NAVY }}>
                  Email
                </a>
              </div>
              <button onClick={() => deleteItem(selected.id)} className="w-full mt-3 py-3 rounded-2xl font-semibold" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
                Eliminar solicitud
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
