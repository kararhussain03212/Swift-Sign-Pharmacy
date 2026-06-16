import { Truck, DollarSign, Headphones, CreditCard } from 'lucide-react'

const badges = [
  {
    icon: <Truck size={24} strokeWidth={1.5} />,
    title: 'FREE SHIPPING',
    sub: 'Orders over $130',
    borderClass: 'border-r border-b border-gray-200 md:border-b-0',
  },
  {
    icon: <DollarSign size={24} strokeWidth={1.5} />,
    title: 'MONEY GUARANTEE',
    sub: '30-day exchange',
    borderClass: 'border-b border-gray-200 md:border-b-0 md:border-r',
  },
  {
    icon: <Headphones size={24} strokeWidth={1.5} />,
    title: 'ONLINE SUPPORT',
    sub: '24/7 Support care',
    borderClass: 'border-r border-gray-200',
  },
  {
    icon: <CreditCard size={24} strokeWidth={1.5} />,
    title: 'FLEXIBLE PAYMENT',
    sub: 'Multi-card payment',
    borderClass: '',
  },
]

const TrustBadges = () => {
  return (
    <section
      className="bg-white mt-10 sm:mt-14"
      style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}
    >
      <div className="max-w-[1450px] mx-auto px-3 sm:px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {badges.map((b, i) => (
            <div
              key={i}
              className={`flex items-center gap-2.5 sm:gap-4 group cursor-default
                          p-4 sm:p-5 md:px-8 md:py-7 ${b.borderClass}`}
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
                {b.icon}
              </div>

              <div className="min-w-0">
                <p className="font-bold text-gray-900 leading-tight tracking-wide text-[11px] sm:text-[13px]"
                   style={{ letterSpacing: '0.04em' }}>
                  {b.title}
                </p>
                <p className="text-gray-500 mt-0.5 leading-snug text-[10px] sm:text-[12px]">
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
