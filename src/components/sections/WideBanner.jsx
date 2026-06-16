const WideBanner = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-6 sm:mt-8">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: '#073B45', minHeight: '160px' }}
      >
        {/* Left stacked product images — hidden on mobile */}
        <div className="hidden sm:flex absolute left-6 bottom-0 items-end gap-1 z-10">
          {['/generic_vitamin_bottle.png', '/jellybee_gummies.png', '/generic_serum_dropper.png'].map((src, i) => (
            <img
              key={i}
              src={src}
              className="object-contain"
              style={{
                height: `${100 + i * 15}px`,
                filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                marginLeft: i > 0 ? '-20px' : '0',
              }}
              alt={`Product ${i + 1}`}
            />
          ))}
        </div>

        {/* Decorative rings — hidden on mobile */}
        <div className="hidden md:block absolute right-[220px] top-1/2 -translate-y-1/2
                        w-44 h-44 rounded-full border-2 border-white/10 pointer-events-none" />
        <div className="hidden md:block absolute right-[205px] top-1/2 -translate-y-1/2
                        w-32 h-32 rounded-full border border-white/5 pointer-events-none" />

        {/* Text content */}
        <div className="flex items-center justify-center sm:justify-end h-full px-4 sm:px-8 py-6
                        min-h-[130px] sm:min-h-[220px] md:min-h-[260px]">
          <div className="text-center sm:text-right">
            <h2
              className="font-heading font-extrabold text-white leading-none"
              style={{ fontSize: 'clamp(20px, 4vw, 42px)' }}
            >
              Up To 25% Off
            </h2>
            <p className="text-white/75 text-xs sm:text-sm mt-1.5">On Top Brands</p>
            <p className="text-white/50 text-[11px] sm:text-xs mt-1 mb-3 sm:mb-4">
              Extra 8% Off on the Healthcare Range
            </p>
            <button
              className="bg-[#0FAFB8] hover:bg-white text-white hover:text-[#0FAFB8]
                         rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold
                         transition-colors shadow-sm border border-[#0FAFB8] hover:border-2"
            >
              SHOP NOW
            </button>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default WideBanner
