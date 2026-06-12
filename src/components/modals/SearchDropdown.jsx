import { products } from '../../data/products'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

const SearchDropdown = ({ query }) => {
  const results = products
    .filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 6)

  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl
                      border border-gray-100 shadow-lg z-50 p-4 text-center">
        <Search size={24} className="text-gray-300 mx-auto mb-2" />
        <p className="text-sm text-gray-400">No products found for "{query}"</p>
      </div>
    )
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl
                    border border-gray-100 shadow-lg z-50 py-2 animate-fadeIn">
      <p className="px-4 py-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
        Products
      </p>
      {results.map(product => (
        <Link
          key={product.id}
          to={`/product/${product.slug}`}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-8 h-8 rounded-lg object-contain bg-gray-100"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-semibold text-gray-800 line-clamp-1">
              {product.name}
            </p>
            <p className="text-[11px] text-gray-400">{product.brand}</p>
          </div>
          <span className="text-primary font-bold text-[13px] flex-shrink-0">
            ${(product.salePrice ?? product.price).toFixed(2)}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default SearchDropdown
