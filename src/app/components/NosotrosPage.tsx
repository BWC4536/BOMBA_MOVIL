import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import {
  Smartphone, Battery, Droplets, Wifi, Camera, ChevronRight,
  CheckCircle, ArrowRight, MapPin, Clock, Phone, Calendar,
  Newspaper, Zap, Users, Award, Shield,
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

// ── Repair Wizard Data ───────────────────────────────
const brands = [
  { id: 'apple', name: 'Apple iPhone', emoji: '🍎', models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone SE'] },
  { id: 'samsung', name: 'Samsung Galaxy', emoji: '🔵', models: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23', 'Galaxy A55', 'Galaxy A35', 'Galaxy A15'] },
  { id: 'xiaomi', name: 'Xiaomi', emoji: '⚡', models: ['Xiaomi 14', 'Redmi Note 13', 'POCO X6 Pro', 'Redmi 12C'] },
  { id: 'other', name: 'Otro dispositivo', emoji: '📱', models: ['Otro modelo'] },
]

const repairTypes = [
  { id: 'screen', icon: Smartphone, name: 'Pantalla rota', time: '1–2h', priceFrom: '49€', popular: true },
  { id: 'battery', icon: Battery, name: 'Cambio de batería', time: '1h', priceFrom: '29€', popular: false },
  { id: 'water', icon: Droplets, name: 'Daños por agua', time: '24–48h', priceFrom: '59€', popular: false },
  { id: 'wifi', icon: Wifi, name: 'Problemas de red / señal', time: '1–3h', priceFrom: '39€', popular: false },
  { id: 'camera', icon: Camera, name: 'Cámara o flash', time: '1–2h', priceFrom: '45€', popular: false },
  { id: 'charging', icon: Zap, name: 'Puerto de carga', time: '1–2h', priceFrom: '35€', popular: false },
]

// ── Blog Posts ───────────────────────────────────────
const blogPosts = [
  {
    id: 1,
    category: '🔥 RESTOCK',
    title: 'iPhone 16 Pro Max disponible en tienda',
    excerpt: 'Ya tenemos stock del nuevo iPhone 16 Pro Max en todas las capacidades. Pásate por la tienda o reserva online.',
    date: '10 Jun 2025',
    readTime: '2 min',
    image: 'https://images.unsplash.com/photo-1652804854453-0f2354bfc350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 2,
    category: '📰 NOTICIAS',
    title: 'Qué esperar de Android 15: todo lo que sabemos',
    excerpt: 'Google prepara la mayor actualización en años. Repasamos las funciones confirmadas que llegarán este otoño.',
    date: '5 Jun 2025',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1709744722656-9b850470293f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 3,
    category: '🏆 COMUNIDAD',
    title: 'BombaMóvil patrocina el Campus Tech Sevilla 2025',
    excerpt: 'Orgullosos de apoyar el talento tecnológico local. Más de 200 jóvenes programadores se formarán este verano.',
    date: '1 Jun 2025',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1771033834141-023d630b3965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 4,
    category: '💡 CONSEJOS',
    title: '5 señales de que tu batería necesita cambio urgente',
    excerpt: 'Si tu móvil se apaga al 20% o la carga no dura ni medio día, es hora de actuar. Te explicamos cómo detectarlo.',
    date: '28 May 2025',
    readTime: '3 min',
    image: 'https://images.unsplash.com/photo-1550041473-d296a3a8a18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
]

// ── Wizard Component ─────────────────────────────────
function RepairWizard() {
  const [step, setStep] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState<typeof brands[0] | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedRepair, setSelectedRepair] = useState<typeof repairTypes[0] | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' })
  const [submitted, setSubmitted] = useState(false)

  const stepTitles = ['Marca', 'Modelo', 'Reparación', 'Confirmar']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="rounded-3xl overflow-hidden"
      style={{ background: 'white', border: '1px solid rgba(10,17,40,0.07)', boxShadow: '0 8px 40px rgba(10,17,40,0.08)' }}
    >
      {/* Progress header */}
      <div style={{ background: NAVY, padding: '1.5rem 2rem' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 style={{ fontWeight: 800, color: 'white', fontSize: '1.05rem' }}>Solicitar Reparación</h3>
          <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>Paso {step} de 4</span>
        </div>
        {/* Progress bar */}
        <div className="flex gap-2">
          {stepTitles.map((title, i) => (
            <div key={i} className="flex-1">
              <div
                className="h-1.5 rounded-full transition-all duration-400"
                style={{ background: i < step ? ORANGE : 'rgba(255,255,255,0.15)' }}
              />
              <p style={{ fontSize: '0.65rem', color: i < step ? ORANGE : 'rgba(255,255,255,0.35)', marginTop: 6, fontWeight: i + 1 === step ? 700 : 400 }}>
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Brand */}
          {step === 1 && !submitted && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <h4 style={{ fontWeight: 800, color: NAVY, marginBottom: '0.5rem', fontSize: '1.1rem' }}>¿Cuál es tu dispositivo?</h4>
              <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Selecciona la marca de tu móvil</p>
              <div className="grid grid-cols-2 gap-3">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => { setSelectedBrand(brand); setStep(2) }}
                    className="flex items-center gap-4 p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
                    style={{
                      border: `2px solid ${selectedBrand?.id === brand.id ? ORANGE : 'rgba(10,17,40,0.1)'}`,
                      background: selectedBrand?.id === brand.id ? 'rgba(255,107,0,0.05)' : 'white',
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{brand.emoji}</span>
                    <span style={{ fontWeight: 700, color: NAVY, fontSize: '0.9rem', lineHeight: 1.3 }}>{brand.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Model */}
          {step === 2 && !submitted && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setStep(1)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <ChevronRight size={18} style={{ color: NAVY, transform: 'rotate(180deg)' }} />
                </button>
                <div>
                  <h4 style={{ fontWeight: 800, color: NAVY, fontSize: '1.1rem' }}>Selecciona el modelo</h4>
                  <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.82rem' }}>{selectedBrand?.name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {selectedBrand?.models.map((model) => (
                  <button
                    key={model}
                    onClick={() => { setSelectedModel(model); setStep(3) }}
                    className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-left transition-all hover:bg-gray-50"
                    style={{ border: '1px solid rgba(10,17,40,0.08)', background: selectedModel === model ? 'rgba(255,107,0,0.06)' : 'white' }}
                  >
                    <span style={{ fontWeight: 600, color: NAVY, fontSize: '0.9rem' }}>{model}</span>
                    <ChevronRight size={16} style={{ color: 'rgba(10,17,40,0.3)' }} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Repair type */}
          {step === 3 && !submitted && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setStep(2)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <ChevronRight size={18} style={{ color: NAVY, transform: 'rotate(180deg)' }} />
                </button>
                <div>
                  <h4 style={{ fontWeight: 800, color: NAVY, fontSize: '1.1rem' }}>¿Qué necesitas reparar?</h4>
                  <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.82rem' }}>{selectedBrand?.name} · {selectedModel}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {repairTypes.map(({ id, icon: Icon, name, time, priceFrom, popular }) => (
                  <button
                    key={id}
                    onClick={() => { setSelectedRepair({ id, icon: Icon, name, time, priceFrom, popular }); setStep(4) }}
                    className="flex items-center gap-4 px-4 py-4 rounded-2xl text-left transition-all hover:scale-[1.01]"
                    style={{
                      border: `1.5px solid ${selectedRepair?.id === id ? ORANGE : 'rgba(10,17,40,0.08)'}`,
                      background: selectedRepair?.id === id ? 'rgba(255,107,0,0.04)' : 'white',
                    }}
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,107,0,0.1)' }}>
                      <Icon size={18} style={{ color: ORANGE }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span style={{ fontWeight: 700, color: NAVY, fontSize: '0.9rem' }}>{name}</span>
                        {popular && (
                          <span className="px-2 py-0.5 rounded-full" style={{ background: ORANGE, color: 'white', fontSize: '0.6rem', fontWeight: 700 }}>
                            POPULAR
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)' }}>⏱ {time}</span>
                    </div>
                    <span style={{ fontWeight: 800, color: ORANGE, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>desde {priceFrom}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Contact form */}
          {step === 4 && !submitted && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 mb-5">
                <button onClick={() => setStep(3)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <ChevronRight size={18} style={{ color: NAVY, transform: 'rotate(180deg)' }} />
                </button>
                <div>
                  <h4 style={{ fontWeight: 800, color: NAVY, fontSize: '1.1rem' }}>Confirmar reserva</h4>
                  <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.82rem' }}>{selectedRepair?.name} · {selectedModel}</p>
                </div>
              </div>

              {/* Summary card */}
              <div className="rounded-2xl p-4 mb-6" style={{ background: '#F8F9FA', border: '1px solid rgba(10,17,40,0.07)' }}>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: '1.5rem' }}>{selectedBrand?.emoji}</span>
                  <div>
                    <p style={{ fontWeight: 700, color: NAVY, fontSize: '0.9rem' }}>{selectedModel}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(10,17,40,0.5)' }}>{selectedRepair?.name} · desde {selectedRepair?.priceFrom} · ⏱ {selectedRepair?.time}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: 'name', label: 'Nombre completo', type: 'text', icon: Users },
                  { name: 'email', label: 'Email', type: 'email', icon: null },
                  { name: 'phone', label: 'Teléfono', type: 'tel', icon: Phone },
                ].map(({ name, label, type }) => (
                  <div key={name}>
                    <label style={{ fontWeight: 600, fontSize: '0.8rem', color: NAVY, display: 'block', marginBottom: '0.4rem' }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={formData[name as keyof typeof formData]}
                      onChange={(e) => setFormData((d) => ({ ...d, [name]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl outline-none transition-all text-sm"
                      style={{ border: '1.5px solid rgba(10,17,40,0.12)', color: NAVY, background: 'white' }}
                      placeholder={`Tu ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontWeight: 600, fontSize: '0.8rem', color: NAVY, display: 'block', marginBottom: '0.4rem' }}>
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData((d) => ({ ...d, notes: e.target.value }))}
                    rows={2}
                    className="w-full px-4 py-3 rounded-2xl outline-none transition-all text-sm resize-none"
                    style={{ border: '1.5px solid rgba(10,17,40,0.12)', color: NAVY, background: 'white' }}
                    placeholder="Cuéntanos más sobre el problema..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl font-bold text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                  style={{ background: ORANGE, fontSize: '0.95rem' }}
                >
                  <Calendar size={18} />
                  Confirmar Cita Gratis
                </button>
              </form>
            </motion.div>
          )}

          {/* Success */}
          {submitted && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16,185,129,0.1)' }}>
                <CheckCircle size={32} style={{ color: '#10b981' }} />
              </div>
              <h4 style={{ fontWeight: 800, color: NAVY, fontSize: '1.2rem', marginBottom: 8 }}>¡Reserva confirmada!</h4>
              <p style={{ color: 'rgba(10,17,40,0.55)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Te llamaremos en menos de 2 horas para confirmar tu cita.<br />
                Revisa tu email para más detalles.
              </p>
              <button
                onClick={() => { setStep(1); setSubmitted(false); setSelectedBrand(null); setSelectedModel(null); setSelectedRepair(null) }}
                className="px-6 py-3 rounded-full font-semibold transition-all hover:opacity-80"
                style={{ background: 'rgba(10,17,40,0.08)', color: NAVY, fontSize: '0.875rem' }}
              >
                Nueva solicitud
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ── Main Page ────────────────────────────────────────
export default function NosotrosPage() {
  return (
    <div className="pt-16" style={{ background: '#FFFFFF' }}>

      {/* ── REPAIR HERO ──────────────────────────────── */}
      <section
        className="relative overflow-hidden py-20"
        style={{ background: NAVY }}
      >
        <div
          className="absolute top-0 right-0 rounded-full pointer-events-none"
          style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)', filter: 'blur(60px)', transform: 'translate(30%, -30%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(255,107,0,0.2)', color: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
              >
                🔧 SERVICIO TÉCNICO OFICIAL
              </span>
              <h1
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                  color: 'white',
                  letterSpacing: '-0.045em',
                  lineHeight: 1.05,
                  marginBottom: '1.25rem',
                }}
              >
                Reparaciones<br />
                <span style={{ color: ORANGE }}>en el día</span>.<br />
                Sin sorpresas.
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2rem', maxWidth: 460 }}>
                Técnicos certificados, repuestos originales y presupuesto sin compromiso. Si no lo reparamos, no cobras.
              </p>

              {/* Repair stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '+8.000', label: 'Reparaciones', icon: Smartphone },
                  { value: '98%', label: 'Éxito', icon: Award },
                  { value: '2h', label: 'Tiempo medio', icon: Clock },
                ].map(({ value, label, icon: Icon }) => (
                  <div key={label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon size={18} style={{ color: ORANGE, marginBottom: 8 }} />
                    <p style={{ fontWeight: 900, fontSize: '1.3rem', color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{label}</p>
                  </div>
                ))}
              </div>

              {/* Guarantees */}
              <div className="flex flex-col gap-3">
                {[
                  'Presupuesto gratuito y sin compromiso',
                  'Repuestos originales o certificados',
                  'Garantía de 6 meses en toda reparación',
                  'Entrega el mismo día en la mayoría de casos',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: ORANGE, shrink: 0 }} />
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — Wizard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <RepairWizard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── REPAIR SERVICES GRID ─────────────────────── */}
      <section className="py-20" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: NAVY, letterSpacing: '-0.04em', marginBottom: 8 }}>
              Todos nuestros <span style={{ color: ORANGE }}>servicios</span>
            </h2>
            <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '1rem' }}>Reparaciones profesionales para cualquier dispositivo</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {repairTypes.map(({ id, icon: Icon, name, time, priceFrom, popular }) => (
              <motion.div
                key={id}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(10,17,40,0.1)' }}
                className="rounded-3xl p-6 cursor-pointer transition-all"
                style={{ background: 'white', border: '1px solid rgba(10,17,40,0.07)', boxShadow: '0 2px 12px rgba(10,17,40,0.04)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.1)' }}>
                    <Icon size={22} style={{ color: ORANGE }} />
                  </div>
                  {popular && (
                    <span className="px-2.5 py-1 rounded-full" style={{ background: ORANGE, color: 'white', fontSize: '0.62rem', fontWeight: 800 }}>
                      POPULAR
                    </span>
                  )}
                </div>
                <h3 style={{ fontWeight: 800, color: NAVY, fontSize: '0.95rem', marginBottom: 4 }}>{name}</h3>
                <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)', marginBottom: 12 }}>⏱ Tiempo: {time}</p>
                <p style={{ fontWeight: 900, color: ORANGE, fontSize: '1.05rem' }}>desde {priceFrom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / STORE ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
              >
                📍 NUESTRA TIENDA
              </span>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: NAVY,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem',
                }}
              >
                Visítanos en<br />
                el <span style={{ color: ORANGE }}>corazón</span><br />
                de Sevilla
              </h2>
              <p style={{ color: 'rgba(10,17,40,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
                Más de 8 años atendiendo a sevillanos y visitantes en nuestra tienda física. Ven, prueba y asesórate sin compromiso con nuestros expertos.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {[
                  { icon: MapPin, text: 'Av. Primero de Mayo, 52, 41010 Sevilla', label: 'Dirección' },
                  { icon: Clock, text: 'Lun – Sáb: 10:00 – 20:00 h · Dom: Cerrado', label: 'Horario' },
                  { icon: Phone, text: '954 000 000', label: 'Teléfono' },
                ].map(({ icon: Icon, text, label }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,107,0,0.1)' }}>
                      <Icon size={18} style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</p>
                      <p style={{ fontWeight: 600, color: NAVY, fontSize: '0.9rem' }}>{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90"
                  style={{ background: ORANGE, color: 'white', fontSize: '0.9rem' }}
                >
                  <MapPin size={16} />
                  Cómo llegar
                </a>
                <a
                  href="tel:954000000"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:bg-gray-100"
                  style={{ color: NAVY, border: `2px solid ${NAVY}`, fontSize: '0.9rem' }}
                >
                  <Phone size={16} />
                  Llamar ahora
                </a>
              </div>
            </motion.div>

            {/* Map + store image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Map iframe placeholder */}
              <div
                className="rounded-3xl overflow-hidden flex flex-col items-center justify-center"
                style={{ height: 280, background: '#EEF0F3', border: '1px solid rgba(10,17,40,0.08)', position: 'relative' }}
              >
                <div
                  className="absolute inset-0 rounded-3xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #e8ebf0 0%, #dde1e8 100%)' }}
                />
                <div className="relative z-10 text-center p-6">
                  <MapPin size={36} style={{ color: ORANGE, marginBottom: 8 }} />
                  <p style={{ fontWeight: 800, color: NAVY, fontSize: '0.9rem', marginBottom: 4 }}>
                    [ GOOGLE MAPS IFRAME ]
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(10,17,40,0.5)', lineHeight: 1.5 }}>
                    Av. Primero de Mayo, 52<br />41010 Sevilla, España
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 px-5 py-2.5 rounded-full text-white text-sm font-semibold"
                    style={{ background: ORANGE }}
                  >
                    Abrir en Maps
                  </a>
                </div>
              </div>

              {/* Store interior image */}
              <div className="rounded-3xl overflow-hidden" style={{ height: 220 }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1771033834141-023d630b3965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                  alt="Interior tienda BombaMóvil Sevilla"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TEAM / ABOUT ─────────────────────────────── */}
      <section className="py-20" style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Repair photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl overflow-hidden"
              style={{ height: 380 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550041473-d296a3a8a18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                alt="Técnico reparando móvil en BombaMóvil"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(255,107,0,0.2)', color: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
              >
                🏪 SOBRE NOSOTROS
              </span>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  color: 'white',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem',
                }}
              >
                Sevillanos<br />
                apasionados por<br />
                <span style={{ color: ORANGE }}>la tecnología</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Desde 2016, somos el punto de referencia tecnológico en Sevilla. Nacimos como una pequeña tienda de reparaciones y hoy somos el mayor distribuidor independiente de la provincia con más de 5.000 clientes satisfechos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, value: '3 Años', label: 'Garantía oficial' },
                  { icon: Users, value: '5.000+', label: 'Clientes fieles' },
                  { icon: Award, value: '8 Años', label: 'De experiencia' },
                  { icon: Smartphone, value: '12.000+', label: 'Dispositivos vendidos' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon size={18} style={{ color: ORANGE, marginBottom: 8 }} />
                    <p style={{ fontWeight: 900, fontSize: '1.2rem', color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</p>
                    <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BLOG / NEWS ──────────────────────────────── */}
      <section className="py-24" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
              >
                📰 NOTICIAS & COMUNIDAD
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: NAVY, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Novedades, restocks<br />y comunidad tech
              </h2>
            </div>
            <button
              className="inline-flex items-center gap-2 self-start md:self-end transition-colors group"
              style={{ color: NAVY, fontSize: '0.9rem', fontWeight: 600 }}
            >
              <Newspaper size={18} />
              Ver todas las noticias
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
                whileHover={{ y: -5, boxShadow: '0 16px 50px rgba(10,17,40,0.1)' }}
                className="group rounded-3xl overflow-hidden cursor-pointer"
                style={{ background: 'white', border: '1px solid rgba(10,17,40,0.07)', boxShadow: '0 2px 12px rgba(10,17,40,0.04)' }}
              >
                <div className="overflow-hidden" style={{ height: 180 }}>
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span
                    className="inline-block mb-3 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(10,17,40,0.06)', fontSize: '0.68rem', fontWeight: 700, color: 'rgba(10,17,40,0.55)' }}
                  >
                    {post.category}
                  </span>
                  <h3 style={{ fontWeight: 800, color: NAVY, fontSize: '0.95rem', lineHeight: 1.3, marginBottom: 8 }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(10,17,40,0.5)', lineHeight: 1.65, marginBottom: '1rem' }}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)' }}>{post.date} · {post.readTime}</span>
                    <ArrowRight size={16} style={{ color: ORANGE }} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="py-16" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: NAVY, letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            ¿Tienes una pregunta?<br />
            <span style={{ color: ORANGE }}>Estamos aquí.</span>
          </h2>
          <p style={{ color: 'rgba(10,17,40,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Llámanos, escríbenos o visítanos en tienda. Somos personas reales atendiendo a personas reales.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:954000000"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ background: ORANGE, fontSize: '1rem' }}
            >
              <Phone size={18} />
              954 000 000
            </a>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:bg-gray-50"
              style={{ color: NAVY, border: `2px solid ${NAVY}`, fontSize: '1rem' }}
            >
              Ver Catálogo
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
