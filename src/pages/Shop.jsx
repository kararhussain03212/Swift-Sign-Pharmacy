import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import { categories } from '../data/categories'
import ProductCard from '../components/ui/ProductCard'
import { Search, SlidersHorizontal } from 'lucide-react'

const Shop = () => {
  const [searchParams] = useSearchParams()
  const dealsParam = searchParams.get('deals') === 'true'
  const subCategoryParam = searchParams.get('subCategory')
  const diseaseCategoryParam = searchParams.get('diseaseCategory')
  const categoryParam = searchParams.get('category') || 'all'

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'all')
    setSearchQuery('')
  }, [searchParams])

  // Build active filter label
  const activeLabel = dealsParam
    ? '🔥 Hot Deals'
    : diseaseCategoryParam
    ? `Disease: ${decodeURIComponent(diseaseCategoryParam).replace(/-/g, ' ')}`
    : subCategoryParam
    ? `Sub-Category: ${decodeURIComponent(subCategoryParam)}`
    : null

  const filtered = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => !dealsParam || p.salePrice)
    .filter(p => !subCategoryParam || p.subCategory === decodeURIComponent(subCategoryParam))
    .filter(p => !diseaseCategoryParam || {
      // match against the slug version of diseaseCategory stored in product
      test: true
    }.test && p.diseaseCategory?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === diseaseCategoryParam)
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

  const pageTitle = dealsParam ? 'Hot Deals' : 'Shop All Products'

  return (
    <main className="max-w-[1450px] mx-auto px-5 py-8">
      <h1 className="font-heading font-bold text-2xl text-gray-900 mb-1">{pageTitle}</h1>
      {activeLabel && (
        <p className="text-sm text-primary font-medium mb-4">Filtered by: <span className="font-bold">{activeLabel}</span></p>
      )}


      {/* Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 h-10 rounded-full border border-gray-200
                       text-sm outline-none focus:border-primary focus:shadow-glow
                       transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all
                        ${selectedCategory === 'all'
                          ? 'bg-primary text-white shadow-glow'
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                        }`}
          >
            All
          </button>
          {categories.slice(0, 6).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap
                          ${selectedCategory === cat.slug
                            ? 'bg-primary text-white shadow-glow'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                          }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="h-10 px-4 rounded-full border border-gray-200 text-sm
                     text-gray-600 outline-none focus:border-primary cursor-pointer
                     bg-white ml-auto"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-400 mb-5">
        Showing <span className="font-semibold text-gray-700">{filtered.length}</span> products
      </p>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-40" />
          <p className="font-medium">No products found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Shop
