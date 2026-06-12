import { Tag, Percent, Gift, Zap } from 'lucide-react'

const offers = [
  { icon: <Tag size={22} />,     bg: '#FFF3CD', iconColor: '#F59E0B', title: 'UPTO 80% OFF',  link: 'Shop Now' },
  { icon: <Percent size={22} />, bg: '#D1FAE5', iconColor: '#1A9E6E', title: 'UPTO 70% OFF',  link: 'Shop Now' },
  { icon: <Gift size={22} />,    bg: '#DBEAFE', iconColor: '#3B82F6', title: 'FREE ITEM',      link: 'Shop Now' },
  { icon: <Zap size={22} />,     bg: '#FFE4E6', iconColor: '#E53E3E', title: 'FLAT 34% OFF',   link: 'Shop Now' },
]

const OfferStrip = () => {
  return (
    <div className="max-w-[1450px] mx-auto px-5 mt-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {offers.map((o, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-card hover:shadow-card-hover
                       hover:-translate-y-1 transition-all duration-200
                       p-3.5 flex items-center gap-3 cursor-pointer group"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center
                         flex-shrink-0 transition-transform group-hover:scale-110"
              style={{ backgroundColor: o.bg, color: o.iconColor }}
            >
              {o.icon}
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-800 leading-tight">{o.title}</p>
              <p className="text-[11px] text-primary font-medium mt-0.5">{o.link} →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OfferStrip
