import { HashRouter, Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import CatalogoPage from './components/CatalogoPage'
import NosotrosPage from './components/NosotrosPage'

export default function App() {
  return (
    <HashRouter>
      <div style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            <Route path="/reparaciones" element={<NosotrosPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
