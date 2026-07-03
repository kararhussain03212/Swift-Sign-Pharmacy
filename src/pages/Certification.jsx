import { useState, useEffect, useCallback } from 'react'
import { Award, Shield, X, ChevronLeft, ChevronRight, CheckCircle, Lock } from 'lucide-react'

const trimSlash = (value) => String(value || '').replace(/\/+$/, '')

function getApiBase() {
  const envApiBase = trimSlash(import.meta.env.VITE_API_URL)
  if (envApiBase) return envApiBase
  if (import.meta.env.DEV) return 'http://localhost/Pharmacy/backend/api'
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return origin ? `${origin}/backend/api` : '/backend/api'
}

async function getJson(path) {
  const res = await fetch(`${getApiBase()}${path}`)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  const json = await res.json()
  if (!json.success) throw new Error(json.error || 'Request failed')
  return json.data
}

// Certificate images added via the admin upload flow get a real /uploads/... path
// (resolved against the backend). Legacy seeded images point at the static files
// under public/certification/ that were already part of this app before the
// data-source swap — those are same-origin and just need per-segment encoding.
function resolveCertImageUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/uploads/')) {
    const root = getApiBase().replace(/\/api$/i, '')
    return `${root}${path}`
  }
  return path.split('/').map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg))).join('/')
}

const GROUP_ICONS = {
  'graduation-cap': '🎓',
  camera: '💼',
  award: '🏅',
}

const Certification = () => {
  const [categories, setCategories] = useState([])
  const [pageContent, setPageContent] = useState(null)
  const [trustBadges, setTrustBadges] = useState([])
  const [status, setStatus] = useState('loading')

  const [lightboxSectionIndex, setLightboxSectionIndex] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      getJson('/public/certifications/page-content'),
      getJson('/public/certifications/grouped'),
      getJson('/public/certifications/trust-badges'),
    ])
      .then(([content, grouped, badges]) => {
        if (cancelled) return
        setPageContent(content)
        setCategories(Array.isArray(grouped) ? grouped : [])
        setTrustBadges(Array.isArray(badges) ? badges : [])
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  }, [])

  const currentSection = lightboxSectionIndex !== null ? (categories[lightboxSectionIndex]?.certifications || []) : []

  const prev = useCallback(() => {
    const newIndex = lightboxIndex - 1
    if (newIndex < 0) {
      let newSectionIndex = lightboxSectionIndex - 1
      if (newSectionIndex < 0) newSectionIndex = categories.length - 1
      setLightboxSectionIndex(newSectionIndex)
      setLightboxIndex((categories[newSectionIndex]?.certifications || []).length - 1)
    } else {
      setLightboxIndex(newIndex)
    }
  }, [lightboxIndex, lightboxSectionIndex, categories])

  const next = useCallback(() => {
    const newIndex = lightboxIndex + 1
    if (newIndex >= currentSection.length) {
      const newSectionIndex = (lightboxSectionIndex + 1) % categories.length
      setLightboxSectionIndex(newSectionIndex)
      setLightboxIndex(0)
    } else {
      setLightboxIndex(newIndex)
    }
  }, [lightboxIndex, lightboxSectionIndex, currentSection, categories])

  useEffect(() => {
    const preventShortcuts = e => {
      if (e.ctrlKey && (e.key === 's' || e.key === 'p' || e.key === 'u' || e.key === 'a')) {
        e.preventDefault()
      }
      if (e.key === 'PrintScreen') {
        navigator.clipboard?.writeText('').catch(() => {})
        setIsHidden(true)
        setTimeout(() => setIsHidden(false), 1200)
      }
    }
    const preventRightClick = e => e.preventDefault()
    const handleBlur = () => setIsHidden(true)
    const handleFocus = () => setIsHidden(false)
    const handleVisibility = () => setIsHidden(document.hidden)

    document.addEventListener('keydown', preventShortcuts)
    document.addEventListener('contextmenu', preventRightClick)
    window.addEventListener('blur', handleBlur)
    window.addEventListener('focus', handleFocus)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      document.removeEventListener('keydown', preventShortcuts)
      document.removeEventListener('contextmenu', preventRightClick)
      window.removeEventListener('blur', handleBlur)
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      const onKey = e => {
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
        if (e.key === 'Escape') { setLightboxIndex(null); setLightboxSectionIndex(null) }
      }
      document.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', onKey)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, prev, next])

  if (status === 'loading') {
    return (
      <main className="cert-page">
        <section
          className="relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)', padding: 'clamp(60px, 10vw, 100px) 0 clamp(48px, 8vw, 80px)' }}
        >
          <div className="max-w-[1280px] mx-auto px-5 h-40 animate-pulse" />
        </section>
      </main>
    )
  }

  if (status === 'error' || !pageContent) {
    return null
  }

  const currentCert = lightboxIndex !== null ? currentSection[lightboxIndex] : null

  return (
    <main className="cert-page">
      <style>{`
        @media print { .cert-page { display: none !important; } }
        .cert-page { -webkit-user-select: none; user-select: none; }
        .cert-page img { -webkit-user-drag: none; user-drag: none; pointer-events: none; -webkit-user-select: none; user-select: none; }
      `}</style>

      {isHidden && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: '#073B45' }}
        >
          <div className="flex flex-col items-center gap-3 text-white/70">
            <Lock size={28} />
            <p className="text-[13px] font-semibold">Content hidden — confidential certificates</p>
          </div>
        </div>
      )}

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)',
          padding: 'clamp(60px, 10vw, 100px) 0 clamp(48px, 8vw, 80px)',
        }}
      >
        <div className="pointer-events-none absolute" style={{ right: '-80px', top: '-80px', width: '400px', height: '400px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.06)' }} />
        <div className="pointer-events-none absolute" style={{ right: '60px', top: '40px', width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />
        <div className="pointer-events-none absolute" style={{ left: '-30px', top: '50%', width: '120px', height: '40px', borderRadius: '999px', background: 'rgba(255,255,255,0.04)', transform: 'rotate(-20deg)' }} />
        <div className="pointer-events-none absolute" style={{ left: '40px', bottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-5 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-[12px] font-bold text-white bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-white/20">
            <Award size={13} /> {pageContent.hero_badge_text}
          </span>
          <h1
            className="font-heading font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.15 }}
          >
            {pageContent.hero_heading}
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed">
            {pageContent.hero_subheading}
          </p>
        </div>
      </section>

      {/* ═══════════════════ CERTIFICATE GROUPS ═══════════════════ */}
      {categories.map((category, sectionIndex) => (
        category.certifications.length > 0 && (
          <section key={category.id} className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-14 sm:mt-16 mb-14">
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#0FAFB8] px-4 py-2 rounded-full">
                {GROUP_ICONS[category.icon_key] || '🏅'} {category.name.toUpperCase()}
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 overflow-hidden group"
                >
                  <div
                    className="relative bg-[#EAFBFC] overflow-hidden"
                    style={{ aspectRatio: '4/3' }}
                    onContextMenu={e => e.preventDefault()}
                    onDragStart={e => e.preventDefault()}
                  >
                    <img
                      src={resolveCertImageUrl(cert.certificate_image_url)}
                      alt={cert.title}
                      draggable={false}
                      onDragStart={e => e.preventDefault()}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      style={{ pointerEvents: 'none', WebkitUserDrag: 'none' }}
                    />
                    <div
                      className="absolute inset-0 z-10 cursor-pointer"
                      onContextMenu={e => e.preventDefault()}
                      onDragStart={e => e.preventDefault()}
                      onClick={() => { setLightboxSectionIndex(sectionIndex); setLightboxIndex(index) }}
                    />
                    <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-[#073B45]/80 backdrop-blur-sm text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-lg">
                        View Certificate
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-[14px] text-gray-900">{cert.title}</p>
                    {cert.type_tag && (
                      <p className="text-[11px] text-[#0FAFB8] font-semibold mt-0.5 uppercase tracking-wide">{cert.type_tag}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      ))}

      {/* ═══════════════════ TRUST BANNER ═══════════════════ */}
      <section style={{ background: '#ffffff', padding: '56px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#EAFBFC] rounded-xl flex items-center justify-center">
              <Shield size={28} className="text-[#0FAFB8]" />
            </div>
            <h2 className="font-extrabold text-gray-900" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
              {pageContent.trust_heading}
            </h2>
          </div>
          <p className="text-gray-600 text-[14px] max-w-lg mx-auto leading-relaxed">
            {pageContent.trust_paragraph}
          </p>
          {trustBadges.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {trustBadges.map(badge => (
                <span
                  key={badge.id}
                  className="inline-flex items-center gap-2 bg-[#EAFBFC] border border-[#0FAFB8] text-gray-900 text-[13px] font-semibold px-4 py-2 rounded-full"
                >
                  <CheckCircle size={14} className="text-[#0FAFB8]" /> {badge.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ LIGHTBOX MODAL ═══════════════════ */}
      {currentCert && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(7,59,69,0.96)', backdropFilter: 'blur(10px)' }}
          onContextMenu={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
          onClick={e => { if (e.target === e.currentTarget) { setLightboxIndex(null); setLightboxSectionIndex(null) } }}
        >
          {/* Close */}
          <button
            onClick={() => { setLightboxIndex(null); setLightboxSectionIndex(null) }}
            className="absolute top-4 right-4 w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-colors z-30"
          >
            <X size={20} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-colors z-30"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Image wrapper */}
          <div
            className="relative flex items-center justify-center"
            style={{ maxWidth: '90vw', maxHeight: '82vh' }}
            onContextMenu={e => e.preventDefault()}
            onDragStart={e => e.preventDefault()}
          >
            <img
              src={resolveCertImageUrl(currentCert.certificate_image_url)}
              alt={currentCert.title}
              draggable={false}
              onDragStart={e => e.preventDefault()}
              className="rounded-2xl shadow-2xl"
              style={{
                maxWidth: '90vw',
                maxHeight: '78vh',
                objectFit: 'contain',
                pointerEvents: 'none',
                WebkitUserDrag: 'none',
              }}
            />
            {/* Protective overlay on lightbox image */}
            <div
              className="absolute inset-0 rounded-2xl z-10"
              onContextMenu={e => e.preventDefault()}
              style={{ cursor: 'default' }}
            />
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4 rounded-b-2xl z-20 pointer-events-none">
              <p className="text-white font-bold text-[14px]">{currentCert.title}</p>
              <p className="text-white/50 text-[11px] flex items-center gap-1 mt-0.5">
                <Lock size={9} /> Confidential – Viewing Only
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 text-white rounded-full flex items-center justify-center transition-colors z-30"
          >
            <ChevronRight size={22} />
          </button>

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {currentSection.map((_, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="transition-all duration-200"
                style={{
                  width: i === lightboxIndex ? '24px' : '6px',
                  height: '6px',
                  borderRadius: '999px',
                  background: i === lightboxIndex ? '#0FAFB8' : 'rgba(255,255,255,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}

export default Certification
