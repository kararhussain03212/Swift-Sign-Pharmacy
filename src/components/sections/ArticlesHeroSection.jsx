import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { getBlogSettings } from '../../services/headerApi'

const DEFAULTS = {
  heading: 'Health Articles & Wellness Tips',
  headingAccent: '',
  subheading: 'Expert-written guides on medicine, nutrition, skincare, and living your healthiest life.',
  searchPlaceholder: 'Search articles...',
  buttonText: 'Search',
}

const mapSettings = (data) => ({
  heading: data.blog_hero_title || DEFAULTS.heading,
  headingAccent: data.blog_hero_title_accent || '',
  subheading: data.blog_hero_description || DEFAULTS.subheading,
  searchPlaceholder: data.blog_search_placeholder || DEFAULTS.searchPlaceholder,
  buttonText: data.blog_button_text || DEFAULTS.buttonText,
})

const ArticlesHeroSection = ({ searchQuery, setSearchQuery }) => {
  const [content, setContent] = useState(null)

  useEffect(() => {
    let active = true
    getBlogSettings()
      .then((data) => {
        if (!active) return
        setContent(mapSettings(data || {}))
      })
      .catch(() => {
        if (active) setContent(DEFAULTS)
      })
    return () => {
      active = false
    }
  }, [])

  const loading = content === null
  const data = content || DEFAULTS

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)',
        padding: 'clamp(60px, 10vw, 100px) 0 clamp(48px, 8vw, 80px)',
      }}
    >
      {/* Decorative BG elements */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: '-80px',
          top: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '2px solid rgba(255,255,255,0.06)',
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          right: '60px',
          top: '40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          left: '-30px',
          top: '50%',
          width: '120px',
          height: '40px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.04)',
          transform: 'rotate(-20deg)',
        }}
      />
      {/* Dots grid */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: '40px',
          bottom: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '12px',
        }}
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
            }}
          />
        ))}
      </div>

      {/* Inner */}
      <div className="max-w-[1280px] mx-auto px-5 text-center relative z-10">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-9 sm:h-12 max-w-lg mx-auto rounded-lg bg-white/15 mb-3" />
            <div className="h-4 max-w-xl mx-auto rounded bg-white/10 mb-2" />
            <div className="h-4 max-w-md mx-auto rounded bg-white/10 mb-8" />
            <div
              className="rounded-full bg-white/10 mx-auto"
              style={{ maxWidth: '480px', height: '48px' }}
            />
          </div>
        ) : (
          <>
            {/* Heading */}
            <h1
              className="font-heading font-extrabold text-white mb-3"
              style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.15 }}
            >
              {data.heading}{data.headingAccent ? ' ' : ''}
              {data.headingAccent && <span style={{ color: '#EAFBFC' }}>{data.headingAccent}</span>}
            </h1>

            {/* Subtext */}
            <p className="text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed mb-8">
              {data.subheading}
            </p>

            {/* Search bar */}
            <div
              className="flex items-center bg-white rounded-full shadow-lg mx-auto overflow-hidden"
              style={{ maxWidth: '480px', height: '48px' }}
            >
              <Search size={16} className="ml-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={data.searchPlaceholder}
                className="flex-1 px-3 text-[13px] sm:text-[14px] text-gray-700 outline-none bg-transparent min-w-0"
              />
              <button
                onClick={() => {}}
                className="bg-primary border border-primary hover:bg-primary-dark text-white font-bold text-[12px] sm:text-[13px] px-5 sm:px-8 h-full rounded-full transition-colors whitespace-nowrap flex-shrink-0"
              >
                {data.buttonText}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ArticlesHeroSection
