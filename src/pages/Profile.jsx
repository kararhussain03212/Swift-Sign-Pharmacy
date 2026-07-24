import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, MapPin, Trash2, Star, Package, Download, MoreVertical, ChevronDown, ChevronUp } from 'lucide-react'
import { resolveUploadUrl } from '../services/headerApi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import {
  updateProfile, changePassword,
  getAddresses, createAddress, deleteAddress,
  getOrderHistory, downloadInvoice,
} from '../services/customerApi'

function Field({ label, id, icon: Icon, error, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Icon size={15} />
          </span>
        )}
        <input
          id={id}
          className={`w-full ${Icon ? 'pl-9' : 'pl-4'} pr-4 py-3 rounded-xl border text-sm
            bg-white text-gray-800 placeholder-gray-400 outline-none transition-all
            focus:ring-2 focus:ring-primary/30 focus:border-primary
            ${error ? 'border-red-400' : 'border-gray-200'}`}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  )
}

function ProfileForm() {
  const { user, refreshUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile(form)
      await refreshUser()
      toast.success('Profile updated successfully')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Full Name" id="name" icon={User}
        value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      <Field label="Email Address" id="email" icon={Mail} type="email"
        value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
      <Field label="Phone Number" id="phone" icon={Phone}
        value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
      <button type="submit" disabled={saving}
        className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold
                   rounded-full px-6 py-2.5 text-sm transition-all">
        {saving ? 'Saving…' : 'Save Changes'}
      </button>
    </form>
  )
}

function PasswordForm() {
  const [form, setForm] = useState({ current_password: '', new_password: '' })
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await changePassword(form)
      setForm({ current_password: '', new_password: '' })
      toast.success('Password changed successfully')
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to change password')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Current Password" id="current_password" icon={Lock} type="password"
        value={form.current_password} onChange={(e) => setForm((f) => ({ ...f, current_password: e.target.value }))} />
      <Field label="New Password" id="new_password" icon={Lock} type="password"
        value={form.new_password} onChange={(e) => setForm((f) => ({ ...f, new_password: e.target.value }))} />
      <button type="submit" disabled={saving}
        className="bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold
                   rounded-full px-6 py-2.5 text-sm transition-all">
        {saving ? 'Updating…' : 'Change Password'}
      </button>
    </form>
  )
}

const STATUS_STYLES = {
  pending: { bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-600', label: 'Confirmed' },
  shipped: { bg: 'bg-indigo-50', text: 'text-indigo-600', label: 'Shipped' },
  delivered: { bg: 'bg-green-50', text: 'text-green-600', label: 'Delivered' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600', label: 'Cancelled' },
}

function OrdersContent() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedOrderId, setExpandedOrderId] = useState(null)

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
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-6 border-b border-gray-200 -mx-6 px-6">
        <button
          onClick={() => setFilterStatus('current')}
          className={`py-3 font-semibold text-sm border-b-2 transition-colors ${
            filterStatus === 'current'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Current
        </button>
        <button
          onClick={() => setFilterStatus('delivered')}
          className={`py-3 font-semibold text-sm border-b-2 transition-colors ${
            filterStatus === 'delivered'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Delivered
        </button>
        <button
          onClick={() => setFilterStatus('all')}
          className={`py-3 font-semibold text-sm border-b-2 transition-colors ${
            filterStatus === 'all'
              ? 'border-primary text-primary'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          All Orders
        </button>
      </div>

      {/* Orders List */}
      {loading ? (
        <p className="text-sm text-gray-400">Loading your orders…</p>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-8">
          <Package size={32} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusStyle = STATUS_STYLES[order.status] || STATUS_STYLES.pending
            const addr = order.shipping_address || {}
            const isExpanded = expandedOrderId === order.id

            return (
              <div key={order.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4">
                  {/* Order Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {order.items?.length || 0} Product{order.items?.length !== 1 ? 's' : ''} | By {addr.first_name || 'User'} | {order.created_at ? new Date(order.created_at).toLocaleString() : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold rounded-full px-3 py-1 ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-3 gap-4 text-xs mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <p className="text-gray-500 mb-0.5">Date of delivery</p>
                      <p className="font-semibold text-gray-900">{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-0.5">Delivered to</p>
                      <p className="font-semibold text-gray-900 line-clamp-2">
                        {[addr.street_address, addr.city, addr.state, addr.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 mb-0.5">Total</p>
                      <p className="font-bold text-gray-900">Rs. {Number(order.total_amount).toFixed(0)}</p>
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="flex items-center gap-2 text-primary font-semibold text-sm hover:underline transition-colors"
                    >
                      View Details {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                      onClick={() => downloadInvoice(order.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-xs font-semibold transition-colors"
                    >
                      <Download size={14} /> Download Invoice
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="bg-white border-t border-gray-200 p-4 space-y-4">
                    <h4 className="font-bold text-sm text-gray-900">Order Items</h4>
                    {(order.items || []).length === 0 ? (
                      <p className="text-sm text-gray-500 py-4">No items found for this order. This may be an older order created before our system update.</p>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {(order.items || []).map((item) => (
                          <div key={item.id} className="flex items-start gap-4 py-3 first:pt-0 last:pb-0">
                            <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden border border-gray-200">
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
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function AddressesSection() {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    label: '', first_name: '', last_name: '', phone: '', street_address: '', city: '', state: '', postal_code: '', country: 'Pakistan', is_default: false,
  })
  const [saving, setSaving] = useState(false)

  async function load() {
    setLoading(true)
    try {
      setAddresses(await getAddresses())
    } catch {
      toast.error('Failed to load addresses')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await createAddress(form)
      toast.success('Address added successfully')
      setShowForm(false)
      setForm({ label: '', first_name: '', last_name: '', phone: '', street_address: '', city: '', state: '', postal_code: '', country: 'Pakistan', is_default: false })
      load()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to add address')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAddress(id)
      toast.success('Address removed')
      load()
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to remove address')
    }
  }

  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-sm text-gray-400">Loading addresses…</p>
      ) : addresses.length === 0 && !showForm ? (
        <p className="text-sm text-gray-400">No saved addresses yet.</p>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div key={addr.id} className="flex items-start gap-3 border border-gray-100 rounded-xl p-4">
              <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0 text-sm">
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  {addr.first_name} {addr.last_name}
                  {addr.is_default && <Star size={12} className="text-amber-400 fill-amber-400" />}
                </p>
                <p className="text-gray-500 text-xs">{addr.phone}</p>
                <p className="text-gray-500 text-xs">{[addr.street_address, addr.city, addr.state, addr.country].filter(Boolean).join(', ')}</p>
              </div>
              <button onClick={() => handleDelete(addr.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      )}

      {showForm ? (
        <form onSubmit={handleSubmit} className="space-y-3 border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="First Name" id="first_name" required
              value={form.first_name} onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))} />
            <Field label="Last Name" id="last_name"
              value={form.last_name} onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))} />
          </div>
          <Field label="Phone" id="addr_phone" required
            value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
          <Field label="Street Address" id="street_address" required
            value={form.street_address} onChange={(e) => setForm((f) => ({ ...f, street_address: e.target.value }))} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" id="city" required
              value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
            <Field label="Postal Code" id="postal_code"
              value={form.postal_code} onChange={(e) => setForm((f) => ({ ...f, postal_code: e.target.value }))} />
          </div>
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input type="checkbox" checked={form.is_default}
              onChange={(e) => setForm((f) => ({ ...f, is_default: e.target.checked }))} />
            Set as default address
          </label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowForm(false)}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-semibold rounded-full py-2.5 text-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-bold rounded-full py-2.5 text-sm">
              {saving ? 'Saving…' : 'Save Address'}
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setShowForm(true)}
          className="text-primary text-sm font-semibold hover:underline">
          + Add New Address
        </button>
      )}
    </div>
  )
}

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('profileActiveTab') || 'profile')

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    localStorage.setItem('profileActiveTab', tabId)
  }

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User, description: 'Manage your personal information' },
    { id: 'orders', label: 'My Orders', icon: Package, description: 'View your order history' },
    { id: 'addresses', label: 'Your Addresses', icon: MapPin, description: 'Manage saved addresses' },
    { id: 'security', label: 'Login & Security', icon: Lock, description: 'Change your password' },
  ]

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div>
              <h1 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900">Your Account</h1>
              <p className="text-sm text-gray-500 mt-1">{user?.name}, Email: {user?.email}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-4 ${
                    activeTab === item.id
                      ? 'border-l-primary bg-teal-50 text-primary'
                      : 'border-l-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon size={18} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Profile Details</h2>
                    {user && <ProfileForm />}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && <OrdersContent />}

              {activeTab === 'addresses' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading font-bold text-lg text-gray-900 mb-2">Saved Addresses</h2>
                    <p className="text-sm text-gray-500 mb-4">Add and manage your delivery addresses</p>
                  </div>
                  <AddressesSection />
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Change Password</h2>
                    <p className="text-sm text-gray-500 mb-6">Keep your account secure by regularly updating your password</p>
                  </div>
                  <PasswordForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
