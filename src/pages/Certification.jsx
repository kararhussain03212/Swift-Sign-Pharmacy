import { useState, useEffect, useCallback } from 'react'
import { Award, Shield, X, ChevronLeft, ChevronRight, CheckCircle, Lock } from 'lucide-react'

const certificates = {
  academic: [
    { id: 1, file: 'WhatsApp Image 2026-06-17 at 11.36.11 AM.jpeg', folder: 'certification', title: 'Academic Certification 1', category: 'University' },
    { id: 2, file: 'WhatsApp Image 2026-06-17 at 11.36.12 AM.jpeg', folder: 'certification', title: 'Academic Certification 2', category: 'Diploma' },
    { id: 3, file: 'aaaaaaaa.jpeg', folder: 'certification', title: 'Academic Certification 3', category: 'Specialization' },
    { id: 4, file: 'aaaaaadd.jpeg', folder: 'certification', title: 'Academic Certification 4', category: 'Degree' },
    { id: 5, file: 'ddddd.jpeg', folder: 'certification', title: 'Academic Certification 5', category: 'Diploma' },
    { id: 6, file: 'ddddddddddddddd.jpeg', folder: 'certification', title: 'Academic Certification 6', category: 'Certificate' },
    { id: 7, file: 'dfgdfgdfgdfg.jpeg', folder: 'certification', title: 'Academic Certification 7', category: 'Degree' },
    { id: 8, file: 'sdfdf.jpeg', folder: 'certification', title: 'Academic Certification 8', category: 'Diploma' },
    { id: 9, file: 'sdfsdf.jpeg', folder: 'certification', title: 'Academic Certification 9', category: 'Specialization' },
  ],
  professional: [
    { id: 10, file: '1.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 1', category: 'License' },
    { id: 11, file: '2.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 2', category: 'Credential' },
    { id: 12, file: '3.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 3', category: 'Registration' },
    { id: 13, file: '4.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 4', category: 'Compliance' },
    { id: 14, file: 'WhatsApp Image 2026-06-17 at 2.20.30 PM.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 5', category: 'License' },
    { id: 15, file: 'WhatsApp Image 2026-06-17 at 2.20.30 PM (1).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 6', category: 'Credential' },
    { id: 16, file: 'WhatsApp Image 2026-06-17 at 2.20.30 PM (2).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 7', category: 'Registration' },
    { id: 17, file: 'WhatsApp Image 2026-06-17 at 2.20.30 PM (3).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 8', category: 'Compliance' },
    { id: 18, file: 'WhatsApp Image 2026-06-17 at 2.20.30 PM (4).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 9', category: 'License' },
    { id: 19, file: 'WhatsApp Image 2026-06-17 at 2.20.30 PM (5).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 10', category: 'Credential' },
    { id: 20, file: 'WhatsApp Image 2026-06-17 at 2.20.31 PM.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 11', category: 'Registration' },
    { id: 21, file: 'WhatsApp Image 2026-06-17 at 2.20.31 PM (1).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 12', category: 'Compliance' },
    { id: 22, file: 'WhatsApp Image 2026-06-17 at 2.20.31 PM (2).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 13', category: 'License' },
    { id: 23, file: 'WhatsApp Image 2026-06-17 at 2.20.31 PM (3).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 14', category: 'Credential' },
    { id: 24, file: 'WhatsApp Image 2026-06-17 at 2.20.31 PM (4).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 15', category: 'Registration' },
    { id: 25, file: 'WhatsApp Image 2026-06-17 at 2.20.31 PM (5).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 16', category: 'Compliance' },
    { id: 26, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 17', category: 'License' },
    { id: 27, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (1).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 18', category: 'Credential' },
    { id: 28, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (2).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 19', category: 'Registration' },
    { id: 29, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (3).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 20', category: 'Compliance' },
    { id: 30, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (4).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 21', category: 'License' },
    { id: 31, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (5).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 22', category: 'Credential' },
    { id: 32, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (6).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 23', category: 'Registration' },
    { id: 33, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (7).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 24', category: 'Compliance' },
    { id: 34, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (8).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 25', category: 'License' },
    { id: 35, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (9).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 26', category: 'Credential' },
    { id: 36, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (10).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 27', category: 'Registration' },
    { id: 37, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (11).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 28', category: 'Compliance' },
    { id: 38, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (12).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 29', category: 'License' },
    { id: 39, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (13).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 30', category: 'Credential' },
    { id: 40, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (14).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 31', category: 'Registration' },
    { id: 41, file: 'WhatsApp Image 2026-06-17 at 2.20.33 PM (15).jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 32', category: 'Compliance' },
    { id: 42, file: 'a.jpeg', folder: 'certification/Professional Certification', title: 'Professional Certification 33', category: 'License' },
  ]
}

const Certification = () => {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [lightboxSection, setLightboxSection] = useState('academic')
  const [isHidden, setIsHidden] = useState(false)

  const currentSection = lightboxSection === 'academic' ? certificates.academic : certificates.professional

  const prev = useCallback(() => {
    const newIndex = lightboxIndex - 1
    if (newIndex < 0) {
      if (lightboxSection === 'academic') {
        setLightboxSection('professional')
        setLightboxIndex(certificates.professional.length - 1)
      } else {
        setLightboxIndex(currentSection.length - 1)
      }
    } else {
      setLightboxIndex(newIndex)
    }
  }, [lightboxIndex, lightboxSection, currentSection])

  const next = useCallback(() => {
    const newIndex = lightboxIndex + 1
    if (newIndex >= currentSection.length) {
      if (lightboxSection === 'academic') {
        setLightboxSection('professional')
        setLightboxIndex(0)
      } else {
        setLightboxIndex(0)
      }
    } else {
      setLightboxIndex(newIndex)
    }
  }, [lightboxIndex, lightboxSection, currentSection])

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
        if (e.key === 'Escape') setLightboxIndex(null)
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
            <Award size={13} /> VERIFIED &amp; LICENSED
          </span>
          <h1
            className="font-heading font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.15 }}
          >
            Our{' '}
            <span style={{ color: '#EAFBFC' }}>Certifications</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed">
            Fully licensed and certified by the relevant authorities. All certificates are original, verified, and kept up to date.
          </p>
        </div>
      </section>

      {/* ═══════════════════ STATS CARDS ═══════════════════ */}
      {/* <div className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-10 sm:mt-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: <BadgeCheck size={24} />, iconBg: 'bg-teal-50',   iconClr: 'text-[#0FAFB8]',  value: '9+',   label: 'Active Certificates' },
            { icon: <Shield size={24} />,      iconBg: 'bg-blue-50',   iconClr: 'text-[#0FAFB8]',  value: 'DRAP', label: 'Registered'          },
            { icon: <Award size={24} />,        iconBg: 'bg-green-50',  iconClr: 'text-green-500',  value: 'PCP',  label: 'Licensed'            },
            { icon: <CheckCircle size={24} />,  iconBg: 'bg-purple-50', iconClr: 'text-purple-500', value: 'ISO',  label: 'Quality Certified'   },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 p-5 flex flex-col items-center text-center group cursor-default"
            >
              <div className={`w-12 h-12 ${s.iconBg} ${s.iconClr} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {s.icon}
              </div>
              <div className="font-extrabold text-[22px] text-gray-900">{s.value}</div>
              <div className="text-[12px] text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div> */}

      {/* ═══════════════════ ACADEMIC CERTIFICATIONS ═══════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-14 sm:mt-16 mb-14">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#0FAFB8] px-4 py-2 rounded-full">
            🎓 ACADEMIC CERTIFICATIONS
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.academic.map((cert, index) => (
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
                  src={`/${cert.folder}/${encodeURIComponent(cert.file)}`}
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
                  onClick={() => { setLightboxSection('academic'); setLightboxIndex(index) }}
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-[#073B45]/80 backdrop-blur-sm text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-lg">
                    View Certificate
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-[14px] text-gray-900">{cert.title}</p>
                <p className="text-[11px] text-[#0FAFB8] font-semibold mt-0.5 uppercase tracking-wide">{cert.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ PROFESSIONAL CERTIFICATIONS ═══════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-14 sm:mt-16 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#0FAFB8] px-4 py-2 rounded-full">
            💼 PROFESSIONAL CERTIFICATIONS
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.professional.map((cert, index) => (
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
                  src={`/${cert.folder}/${encodeURIComponent(cert.file)}`}
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
                  onClick={() => { setLightboxSection('professional'); setLightboxIndex(index) }}
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-[#073B45]/80 backdrop-blur-sm text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-lg">
                    View Certificate
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="font-bold text-[14px] text-gray-900">{cert.title}</p>
                <p className="text-[11px] text-[#0FAFB8] font-semibold mt-0.5 uppercase tracking-wide">{cert.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ TRUST BANNER ═══════════════════ */}
      <section style={{ background: '#ffffff', padding: '56px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#EAFBFC] rounded-xl flex items-center justify-center">
              <Shield size={28} className="text-[#0FAFB8]" />
            </div>
            <h2 className="font-extrabold text-gray-900" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
              100% Verified &amp; Licensed
            </h2>
          </div>
          <p className="text-gray-600 text-[14px] max-w-lg mx-auto leading-relaxed">
            Every product we sell is sourced from certified manufacturers. Our pharmacy is fully licensed by the Drug Regulatory Authority of Pakistan (DRAP) and the Pakistan Pharmacy Council (PCP).
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            {['DRAP Registered', 'PCP Licensed', 'ISO Certified', 'Quality Assured'].map(badge => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 bg-[#EAFBFC] border border-[#0FAFB8] text-gray-900 text-[13px] font-semibold px-4 py-2 rounded-full"
              >
                <CheckCircle size={14} className="text-[#0FAFB8]" /> {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ LIGHTBOX MODAL ═══════════════════ */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: 'rgba(7,59,69,0.96)', backdropFilter: 'blur(10px)' }}
          onContextMenu={e => e.preventDefault()}
          onDragStart={e => e.preventDefault()}
          onClick={e => { if (e.target === e.currentTarget) setLightboxIndex(null) }}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
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
              src={`/${currentSection[lightboxIndex].folder}/${encodeURIComponent(currentSection[lightboxIndex].file)}`}
              alt={currentSection[lightboxIndex].title}
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
              <p className="text-white font-bold text-[14px]">{currentSection[lightboxIndex].title}</p>
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
