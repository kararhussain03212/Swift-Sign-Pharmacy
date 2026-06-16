import { Heart, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import ProductCard from '../components/ui/ProductCard'
import toast from 'react-hot-toast'

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-[1450px] mx-auto px-5 py-20 text-center text-gray-400 flex flex-col items-center gap-5">
        <Heart size={64} strokeWidth={1.2} />
        <h2 className="font-heading font-bold text-2xl text-gray-700">Your wishlist is empty</h2>
        <p className="text-sm">Save products you love to your wishlist!</p>
        <Link
          to="/shop"
          className="bg-primary text-white font-bold rounded-full px-8 py-3
                     text-sm hover:bg-primary-dark transition-colors "
        >
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8 pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-gray-900">
          My Wishlist <span className="text-gray-400 font-normal text-base sm:text-lg">({items.length})</span>
        </h1>
        <button
          onClick={clearWishlist}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {items.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  )
}

export default Wishlist
