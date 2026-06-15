import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShoppingCart, Star, SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

const ORANGE = '#FF6B00'
const NAVY = '#0A1128'

const allProducts = [
  { id: 1, name: 'iPhone 16 Pro Max', brand: 'Apple', storage: '256GB', ram: '8GB', condition: 'Precintado', price: 1149, displayPrice: '1.149€', originalPrice: '1.299€', tag: 'OFERTA BOMBA', discount: '-12%', image: 'https://images.unsplash.com/photo-1652804854453-0f2354bfc350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.9, reviews: 124 },
  { id: 2, name: 'iPhone 16 Pro Max', brand: 'Apple', storage: '512GB', ram: '8GB', condition: 'Precintado', price: 1349, displayPrice: '1.349€', originalPrice: null, tag: null, discount: null, image: 'https://images.unsplash.com/photo-1656099707503-0731bdec9565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.9, reviews: 88 },
  { id: 3, name: 'iPhone 16 Pro', brand: 'Apple', storage: '128GB', ram: '8GB', condition: 'Precintado', price: 1099, displayPrice: '1.099€', originalPrice: null, tag: 'NUEVO', discount: null, image: 'https://images.unsplash.com/photo-1759588071782-b2091e07d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.9, reviews: 52 },
  { id: 4, name: 'iPhone 15 Pro', brand: 'Apple', storage: '256GB', ram: '8GB', condition: 'Precintado', price: 899, displayPrice: '899€', originalPrice: null, tag: 'MÁS VENDIDO', discount: null, image: 'https://images.unsplash.com/photo-1759588071908-fc10a79714fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.8, reviews: 201 },
  { id: 5, name: 'iPhone 15', brand: 'Apple', storage: '128GB', ram: '6GB', condition: 'Reacondicionado A+', price: 599, displayPrice: '599€', originalPrice: '749€', tag: 'BOMBA PRECIO', discount: '-20%', image: 'https://images.unsplash.com/photo-1657561758945-c8d9687ee951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.8, reviews: 167 },
  { id: 6, name: 'iPhone 14 Pro', brand: 'Apple', storage: '256GB', ram: '6GB', condition: 'Reacondicionado A', price: 649, displayPrice: '649€', originalPrice: '849€', tag: 'OFERTA BOMBA', discount: '-24%', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.7, reviews: 143 },
  { id: 7, name: 'iPhone 14', brand: 'Apple', storage: '128GB', ram: '6GB', condition: 'Reacondicionado B', price: 449, displayPrice: '449€', originalPrice: '599€', tag: null, discount: '-25%', image: 'https://images.unsplash.com/photo-1759588071782-b2091e07d737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.6, reviews: 95 },
  { id: 8, name: 'iPhone 13', brand: 'Apple', storage: '256GB', ram: '4GB', condition: 'Reacondicionado B', price: 399, displayPrice: '399€', originalPrice: '549€', tag: null, discount: '-27%', image: 'https://images.unsplash.com/photo-1656099707503-0731bdec9565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.6, reviews: 78 },
  { id: 9, name: 'iPhone SE 3', brand: 'Apple', storage: '128GB', ram: '4GB', condition: 'Reacondicionado A+', price: 349, displayPrice: '349€', originalPrice: '449€', tag: null, discount: '-22%', image: 'https://images.unsplash.com/photo-1652804854453-0f2354bfc350?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.7, reviews: 56 },
  { id: 10, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', storage: '512GB', ram: '12GB', condition: 'Precintado', price: 979, displayPrice: '979€', originalPrice: null, tag: 'MÁS VENDIDO', discount: null, image: 'https://images.unsplash.com/photo-1709744722656-9b850470293f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.8, reviews: 132 },
  { id: 11, name: 'Samsung Galaxy S24+', brand: 'Samsung', storage: '256GB', ram: '12GB', condition: 'Precintado', price: 799, displayPrice: '799€', originalPrice: '899€', tag: 'OFERTA', discount: '-11%', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.7, reviews: 89 },
  { id: 12, name: 'Samsung Galaxy S23', brand: 'Samsung', storage: '256GB', ram: '8GB', condition: 'Reacondicionado A+', price: 549, displayPrice: '549€', originalPrice: '699€', tag: 'OFERTA BOMBA', discount: '-21%', image: 'https://images.unsplash.com/photo-1709744722656-9b850470293f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80', rating: 4.7, reviews: 74 },
]

const tagColors: Record<string, string> = {
  'OFERTA BOMBA': ORANGE,
  'NUEVO': NAVY,
  'BOMBA PRECIO': '#10b981',
  'MÁS VENDIDO': '#6366f1',
  'OFERTA': '#f59e0b',
}

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor valorados' },
]

const brands = ['Apple', 'Samsung']
const storages = ['128GB', '256GB', '512GB']
const conditions = ['Precintado', 'Reacondicionado A+', 'Reacondicionado A', 'Reacondicionado B']
const rams = ['4GB', '6GB', '8GB', '12GB']

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ borderBottom: '1px solid rgba(10,17,40,0.07)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
      <button
        className="w-full flex items-center justify-between mb-4"
        onClick={() => setOpen((v) => !v)}
      >
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: NAVY }}>{title}</span>
        <ChevronDown
          size={16}
          style={{ color: 'rgba(10,17,40,0.4)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function CheckItem({
  label, checked, onChange,
}: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group mb-2.5">
      <div
        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all"
        style={{
          background: checked ? ORANGE : 'white',
          border: checked ? `2px solid ${ORANGE}` : '2px solid rgba(10,17,40,0.2)',
        }}
        onClick={onChange}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        style={{
          fontSize: '0.875rem',
          color: checked ? NAVY : 'rgba(10,17,40,0.6)',
          fontWeight: checked ? 600 : 400,
        }}
        onClick={onChange}
      >
        {label}
      </span>
    </label>
  )
}

export default function CatalogoPage() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedStorages, setSelectedStorages] = useState<string[]>([])
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [selectedRAMs, setSelectedRAMs] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const toggleItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((x) => x !== item) : [...list, item])
  }

  const activeFilterCount =
    selectedBrands.length + selectedStorages.length + selectedConditions.length + selectedRAMs.length

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((p) => {
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false
      if (selectedStorages.length && !selectedStorages.includes(p.storage)) return false
      if (selectedConditions.length && !selectedConditions.includes(p.condition)) return false
      if (selectedRAMs.length && !selectedRAMs.includes(p.ram)) return false
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sortBy === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [selectedBrands, selectedStorages, selectedConditions, selectedRAMs, searchQuery, sortBy])

  const FiltersPanel = (
    <div>
      {/* Brand */}
      <FilterSection title="Marca">
        {brands.map((b) => (
          <CheckItem
            key={b} label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggleItem(selectedBrands, setSelectedBrands, b)}
          />
        ))}
      </FilterSection>

      {/* Storage */}
      <FilterSection title="Almacenamiento">
        {storages.map((s) => (
          <CheckItem
            key={s} label={s}
            checked={selectedStorages.includes(s)}
            onChange={() => toggleItem(selectedStorages, setSelectedStorages, s)}
          />
        ))}
      </FilterSection>

      {/* Condition */}
      <FilterSection title="Estado">
        {conditions.map((c) => (
          <CheckItem
            key={c} label={c}
            checked={selectedConditions.includes(c)}
            onChange={() => toggleItem(selectedConditions, setSelectedConditions, c)}
          />
        ))}
      </FilterSection>

      {/* RAM */}
      <FilterSection title="RAM">
        {rams.map((r) => (
          <CheckItem
            key={r} label={r}
            checked={selectedRAMs.includes(r)}
            onChange={() => toggleItem(selectedRAMs, setSelectedRAMs, r)}
          />
        ))}
      </FilterSection>

      {activeFilterCount > 0 && (
        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
          style={{ background: 'rgba(255,107,0,0.1)', color: ORANGE }}
          onClick={() => {
            setSelectedBrands([])
            setSelectedStorages([])
            setSelectedConditions([])
            setSelectedRAMs([])
          }}
        >
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </div>
  )

  return (
    <div className="pt-16" style={{ minHeight: '100vh', background: '#F8F9FA' }}>
      {/* Page header */}
      <div style={{ background: NAVY }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <span
            className="inline-block px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(255,107,0,0.2)', color: ORANGE, fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em' }}
          >
            CATÁLOGO COMPLETO
          </span>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', letterSpacing: '-0.045em', lineHeight: 1.05, marginBottom: '0.75rem' }}>
            Todos los dispositivos.<br />
            <span style={{ color: ORANGE }}>Mejor precio</span> garantizado.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem' }}>
            {allProducts.length} dispositivos disponibles · Envío en 24h · Garantía 3 años
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(10,17,40,0.4)' }} />
            <input
              type="text"
              placeholder="Buscar dispositivo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: 'white',
                border: '1px solid rgba(10,17,40,0.1)',
                color: NAVY,
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              className="lg:hidden flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold relative transition-all hover:opacity-90"
              style={{ background: NAVY, color: 'white' }}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal size={16} />
              Filtros
              {activeFilterCount > 0 && (
                <span
                  className="ml-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: ORANGE, fontSize: '0.65rem', fontWeight: 700 }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 rounded-2xl text-sm font-medium outline-none cursor-pointer"
                style={{
                  background: 'white',
                  border: '1px solid rgba(10,17,40,0.1)',
                  color: NAVY,
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(10,17,40,0.4)' }} />
            </div>

            <span style={{ fontSize: '0.875rem', color: 'rgba(10,17,40,0.5)' }}>
              {filteredProducts.length} resultados
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside
            className="hidden lg:block shrink-0 sticky top-20 self-start"
            style={{ width: 240 }}
          >
            <div
              className="rounded-3xl p-6"
              style={{ background: 'white', border: '1px solid rgba(10,17,40,0.06)', boxShadow: '0 2px 16px rgba(10,17,40,0.04)' }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontWeight: 800, fontSize: '1rem', color: NAVY }}>Filtros</h2>
                {activeFilterCount > 0 && (
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                    style={{ background: ORANGE, fontSize: '0.7rem', fontWeight: 700 }}
                  >
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {FiltersPanel}
            </div>
          </aside>

          {/* Mobile filters modal */}
          <AnimatePresence>
            {mobileFiltersOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 lg:hidden"
                  style={{ background: 'rgba(10,17,40,0.5)', backdropFilter: 'blur(4px)' }}
                  onClick={() => setMobileFiltersOpen(false)}
                />
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                  className="fixed left-0 top-0 bottom-0 z-50 w-80 overflow-y-auto lg:hidden"
                  style={{ background: 'white', padding: '1.5rem' }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 style={{ fontWeight: 800, fontSize: '1.1rem', color: NAVY }}>Filtros</h2>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <X size={20} style={{ color: NAVY }} />
                    </button>
                  </div>
                  {FiltersPanel}
                  <button
                    className="w-full mt-4 py-3.5 rounded-2xl font-bold text-white"
                    style={{ background: ORANGE }}
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Ver {filteredProducts.length} resultados
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(10,17,40,0.06)' }}>
                  <Search size={28} style={{ color: 'rgba(10,17,40,0.3)' }} />
                </div>
                <p style={{ fontWeight: 700, fontSize: '1.2rem', color: NAVY, marginBottom: 8 }}>Sin resultados</p>
                <p style={{ color: 'rgba(10,17,40,0.5)', fontSize: '0.9rem' }}>
                  Prueba con otros filtros o busca un modelo diferente
                </p>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const tagBg = product.tag ? (tagColors[product.tag] ?? NAVY) : null
                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.25 }}
                        whileHover={{ y: -5, boxShadow: '0 16px 50px rgba(10,17,40,0.12)' }}
                        className="group relative rounded-3xl overflow-hidden cursor-pointer"
                        style={{ background: 'white', border: '1px solid rgba(10,17,40,0.07)', boxShadow: '0 2px 16px rgba(10,17,40,0.05)' }}
                      >
                        {/* Image */}
                        <div className="relative overflow-hidden" style={{ height: 220, background: '#F8F9FA' }}>
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Condition */}
                          <div className="absolute top-3 right-3">
                            <span
                              className="px-2.5 py-1 rounded-full text-white"
                              style={{
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                background: product.condition === 'Precintado' ? NAVY : '#10b981',
                                letterSpacing: '0.04em',
                              }}
                            >
                              {product.condition}
                            </span>
                          </div>

                          {/* Tag ribbon */}
                          {tagBg && product.tag && (
                            <div className="absolute top-3 left-0">
                              <div
                                className="text-white"
                                style={{
                                  background: tagBg,
                                  fontSize: '0.62rem',
                                  fontWeight: 800,
                                  letterSpacing: '0.08em',
                                  paddingLeft: '12px',
                                  paddingRight: '20px',
                                  paddingTop: '5px',
                                  paddingBottom: '5px',
                                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)',
                                }}
                              >
                                {product.tag}
                              </div>
                            </div>
                          )}

                          {/* Discount */}
                          {product.discount && (
                            <div className="absolute bottom-3 left-3">
                              <span
                                className="px-2.5 py-1 rounded-full text-white"
                                style={{ background: ORANGE, fontSize: '0.7rem', fontWeight: 800 }}
                              >
                                {product.discount}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card body */}
                        <div className="p-5">
                          <p style={{ fontSize: '0.68rem', color: 'rgba(10,17,40,0.4)', fontWeight: 600, marginBottom: '0.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                            {product.brand}
                          </p>
                          <h3 style={{ fontWeight: 800, color: NAVY, lineHeight: 1.2, fontSize: '0.95rem', marginBottom: '0.25rem' }}>
                            {product.name}
                          </h3>
                          <p style={{ fontSize: '0.78rem', color: 'rgba(10,17,40,0.45)', marginBottom: '0.6rem' }}>
                            {product.storage} · {product.ram} RAM
                          </p>

                          {/* Rating */}
                          <div className="flex items-center gap-1.5 mb-4">
                            <Star size={12} fill={ORANGE} style={{ color: ORANGE }} />
                            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: NAVY }}>{product.rating}</span>
                            <span style={{ fontSize: '0.72rem', color: 'rgba(10,17,40,0.4)' }}>({product.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: NAVY }}>{product.displayPrice}</span>
                              {product.originalPrice && (
                                <span className="ml-2" style={{ fontSize: '0.82rem', color: 'rgba(10,17,40,0.35)', textDecoration: 'line-through' }}>
                                  {product.originalPrice}
                                </span>
                              )}
                            </div>
                            <button
                              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                              style={{ background: ORANGE }}
                            >
                              <ShoppingCart size={16} className="text-white" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
