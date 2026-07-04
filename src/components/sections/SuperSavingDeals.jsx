import { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import useCartStore from '../../store/cartStore'
import SectionHeader from '../ui/SectionHeader'
import StarRating from '../ui/StarRating'
import { getProducts, resolveUploadUrl } from '../../services/headerApi'

function toDealProduct(row) {
  const currentPrice = parseFloat(row.base_price)
  const originalPrice = row.pharmacy_original_price !== null && row.pharmacy_original_price !== undefined
    ? parseFloat(row.pharmacy_original_price)
    : null
  const hasDiscount = originalPrice !== null && !Number.isNaN(originalPrice) && originalPrice > currentPrice
  const price = hasDiscount ? originalPrice : currentPrice
  const salePrice = hasDiscount ? currentPrice : null

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.manufacturer_or_brand || '',
    image: resolveUploadUrl(row.first_image) || '',
    price,
    salePrice,
    rating: 0,
    reviewCount: 0,
    discountPercent: salePrice ? Math.round(((price - salePrice) / price) * 100) : 0,
  }
}

const SuperSavingDeals = () => {
  const { addToCart } = useCartStore()
  const [dealProducts, setDealProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    getProducts({ deals: '1', per_page: 20 })
      .then(data => {
        if (cancelled) return
        const rows = Array.isArray(data?.data) ? data.data.map(toDealProduct) : []
        setDealProducts(rows.sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 4))
      })
      .catch(() => { if (!cancelled) setDealProducts([]) })
    return () => { cancelled = true }
  }, [])

  if (dealProducts.length === 0) return null

  return (
    <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
      <SectionHeader title="Super Saving Deals" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {dealProducts.map(product => (
          <div
            key={product.id}
            className="flex items-center gap-3 sm:gap-4 bg-white rounded-xl
                       border border-gray-100 p-3 sm:p-4 shadow-card
                       hover:shadow-card-hover hover:-translate-y-0.5
                       transition-all duration-200 cursor-pointer group"
          >
            {/* Image */}
            <div
              className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 flex-shrink-0
                          bg-gray-50 rounded-xl p-2 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain
                           group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[12px] sm:text-[13px] font-semibold text-gray-800
                           line-clamp-2 leading-[1.45] mb-1 sm:mb-1.5"
              >
                {product.name}
              </p>
              <StarRating value={product.rating} count={product.reviewCount} />
              <div className="flex items-center gap-2 mt-1 sm:mt-1.5 mb-2 sm:mb-2.5">
                <span className="text-[14px] sm:text-[16px] font-bold text-primary">
                  ${(product.salePrice ?? product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-[11px] sm:text-[12px] text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  addToCart(product)
                  toast.success('Added to cart! 🛒', {
                    style: { borderRadius: '12px', fontSize: '13px' },
                  })
                }}
                className="flex items-center gap-1.5 bg-[#0FAFB8] hover:bg-white text-white hover:text-[#0FAFB8]
                           rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-[12px] font-bold
                           transition-colors shadow-sm border border-[#0FAFB8] hover:border-2 whitespace-nowrap"
              >
                <ShoppingCart size={12} /> ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SuperSavingDeals
