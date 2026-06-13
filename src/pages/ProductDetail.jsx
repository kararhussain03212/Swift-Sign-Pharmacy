import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { 
  ShoppingCart, Heart, Star, Flame, Truck, 
  RefreshCw, HelpCircle, Share2, Maximize2 
} from 'lucide-react'
import toast from 'react-hot-toast'
import { products } from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import ProductCard from '../components/ui/ProductCard'
import Newsletter from '../components/sections/Newsletter'
import TrustBadges from '../components/sections/TrustBadges'

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()

  const product = products.find(p => p.slug === slug)

  const [activeImage, setActiveImage] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (product) {
      setActiveImage(product.image)
      setQuantity(1)
      window.scrollTo(0, 0)
    }
  }, [product])

  if (!product) {
    return (
      <div className="max-w-[1450px] mx-auto px-5 py-20 text-center text-gray-400">
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

  // Get recommended and related products
  const recommendedProducts = products.filter(p => p.slug !== product.slug).slice(0, 5)
  const relatedProducts = products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 5)

  return (
    <main className="w-full bg-white">
      {/* Container */}
      <div className="max-w-[1450px] mx-auto px-5 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 mb-6 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize">{product.category === 'vitamins' ? 'Vitamins & Supplements' : product.category === 'skincare' ? 'Personal Care' : product.category}</span>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-[250px] sm:max-w-none">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Gallery */}
          <div className="flex flex-col">
            {/* Main Image View */}
            <div className="relative bg-[#ffffff] border border-gray-100 rounded-2xl p-8 flex items-center justify-center min-h-[300px] sm:min-h-[450px] max-h-[500px] shadow-sm overflow-hidden group">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                {product.badges?.map(b => (
                  <span key={b} className="bg-red-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {b}
                  </span>
                ))}
              </div>

              {/* Maximize Icon */}
              <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-500 hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10">
                <Maximize2 size={15} />
              </button>

              {/* Main Image */}
              <img
                src={activeImage}
                alt={product.name}
                className="max-h-[380px] object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3.5 mt-4">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`bg-white border rounded-xl p-2.5 flex items-center justify-center h-20 sm:h-24 overflow-hidden transition-all duration-200 ${
                    activeImage === img 
                      ? 'border-[#1c716b] ring-2 ring-[#1c716b]/10' 
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
            
            {/* Star Rating and Stock Status */}
            <div className="flex items-center gap-3.5 flex-wrap">
              <div className="flex items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} className="text-yellow-400" />
                ))}
              </div>
              <span className="text-[12px] text-gray-500 font-semibold">({product.reviewCount || 0} Reviews)</span>
              <span className="bg-[#E8F5F0] text-primary text-[10px] font-bold px-3 py-0.5 rounded-full border border-primary/20 uppercase tracking-wider">
                In Stock
              </span>
            </div>

            {/* Title & Brand */}
            <h1 className="font-heading text-gray-900 text-2xl md:text-[35px] leading-tight mt-3">
              {product.name}
            </h1>
            <p className="text-[13px] text-gray-500 font-medium mt-1">
              Net Weight: {product.weight || '50g'}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-[#111111]">
                ${(product.salePrice ?? product.price).toFixed(2)}
              </span>
              {product.salePrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Product Meta Info */}
            <div className="flex flex-col gap-3 py-5 my-4 border-t border-b border-gray-100 text-[14px]">
              {product.category && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Category: </span>
                  <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="font-medium text-primary hover:underline capitalize">
                    {product.category}
                  </Link>
                </div>
              )}
              {product.subCategory && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Sub Category: </span>
                  <Link to={`/shop?subCategory=${encodeURIComponent(product.subCategory)}`} className="font-medium text-primary hover:underline capitalize">
                    {product.subCategory}
                  </Link>
                </div>
              )}
              {product.diseaseCategory && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Disease Category: </span>
                  <Link to={`/shop?diseaseCategory=${encodeURIComponent(product.diseaseCategory)}`} className="font-medium text-primary hover:underline capitalize">
                    {product.diseaseCategory}
                  </Link>
                </div>
              )}
              {product.salePrice && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Deals: </span>
                  <Link to={`/shop?deals=true`} className="font-medium text-red-500 hover:underline capitalize flex items-center gap-1">
                    <Flame size={14} /> Hot Deals
                  </Link>
                </div>
              )}
              <div>
                <span className="font-bold text-gray-900">SKU#: </span>
                <span className="font-medium text-gray-600">{product.sku || '258780'}</span>
              </div>
            </div>

            {/* Quantity and Add to Cart Row */}
            <div className="flex flex-col sm:flex-row gap-4 mb-3.5">
              {/* Quantity selector */}
              <div className="flex items-center justify-between border border-gray-200 rounded-full px-4.5 py-2 w-full sm:w-32 bg-[#f4f3f3]">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="text-gray-500 hover:text-black font-extrabold text-base px-2"
                >
                  -
                </button>
                <span className="font-bold text-gray-800 text-[14px]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="text-gray-500 hover:text-black font-extrabold text-base px-2"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
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

            {/* Buy Now Button */}
            <button
              onClick={() => {
                addToCart(product, quantity)
                navigate('/cart')
              }}
              className="w-full border border-gray-300 hover:bg-black hover:border-black hover:text-white text-black font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200 mb-6"
            >
              Buy Now
            </button>

            {/* Sub-actions */}
            <div className="flex flex-wrap items-center gap-6 font-bold text-gray-600 border-b border-gray-100 pb-5 mb-5">
              <button 
                onClick={() => {
                  toggleWishlist(product)
                  toast.success(isWishlisted(product.id) ? 'Removed from wishlist!' : 'Added to wishlist! ❤️')
                }} 
                className="flex items-center gap-2 hover:text-[#1c716b] transition-colors"
              >
                <Heart size={25} fill={isWishlisted(product.id) ? '#1A9E6E' : 'none'} className={isWishlisted(product.id) ? 'text-primary' : 'text-gray-400 text-[0px]'} />
                <span>Add to wishlist</span>
              </button>
              {/* <button className="flex items-center gap-2 hover:text-[#1c716b] transition-colors">
                <RefreshCw size={25} className="text-gray-400" />
                <span>Compare</span>
              </button> */}
              <button className="flex items-center gap-2 hover:text-[#1c716b] transition-colors">
                <HelpCircle size={25} className="text-gray-400" />
                <span>Ask Us</span>
              </button>
            </div>

            {/* Social Shares */}
            {/* <div className="flex items-center gap-3.5 text-[13px] text-gray-500 font-bold">
              <span>Share:</span>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-blue-600 transition-colors text-gray-400">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3h-4V6c0-.5.5-1 1-1h3V1H13c-3.3 0-5 1.7-5 5v2z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-sky-500 transition-colors text-gray-400">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-blue-700 transition-colors text-gray-400">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-red-600 transition-colors text-gray-400">
                  <Share2 size={13} />
                </button>
              </div>
            </div> */}

          </div>

        </div>

        {/* Product Description Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200 pb-4 mb-8">
            <h2 className="text-2xl font-heading font-extrabold text-gray-900">Description</h2>
          </div>

          <div className="max-w-none text-gray-600 text-[15px] leading-relaxed flex flex-col gap-6 font-medium">
            <p>
              {product.description}
            </p>
            {product.keyBenefits && (
              <div>
                <h3 className="text-gray-900 font-extrabold text-base mb-2.5">Key benefits:</h3>
                <ul className="list-disc pl-5 flex flex-col gap-2">
                  {product.keyBenefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
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

        {/* You May Also Like Section */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="font-heading font-extrabold text-gray-900 text-2xl md:text-3xl mb-8">
            You may also like...
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recommendedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t border-gray-100 pt-12">
          <h2 className="font-heading font-extrabold text-gray-900 text-2xl md:text-3xl mb-8">
            Related products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {relatedProducts.length > 0 ? (
              relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              recommendedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </div>

      </div>

      
    </main>
  )
}

export default ProductDetail
