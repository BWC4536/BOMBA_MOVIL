import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingCart, Zap, Menu, X, Search, PhoneCall } from 'lucide-react'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/reparaciones', label: 'Reparaciones' },
  { to: '/nosotros', label: 'Nosotros' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartCount] = useState(2)
  const location = useLocation()

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,17,40,0.06)',
      }}
    >
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
          <button
            className="p-2 rounded-full transition-colors hover:bg-gray-100"
            aria-label="Buscar"
          >
            <Search size={18} style={{ color: '#0A1128' }} />
          </button>

          <Link
            to="/catalogo"
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: '#FF6B00', color: 'white' }}
          >
            <PhoneCall size={14} />
            Vende tu móvil
          </Link>

          <button className="relative p-2 rounded-full transition-colors hover:bg-gray-100">
            <ShoppingCart size={20} style={{ color: '#0A1128' }} />
            {cartCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: '#FF6B00', fontSize: '10px', fontWeight: 700 }}
              >
                {cartCount}
              </span>
            )}
          </button>
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
                <Link
                  to="/catalogo"
                  className="flex-1 text-center px-5 py-3 rounded-full text-white text-sm font-semibold"
                  style={{ background: '#FF6B00' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Vende tu móvil
                </Link>
                <button className="relative p-3 rounded-full" style={{ background: '#F8F9FA' }}>
                  <ShoppingCart size={20} style={{ color: '#0A1128' }} />
                  {cartCount > 0 && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white"
                      style={{ background: '#FF6B00', fontSize: '10px', fontWeight: 700 }}
                    >
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
