import { useRef } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import {
  ShoppingCart, Star, ArrowRight, Shield, MapPin, Truck,
  Zap, RefreshCw, ChevronRight, Award, Users, Clock,
} from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

const featuredProducts = [
  {
    id: 1, name: 'iPhone 16 Pro Max', storage: '256GB', ram: '8GB',
    condition: 'Precintado', price: '1.149€', originalPrice: '1.299€',
    tag: 'OFERTA BOMBA', brand: 'Apple', discount: '-12%',
    image: 'https://images.unsplash.com/photo-1652804854453-0f2354bfc350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=480&q=80',
  },
  {
    id: 2, name: 'iPhone 15 Pro', storage: '512GB', ram: '8GB',
    condition: 'Precintado', price: '899€', originalPrice: null,
    tag: 'NUEVO', brand: 'Apple', discount: null,
    image: 'https://images.unsplash.com/photo-1656099707503-0731bdec9565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=480&q=80',
  },
  {
    id: 3, name: 'iPhone 15', storage: '128GB', ram: '6GB',
    condition: 'Reacondicionado A+', price: '599€', originalPrice: '749€',
    tag: 'BOMBA PRECIO', brand: 'Apple', discount: '-20%',
    image: 'https://images.unsplash.com/photo-1657561758945-c8d9687ee951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=480&q=80',
  },
  {
    id: 4, name: 'Samsung S24 Ultra', storage: '512GB', ram: '12GB',
    condition: 'Precintado', price: '979€', originalPrice: null,
    tag: 'MÁS VENDIDO', brand: 'Samsung', discount: null,
    image: 'https://images.unsplash.com/photo-1709744722656-9b850470293f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=480&q=80',
  },
  {
    id: 5, name: 'iPhone 14 Pro', storage: '256GB', ram: '6GB',
    condition: 'Reacondicionado A', price: '649€', originalPrice: '849€',
    tag: 'OFERTA BOMBA', brand: 'Apple', discount: '-24%',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=480&q=80',
  },
  {
    id: 6, name: 'iPhone SE 3', storage: '128GB', ram: '4GB',
    condition: 'Reacondicionado A+', price: '349€', originalPrice: '449€',
    tag: null, brand: 'Apple', discount: '-22%',
    image: 'https://images.unsplash.com/photo-1759588071782-b2091e07d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=480&q=80',
  },
]

const reviews = [
  {
    id: 1, author: 'María G.', initials: 'MG',
    text: 'Increíble servicio. Mi iPhone llegó en perfectas condiciones y en menos de 24 horas. Sin duda la mejor tienda de Sevilla.',
    rating: 5, product: 'iPhone 15 Pro', date: 'Hace 2 días',
  },
  {
    id: 2, author: 'Carlos M.', initials: 'CM',
    text: 'Reparación de pantalla rapidísima. En menos de 2 horas tenía el móvil como nuevo. Precio muy justo.',
    rating: 5, product: 'Reparación Pantalla', date: 'Hace 1 semana',
  },
  {
    id: 3, author: 'Ana P.', initials: 'AP',
    text: 'Vendí mi iPhone 12 y la tasación fue justa, pago inmediato. Totalmente recomendado.',
    rating: 5, product: 'Trade-in', date: 'Hace 3 días',
  },
  {
    id: 4, author: 'Roberto L.', initials: 'RL',
    text: 'Los chicos son expertos. Me asesoraron perfectamente para elegir el modelo que necesitaba.',
    rating: 5, product: 'iPhone 16 Pro', date: 'Hace 5 días',
  },
  {
    id: 5, author: 'Laura F.', initials: 'LF',
    text: 'La garantía de 3 años realmente la cumplen. Tuve una incidencia y la resolvieron al momento.',
    rating: 5, product: 'Garantía', date: 'Hace 1 semana',
  },
]

const tagColor: Record<string, string> = {
  'OFERTA BOMBA': ORANGE,
  'NUEVO': NAVY,
  'BOMBA PRECIO': '#10b981',
  'MÁS VENDIDO': '#6366f1',
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill={ORANGE} style={{ color: ORANGE }} />
      ))}
    </div>
  )
}

function ProductCard({ product, large = false }: { product: typeof featuredProducts[0]; large?: boolean }) {
  const tagBg = product.tag ? (tagColor[product.tag] ?? NAVY) : null

  return (
    <motion.div
      variants={itemUp}
      whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(10,17,40,0.12)' }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ background: 'white', border: '1px solid rgba(10,17,40,0.06)', boxShadow: '0 4px 24px rgba(10,17,40,0.06)' }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ height: large ? 320 : 220, background: '#F8F9FA' }}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Condition badge */}
        <div className="absolute top-3 right-3">
          <span
            className="px-2.5 py-1 rounded-full text-white"
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              background: product.condition === 'Precintado' ? NAVY : '#10b981',
              letterSpacing: '0.04em',
            }}
          >
            {product.condition}
          </span>
        </div>

        {/* Promo ribbon */}
        {tagBg && product.tag && (
          <div className="absolute top-3 left-0">
            <div
              className="flex items-center text-white"
              style={{
                background: tagBg,
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                paddingLeft: '12px',
                paddingRight: '18px',
                paddingTop: '5px',
                paddingBottom: '5px',
                clipPath: 'polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              {product.tag}
            </div>
          </div>
        )}

        {/* Discount badge */}
        {product.discount && (
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-white"
              style={{ background: ORANGE, fontSize: '0.72rem', fontWeight: 800 }}
            >
              {product.discount}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5">
        <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)', fontWeight: 600, marginBottom: '0.3rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {product.brand}
        </p>
        <h3 style={{ fontWeight: 800, color: NAVY, lineHeight: 1.2, fontSize: large ? '1.1rem' : '0.95rem', marginBottom: '0.3rem' }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'rgba(10,17,40,0.5)', marginBottom: '1rem' }}>
          {product.storage} · {product.ram} RAM
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span style={{ fontSize: large ? '1.4rem' : '1.2rem', fontWeight: 900, color: NAVY }}>
              {product.price}
            </span>
            {product.originalPrice && (
              <span
                className="ml-2"
                style={{ fontSize: '0.85rem', color: 'rgba(10,17,40,0.35)', textDecoration: 'line-through' }}
              >
                {product.originalPrice}
              </span>
            )}
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
            style={{ background: ORANGE }}
          >
            <ShoppingCart size={16} className="text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const blobY = useTransform(scrollY, [0, 600], [0, -100])
  const phoneY = useTransform(scrollY, [0, 600], [0, 60])

  return (
    <div style={{ background: '#FFFFFF' }}>
      {/* ── HERO ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex items-center pt-16"
        style={{ background: '#FFFFFF' }}
      >
        {/* Radial glow */}
        <motion.div
          style={{ y: blobY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute top-0 right-0 w-3/4 h-full"
            style={{
              background: 'radial-gradient(ellipse at 80% 30%, rgba(255,107,0,0.07) 0%, transparent 65%)',
            }}
          />
          <div
            className="absolute top-1/4 right-1/4 rounded-full"
            style={{
              width: 500,
              height: 500,
              background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] items-center gap-12 lg:gap-0">
          {/* Left — text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative z-10"
          >
            {/* Pill label */}
            <motion.div variants={itemUp} className="flex items-center gap-3 mb-8 flex-wrap">
              <span
                className="px-3.5 py-1.5 rounded-full text-white"
                style={{ background: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
              >
                ⚡ NUEVA COLECCIÓN 2025
              </span>
              <span style={{ color: NAVY, fontSize: '0.85rem', opacity: 0.5 }}>
                iPhone 16 ya disponible
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemUp}
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                fontWeight: 900,
                color: NAVY,
                lineHeight: 1.0,
                letterSpacing: '-0.045em',
                marginBottom: '1.75rem',
              }}
            >
              Tecnología<br />
              Premium.<br />
              <span style={{ color: ORANGE }}>Precios</span><br />
              de Locura.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemUp}
              style={{
                color: NAVY,
                opacity: 0.55,
                fontSize: '1.05rem',
                lineHeight: 1.75,
                maxWidth: 400,
                marginBottom: '2.5rem',
              }}
            >
              iPhones nuevos y reacondicionados, Androids premium y reparaciones exprés. Tu tienda de confianza en Sevilla.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemUp} className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03] active:scale-95"
                style={{ background: ORANGE, fontSize: '1rem' }}
              >
                Comprar Ahora
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/reparaciones"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:bg-gray-50 active:scale-95"
                style={{ color: NAVY, border: `2px solid ${NAVY}`, fontSize: '1rem' }}
              >
                Ver Servicios
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemUp} className="flex items-center gap-6 flex-wrap">
              {[
                { value: '5.000+', label: 'Clientes felices' },
                { value: `4.9★`, label: 'Rating Google', orange: true },
                { value: '3 años', label: 'De garantía' },
              ].map(({ value, label, orange }, i) => (
                <div key={i} className="flex items-center gap-5">
                  {i > 0 && (
                    <div style={{ width: 1, height: 40, background: 'rgba(10,17,40,0.12)' }} />
                  )}
                  <div>
                    <p style={{ fontWeight: 900, fontSize: '1.4rem', color: orange ? ORANGE : NAVY, lineHeight: 1, letterSpacing: '-0.03em' }}>
                      {value}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)', marginTop: '0.3rem' }}>
                      {label}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — floating phone */}
          <div className="relative flex items-center justify-center h-[500px] lg:h-[680px]">
            {/* Background blob */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 440,
                height: 440,
                background: 'radial-gradient(circle, rgba(255,107,0,0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Phone */}
            <motion.div
              style={{ y: phoneY }}
              className="relative z-10"
            >
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1652804854453-0f2354bfc350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=620&q=80"
                  alt="iPhone 16 Pro Max - BombaMóvil"
                  className="object-contain"
                  style={{
                    width: 'clamp(200px, 28vw, 360px)',
                    height: 'auto',
                    filter:
                      'drop-shadow(0 50px 80px rgba(10,17,40,0.22)) drop-shadow(0 0 60px rgba(255,107,0,0.08))',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Floating badge — top left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/4 left-0 lg:-left-8 rounded-2xl p-3.5"
              style={{ background: 'white', boxShadow: '0 8px 32px rgba(10,17,40,0.14)', border: '1px solid rgba(10,17,40,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ORANGE }}>
                  <Zap size={16} fill="white" className="text-white" />
                </div>
                <div>
                  <p style={{ fontSize: '0.62rem', color: 'rgba(10,17,40,0.45)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    PRECINTADO
                  </p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 800, color: NAVY, marginTop: 2 }}>iPhone 16 Pro</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-1/4 right-0 lg:-right-8 rounded-2xl p-3.5"
              style={{ background: 'white', boxShadow: '0 8px 32px rgba(10,17,40,0.14)', border: '1px solid rgba(10,17,40,0.06)' }}
            >
              <div>
                <p style={{ fontSize: '0.62rem', color: 'rgba(10,17,40,0.45)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  DESDE
                </p>
                <p style={{ fontSize: '1.5rem', fontWeight: 900, color: ORANGE, lineHeight: 1.1, letterSpacing: '-0.04em', marginTop: 4 }}>
                  349€
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Truck size={12} style={{ color: 'rgba(10,17,40,0.4)' }} />
                  <p style={{ fontSize: '0.7rem', color: 'rgba(10,17,40,0.45)' }}>Envío en 24h</p>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-12 right-4 lg:right-0 rounded-2xl px-3 py-2"
              style={{ background: NAVY }}
            >
              <div className="flex items-center gap-1.5">
                <Star size={12} fill={ORANGE} style={{ color: ORANGE }} />
                <p style={{ fontSize: '0.78rem', fontWeight: 800, color: 'white' }}>4.9 / 5</p>
              </div>
              <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Google Reviews</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────── */}
      <section style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {[
              { icon: Shield, title: '3 Años de Garantía Oficial', sub: 'En todos nuestros productos' },
              { icon: MapPin, title: 'Tienda Física en Sevilla', sub: 'Av. Primero de Mayo, 52' },
              { icon: Truck, title: 'Envíos en 24 Horas', sub: 'Gratis a partir de 50€' },
            ].map(({ icon: Icon, title, sub }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 py-5 md:py-0 md:px-10"
                style={{
                  borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                  borderTop: i > 0 ? '1px solid rgba(255,255,255,0.08)' : undefined,
                }}
              >
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(255,107,0,0.15)' }}
                >
                  <Icon size={22} style={{ color: ORANGE }} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'white' }}>{title}</p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────── */}
      <section className="py-24" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header — editorial asymmetric */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                DESTACADOS
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: NAVY, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Los más<br />
                <span style={{ color: ORANGE }}>explosivos</span> del momento
              </h2>
            </div>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 self-start md:self-end transition-colors group"
              style={{ color: NAVY, fontSize: '0.95rem', fontWeight: 600 }}
            >
              Ver todo el catálogo
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Asymmetric product grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {/* Big featured card */}
            <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
              <ProductCard product={featuredProducts[0]} large />
            </div>
            {featuredProducts.slice(1).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRADE-IN CTA ──────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: NAVY }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 rounded-full opacity-10 pointer-events-none"
          style={{ width: 400, height: 400, background: ORANGE, filter: 'blur(80px)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 rounded-full opacity-10 pointer-events-none"
          style={{ width: 300, height: 300, background: ORANGE, filter: 'blur(60px)' }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="inline-block px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(255,107,0,0.2)', color: ORANGE, fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}
              >
                ♻️ TRADE-IN
              </span>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                  color: 'white',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1,
                  marginBottom: '1.25rem',
                }}
              >
                ¿Móvil antiguo<br />
                cogiendo polvo?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: 480 }}>
                Tásalo ahora y recibe hasta el 80% de su valor en 60 segundos. Sin esperas, sin complicaciones. Pago inmediato o descuento en tu nuevo dispositivo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/catalogo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all hover:opacity-90 hover:scale-[1.03]"
                  style={{ background: ORANGE, color: 'white', fontSize: '1rem' }}
                >
                  <RefreshCw size={18} />
                  Tasa tu móvil ahora
                </Link>
                <Link
                  to="/nosotros"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/10"
                  style={{ color: 'white', border: '2px solid rgba(255,255,255,0.25)', fontSize: '1rem' }}
                >
                  Cómo funciona
                </Link>
              </div>
            </motion.div>

            {/* Trade-in value cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { model: 'iPhone 14 Pro', value: 'hasta 420€', icon: '📱' },
                { model: 'iPhone 13', value: 'hasta 270€', icon: '📱' },
                { model: 'Samsung S23', value: 'hasta 320€', icon: '📱' },
                { model: 'iPhone 12', value: 'hasta 180€', icon: '📱' },
              ].map(({ model, value, icon }) => (
                <div
                  key={model}
                  className="rounded-2xl p-5 transition-all hover:scale-[1.02]"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <p className="text-2xl mb-3">{icon}</p>
                  <p style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', marginBottom: 4 }}>{model}</p>
                  <p style={{ color: ORANGE, fontWeight: 800, fontSize: '1rem' }}>{value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BENTO ────────────────────────── */}
      <section className="py-24" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
              >
                OPINIONES REALES
              </span>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: NAVY, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                Lo que dicen<br />nuestros clientes
              </h2>
            </div>
          </div>

          {/* Bento grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto"
          >
            {/* Big rating cell */}
            <motion.div
              variants={itemUp}
              className="md:row-span-2 rounded-3xl p-8 flex flex-col items-center justify-center text-center"
              style={{ background: NAVY, minHeight: 260 }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={22} fill={ORANGE} style={{ color: ORANGE }} />
                ))}
              </div>
              <p style={{ fontSize: '5rem', fontWeight: 900, color: 'white', lineHeight: 1, letterSpacing: '-0.05em' }}>
                4.9
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
                sobre 5 en Google
              </p>
              <div
                className="mt-6 px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.3)' }}
              >
                <p style={{ color: ORANGE, fontSize: '0.8rem', fontWeight: 700 }}>+1.200 Reseñas ⭐</p>
              </div>
            </motion.div>

            {/* Stats cell */}
            <motion.div
              variants={itemUp}
              className="rounded-3xl p-6"
              style={{ background: '#F8F9FA', border: '1px solid rgba(10,17,40,0.06)' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,107,0,0.1)' }}>
                  <Users size={20} style={{ color: ORANGE }} />
                </div>
              </div>
              <p style={{ fontSize: '2.2rem', fontWeight: 900, color: NAVY, letterSpacing: '-0.05em', lineHeight: 1 }}>5.000+</p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(10,17,40,0.5)', marginTop: 6 }}>Clientes satisfechos en Sevilla</p>
            </motion.div>

            {/* Reviews */}
            {reviews.slice(0, 4).map((review) => (
              <motion.div
                key={review.id}
                variants={itemUp}
                className="rounded-3xl p-6"
                style={{ background: 'white', border: '1px solid rgba(10,17,40,0.07)', boxShadow: '0 2px 16px rgba(10,17,40,0.04)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0"
                      style={{ background: NAVY, fontSize: '0.75rem', fontWeight: 700 }}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.875rem', color: NAVY }}>{review.author}</p>
                      <p style={{ fontSize: '0.7rem', color: 'rgba(10,17,40,0.4)' }}>{review.date}</p>
                    </div>
                  </div>
                  <StarRow />
                </div>
                <p style={{ fontSize: '0.85rem', color: 'rgba(10,17,40,0.65)', lineHeight: 1.65 }}>
                  "{review.text}"
                </p>
                <div className="mt-3">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(10,17,40,0.06)', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(10,17,40,0.5)' }}
                  >
                    {review.product}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Verified badge cell */}
            <motion.div
              variants={itemUp}
              className="rounded-3xl p-6 flex flex-col justify-between"
              style={{ background: ORANGE }}
            >
              <Award size={32} className="text-white mb-4" />
              <div>
                <p style={{ fontWeight: 800, color: 'white', fontSize: '1.1rem', lineHeight: 1.3 }}>
                  Tienda Verificada Google
                </p>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', marginTop: 8 }}>
                  Todas las reseñas son 100% auténticas
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#F8F9FA' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span
              className="inline-block px-3 py-1 rounded-full mb-4"
              style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}
            >
              ¿POR QUÉ ELEGIRNOS?
            </span>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', color: NAVY, letterSpacing: '-0.04em' }}>
              La diferencia <span style={{ color: ORANGE }}>BombaMóvil</span>
            </h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {[
              { icon: Shield, title: 'Garantía Real', desc: '3 años de garantía oficial en todos los dispositivos, sin letra pequeña.', color: ORANGE },
              { icon: Clock, title: 'Reparación Exprés', desc: 'Reparamos tu móvil en el día. Pantallas, baterías y más.', color: '#6366f1' },
              { icon: RefreshCw, title: 'Trade-in Justo', desc: 'La mejor tasación del mercado para tu móvil antiguo. Pago inmediato.', color: '#10b981' },
              { icon: Award, title: 'Tienda Certificada', desc: 'Distribuidor autorizado. Todos los dispositivos pasan control de calidad.', color: '#f59e0b' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <motion.div
                key={title}
                variants={itemUp}
                className="rounded-3xl p-7 transition-all hover:-translate-y-1"
                style={{ background: 'white', border: '1px solid rgba(10,17,40,0.06)', boxShadow: '0 2px 16px rgba(10,17,40,0.04)' }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${color}18` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: NAVY, marginBottom: 10, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'rgba(10,17,40,0.55)', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────── */}
      <section className="py-20" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: NAVY, letterSpacing: '-0.045em', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              ¿Listo para tu<br />
              <span style={{ color: ORANGE }}>próximo móvil?</span>
            </h2>
            <p style={{ color: 'rgba(10,17,40,0.55)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
              Visítanos en nuestra tienda de Sevilla o compra online. Envío en 24h a toda España.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:opacity-90 hover:scale-[1.03]"
                style={{ background: ORANGE, fontSize: '1rem' }}
              >
                Ver Catálogo Completo
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:bg-gray-50"
                style={{ color: NAVY, border: `2px solid ${NAVY}`, fontSize: '1rem' }}
              >
                Conoce la Tienda
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
