import { Globe, ChevronDown } from 'lucide-react'

const messages = [
  'Limited Period Offer: Get up to 10% off + extra 15% off on medicines & more offers.',
  'Flash Deals Every Monday · Free Shipping on Orders Above $50',
  '🌿 100% Organic & Certified Products · New Member? Extra 15% Off First Order',
]

const TopBar = () => {
  return (
    <div className="hidden md:flex items-center h-[34px] px-6 overflow-hidden"
         style={{ backgroundColor: '#073b45' }}>

      {/* Marquee announcement */}
      <div className="flex-1 overflow-hidden relative">
        <div className="animate-marquee select-none">
          <span className="text-white font-medium mr-12"
                style={{ fontSize: '12px', letterSpacing: '0.01em' }}>
            {messages[0]}
            <span className="mx-2 opacity-60">|</span>
            {messages[1]}
            <span className="mx-2 opacity-60">|</span>
            {messages[2]}
            <span className="mx-2 opacity-60">|</span>
            {messages[0]}
            <span className="mx-2 opacity-60">|</span>
            {messages[1]}
            <span className="mx-2 opacity-60">|</span>
            {messages[2]}
          </span>
        </div>
      </div>

      {/* Right side controls */}
      {/* <div className="flex items-center gap-5 flex-shrink-0">
        <button className="flex items-center gap-1 text-white hover:text-primary-light
                           transition-colors duration-[150ms]"
                style={{ fontSize: '12px' }}>
          <Globe size={12} className="opacity-80" />
          <span>English</span>
          <ChevronDown size={10} className="opacity-70" />
        </button>
        <button className="flex items-center gap-1 text-white hover:text-primary-light
                           transition-colors duration-[150ms]"
                style={{ fontSize: '12px' }}>
          <span>USD</span>
          <ChevronDown size={10} className="opacity-70" />
        </button>
      </div> */}
    </div>
  )
}

export default TopBar
