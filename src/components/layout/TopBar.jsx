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
        <div className="animate-marquee select-none hover:[animation-play-state:paused]">
          {/* We duplicate the messages 4 times to ensure the container is wide enough for ultra-wide screens
              Since the animation translates -50%, it will seamlessly loop back to the start when the first 2 copies finish. */}
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-white font-medium pr-12 flex-shrink-0" style={{ fontSize: '12px', letterSpacing: '0.01em' }}>
              {messages[0]} <span className="mx-2 opacity-60">|</span> {messages[1]} <span className="mx-2 opacity-60">|</span> {messages[2]} {i !== 4 && <span className="mx-2 opacity-60">|</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopBar
