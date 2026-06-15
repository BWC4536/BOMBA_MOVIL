import { Link } from 'react-router'
import { motion } from 'motion/react'
import {
  MapPin, Clock, Phone, ArrowRight,
  Users, Award, Shield, Smartphone, Star, Heart,
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

const values = [
  {
    icon: Shield,
    title: 'Honestidad',
    desc: 'Presupuesto cerrado desde el primer momento. Lo que te decimos es lo que pagas, sin sorpresas.',
  },
  {
    icon: Star,
    title: 'Calidad',
    desc: 'Solo trabajamos con piezas originales o certificadas. Tu dispositivo merece lo mejor.',
  },
  {
    icon: Heart,
    title: 'Cercanía',
    desc: 'Somos sevillanos y tratamos a cada cliente como si fuera de la familia. Eso se nota.',
  },
  {
    icon: Award,
    title: 'Experiencia',
    desc: 'Más de 8 años en el sector y miles de dispositivos reparados avalan nuestro trabajo.',
  },
]

const teamMembers = [
  {
    name: 'Carlos Moreno',
    role: 'Fundador y técnico jefe',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    name: 'Laura Jiménez',
    role: 'Técnica especialista en Apple',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    name: 'Javier Ruiz',
    role: 'Técnico Android y Samsung',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
]

export default function NosotrosPage() {
  return (
    <div className="pt-16" style={{ background: '#FFFFFF' }}>

      {/* ── HERO ──────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24"
        style={{ background: NAVY }}
      >
        <div
          className="absolute top-0 left-0 rounded-full pointer-events-none"
          style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span
              className="inline-block px-3 py-1 rounded-full mb-6"
              style={{ background: 'rgba(255,107,0,0.2)', color: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
            >
              SOBRE NOSOTROS
            </span>
            <h1
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                color: 'white',
                letterSpacing: '-0.045em',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              Sevillanos apasionados<br />
              por <span style={{ color: ORANGE }}>la tecnología</span>.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 560 }}>
              Desde 2016 somos el punto de referencia tecnológico en Sevilla. Nacimos como una pequeña tienda de reparaciones y hoy somos el mayor distribuidor independiente de la provincia.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {[
              { icon: Shield, value: '6 meses', label: 'Garantía en reparaciones' },
              { icon: Users, value: '5.000+', label: 'Clientes satisfechos' },
              { icon: Award, value: '8 años', label: 'De experiencia' },
              { icon: Smartphone, value: '12.000+', label: 'Dispositivos vendidos' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Icon size={20} style={{ color: ORANGE, marginBottom: 10 }} />
                <p style={{ fontWeight: 900, fontSize: '1.4rem', color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)', marginTop: 5 }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NUESTRA HISTORIA ─────────────────────── */}
      <section className="py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                NUESTRA HISTORIA
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
                De pequeño taller<br />
                a <span style={{ color: ORANGE }}>referencia</span><br />
                en Sevilla
              </h2>
              <p style={{ color: 'rgba(10,17,40,0.6)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                Todo empezó en 2016 cuando Carlos Moreno abrió un pequeño local en el Aljarafe con una herramienta y mucha ilusión. La filosofía era sencilla: reparar con honestidad y cobrar un precio justo.
              </p>
              <p style={{ color: 'rgba(10,17,40,0.6)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                Diez años después, BombaMóvil cuenta con un equipo de cinco técnicos certificados, más de 5.000 clientes habituales y una tienda en el corazón de Sevilla que ofrece tanto reparaciones como la venta de dispositivos nuevos y reacondicionados.
              </p>
              <Link
                to="/reparaciones"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all hover:opacity-90"
                style={{ background: ORANGE, color: 'white', fontSize: '0.9rem' }}
              >
                Ver servicios de reparación
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl overflow-hidden"
              style={{ height: 420 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1550041473-d296a3a8a18a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80"
                alt="Técnico reparando móvil en BombaMóvil Sevilla"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── VALORES ─────────────────────────────── */}
      <section className="py-20" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: NAVY, letterSpacing: '-0.04em', marginBottom: 8 }}>
              Lo que nos <span style={{ color: ORANGE }}>define</span>
            </h2>
            <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '1rem' }}>Los principios que guían cada reparación y cada venta</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl p-6"
                style={{ background: 'white', border: '1px solid rgba(10,17,40,0.07)', boxShadow: '0 2px 12px rgba(10,17,40,0.04)' }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(255,107,0,0.1)' }}>
                  <Icon size={22} style={{ color: ORANGE }} />
                </div>
                <h3 style={{ fontWeight: 800, color: NAVY, fontSize: '1rem', marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(10,17,40,0.55)', fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EQUIPO ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: NAVY, letterSpacing: '-0.04em', marginBottom: 8 }}>
              Nuestro <span style={{ color: ORANGE }}>equipo</span>
            </h2>
            <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '1rem' }}>Técnicos certificados con años de experiencia</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {teamMembers.map(({ name, role, image }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl overflow-hidden"
                style={{ background: '#F8F9FA', border: '1px solid rgba(10,17,40,0.07)' }}
              >
                <div style={{ height: 200 }}>
                  <ImageWithFallback
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <p style={{ fontWeight: 800, color: NAVY, fontSize: '0.95rem' }}>{name}</p>
                  <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.8rem', marginTop: 3 }}>{role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UBICACION / MAPA ─────────────────────────────── */}
      <section className="py-24" style={{ background: '#F8F9FA' }}>
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
                NUESTRA TIENDA
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
                  href="https://maps.app.goo.gl/RPTqSJxT9gosDQ2e7"
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

            {/* Google Maps real */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{ height: 420, boxShadow: '0 8px 40px rgba(10,17,40,0.1)', border: '1px solid rgba(10,17,40,0.08)' }}
              >
                <iframe
                  title="BombaMóvil en Google Maps"
                  src="https://maps.google.com/maps?q=Av.+Primero+de+Mayo,+52,+41010+Sevilla,+España&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────── */}
      <section className="py-16" style={{ background: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: 'white', letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
            Estamos aquí<br />
            <span style={{ color: ORANGE }}>para ayudarte.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
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
              to="/reparaciones"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all"
              style={{ color: 'white', border: '2px solid rgba(255,255,255,0.3)', fontSize: '1rem' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'white' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)' }}
            >
              Solicitar reparación
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
