import { useState, useEffect } from 'react'
import { supabase, type HeroConfig } from '../../../lib/supabase'
import { Save, Image } from 'lucide-react'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

export default function AdminSettings() {
  const [hero, setHero] = useState<HeroConfig | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('hero_config').select('*').limit(1).single()
    setHero(data)
    setLoading(false)
  }

  async function save() {
    if (!hero) return
    setSaving(true)
    await supabase.from('hero_config').update({
      hero_image_url: hero.hero_image_url,
      hero_title: hero.hero_title,
      hero_subtitle: hero.hero_subtitle,
      updated_at: new Date().toISOString(),
    }).eq('id', hero.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inp = "w-full px-4 py-3 rounded-2xl text-sm outline-none"
  const inpStyle = { border: '1.5px solid rgba(10,17,40,0.12)', color: NAVY }

  if (loading) return <div className="text-center py-16" style={{ color: 'rgba(10,17,40,0.4)' }}>Cargando...</div>

  return (
    <div className="max-w-2xl">
      {/* Hero section */}
      <div className="bg-white rounded-3xl p-6 mb-6" style={{ boxShadow: '0 2px 16px rgba(10,17,40,0.06)' }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.1)' }}>
            <Image size={18} style={{ color: ORANGE }} />
          </div>
          <div>
            <h2 style={{ fontWeight: 800, color: NAVY, fontSize: '1rem' }}>Página de Inicio — Hero</h2>
            <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)' }}>Imagen y textos del banner principal</p>
          </div>
        </div>

        {hero && (
          <div className="flex flex-col gap-5">
            {/* Preview */}
            {hero.hero_image_url && (
              <div className="rounded-2xl overflow-hidden flex items-center justify-center" style={{ height: 160, background: '#0A1128' }}>
                <img src={hero.hero_image_url} alt="Hero preview" className="h-full w-full object-contain" />
              </div>
            )}

            <div>
              <label style={{ fontWeight: 600, fontSize: '0.78rem', color: NAVY, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                URL de imagen del hero
              </label>
              <input
                className={inp} style={inpStyle}
                value={hero.hero_image_url}
                onChange={e => setHero(h => h ? { ...h, hero_image_url: e.target.value } : h)}
                placeholder="/images/iphone17promax_hero.png"
              />
              <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)', marginTop: '0.4rem' }}>
                Usa una ruta relativa como <code>/images/foto.png</code> o una URL externa
              </p>
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: '0.78rem', color: NAVY, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Título principal
              </label>
              <input
                className={inp} style={inpStyle}
                value={hero.hero_title}
                onChange={e => setHero(h => h ? { ...h, hero_title: e.target.value } : h)}
              />
            </div>

            <div>
              <label style={{ fontWeight: 600, fontSize: '0.78rem', color: NAVY, display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Subtítulo
              </label>
              <textarea
                rows={3}
                className={`${inp} resize-none`} style={inpStyle}
                value={hero.hero_subtitle}
                onChange={e => setHero(h => h ? { ...h, hero_subtitle: e.target.value } : h)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Featured products info */}
      <div className="bg-white rounded-3xl p-6 mb-6" style={{ boxShadow: '0 2px 16px rgba(10,17,40,0.06)' }}>
        <h2 style={{ fontWeight: 800, color: NAVY, fontSize: '1rem', marginBottom: '0.5rem' }}>Productos destacados en inicio</h2>
        <p style={{ fontSize: '0.875rem', color: 'rgba(10,17,40,0.55)', lineHeight: 1.7 }}>
          Gestiona qué productos aparecen en la sección de destacados de la página de inicio desde la pestaña <strong>Productos</strong>, usando el toggle de la columna <strong>Inicio</strong>.
        </p>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90"
        style={{ background: saved ? '#10b981' : ORANGE, fontSize: '1rem' }}
      >
        <Save size={18} />
        {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar cambios'}
      </button>
    </div>
  )
}
