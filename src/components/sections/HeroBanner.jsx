import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'

const slides = [
  {
    id: 1,
    heading: 'Your Trusted Pharmacy, Online',
    firsttext: 'Bringing the store experience',
    secondtext: 'to your screen',
    bgGradient: 'linear-gradient(to right, #f6f3eb, #a5d8d8)',
    headingColor: '#1a365d',
    subtextColor: '#2c5282',
    centered: false,
  },
  {
    id: 2,
    heading: 'Free Pharmacist Support',
    firsttext: 'Upload your prescription and get expert',
    secondtext: 'guidance before ordering',
    bgGradient: 'linear-gradient(to right, #f4f9f9, #bde0e0)',
    headingColor: '#1a365d',
    subtextColor: '#2c5282',
    centered: false,
  },
  {
    id: 3,
    heading: 'Same Day Delivery',
    firsttext: 'Urgent delivery currently only available',
    secondtext: 'in Islamabad',
    bgGradient: 'linear-gradient(to right, #f0fdf4, #a7f3d0)',
    headingColor: '#1a365d',
    subtextColor: '#2c5282',
    centered: false,
  },
  {
    id: 4,
    heading: 'Fast & Reliable Delivery',
    firsttext: 'On-time delivery you',
    secondtext: 'can count on',
    bgGradient: 'linear-gradient(to right, #f0fdf4, #a7f3d0)',
    headingColor: '#1a365d',
    subtextColor: '#2c5282',
    centered: false,
  },
]

const HeroBanner = () => {
  return (
    <section className="hero-swiper relative">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative overflow-hidden"
              style={{ background: slide.bgGradient, minHeight: 'clamp(280px, 45vw, 580px)' }}
            >
              <div
                className="max-w-[1450px] mx-auto px-4 sm:px-6 h-full flex items-center"
                style={{ minHeight: 'clamp(280px, 45vw, 580px)' }}
              >
                <div className={`w-full max-w-4xl py-8 sm:py-10 md:py-14 lg:py-20 z-10 relative flex flex-col
                                 ${slide.centered ? 'items-center text-center mx-auto' : 'items-start text-left'}`}>

                  <h1
                    className="font-heading font-extrabold leading-[1.15] mb-1.5 sm:mb-2 md:mb-4"
                    style={{
                      fontSize: 'clamp(18px, 5vw, 80px)',
                      color: slide.headingColor || '#111827',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    {slide.heading.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </h1>

                  <p
                    className="font-medium mb-3 sm:mb-5 md:mb-8 leading-snug"
                    style={{
                      fontSize: 'clamp(11px, 2vw, 22px)',
                      color: slide.subtextColor || 'var(--primary)',
                    }}
                  >
                    {slide.firsttext && <span>{slide.firsttext}<br /></span>}
                    {slide.secondtext && <span>{slide.secondtext}</span>}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroBanner
