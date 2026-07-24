import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Download, MoreVertical } from 'lucide-react'
import { getOrderHistory } from '../services/customerApi'

const STATUS_STYLES = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Confirmed' },
  shipped: { bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'Shipped' },
  delivered: { bg: 'bg-green-50', text: 'text-green-600', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600', label: 'Cancelled' },
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    getOrderHistory()
      .then(setOrders)
      .finally(() => setLoading(false))
  }, [])

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === 'all') return true
    if (filterStatus === 'current') return ['pending', 'confirmed', 'shipped'].includes(order.status)
    if (filterStatus === 'delivered') return order.status === 'delivered'
    return true
  })

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 space-y-6">
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">My Orders</h1>

        {/* Filter Tabs */}
        <div className="flex gap-3 border-b border-gray-200">
          <button
            onClick={() => setFilterStatus('current')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              filterStatus === 'current'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Current
          </button>
          <button
            onClick={() => setFilterStatus('delivered')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              filterStatus === 'delivered'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Delivered
          </button>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-6 py-3 font-semibold text-sm border-b-2 transition-colors ${
              filterStatus === 'all'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All Orders
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-400">Loading your orders…</p>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-10 text-center flex flex-col items-center gap-4">
            <Package size={48} strokeWidth={1.2} className="text-gray-300" />
            <p className="text-gray-500 text-sm">No orders found.</p>
            <Link to="/shop" className="bg-primary text-white font-bold rounded-full px-6 py-2.5 text-sm hover:bg-primary-dark transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending
              const addr = order.shipping_address || {}

              return (
                <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
                  {/* Order Header */}
                  <div className="border-b border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-lg text-gray-900">Order #{order.id}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {order.items?.length || 0} Product{order.items?.length !== 1 ? 's' : ''} | By {addr.first_name || 'User'} | {order.created_at ? new Date(order.created_at).toLocaleString() : ''}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusStyle.bg} ${statusStyle.text}`}>
                          {statusStyle.label}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-3 gap-6 text-sm">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Date of delivery</p>
                        <p className="font-semibold text-gray-900">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Delivered to</p>
                        <p className="font-semibold text-gray-900 line-clamp-2">
                          {[addr.street_address, addr.city, addr.state, addr.country].filter(Boolean).join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs mb-1">Total</p>
                        <p className="font-bold text-gray-900">Rs. {Number(order.total_amount).toFixed(0)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Items Grid */}
                  {order.items && order.items.length > 0 && (
                    <div className="p-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-3 text-center">
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <Package size={32} className="text-gray-300" />
                            </div>
                            <div className="text-sm">
                              <p className="font-semibold text-gray-800 line-clamp-2 text-xs">{item.product_name}</p>
                              <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity} × Rs. {Number(item.price).toFixed(0)}</p>
                              <p className="text-xs text-gray-400 mt-0.5">Color: Silver</p>
                              <p className="text-xs text-gray-400">Size: Standard</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Footer */}
                  <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-primary font-semibold text-sm hover:underline"
                    >
                      View Details →
                    </Link>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors">
                      <Download size={16} /> Download Invoice
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
