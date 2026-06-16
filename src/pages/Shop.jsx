import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/ui/ProductCard'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const dealsParam = searchParams.get('deals') === 'true'
  const subCategoryParam = searchParams.get('subCategory')
  const diseaseCategoryParam = searchParams.get('diseaseCategory')
  const categoryParam = searchParams.get('category') || 'all'

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all')
    setSearchQuery('')
  }, [searchParams])

  const activeLabel = dealsParam
    ? '🔥 Hot Deals'
    : diseaseCategoryParam
    ? `Disease: ${decodeURIComponent(diseaseCategoryParam).replace(/-/g, ' ')}`
    : subCategoryParam
    ? `Sub-Category: ${decodeURIComponent(subCategoryParam)}`
    : null

  const toSlug = str => str?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''

  const filtered = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => !dealsParam || p.salePrice)
    .filter(p => !subCategoryParam || toSlug(p.subCategory) === decodeURIComponent(subCategoryParam))
    .filter(p => !diseaseCategoryParam || toSlug(p.diseaseCategory) === diseaseCategoryParam)
    .filter(p =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
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
      <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
        Showing <span className="font-semibold text-gray-700">{filtered.length}</span> products
      </p>

      {/* Product Grid */}
      {filtered.length === 0 ? (
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
