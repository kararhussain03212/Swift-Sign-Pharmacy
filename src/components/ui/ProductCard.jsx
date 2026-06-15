import { useState } from 'react'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'
import StarRating from './StarRating'
import Badge from './Badge'

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
                 transition-all duration-300 cursor-pointer group relative flex flex-col"
    >
      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-2.5 left-2.5 z-10 bg-primary text-white
                        text-[10px] font-bold px-1.5 py-0.5 rounded-full">
          -{discount}%
        </div>
      )}

      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full
                    flex items-center justify-center transition-all duration-200
                    ${wishlisted
                      ? 'bg-light-teal text-primary'
                      : 'bg-white/80 text-text hover:bg-light-teal hover:text-primary opacity-0 group-hover:opacity-100'
                    }`}
      >
        <Heart size={13} fill={wishlisted ? '#0FAFB8' : 'none'} />
      </button>

      {/* Quick view */}
      <button
        onClick={handleQuickView}
        className="absolute top-10 right-2.5 z-10 w-7 h-7 rounded-full
                   bg-white/80 text-text hover:bg-primary hover:text-white
                   flex items-center justify-center transition-all duration-200
                   opacity-0 group-hover:opacity-100"
      >
        <Eye size={13} />
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
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {/* Badges */}
        {/* <div className="flex gap-1 flex-wrap">
          {product.badges.slice(0, 2).map(b => (
            <Badge key={b} type={b} />
          ))}
        </div> */}

        {/* Brand */}
        <p className="text-[10px] text-text/60 font-medium">{product.brand}</p>

        {/* Name */}
        <p className="text-[13px] font-semibold text-text line-clamp-2
                      leading-[1.45] group-hover:text-primary transition-colors">
          {product.name}
        </p>

        {/* Rating */}
        {/* <StarRating value={product.rating} count={product.reviewCount} /> */}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-[15px] font-bold text-primary">
            ${(product.salePrice ?? product.price).toFixed(2)}
          </span>
          {product.salePrice && (
            <span className="text-[11px] text-text/50 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className={`w-full mt-1.5 flex items-center justify-center gap-1.5
                      rounded-full py-2 text-[12px] font-bold transition-all duration-200
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
