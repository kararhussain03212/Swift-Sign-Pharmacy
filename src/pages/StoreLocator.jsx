import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import { MapPin, Phone, Clock, Search, ChevronRight, ChevronLeft } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import {
  getStoreBranches,
  getStoreNetworkStats,
  getStoreLocatorContent,
  getStoreGallery,
  resolveUploadUrl,
} from '../services/headerApi'

const extractMapSrc = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const match = raw.match(/src=["']([^"']+)["']/i)
  return match ? match[1] : raw
}

const resolveGalleryImage = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/uploads/')) return resolveUploadUrl(path)
  return path
}

const StoreLocatorPage = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const [content, setContent] = useState(null)
  const [stores, setStores] = useState([])
  const [stats, setStats] = useState([])
  const [storeImages, setStoreImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.allSettled([
      getStoreLocatorContent(),
      getStoreBranches(),
      getStoreNetworkStats(),
      getStoreGallery(),
    ]).then(([contentRes, branchesRes, statsRes, galleryRes]) => {
      if (cancelled) return
      if (contentRes.status === 'fulfilled') setContent(contentRes.value)
      if (branchesRes.status === 'fulfilled') {
        setStores(
          (branchesRes.value || []).map(b => ({
            id: b.id,
            name: b.name,
            address: b.address,
            hours: b.hours_display,
            phone: b.phone,
            mapSrc: extractMapSrc(b.map_embed_link),
            slug: b.detail_slug,
          }))
        )
      }
      if (statsRes.status === 'fulfilled') setStats(statsRes.value || [])
      if (galleryRes.status === 'fulfilled') {
        setStoreImages((galleryRes.value || []).map(g => ({ src: resolveGalleryImage(g.image_url), alt: g.alt_text || '' })))
      }
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [])

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  )

  const activeStore = stores.find(s => s.id === selected) || stores[0]

  return (
    <main className="bg-gray-50 min-h-screen pb-16 md:pb-0">

      {/* ── Hero Banner ── */}
      <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-[1450px] mx-auto">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-9 sm:h-11 w-64 bg-gray-200 rounded-lg mb-3" />
            <div className="h-4 w-96 max-w-full bg-gray-200 rounded" />
          </div>
        ) : (
          <>
            <h1 className="text-[#073B45] text-2xl sm:text-[36px] md:text-[44px] font-bold leading-tight mb-2">
              {content?.page_title || 'Store Locator'}
            </h1>
            <p className="text-gray-600 text-[14px] sm:text-[15px] max-w-lg">
              {content?.page_subtitle}
            </p>
          </>
        )}
      </div>

      {/* ── Map + Store List ── */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Store List */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            {/* Search */}
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Type your area..."
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-[#0FAFB8] focus:ring-2 focus:ring-[#0FAFB8]/20 bg-white transition-all"
              />
            </div>

            {/* Store Cards */}
            <div className="space-y-3 max-h-[300px] sm:max-h-[420px] overflow-y-auto pr-1">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border-2 border-transparent shadow-sm animate-pulse">
                    <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />
                    <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded mb-3" />
                    <div className="h-6 w-20 bg-gray-100 rounded" />
                  </div>
                ))
              ) : (
                <>
                  {filtered.map(store => (
                    <div
                      key={store.id}
                      onClick={() => setSelected(store.id === selected ? null : store.id)}
                      className={`bg-white rounded-xl p-4 cursor-pointer border-2 transition-all duration-200 ${
                        selected === store.id
                          ? 'border-[#0FAFB8] shadow-lg shadow-[#0FAFB8]/10'
                          : 'border-transparent shadow-sm hover:border-[#0FAFB8]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-[14px] leading-snug">{store.name}</h3>
                        {store.phone && (
                          <a
                            href={`tel:${store.phone}`}
                            onClick={e => e.stopPropagation()}
                            className="flex-shrink-0 bg-[#0FAFB8]/10 text-[#0FAFB8] p-1.5 rounded-lg hover:bg-[#0FAFB8] hover:text-white transition-colors"
                          >
                            <Phone size={13} />
                          </a>
                        )}
                      </div>
                      <div className="flex items-start gap-1.5 mb-1.5">
                        <MapPin size={13} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
                        <p className="text-gray-500 text-[12px] leading-relaxed">{store.address}</p>
                      </div>
                      <div className="flex items-start gap-1.5 mb-3">
                        <Clock size={13} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
                        <p className="text-gray-500 text-[12px]">{store.hours}</p>
                      </div>
                      <Link
                        to={`/store-locator/${store.slug}`}
                        onClick={e => e.stopPropagation()}
                        className="inline-block text-[12px] font-bold text-[#0FAFB8] border border-[#0FAFB8] px-3 py-1 rounded-lg hover:bg-[#0FAFB8] hover:text-white transition-colors"
                      >
                        View Detail
                      </Link>
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-[14px]">No stores found for "{search}"</div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative z-0 w-full" style={{ minHeight: '440px' }}>
            {!loading && (
              activeStore?.mapSrc ? (
                <iframe
                  key={activeStore.id}
                  src={activeStore.mapSrc}
                  title={`Map — ${activeStore.name}`}
                  width="100%"
                  height="100%"
                  style={{ height: '100%', minHeight: '440px', width: '100%', border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="flex h-full min-h-[440px] w-full flex-col items-center justify-center gap-2 bg-gray-50 text-center px-4">
                  <MapPin size={28} className="text-gray-300" />
                  <p className="text-gray-400 text-[14px] font-medium">Map not available</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      {(loading || stats.length > 0) && (
        <div className="bg-white py-10 sm:py-12 px-4 sm:px-6 border-t border-b border-gray-200">
          <div className="max-w-[1450px] mx-auto">
            <p className="text-[#0FAFB8] font-semibold text-[13px] uppercase tracking-widest mb-1 text-center">
              {content?.network_eyebrow || 'Our Network'}
            </p>
            <h2 className="text-[#073B45] text-xl sm:text-[28px] font-bold text-center mb-8">
              {content?.network_heading}
            </h2>
            <p className="text-gray-600 text-[14px] text-center max-w-2xl mx-auto mb-10">
              {content?.network_paragraph}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {loading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center animate-pulse">
                      <div className="h-9 w-16 bg-gray-200 rounded mx-auto mb-2" />
                      <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
                    </div>
                  ))
                : stats.map((s) => (
                    <div key={s.id} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                      <div className="text-[38px] font-extrabold text-[#0FAFB8] leading-none mb-1">{s.value}</div>
                      <div className="text-gray-700 text-[13px] font-semibold">{s.label}</div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Retail Outlets Swiper ── */}
      {(loading || storeImages.length > 0) && (
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-[1450px] mx-auto px-4 sm:px-6">
            <p className="text-[#0FAFB8] font-semibold text-[13px] uppercase tracking-widest mb-2">
              {content?.outlets_eyebrow || 'Our Retail Outlets'}
            </p>
            <h2 className="text-xl sm:text-[28px] md:text-[34px] font-bold text-gray-900 mb-4">
              {content?.outlets_heading}
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[620px] mb-10">
              {content?.outlets_paragraph}
            </p>

            {!loading && storeImages.length > 0 && (
              <div className="relative store-swiper-wrapper-page">
                <Swiper
                  modules={[Navigation, Autoplay, EffectCoverflow]}
                  effect="coverflow"
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView="auto"
                  coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2.5, slideShadows: false }}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  navigation={{ prevEl: '.page-prev-btn', nextEl: '.page-next-btn' }}
                  loop={true}
                  className="store-swiper-page"
                >
                  {storeImages.map((img, i) => (
                    <SwiperSlide key={i} className="store-slide-page">
                      <div className="store-slide-inner-page">
                        <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                        <div className="store-slide-overlay-page" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button className="page-prev-btn store-nav-btn-page"><ChevronLeft size={20} /></button>
                <button className="page-next-btn store-nav-btn-page"><ChevronRight size={20} /></button>
              </div>
            )}
          </div>

          <style>{`
            .store-swiper-page { width: 100%; padding: 40px 0 30px; }
            .store-slide-page { width: min(680px, 90vw) !important; height: min(460px, 60vw); border-radius: 16px; overflow: hidden; }
            .store-slide-inner-page { width: 100%; height: 100%; position: relative; border-radius: 16px; overflow: hidden; }
            .store-slide-overlay-page { position: absolute; inset: 0; background: rgba(0,0,0,0.1); border-radius: 16px; transition: background 0.3s; }
            .swiper-slide-active .store-slide-overlay-page { background: transparent; }
            .swiper-slide-active .store-slide-inner-page { box-shadow: 0 20px 60px rgba(15,175,184,0.25); }
            .store-nav-btn-page { position: absolute; bottom: 25px; z-index: 10; width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid #d1d5db; background: white; display: flex; align-items: center; justify-content: center; color: #6b7280; cursor: pointer; transition: all 0.2s; }
            .store-nav-btn-page:hover { border-color: #0FAFB8; color: #0FAFB8; }
            .page-prev-btn { left: max(16px, calc(50% - 380px)); }
            .page-next-btn { right: max(16px, calc(50% - 380px)); }
          `}</style>
        </section>
      )}

    </main>
  )
}

export default StoreLocatorPage
