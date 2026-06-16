import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

const Cart = () => {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore()

  const total = items.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0
  )

  if (items.length === 0) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-20 text-center text-gray-400 flex flex-col items-center gap-5">
        <ShoppingBag size={64} strokeWidth={1.2} />
        <h2 className="font-heading font-bold text-2xl text-gray-700">Your cart is empty</h2>
        <p className="text-sm">Add some products to get started!</p>
        <Link
          to="/shop"
          className="bg-primary text-white font-bold rounded-full px-8 py-3 text-sm hover:bg-primary-dark transition-colors"
        >
          Shop Now
        </Link>
        <div className="md:hidden h-16" />
      </div>
    )
  }

  return (
    <main className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h1 className="font-heading font-bold text-xl sm:text-2xl text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-xs sm:text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-5 sm:gap-6">
        {/* Items */}
        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className="flex gap-3 sm:gap-4 bg-white rounded-xl border border-gray-100 p-3 sm:p-4 shadow-card"
            >
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm mb-0.5 line-clamp-2">{item.name}</p>
                <p className="text-[11px] text-gray-400 mb-1.5">{item.brand}</p>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold text-sm">
                    ${(item.salePrice ?? item.price).toFixed(2)}
                  </span>
                  {item.salePrice && (
                    <span className="text-[11px] text-gray-400 line-through">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end justify-between gap-2 flex-shrink-0">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 size={15} />
                </button>

                <div className="flex items-center gap-1.5 border border-gray-200 rounded-full px-2 py-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="text-gray-500 hover:text-primary transition-colors w-5 h-5 flex items-center justify-center"
                  >
                    <Minus size={11} />
                  </button>
                  <span className="text-sm font-semibold w-5 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="text-gray-500 hover:text-primary transition-colors w-5 h-5 flex items-center justify-center"
                  >
                    <Plus size={11} />
                  </button>
                </div>

                <span className="text-sm font-bold text-gray-700">
                  ${((item.salePrice ?? item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-card h-fit">
          <h2 className="font-heading font-bold text-base sm:text-lg text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3 text-sm border-b border-gray-100 pb-4 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-primary font-semibold">{total >= 50 ? 'FREE' : '$5.99'}</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-gray-900 text-base mb-5">
            <span>Total</span>
            <span>${(total + (total >= 50 ? 0 : 5.99)).toFixed(2)}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold
                       rounded-full py-3 text-sm transition-all hover:-translate-y-0.5"
          >
            Proceed to Checkout
          </button>

          {total < 50 && (
            <p className="text-[11px] text-center text-gray-400 mt-3">
              Add ${(50 - total).toFixed(2)} more for FREE shipping!
            </p>
          )}

          <Link
            to="/shop"
            className="block text-center text-primary text-[12px] font-semibold mt-4 hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>

      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default Cart
