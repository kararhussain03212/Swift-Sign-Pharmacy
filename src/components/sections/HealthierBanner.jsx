import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHomepageCarePlanBanner } from '../../services/headerApi'

const HealthierBanner = () => {
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getHomepageCarePlanBanner()
      .then(data => { if (!cancelled) setBanner(data) })
      .catch(() => { if (!cancelled) setBanner(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="w-full mt-8 sm:mt-10 overflow-hidden" style={{ backgroundColor: '#EAFBFC' }}>
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-0 md:h-[240px] flex items-center">
          <div className="h-16 w-full max-w-md bg-white/60 rounded animate-pulse" />
        </div>
      </section>
    )
  }

  if (!banner) return null

  return (
    <section className="w-full mt-8 sm:mt-10 overflow-hidden" style={{ backgroundColor: '#EAFBFC' }}>
      <div
        className="max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-0
                   flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 md:h-[240px]"
      >
        {/* Left Content */}
        <div className="relative z-10 text-center md:text-left flex-1">
          <p className="text-[11px] sm:text-xs tracking-widest text-[#073B45] mb-2 sm:mb-3 uppercase font-bold">
            {banner.eyebrow}
          </p>
          <h2
            className="font-heading font-extrabold text-[#073B45] leading-tight mb-2 sm:mb-3"
            style={{ fontSize: 'clamp(22px, 5vw, 56px)' }}
          >
            {banner.heading}
          </h2>
          <p className="text-[#073B45]/80 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
            {banner.description}
          </p>
        </div>

        {/* Right CTA Button */}
        <div className="relative z-10 flex-shrink-0">
          <Link
            to={banner.button_link || '#'}
            className="bg-[#073B45] hover:bg-[#0FAFB8] text-white font-extrabold
                       rounded-full px-5 py-2.5 text-[11px] sm:text-[13px] tracking-wider uppercase
                       transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <span className="w-5 h-5 rounded-full bg-[#0FAFB8] text-white flex items-center justify-center text-[10px] font-extrabold flex-shrink-0">
              →
            </span>
            <span className="whitespace-nowrap">{banner.button_text}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HealthierBanner
