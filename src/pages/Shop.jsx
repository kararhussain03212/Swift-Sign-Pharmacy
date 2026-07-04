import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { getProducts, getCategories, resolveUploadUrl } from '../services/headerApi'

// Adapts a raw `/api/public/products` row into the plain object ProductCard expects.
function toCardProduct(row) {
  const currentPrice = parseFloat(row.base_price)
  const originalPrice = row.pharmacy_original_price !== null && row.pharmacy_original_price !== undefined
    ? parseFloat(row.pharmacy_original_price)
    : null
  const hasDiscount = originalPrice !== null && !Number.isNaN(originalPrice) && originalPrice > currentPrice

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.manufacturer_or_brand || '',
    image: resolveUploadUrl(row.first_image) || '',
    price: hasDiscount ? originalPrice : currentPrice,
    salePrice: hasDiscount ? currentPrice : null,
    rating: 0,
    reviewCount: 0,
  }
}

// Flattens the nested `/api/public/categories` tree into top-level entries
// (each carrying its `children`) for the pill filters below.
function flattenTopLevel(nested) {
  return Array.isArray(nested) ? nested : []
}

const Shop = () => {
  const { category: categoryPathParam, subCategory: subCategoryPathParam } = useParams()
  const [searchParams] = useSearchParams()
  const dealsParamQuery = searchParams.get('deals') === 'true'
  const dealsParamPath = categoryPathParam === 'deals'
  const dealsParam = dealsParamQuery || dealsParamPath
  const subCategoryParam = subCategoryPathParam || null
  const diseaseCategoryParam = searchParams.get('diseaseCategory')
  const categoryParam = (categoryPathParam && categoryPathParam !== 'deals') ? categoryPathParam : 'all'

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setSelectedCategory(categoryPathParam || 'all')
    setSearchQuery('')
  }, [categoryPathParam, subCategoryPathParam])

  useEffect(() => {
    getCategories().then(data => setCategories(flattenTopLevel(data))).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    const effectiveCategory = subCategoryParam || (selectedCategory !== 'all' ? selectedCategory : '')

    getProducts({
      category: effectiveCategory,
      search: searchQuery,
      deals: dealsParam ? '1' : '',
      per_page: 200,
    })
      .then(data => {
        if (cancelled) return
        setProducts(Array.isArray(data?.data) ? data.data.map(toCardProduct) : [])
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load products.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [selectedCategory, subCategoryParam, searchQuery, dealsParam])

  const activeLabel = dealsParam
    ? '🔥 Hot Deals'
    : diseaseCategoryParam
    ? `Disease: ${decodeURIComponent(diseaseCategoryParam).replace(/-/g, ' ')}`
    : subCategoryParam
    ? `Sub-Category: ${subCategoryParam}`
    : null

  const filtered = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
    if (sortBy === 'price-high') return (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const activeCat = categories.find(c => c.slug === selectedCategory)
  const pageTitle = dealsParam
    ? '🔥 Hot Deals'
    : activeCat
    ? activeCat.name
    : 'Shop All Products'

  return (
    <main className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8">
      {/* Page title */}
      <h1 className="font-heading font-bold text-xl sm:text-2xl text-gray-900 mb-1">{pageTitle}</h1>
      {activeLabel && (
        <p className="text-sm text-primary font-medium mb-4">
          Filtered by: <span className="font-bold">{activeLabel}</span>
        </p>
      )}

      {/* ── FILTERS ROW ─────────────────────────────── */}
      <div className="mb-5 sm:mb-6">
        {/* Mobile: search + filter toggle row */}
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 h-10 rounded-full border border-gray-200
                         text-sm outline-none focus:border-primary transition-all bg-white"
            />
          </div>

          {/* Sort — inline on tablet+, inside expanded on mobile */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="hidden sm:block h-10 px-3 rounded-full border border-gray-200 text-sm
                       text-gray-600 outline-none focus:border-primary cursor-pointer bg-white flex-shrink-0"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowFilters(s => !s)}
            className="sm:hidden flex items-center gap-1.5 h-10 px-3 rounded-full border border-gray-200
                       text-sm text-gray-600 bg-white flex-shrink-0"
          >
            <SlidersHorizontal size={15} />
            Filter
          </button>
        </div>

        {/* Mobile expanded filters */}
        {showFilters && (
          <div className="sm:hidden bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Sort By</p>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-gray-200 text-sm text-gray-600 outline-none bg-white"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low → High</option>
                <option value="price-high">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
                    ${selectedCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-50 border border-gray-200 text-gray-600'}`}
                >
                  All
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all
                      ${selectedCategory === cat.slug ? 'bg-primary text-white' : 'bg-gray-50 border border-gray-200 text-gray-600'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Desktop: horizontal category pills */}
        <div className="hidden sm:flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all
                        ${selectedCategory === 'all'
                          ? 'bg-primary text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                        }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap
                          ${selectedCategory === cat.slug
                            ? 'bg-primary text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                          }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
          Showing <span className="font-semibold text-gray-700">{filtered.length}</span> products
        </p>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 animate-pulse aspect-[3/4]" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 sm:py-20 text-gray-400">
          <p className="font-medium">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 sm:py-20 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-40" />
          <p className="font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default Shop
