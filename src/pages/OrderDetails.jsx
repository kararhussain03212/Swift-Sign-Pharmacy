import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, MapPin, CreditCard, Package } from 'lucide-react'
import { getOrderDetails } from '../services/customerApi'
import { resolveUploadUrl } from '../services/headerApi'

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-600',
  confirmed: 'bg-blue-50 text-blue-600',
  shipped: 'bg-indigo-50 text-indigo-600',
  delivered: 'bg-green-50 text-green-600',
  cancelled: 'bg-red-50 text-red-600',
}

export default function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getOrderDetails(id)
      .then(setOrder)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <main className="min-h-[50vh] flex items-center justify-center text-sm text-gray-400">Loading order…</main>
  }

  if (error || !order) {
    return (
      <main className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-gray-500">Order not found.</p>
        <Link to="/orders" className="text-primary text-sm font-semibold hover:underline">Back to Order History</Link>
      </main>
    )
  }

  const addr = order.shipping_address || {}

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 space-y-5">
        

        <div className="flex items-center justify-between">
          <h1 className="font-heading font-bold text-2xl text-gray-900">Order #{order.id}</h1>
          <span className={`text-xs font-semibold rounded-full px-3 py-1.5 capitalize ${STATUS_STYLES[order.status] || 'bg-gray-50 text-gray-500'}`}>
            {order.status}
          </span>
        </div>

        <p className="text-xs text-gray-400">
          Placed on {order.created_at ? new Date(order.created_at).toLocaleString() : ''}
        </p>

        <section className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 space-y-3">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-gray-800">
                {[addr.first_name, addr.last_name].filter(Boolean).join(' ')}
              </p>
              <p className="text-gray-500 text-xs">{addr.phone}</p>
              <p className="text-gray-500 text-xs">
                {[addr.street_address, addr.city, addr.state, addr.country].filter(Boolean).join(', ')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <CreditCard size={16} className="text-primary flex-shrink-0" />
            <p className="text-sm text-gray-600 capitalize">{order.payment_method || 'cod'}</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-heading font-bold text-base text-gray-900">Items</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {(order.items || []).map((item) => (
              <div key={item.id} className="flex items-start gap-4 px-5 py-4">
                <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
                  <img
                    src={item.product_image ? resolveUploadUrl(item.product_image) : '/generic_product.png'}
                    alt={item.product_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/generic_product.png'
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{item.product_name}</p>
                  <p className="text-xs text-gray-500 mt-1">Qty {item.quantity} × Rs. {Number(item.price).toFixed(0)}</p>
                </div>
                <span className="text-sm font-bold text-gray-800 whitespace-nowrap">
                  Rs. {(item.quantity * item.price).toFixed(0)}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-4 border-t border-gray-100 flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span className="text-primary">Rs. {Number(order.total_amount).toFixed(0)}</span>
          </div>
        </section>
      </div>
    </main>
  )
}
