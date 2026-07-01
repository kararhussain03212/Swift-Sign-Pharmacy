import { useEffect, useState } from 'react'
import { Truck, DollarSign, Headphones, CreditCard, Shield, CheckCircle, Clock, Gift } from 'lucide-react'
import { getTrustBadges } from '../../services/headerApi'

const ICON_MAP = {
  truck: Truck,
  'dollar-sign': DollarSign,
  headset: Headphones,
  'credit-card': CreditCard,
  shield: Shield,
  'check-circle': CheckCircle,
  clock: Clock,
  gift: Gift,
}

const BORDER_CLASSES = [
  'border-r border-b border-gray-200 md:border-b-0',
  'border-b border-gray-200 md:border-b-0 md:border-r',
  'border-r border-gray-200',
  '',
]

const TrustBadges = () => {
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getTrustBadges()
      .then(data => { if (!cancelled) setBadges(Array.isArray(data) ? data : []) })
      .catch(() => { if (!cancelled) setFailed(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="bg-white mt-10 sm:mt-14" style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div className="max-w-[1450px] mx-auto px-3 sm:px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 sm:p-5 md:px-8 md:py-7">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-100 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (failed || badges.length === 0) return null

  return (
    <section
      className="bg-white mt-10 sm:mt-14"
      style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}
    >
      <div className="max-w-[1450px] mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {badges.map((b, i) => {
            const Icon = ICON_MAP[b.icon_key] || Truck
            return (
              <div
                key={b.id}
                className={`flex items-center gap-2.5 sm:gap-4 group cursor-default
                            p-4 sm:p-5 md:px-8 md:py-7 ${BORDER_CLASSES[i % BORDER_CLASSES.length]}`}
              >
                <div
                  className="flex items-center justify-center flex-shrink-0
                             transition-all duration-[300ms] group-hover:text-white
                             w-10 h-10 sm:w-12 sm:h-12"
                  style={{
                    borderRadius: '50%',
                    border: '1.5px solid #0FAFB8',
                    color: '#0FAFB8',
                    backgroundColor: 'transparent',
                  }}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-gray-900 leading-tight tracking-wide text-[11px] sm:text-[13px]"
                     style={{ letterSpacing: '0.04em' }}>
                    {b.title}
                  </p>
                  <p className="text-gray-500 mt-0.5 leading-snug text-[10px] sm:text-[12px]">
                    {b.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
