import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import {
  Smartphone, Battery, Droplets, Wifi, Camera, ChevronRight,
  CheckCircle, ArrowRight, MapPin, Clock, Phone, Calendar,
  Zap, Users, Award, Shield, Wrench,
} from 'lucide-react'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

// ── Repair Wizard Data ───────────────────────────────
const brands = [
  { id: 'apple', name: 'Apple iPhone', logo: 'Apple', models: ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 15 Pro Max', 'iPhone 15', 'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone 12', 'iPhone SE'] },
  { id: 'samsung', name: 'Samsung Galaxy', logo: 'Samsung', models: ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy S23', 'Galaxy A55', 'Galaxy A35', 'Galaxy A15'] },
  { id: 'xiaomi', name: 'Xiaomi', logo: 'Xiaomi', models: ['Xiaomi 14', 'Redmi Note 13', 'POCO X6 Pro', 'Redmi 12C'] },
  { id: 'other', name: 'Otro dispositivo', logo: 'Otro', models: ['Otro modelo'] },
]

const repairTypes = [
  { id: 'screen', icon: Smartphone, name: 'Pantalla rota', time: '1–2h', priceFrom: '49€', popular: true },
  { id: 'battery', icon: Battery, name: 'Cambio de batería', time: '1h', priceFrom: '29€', popular: false },
  { id: 'water', icon: Droplets, name: 'Daños por agua', time: '24–48h', priceFrom: '59€', popular: false },
  { id: 'wifi', icon: Wifi, name: 'Problemas de red / señal', time: '1–3h', priceFrom: '39€', popular: false },
  { id: 'camera', icon: Camera, name: 'Cámara o flash', time: '1–2h', priceFrom: '45€', popular: false },
  { id: 'charging', icon: Zap, name: 'Puerto de carga', time: '1–2h', priceFrom: '35€', popular: false },
]

const processSteps = [
  { step: '01', title: 'Solicita cita', desc: 'Rellena el formulario o llámanos. Confirmaremos en menos de 2 horas.' },
  { step: '02', title: 'Diagnóstico gratuito', desc: 'Evaluamos el dispositivo sin coste. Te damos presupuesto cerrado.' },
  { step: '03', title: 'Reparación express', desc: 'La mayoría de reparaciones quedan listas el mismo día.' },
  { step: '04', title: 'Garantía incluida', desc: '6 meses de garantía en piezas y mano de obra. Sin letra pequeña.' },
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
              <h4 style={{ fontWeight: 800, color: NAVY, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Selecciona tu dispositivo</h4>
              <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Elige la marca de tu móvil</p>
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
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(10,17,40,0.06)' }}
                    >
                      <Smartphone size={18} style={{ color: NAVY }} />
                    </div>
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
                  <h4 style={{ fontWeight: 800, color: NAVY, fontSize: '1.1rem' }}>Tipo de reparación</h4>
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
                      <span style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)' }}>Tiempo estimado: {time}</span>
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
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.1)' }}>
                    <Smartphone size={18} style={{ color: ORANGE }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: NAVY, fontSize: '0.9rem' }}>{selectedModel}</p>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(10,17,40,0.5)' }}>{selectedRepair?.name} · desde {selectedRepair?.priceFrom} · {selectedRepair?.time}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: 'name', label: 'Nombre completo', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phone', label: 'Teléfono', type: 'tel' },
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
              <h4 style={{ fontWeight: 800, color: NAVY, fontSize: '1.2rem', marginBottom: 8 }}>Reserva confirmada</h4>
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
export default function ReparacionesPage() {
  return (
    <div className="pt-16" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ──────────────────────────────── */}
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
                SERVICIO TÉCNICO OFICIAL
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
                    <CheckCircle size={16} style={{ color: ORANGE, flexShrink: 0 }} />
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

      {/* ── SERVICES GRID ─────────────────────── */}
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
                <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)', marginBottom: 12 }}>Tiempo: {time}</p>
                <p style={{ fontWeight: 900, color: ORANGE, fontSize: '1.05rem' }}>desde {priceFrom}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────── */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: NAVY, letterSpacing: '-0.04em', marginBottom: 8 }}>
              Así funciona el <span style={{ color: ORANGE }}>proceso</span>
            </h2>
            <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '1rem' }}>Sencillo, transparente y sin sorpresas</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-3xl p-6"
                style={{ background: '#F8F9FA', border: '1px solid rgba(10,17,40,0.07)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: NAVY }}
                >
                  <span style={{ fontWeight: 900, color: ORANGE, fontSize: '0.85rem' }}>{step}</span>
                </div>
                <h3 style={{ fontWeight: 800, color: NAVY, fontSize: '1rem', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.875rem', lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Wrench size={36} style={{ color: ORANGE, margin: '0 auto 1.5rem' }} />
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'white', letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Tu móvil arreglado<br />
            <span style={{ color: ORANGE }}>hoy mismo.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Llámanos o pide cita online ahora. Sin esperas, sin letra pequeña.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:954000000"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03]"
              style={{ background: ORANGE, fontSize: '1rem' }}
            >
              <Phone size={18} />
              Llamar ahora
            </a>
            <Link
              to="/nosotros"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all"
              style={{ color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontSize: '1rem' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'white' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
            >
              Nuestra tienda
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
