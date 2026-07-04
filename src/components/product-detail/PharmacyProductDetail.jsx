import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Star, HelpCircle, Maximize2 } from 'lucide-react'
import toast from 'react-hot-toast'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'
import RelatedProductsSlider from './RelatedProductsSlider'

const PharmacyProductDetail = ({ product, related, youMayAlsoLike }) => {
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()

  const [activeImage, setActiveImage] = useState(product.images[0] || '')
  const [quantity, setQuantity] = useState(1)

  const pharmacy = product.pharmacy || {}
  const discount = pharmacy.discount_percent
    ?? (pharmacy.original_price && pharmacy.original_price > product.base_price
      ? Math.round(((pharmacy.original_price - product.base_price) / pharmacy.original_price) * 100)
      : 0)

  const cartProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: activeImage,
    price: pharmacy.original_price || product.base_price,
    salePrice: pharmacy.original_price ? product.base_price : null,
    brand: product.manufacturer_or_brand,
  }

  return (
    <main className="w-full bg-white">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 mb-5 sm:mb-6 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={`/shop/${product.category.slug}`} className="hover:text-primary transition-colors">
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-800 font-semibold truncate max-w-[180px] sm:max-w-xs md:max-w-none">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          {/* Left: Gallery */}
          <div className="flex flex-col">
            <div className="relative bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 flex items-center justify-center overflow-hidden group"
                 style={{ minHeight: '260px', maxHeight: '500px' }}>
              {product.badge_label && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {product.badge_label}
                  </span>
                </div>
              )}
              <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-500 hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10">
                <Maximize2 size={15} />
              </button>
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[220px] sm:max-h-[340px] md:max-h-[380px] w-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
              {product.images.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`bg-white border rounded-xl p-2 flex items-center justify-center h-16 sm:h-20 md:h-24 overflow-hidden transition-all duration-200 ${
                    activeImage === img ? 'border-[#073b45] ring-2 ring-[#073b45]/10' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="max-h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating.average) ? 'currentColor' : 'none'} className="text-yellow-400" />
                ))}
              </div>
              <span className="text-[12px] text-gray-500 font-semibold">({product.rating.count} Reviews)</span>
              <span className="bg-primary-light text-primary text-[10px] font-bold px-3 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
                {product.stock_status === 'in_stock' ? 'In Stock' : product.stock_status === 'preorder' ? 'Preorder' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="font-heading text-gray-900 text-xl sm:text-2xl md:text-[32px] leading-tight mt-3">
              {product.name}
            </h1>
            {pharmacy.net_weight && (
              <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium mt-1">
                Net Weight: {pharmacy.net_weight}
              </p>
            )}

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                ₨{Number(product.base_price).toFixed(0)}
              </span>
              {pharmacy.original_price && pharmacy.original_price > product.base_price && (
                <>
                  <span className="text-base sm:text-lg text-gray-400 line-through">
                    ₨{Number(pharmacy.original_price).toFixed(0)}
                  </span>
                  <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2.5 py-4 my-4 border-t border-b border-gray-100 text-[13px] sm:text-[14px]">
              {product.manufacturer_or_brand && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Brand:</span>
                  <span className="font-medium text-gray-600">{product.manufacturer_or_brand}</span>
                </div>
              )}
              {product.form && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Form:</span>
                  <span className="font-medium text-gray-600">{product.form}</span>
                </div>
              )}
              {product.sku && (
                <div>
                  <span className="font-bold text-gray-900">SKU#: </span>
                  <span className="font-medium text-gray-600">{product.sku}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2.5 w-full sm:w-32 bg-[#f4f3f3]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-black font-extrabold text-lg w-6 text-center">-</button>
                <span className="font-bold text-gray-800 text-[14px] w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-gray-500 hover:text-black font-extrabold text-lg w-6 text-center">+</button>
              </div>

              <button
                onClick={() => {
                  addToCart(cartProduct, quantity)
                  toast.success('Added to cart! 🛒', { style: { borderRadius: '12px', fontSize: '13px' } })
                }}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200"
              >
                Add To Cart
              </button>
            </div>

            <button
              onClick={() => { addToCart(cartProduct, quantity); navigate('/cart') }}
              className="w-full border border-gray-300 hover:bg-black hover:border-black hover:text-white text-black font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200 mb-5"
            >
              Buy Now
            </button>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-bold text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <button
                onClick={() => {
                  toggleWishlist(cartProduct)
                  toast.success(isWishlisted(product.id) ? 'Removed from wishlist!' : 'Added to wishlist! ❤️')
                }}
                className="flex items-center gap-2 hover:text-[#073b45] transition-colors text-sm"
              >
                <Heart size={20} fill={isWishlisted(product.id) ? '#0FAFB8' : 'none'} className={isWishlisted(product.id) ? 'text-primary' : 'text-gray-400'} />
                <span>Add to wishlist</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#073b45] transition-colors text-sm">
                <HelpCircle size={20} className="text-gray-400" />
                <span>Ask Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-gray-200 pb-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Description</h2>
          </div>
          <div className="max-w-none text-gray-600 text-[14px] sm:text-[15px] leading-relaxed flex flex-col gap-5 font-medium">
            <div>
              <h3 className="text-gray-900 font-extrabold text-base mb-2">Product Details:</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {product.manufacturer_or_brand && <li><strong>Manufacturer:</strong> {product.manufacturer_or_brand}</li>}
                {product.form && <li><strong>Form:</strong> {product.form}</li>}
              </ul>
            </div>
            {product.description_text && <p>{product.description_text}</p>}
            {pharmacy.benefits && pharmacy.benefits.length > 0 && (
              <div>
                <h3 className="text-gray-900 font-extrabold text-base mb-2">Key benefits:</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  {pharmacy.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}
            {pharmacy.directions_for_use && (
              <div>
                <h3 className="text-gray-900 font-extrabold text-base mb-1.5">Directions for Use:</h3>
                <p>{pharmacy.directions_for_use}</p>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like */}
        <RelatedProductsSlider title="You may also like..." products={youMayAlsoLike} />

        {/* Related Products */}
        <RelatedProductsSlider title="Related products" products={related} />
      </div>

      <div className="md:hidden h-16" />
    </main>
  )
}

export default PharmacyProductDetail
