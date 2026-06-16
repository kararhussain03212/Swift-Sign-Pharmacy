import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
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

const StoreLocation = () => {
  return (
    <section className="w-full overflow-hidden py-10 sm:py-16 bg-white">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#0FAFB8] font-semibold text-[13px] uppercase tracking-widest mb-2">
            Our Retail Outlets
          </p>
          <h2 className="text-[28px] md:text-[34px] font-bold text-gray-900 mb-4 leading-tight">
            Caring Service In A Comfortable Environment
          </h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-[620px]">
            With a growing network of over 200 pharmacies, we are committed to bringing reliable &amp; quality 
            healthcare closer to our consumers with a pharmacy in every neighbourhood &amp; the services of a 
            knowledgeable pharmacist available 24/7 for every household.
          </p>
        </div>

        {/* Swiper Slider */}
        <div className="relative store-swiper-wrapper">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 120,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            navigation={{
              prevEl: '.store-prev-btn',
              nextEl: '.store-next-btn',
            }}
            loop={true}
            className="store-swiper"
          >
            {storeImages.map((img, i) => (
              <SwiperSlide key={i} className="store-slide">
                <div className="store-slide-inner">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="store-slide-overlay" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation */}
          <button className="store-prev-btn store-nav-btn">
            <ChevronLeft size={20} />
          </button>
          <button className="store-next-btn store-nav-btn">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Store Locator Button */}
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
        .store-swiper {
          width: 100%;
          padding: 40px 0 30px;
        }
        .store-slide {
          width: min(680px, 90vw) !important;
          height: min(460px, 60vw);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.4s ease;
        }
        .store-slide-inner {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
        }
        .store-slide-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.08);
          border-radius: 16px;
          transition: background 0.3s;
        }
        .swiper-slide-active .store-slide-overlay {
          background: transparent;
        }
        .swiper-slide-active .store-slide-inner {
          box-shadow: 0 20px 60px rgba(15,175,184,0.25);
        }
        .store-nav-btn {
          position: absolute;
          bottom: -20px;
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #d1d5db;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s;
        }
        .store-nav-btn:hover {
          border-color: #0FAFB8;
          color: #0FAFB8;
        }
        .store-prev-btn { left: max(16px, calc(50% - 380px)); }
        .store-next-btn { right: max(16px, calc(50% - 380px)); }
      `}</style>
    </section>
  )
}

export default StoreLocation
