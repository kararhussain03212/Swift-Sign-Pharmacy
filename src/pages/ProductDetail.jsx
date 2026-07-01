import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Heart, Star, Flame, HelpCircle, Maximize2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { products } from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import ProductCard from '../components/ui/ProductCard'
import ProductDocuments from '../components/ProductDocuments'

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()

  const product = products.find(p => p.slug === slug)

  const [imageState, setImageState] = useState({ slug: '', src: '' })
  const [quantityState, setQuantityState] = useState({ slug: '', value: 1 })
  const [selectedQuantity, setSelectedQuantity] = useState(product?.quantities?.[0]?.value || null)
  const [selectedPackaging, setSelectedPackaging] = useState(
    product?.packaging?.find(p => p.default)?.value || product?.packaging?.[0]?.value || null
  )

  const activeImage = imageState.slug === slug ? imageState.src : (product?.image ?? '')
  const quantity = quantityState.slug === slug ? quantityState.value : 1

  const setActiveImage = (src) => setImageState({ slug, src })
  const setQuantity = (v) => setQuantityState(s => ({
    slug,
    value: typeof v === 'function' ? v(s.slug === slug ? s.value : 1) : v,
  }))

  const selectedQuantityPrice = product?.quantities?.find(q => q.value === selectedQuantity)?.price || product?.price
  const selectedQuantityLabel = product?.quantities?.find(q => q.value === selectedQuantity)?.label || ''

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-20 text-center text-gray-400">
        <p className="text-xl font-semibold">Product not found</p>
        <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-medium">
          ← Back to Shop
        </button>
      </div>
    )
  }

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const galleryImages = product.gallery || [product.image]

  const recommendedProducts = products.filter(p => p.slug !== product.slug).slice(0, 5)
  const relatedProducts = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 5)

  return (
    <main className="w-full bg-white">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 mb-5 sm:mb-6 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">
            {product.category === 'vitamins'
              ? 'Vitamins & Supplements'
              : product.category === 'skincare'
              ? 'Personal Care'
              : product.category === 'laboratory-chemicals'
              ? 'Laboratory Chemicals'
              : product.category}
          </span>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-[180px] sm:max-w-xs md:max-w-none">
            {product.name}
          </span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">

          {/* Left Column: Gallery */}
          <div className="flex flex-col">
            {/* Main Image View */}
            <div className="relative bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 flex items-center justify-center overflow-hidden group"
                 style={{ minHeight: '260px', maxHeight: '500px' }}>
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {product.badges?.map(b => (
                  <span key={b} className="bg-red-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {b}
                  </span>
                ))}
              </div>

              {/* Maximize Icon */}
              <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-500 hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10">
                <Maximize2 size={15} />
              </button>

              {/* Main Image */}
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[220px] sm:max-h-[340px] md:max-h-[380px] w-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`bg-white border rounded-xl p-2 flex items-center justify-center h-16 sm:h-20 md:h-24 overflow-hidden transition-all duration-200 ${
                    activeImage === img
                      ? 'border-[#073b45] ring-2 ring-[#073b45]/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="max-h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info */}
          <div className="flex flex-col">

            {/* Rating and Stock */}
            {!product.isLabChemical && (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} className="text-yellow-400" />
                  ))}
                </div>
                <span className="text-[12px] text-gray-500 font-semibold">({product.reviewCount || 0} Reviews)</span>
                <span className="bg-primary-light text-primary text-[10px] font-bold px-3 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
                  In Stock
                </span>
              </div>
            )}

            {/* Title & Brand */}
            <h1 className="font-heading text-gray-900 text-xl sm:text-2xl md:text-[32px] leading-tight mt-3">
              {product.name}
            </h1>
            {!product.isLabChemical && (
              <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium mt-1">
                Net Weight: {product.weight || '50g'}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                ₨{(selectedQuantityPrice || product.salePrice || product.price).toFixed(0)}
              </span>
              {product.salePrice && (
                <>
                  <span className="text-base sm:text-lg text-gray-400 line-through">
                    ₨{product.price.toFixed(0)}
                  </span>
                  <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Quantity Selection for Lab Chemicals */}
            {product.isLabChemical && product.quantities && product.quantities.length > 0 && (
              <div className="py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Quantity:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.quantities.map(qty => (
                    <button
                      key={qty.value}
                      onClick={() => setSelectedQuantity(qty.value)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                        selectedQuantity === qty.value
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {qty.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging Selection for Lab Chemicals */}
            {product.isLabChemical && product.packaging && product.packaging.length > 0 && (
              <div className="py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Packaging:</h3>
                  {product.packaging.length > 2 && (
                    <a href="#" className="text-primary text-sm font-semibold hover:underline">
                      View all
                    </a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.packaging.map(pkg => (
                    <button
                      key={pkg.value}
                      onClick={() => setSelectedPackaging(pkg.value)}
                      className={`px-3 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                        selectedPackaging === pkg.value
                          ? 'border-primary bg-primary-light text-primary'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {pkg.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Meta */}
            <div className="flex flex-col gap-2.5 py-4 my-4 border-t border-b border-gray-100 text-[13px] sm:text-[14px]">
              {product.brand && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{product.isLabChemical ? 'Manufacturer:' : 'Brand:'}</span>
                  <span className="font-medium text-gray-600 capitalize">
                    {product.brand}
                  </span>
                </div>
              )}
              {!product.isLabChemical && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">Form:</span>
                    <span className="font-medium text-gray-600 capitalize">
                      {product.form || product.specifications?.['Product Form'] || 'Not specified'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">SKU#: </span>
                    <span className="font-medium text-gray-600">{product.sku || '258780'}</span>
                  </div>
                </>
              )}
              {product.isLabChemical && product.form && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Form:</span>
                  <span className="font-medium text-gray-600 capitalize">
                    {product.form}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              {/* Quantity selector */}
              <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2.5 w-full sm:w-32 bg-[#f4f3f3]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-gray-500 hover:text-black font-extrabold text-lg w-6 text-center"
                >
                  -
                </button>
                <span className="font-bold text-gray-800 text-[14px] w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-gray-500 hover:text-black font-extrabold text-lg w-6 text-center"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => {
                  addToCart(product, quantity)
                  toast.success('Added to cart! 🛒', {
                    style: { borderRadius: '12px', fontSize: '13px' },
                  })
                }}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200"
              >
                Add To Cart
              </button>
            </div>

            {/* Buy Now */}
            <button
              onClick={() => {
                addToCart(product, quantity)
                navigate('/cart')
              }}
              className="w-full border border-gray-300 hover:bg-black hover:border-black hover:text-white text-black font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200 mb-5"
            >
              Buy Now
            </button>

            {/* Sub-actions */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-bold text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <button
                onClick={() => {
                  toggleWishlist(product)
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

        {/* Product Description */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-gray-200 pb-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Description</h2>
          </div>

          <div className="max-w-none text-gray-600 text-[14px] sm:text-[15px] leading-relaxed flex flex-col gap-5 font-medium">
            <div>
              <h3 className="text-gray-900 font-extrabold text-base mb-2">Product Details:</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {product.brand && <li><strong>Manufacturer:</strong> {product.brand}</li>}
                <li><strong>Form:</strong> {product.form || product.specifications?.['Product Form'] || 'Not specified'}</li>
              </ul>
            </div>
            <p>{product.description}</p>
            {product.keyBenefits && (
              <div>
                <h3 className="text-gray-900 font-extrabold text-base mb-2">Key benefits:</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  {product.keyBenefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}
            {product.directions && (
              <div>
                <h3 className="text-gray-900 font-extrabold text-base mb-1.5">Directions for Use:</h3>
                <p>{product.directions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Laboratory Specifications Section */}
        {product.isLabChemical && product.labSpecifications && Object.keys(product.labSpecifications).length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="border-b border-gray-200 pb-4 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Specifications</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <tbody>
                  {Object.entries(product.labSpecifications).map(([key, value]) => (
                    value && value.toString().trim() !== '' && (
                      <tr key={key} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50 w-32 sm:w-40">
                          {key}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {value}
                        </td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Documents & Downloads Section */}
        {product.isLabChemical && product.documents && (
          <ProductDocuments documents={product.documents} />
        )}

        {/* You May Also Like */}
        <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-8 sm:pt-12">
          <h2 className="font-heading font-extrabold text-gray-900 text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8">
            You may also like...
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {recommendedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-8 sm:pt-12">
          <h2 className="font-heading font-extrabold text-gray-900 text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8">
            Related products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {(relatedProducts.length > 0 ? relatedProducts : recommendedProducts).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default ProductDetail
