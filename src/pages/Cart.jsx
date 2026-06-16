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
      <div className="max-w-[1450px] mx-auto px-5 py-20 text-center text-gray-400 flex flex-col items-center gap-5">
        <ShoppingBag size={64} strokeWidth={1.2} />
        <h2 className="font-heading font-bold text-2xl text-gray-700">Your cart is empty</h2>
        <p className="text-sm">Add some products to get started!</p>
        <Link
          to="/shop"
          className="bg-primary text-white font-bold rounded-full px-8 py-3
                     text-sm hover:bg-primary-dark transition-colors "
        >
          Shop Now
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-[1450px] mx-auto px-5 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading font-bold text-2xl text-gray-900">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Items */}
        <div className="space-y-3">
          {items.map(item => (
            <div
              key={item.id}
              className="flex gap-4 bg-white rounded-xl border border-gray-100
                         p-4 shadow-card"
            >
              <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 text-sm mb-1">{item.name}</p>
                <p className="text-xs text-gray-400 mb-2">{item.brand}</p>
                <div className="flex items-center gap-3">
                  <span className="text-primary font-bold">
                    ${(item.salePrice ?? item.price).toFixed(2)}
                  </span>
                  {item.salePrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${item.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-primary transition-colors">
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-primary transition-colors">
                    <Plus size={12} />
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
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-card h-fit">
          <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
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
                       rounded-full py-3 text-sm transition-all 
                       hover:-translate-y-0.5"
          >
            Proceed to Checkout
          </button>
          {total < 50 && (
            <p className="text-[11px] text-center text-gray-400 mt-3">
              Add ${(50 - total).toFixed(2)} more for FREE shipping!
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Cart
