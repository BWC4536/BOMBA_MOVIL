import { Link } from 'react-router'
import { Zap, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react'

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/bomba_movil/?hl=es' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

const productLinks = ['iPhones Nuevos', 'iPhones Reacondicionados', 'Samsung Galaxy', 'Accesorios', 'Outlet Ocasión']
const serviceLinks = ['Reparación de Pantalla', 'Cambio de Batería', 'Recuperación de Datos', 'Trade-in', 'Garantía Oficial']
const legalLinks = ['Política de Privacidad', 'Términos y Condiciones', 'Política de Cookies']

export default function Footer() {
  return (
    <footer style={{ background: '#0A1128', color: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: '#FF6B00' }}
              >
                <Zap size={16} fill="white" className="text-white" />
              </div>
              <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.035em' }}>
                Bomba<span style={{ color: '#FF6B00' }}>Móvil</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem', lineHeight: 1.75 }}>
              Tu tienda de confianza en Sevilla para iPhones, Androids y reparaciones de móviles. Calidad garantizada.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#FF6B00' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Productos
            </p>
            {productLinks.map((item) => (
              <Link
                key={item}
                to="/catalogo"
                className="block mb-3 text-sm transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FF6B00' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Servicios
            </p>
            {serviceLinks.map((item) => (
              <Link
                key={item}
                to="/reparaciones"
                className="block mb-3 text-sm transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.65)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#FF6B00' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontWeight: 700,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-4 mb-6">
              <a
                href="#"
                className="flex items-start gap-3 text-sm transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#FF6B00' }} />
                Av. Primero de Mayo, 52, Sevilla
              </a>
              <a
                href="tel:954000000"
                className="flex items-center gap-3 text-sm transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Phone size={16} style={{ color: '#FF6B00' }} />
                954 000 000
              </a>
              <a
                href="mailto:hola@bombamovil.es"
                className="flex items-center gap-3 text-sm transition-colors duration-150"
                style={{ color: 'rgba(255,255,255,0.65)' }}
              >
                <Mail size={16} style={{ color: '#FF6B00' }} />
                hola@bombamovil.es
              </a>
            </div>
            <div
              className="rounded-2xl p-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Horario
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                Lun – Sáb: 10:00 – 20:00
              </p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.2rem' }}>
                Dom: Cerrado
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>
            © 2025 BombaMóvil S.L. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-150"
                style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
