import { useState } from 'react'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'

const ProductCard = ({ product, onQuickView }) => {
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const [isAdding, setIsAdding] = useState(false)

  const wishlisted = isWishlisted(product.id)
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.stopPropagation()
    setIsAdding(true)
    addToCart(product)
    toast.success(`${product.name.slice(0, 30)}... added to cart!`, {
      icon: '🛒',
      style: { borderRadius: '12px', fontSize: '13px' },
    })
    setTimeout(() => setIsAdding(false), 700)
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    toggleWishlist(product)
    if (!wishlisted) {
      toast.success('Added to wishlist!', {
        icon: '❤️',
        style: { borderRadius: '12px', fontSize: '13px' },
      })
    }
  }

  const handleQuickView = (e) => {
    e.stopPropagation()
    onQuickView && onQuickView(product)
  }

  return (
    <div
      onClick={() => navigate(`/product/${product.slug}`)}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden
                 shadow-card hover:shadow-card-hover hover:-translate-y-1
                 transition-all duration-300 cursor-pointer group relative flex flex-col h-full"
    >
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-1.5 sm:top-2.5 left-1.5 sm:left-2.5 z-10 bg-primary text-white
                        text-[8px] sm:text-[10px] font-bold px-1 sm:px-1.5 py-0.5 rounded-full">
          -{discount}%
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-1.5 sm:top-2.5 right-1.5 sm:right-2.5 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full
                    flex items-center justify-center transition-all duration-200
                    ${wishlisted
                      ? 'bg-light-teal text-primary'
                      : 'bg-white/80 text-text hover:bg-light-teal hover:text-primary opacity-0 group-hover:opacity-100'
                    }`}
      >
        <Heart className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]" fill={wishlisted ? '#0FAFB8' : 'none'} />
      </button>

      {/* Quick view */}
      <button
        onClick={handleQuickView}
        className="absolute top-8 sm:top-10 right-1.5 sm:right-2.5 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full
                   bg-white/80 text-text hover:bg-primary hover:text-white
                   flex items-center justify-center transition-all duration-200
                   opacity-0 group-hover:opacity-100"
      >
        <Eye className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px]" />
      </button>

      {/* Image */}
      <div className="relative bg-light-teal aspect-square p-4 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105
                     transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-3 flex flex-col gap-1 sm:gap-1.5 flex-1">
        {/* Brand */}
        <p className="text-[9px] sm:text-[10px] text-text/60 font-medium">{product.brand}</p>

        {/* Name */}
        <p className="text-xs sm:text-[13px] font-semibold text-text line-clamp-2 min-h-[32px] sm:min-h-[37px]
                      leading-[1.35] sm:leading-[1.45] group-hover:text-primary transition-colors">
          {product.name}
        </p>

        {/* Rating */}
        {/* <StarRating value={product.rating} count={product.reviewCount} /> */}

        {/* Price */}
        <div className="flex items-center gap-1.5 mt-auto pt-0.5 sm:pt-1">
          <span className="text-sm sm:text-[15px] font-bold text-primary">
            ₨{(product.salePrice ?? product.price).toFixed(0)}
          </span>
          {product.salePrice && (
            <span className="text-[9px] sm:text-[11px] text-text/50 line-through">
              ₨{product.price.toFixed(0)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-1 sm:mt-1.5 flex items-center justify-center gap-1
                      rounded-full py-1.5 sm:py-2 text-[10px] sm:text-[12px] font-bold transition-all duration-200
                      ${isAdding
                        ? 'bg-primary text-white scale-95'
                        : 'bg-primary text-white border border-primary hover:bg-white hover:text-primary hover:border-2 hover:border-primary shadow-sm'
                      }`}
        >
          <ShoppingCart size={13} />
          {isAdding ? 'Added!' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
