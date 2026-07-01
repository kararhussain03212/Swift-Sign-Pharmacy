import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHomepageHeroBanner, resolveUploadUrl } from '../../services/headerApi'

const resolveImage = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/uploads/')) return resolveUploadUrl(path)
  return path
}

const WideBanner = () => {
  const [banner, setBanner] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getHomepageHeroBanner()
      .then(data => { if (!cancelled) setBanner(data) })
      .catch(() => { if (!cancelled) setBanner(null) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="w-full overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-6 sm:mt-8">
          <div className="rounded-2xl bg-gray-100 animate-pulse" style={{ minHeight: '160px', height: '220px' }} />
        </div>
      </section>
    )
  }

  if (!banner) return null

  const images = Array.isArray(banner.images) ? banner.images : []

  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-6 sm:mt-8">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: '#073B45', minHeight: '160px' }}
      >
        {/* Left stacked product images — hidden on mobile */}
        {images.length > 0 && (
          <div className="hidden sm:flex absolute left-6 bottom-0 items-end gap-1 z-10">
            {images.map((img, i) => (
              <img
                key={img.id ?? i}
                src={resolveImage(img.image_url)}
                className="object-contain"
                style={{
                  height: `${100 + i * 15}px`,
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                  marginLeft: i > 0 ? '-20px' : '0',
                }}
                alt={img.alt_text || `Product ${i + 1}`}
              />
            ))}
          </div>
        )}

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
              {banner.heading}
            </h2>
            <p className="text-white opacity-80 text-xs sm:text-sm mt-1.5 font-medium">{banner.subheading}</p>
            <p className="text-white opacity-60 text-[11px] sm:text-xs mt-1 mb-3 sm:mb-4">
              {banner.description}
            </p>
            <Link
              to={banner.button_link || '#'}
              className="inline-block bg-[#0FAFB8] hover:bg-white text-white hover:text-[#0FAFB8]
                         rounded-full px-4 sm:px-5 py-2 text-[11px] sm:text-[12px] font-bold
                         transition-colors shadow-sm border border-[#0FAFB8] hover:border-2"
            >
              {banner.button_text}
            </Link>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default WideBanner
