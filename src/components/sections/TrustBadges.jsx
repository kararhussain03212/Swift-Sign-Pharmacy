import { Truck, DollarSign, Headphones, CreditCard } from 'lucide-react'

const badges = [
  {
    icon: <Truck size={30} strokeWidth={1.5} />,
    title: 'FREE SHIPPING',
    sub: 'Orders over $130',
  },
  {
    icon: <DollarSign size={30} strokeWidth={1.5} />,
    title: 'MONEY GUARANTEE',
    sub: '30-day exchange',
  },
  {
    icon: <Headphones size={30} strokeWidth={1.5} />,
    title: 'ONLINE SUPPORT',
    sub: '24/7 Support care',
  },
  {
    icon: <CreditCard size={30} strokeWidth={1.5} />,
    title: 'FLEXIBLE PAYMENT',
    sub: 'Multi-card payment',
  },
]

const TrustBadges = () => {
  return (
    <section
      className="bg-white mt-14"
      style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}
    >
      <div className="max-w-[1450px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4"
             style={{ divideX: '1px solid #e5e5e5' }}>
          {badges.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-4 group cursor-default"
              style={{
                padding: '28px 32px',
                borderRight: i < 3 ? '1px solid #e5e5e5' : 'none',
              }}
            >
              {/* Icon — outlined circle */}
              <div
                className="flex items-center justify-center flex-shrink-0
                           transition-all duration-[300ms] group-hover:text-white"
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  border: '1.5px solid #0FAFB8',
                  color: '#0FAFB8',
                  backgroundColor: 'transparent',
                }}
              >
                {b.icon}
              </div>

              <div>
                <p className="font-bold text-gray-900 leading-tight tracking-wide"
                   style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
                  {b.title}
                </p>
                <p className="text-gray-500 mt-0.5 leading-snug"
                   style={{ fontSize: '12px' }}>
                  {b.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
