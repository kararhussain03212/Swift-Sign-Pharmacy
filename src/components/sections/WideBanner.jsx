const WideBanner = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-8">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ background: '#3D4A2E', minHeight: '160px' }}
      >
        {/* Left stacked product images */}
        <div className="absolute left-6 bottom-0 flex items-end gap-1 z-10">
          {['/generic_vitamin_bottle.png', '/jellybee_gummies.png', '/generic_serum_dropper.png'].map((src, i) => (
            <img
              key={i}
              src={src}
              className="object-contain"
              style={{
                height: `${120 + i * 15}px`,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                marginLeft: i > 0 ? '-24px' : '0',
              }}
              alt={`Product ${i + 1}`}
            />
          ))}
        </div>

        {/* Decorative rings */}
        <div
          className="absolute right-[220px] top-1/2 -translate-y-1/2
                      w-44 h-44 rounded-full border-2 border-white/10
                      pointer-events-none"
        />
        <div
          className="absolute right-[205px] top-1/2 -translate-y-1/2
                      w-32 h-32 rounded-full border border-white/5
                      pointer-events-none"
        />

        {/* Right text content */}
        <div className="flex items-center justify-end h-full px-8 py-6" style={{ minHeight: '400px' }}>
          <div className="text-right">
            <h2
              className="font-heading font-extrabold text-white leading-none"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
            >
              Up To 25% Off
            </h2>
            <p className="text-white/75 text-sm mt-1.5">On Top Brands</p>
            <p className="text-white/50 text-xs mt-1 mb-4">
              Extra 8% Off on the Healthcare Range
            </p>
            <button
              className="bg-primary hover:bg-primary-dark text-white
                         rounded-full px-5 py-2 text-[12px] font-bold
                         transition-colors shadow-glow"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WideBanner
