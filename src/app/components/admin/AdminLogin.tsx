import { useState } from 'react'
import { Zap, Lock, Eye, EyeOff } from 'lucide-react'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'bomba2025'

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('bm_admin', '1')
      onLogin()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: NAVY }}>
      <div
        className="w-full max-w-sm mx-6 rounded-3xl p-8"
        style={{ background: 'white', boxShadow: '0 30px 80px rgba(0,0,0,0.4)' }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: ORANGE }}>
            <Zap size={18} fill="white" className="text-white" />
          </div>
          <div>
            <p style={{ fontWeight: 900, color: NAVY, fontSize: '1.1rem', letterSpacing: '-0.03em' }}>
              Bomba<span style={{ color: ORANGE }}>Móvil</span>
            </p>
            <p style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)', marginTop: -2 }}>Panel de administración</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Lock size={16} style={{ color: 'rgba(10,17,40,0.4)' }} />
          <h1 style={{ fontWeight: 800, color: NAVY, fontSize: '1rem' }}>Acceso restringido</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña de administrador"
              className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none pr-12"
              style={{
                border: `2px solid ${error ? '#ef4444' : 'rgba(10,17,40,0.12)'}`,
                color: NAVY,
                transition: 'border-color 0.2s',
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {show ? <EyeOff size={16} style={{ color: 'rgba(10,17,40,0.4)' }} /> : <Eye size={16} style={{ color: 'rgba(10,17,40,0.4)' }} />}
            </button>
          </div>
          {error && (
            <p style={{ color: '#ef4444', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
              Contraseña incorrecta
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl font-bold text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: ORANGE }}
          >
            Entrar al panel
          </button>
        </form>
      </div>
    </div>
  )
}
