import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import { MapPin, Phone, Clock, Search, ChevronRight, ChevronLeft } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const storeImages = [
  { src: '/store1.png', alt: 'Pharmacy Store - Main Floor' },
  { src: '/store2.png', alt: 'Pharmacy Store - Skincare Section' },
  { src: '/store3.png', alt: 'Pharmacy Store - Nutrition Section' },
  { src: '/store4.png', alt: 'Pharmacy Store - Baby Care Section' },
  { src: '/store5.png', alt: 'Pharmacy Store - Prescription Counter' },
  { src: '/store1.png', alt: 'Pharmacy Store - Main Floor' },
  { src: '/store2.png', alt: 'Pharmacy Store - Skincare Section' },
  { src: '/store3.png', alt: 'Pharmacy Store - Nutrition Section' },
  { src: '/store4.png', alt: 'Pharmacy Store - Baby Care Section' },
  { src: '/store5.png', alt: 'Pharmacy Store - Prescription Counter' },
]

const stores = [
  {
    id: 1,
    name: 'Swift Pharmacy - Johar Town',
    address: '12 Block C, Johar Town, Lahore, Punjab - 54000',
    hours: 'Mon–Sat: 8:00 AM – 11:00 PM | Sun: 9:00 AM – 10:00 PM',
    phone: '0300-1234567',
    lat: 31.4827,
    lng: 74.3036,
  },
  {
    id: 2,
    name: 'Swift Pharmacy - DHA Phase 5',
    address: 'Commercial Area, Phase 5, DHA, Lahore',
    hours: 'Mon–Sat: 9:00 AM – 12:00 AM | Sun: 10:00 AM – 11:00 PM',
    phone: '0301-7654321',
    lat: 31.4697,
    lng: 74.3939,
  },
  {
    id: 3,
    name: 'Swift Pharmacy - Gulberg III',
    address: 'Main Boulevard, Gulberg III, Lahore',
    hours: 'Open 24 Hours',
    phone: '0302-9876543',
    lat: 31.5025,
    lng: 74.3416,
  },
  {
    id: 4,
    name: 'Swift Pharmacy - Model Town',
    address: 'Garden Block, Model Town, Lahore',
    hours: 'Mon–Sun: 8:00 AM – 10:00 PM',
    phone: '0303-1122334',
    lat: 31.5097,
    lng: 74.3219,
  },
]

const stats = [
  { value: '238', label: 'Retail Outlets' },
  { value: '2', label: 'Countries' },
  { value: '19.5M', label: 'Customers/Year' },
  { value: '600+', label: 'Pharmacists' },
]

const StoreLocatorPage = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="bg-gray-50 min-h-screen pb-16 md:pb-0">

      {/* ── Hero Banner ── */}
      <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-[1450px] mx-auto">
          <h1 className="text-[#073B45] text-2xl sm:text-[36px] md:text-[44px] font-bold leading-tight mb-2">
            Store Locator
          </h1>
          <p className="text-gray-600 text-[14px] sm:text-[15px] max-w-lg">
            Find your nearest Swift Pharmacy outlet for quality healthcare services, 24/7.
          </p>
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
                    <a
                      href={`tel:${store.phone}`}
                      onClick={e => e.stopPropagation()}
                      className="flex-shrink-0 bg-[#0FAFB8]/10 text-[#0FAFB8] p-1.5 rounded-lg hover:bg-[#0FAFB8] hover:text-white transition-colors"
                    >
                      <Phone size={13} />
                    </a>
                  </div>
                  <div className="flex items-start gap-1.5 mb-1.5">
                    <MapPin size={13} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-500 text-[12px] leading-relaxed">{store.address}</p>
                  </div>
                  <div className="flex items-start gap-1.5 mb-3">
                    <Clock size={13} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-500 text-[12px]">{store.hours}</p>
                  </div>
                  <button className="text-[12px] font-bold text-[#0FAFB8] border border-[#0FAFB8] px-3 py-1 rounded-lg hover:bg-[#0FAFB8] hover:text-white transition-colors">
                    View Detail
                  </button>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400 text-[14px]">No stores found for "{search}"</div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-md border border-gray-200" style={{ minHeight: '440px' }}>
            <iframe
              title="Store Map"
              width="100%"
              height="100%"
              style={{ minHeight: '440px', border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108868.93!2d74.2219!3d31.4827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904b5e8b3c85d%3A0x4ca6d3b9b4b1f5c0!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1699000000000`}
            />
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-white py-10 sm:py-12 px-4 sm:px-6 border-t border-b border-gray-200">
        <div className="max-w-[1450px] mx-auto">
          <p className="text-[#0FAFB8] font-semibold text-[13px] uppercase tracking-widest mb-1 text-center">Our Network</p>
          <h2 className="text-[#073B45] text-xl sm:text-[28px] font-bold text-center mb-8">Pharmacy Chain In The GCC</h2>
          <p className="text-gray-600 text-[14px] text-center max-w-2xl mx-auto mb-10">
            Swift Pharmacy is known as the region's leading pharmacy retail chain. Recognised as the leading pharmacy 
            for customer care and quality healthcare — our neighbourhood pharmacies are easily accessible.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-sm transition-shadow">
                <div className="text-[38px] font-extrabold text-[#0FAFB8] leading-none mb-1">{s.value}</div>
                <div className="text-gray-700 text-[13px] font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Retail Outlets Swiper ── */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6">
          <p className="text-[#0FAFB8] font-semibold text-[13px] uppercase tracking-widest mb-2">Our Retail Outlets</p>
          <h2 className="text-xl sm:text-[28px] md:text-[34px] font-bold text-gray-900 mb-4">
            Supportive Personal Care In A Comfortable Environment
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-[620px] mb-10">
            With a growing network of over 200 pharmacies, we are committed to bringing reliable &amp; quality healthcare 
            closer to our consumers with a pharmacy in every neighbourhood &amp; the services of a knowledgeable 
            pharmacist available 24/7 for every household.
          </p>

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

          <div className="flex justify-center mt-10">
            <Link
              to="/store-locator"
              className="flex items-center gap-2 border border-gray-400 text-gray-700 hover:border-[#0FAFB8] hover:text-[#0FAFB8] px-8 py-3 rounded-full font-semibold text-[14px] transition-all duration-200 group"
            >
              <MapPin size={16} className="group-hover:text-[#0FAFB8] transition-colors" />
              STORE LOCATOR
            </Link>
          </div>
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

    </main>
  )
}

export default StoreLocatorPage
