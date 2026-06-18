import { createRoot } from 'react-dom/client'
import { Component, type ReactNode } from 'react'
import App from './app/App.tsx'
import './styles/index.css'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#0A1128', color: 'white', fontFamily: 'Inter, sans-serif', padding: '2rem', textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
          <h1 style={{ fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Bomba<span style={{ color: '#FF6B00' }}>Móvil</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem', maxWidth: 400 }}>
            Algo ha fallado al cargar la página. Por favor, recarga o vuelve en un momento.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background: '#FF6B00', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '999px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}
          >
            Recargar página
          </button>
          {import.meta.env.DEV && (
            <pre style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', maxWidth: 600, textAlign: 'left', whiteSpace: 'pre-wrap' }}>
              {this.state.error.message}
            </pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)