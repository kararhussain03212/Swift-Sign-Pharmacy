import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'

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
    badgeColor: 'bg-orange-500',
    heading: 'Free Pharmacist Support',
    firsttext: 'Upload your prescription and get expert \n ',
    secondtext: 'guidance before ordering',
    bgGradient: 'linear-gradient(to right, #f4f9f9, #bde0e0)',
    headingColor: '#1a365d',
    subtextColor: '#2c5282',
    centered: false,
  },
  {
    id: 3,
    badgeColor: 'bg-primary',
    heading: 'Same Day Delivery Fast & Reliable',
    firsttext: 'Urgent Delivery currently only available ',
    secondtext: 'in Islamabad',
    bgGradient: 'linear-gradient(to right, #f0fdf4, #a7f3d0)',
    headingColor: '#1a365d',
    subtextColor: '#2c5282',
    centered: false,
  },
  {
    id: 4,
    badgeColor: 'bg-primary',
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
              style={{ 
                background: slide.bgGradient || slide.bgColor, 
                minHeight: '650px' 
              }}
            >
              <div
                className="max-w-[1450px] mx-auto px-5 h-full flex items-center"
                style={{ minHeight: '760px' }}
              >
                {/* TEXT CONTENT */}
                <div className={`w-full max-w-4xl py-14 z-10 relative flex flex-col ${slide.centered ? 'items-center text-center mx-auto' : 'items-start text-left'}`}>

                  {/* Badge */}
                  {/* {slide.badge && (
                    <span
                      className={`inline-block ${slide.badgeColor} text-white
                                 text-[10px] font-bold px-3 py-1 rounded-full
                                 uppercase tracking-wider mb-4`}
                    >
                      {slide.badge}
                    </span>
                  )} */}

                  {/* Heading */}
                  <h1
                    className="font-heading font-extrabold leading-[1.15] mb-4"
                    style={{ 
                      fontSize: 'clamp(35px, 5vw, 85px)',
                      color: slide.headingColor || '#111827',
                      letterSpacing: '-1px'
                    }}
                  >
                    {slide.heading.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </h1>

                  {/* Subtext */}
                  <p 
                    className="font-medium mb-10 text-[22px] md:text-[28px] leading-snug"
                    style={{ color: slide.subtextColor || 'var(--primary)' }}
                  >
                    {slide.firsttext && <span>{slide.firsttext}<br /></span>}
                    {slide.secondtext && <span>{slide.secondtext}</span>}
                  </p>

                  {/* CTA */}
                  {/* {slide.ctaText && (
                    <button
                      className="inline-flex items-center gap-2 bg-primary
                                 hover:bg-primary-dark text-white font-bold
                                 rounded-full px-7 py-3 text-sm transition-all
                                 duration-200  hover:shadow-lg
                                 hover:-translate-y-0.5 animate-pulse-glow"
                    >
                      {slide.ctaText}
                      <ArrowRight size={16} />
                    </button>
                  )} */}
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
