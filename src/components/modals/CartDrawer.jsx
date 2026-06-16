import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../../store/cartStore'

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const { items, removeFromCart, updateQuantity } = useCartStore()

  const total = items.reduce(
    (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
    0
  )

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[70]
                    shadow-2xl flex flex-col transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="font-heading font-bold text-gray-900 text-lg">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="bg-primary text-white text-[10px] font-bold
                               px-1.5 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center
                       justify-center text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1.2} />
              <p className="text-sm font-medium">Your cart is empty</p>
              <button
                onClick={() => { onClose(); navigate('/shop') }}
                className="bg-primary text-white rounded-full px-6 py-2
                           text-sm font-bold hover:bg-primary-dark transition-colors"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-gray-100 p-1 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-gray-800 line-clamp-2 leading-tight">
                      {item.name}
                    </p>
                    <p className="text-primary text-[13px] font-bold mt-0.5">
                      ${(item.salePrice ?? item.price).toFixed(2)}
                    </p>
                    {/* Qty controls */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-full border border-gray-300 flex items-center
                                   justify-center hover:bg-primary hover:border-primary
                                   hover:text-white text-gray-600 transition-all"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="text-[12px] font-semibold w-5 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-full border border-gray-300 flex items-center
                                   justify-center hover:bg-primary hover:border-primary
                                   hover:text-white text-gray-600 transition-all"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-6 h-6 rounded-full hover:bg-red-50 flex items-center
                               justify-center text-gray-400 hover:text-red-500
                               transition-colors flex-shrink-0"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="font-bold text-gray-900 text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 text-center">
              Taxes and shipping calculated at checkout
            </p>
            <button
              onClick={() => { onClose(); navigate('/cart') }}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold
                         rounded-full py-3 text-sm transition-all 
                         hover:shadow-lg hover:-translate-y-0.5"
            >
              Checkout · ${total.toFixed(2)}
            </button>
            <button
              onClick={() => { onClose(); navigate('/shop') }}
              className="w-full border border-gray-200 text-gray-600 font-semibold
                         rounded-full py-2.5 text-sm hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
