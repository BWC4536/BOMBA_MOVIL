import { useState, useEffect } from 'react'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('bm_admin') === '1') setAuthenticated(true)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('bm_admin')
    setAuthenticated(false)
  }

  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />
  return <AdminDashboard onLogout={handleLogout} />
}
