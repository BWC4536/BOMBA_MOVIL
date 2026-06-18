import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Zap, Menu, X, Phone, MessageCircle } from 'lucide-react'

const WHATSAPP_NUMBER = '34954000000' // Número de la empresa en formato internacional
const INSTAGRAM_URL = 'https://www.instagram.com/bomba_movil/?hl=es'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/reparaciones', label: 'Reparaciones' },
  { to: '/nosotros', label: 'Nosotros' },
]

// Instagram SVG icon (sin dependencia de lucide ya que no tiene el color del SVG exacto de IG)
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,17,40,0.06)',
      }}
    >
      {/* ── Top social bar ── */}
      <div className="hidden sm:block" style={{ background: '#0A1128', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-end gap-2">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
            style={{ background: '#25D366', color: 'white' }}
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle size={12} />
            WhatsApp
          </a>

          {/* Instagram */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              color: 'white',
            }}
            aria-label="Seguir en Instagram"
          >
            <InstagramIcon size={12} />
            Instagram
          </a>

          {/* Phone */}
          <a
            href="tel:954000000"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all hover:bg-white/10"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            <Phone size={11} />
            954 000 000
          </a>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: '#FF6B00' }}
          >
            <Zap size={16} fill="white" className="text-white" />
          </div>
          <span
            style={{
              color: '#0A1128',
              fontWeight: 900,
              fontSize: '1.15rem',
              letterSpacing: '-0.035em',
            }}
          >
            Bomba<span style={{ color: '#FF6B00' }}>Móvil</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-4 py-2 rounded-full text-sm transition-all duration-200"
              style={{
                color: isActive(link.to) ? '#FF6B00' : '#0A1128',
                fontWeight: isActive(link.to) ? 600 : 400,
                background: isActive(link.to) ? 'rgba(255,107,0,0.08)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#25D366', color: 'white' }}
          >
            <MessageCircle size={14} />
            Escríbenos
          </a>

          <Link
            to="/reparaciones"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#FF6B00', color: 'white' }}
          >
            Pedir cita
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl transition-colors hover:bg-gray-100"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
        >
          {mobileOpen ? (
            <X size={22} style={{ color: '#0A1128' }} />
          ) : (
            <Menu size={22} style={{ color: '#0A1128' }} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-white"
            style={{ borderTop: '1px solid rgba(10,17,40,0.06)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-4 py-3 rounded-xl text-base transition-colors"
                  style={{
                    color: isActive(link.to) ? '#FF6B00' : '#0A1128',
                    fontWeight: isActive(link.to) ? 600 : 400,
                    background: isActive(link.to) ? 'rgba(255,107,0,0.08)' : 'transparent',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 mt-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: '#25D366' }}
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  <InstagramIcon size={15} />
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
