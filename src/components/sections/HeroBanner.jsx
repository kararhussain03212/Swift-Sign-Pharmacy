import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { ArrowRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    badge: 'NEW',
    badgeColor: 'bg-red-500',
    heading: 'New Collagen\nNaturally',
    subtext: 'Orange Flavor Gummies',
    ctaText: 'SHOP NOW',
    bgColor: '#FDEEE8',
    productImg: '/jellybee_gummies.png',
    decorators: [
      { rotate: '15deg',  top: '15%', left: '52%', w: 36, h: 12, color: '#E57373' },
      { rotate: '-25deg', top: '25%', left: '78%', w: 28, h: 10, color: '#FF8A65' },
      { rotate: '40deg',  top: '60%', left: '55%', w: 22, h: 8,  color: '#FFB74D' },
      { rotate: '-10deg', top: '70%', left: '80%', w: 32, h: 10, color: '#F48FB1' },
      { rotate: '60deg',  top: '10%', left: '68%', w: 18, h: 7,  color: '#CE93D8' },
    ],
  },
  {
    id: 2,
    badge: 'HOT',
    badgeColor: 'bg-orange-500',
    heading: 'Pure Vitamin D3\nSupplements',
    subtext: 'Boost Your Immunity Daily',
    ctaText: 'SHOP NOW',
    bgColor: '#EFF8FF',
    productImg: '/generic_vitamin_bottle.png',
    decorators: [
      { rotate: '20deg',  top: '20%', left: '55%', w: 30, h: 10, color: '#90CAF9' },
      { rotate: '-35deg', top: '50%', left: '75%', w: 24, h: 9,  color: '#80DEEA' },
      { rotate: '50deg',  top: '70%', left: '58%', w: 20, h: 8,  color: '#A5D6A7' },
    ],
  },
  {
    id: 3,
    badge: 'SALE',
    badgeColor: 'bg-primary',
    heading: 'Organic Omega 3\nFish Oil',
    subtext: '1000mg — Heart & Brain Health',
    ctaText: 'SHOP NOW',
    bgColor: '#F0FFF4',
    productImg: '/generic_vitamin_bottle.png',
    decorators: [
      { rotate: '12deg',  top: '18%', left: '53%', w: 34, h: 11, color: '#A5D6A7' },
      { rotate: '-20deg', top: '65%', left: '72%', w: 26, h: 9,  color: '#80CBC4' },
    ],
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
              style={{ backgroundColor: slide.bgColor, minHeight: '560px' }}
            >
              <div
                className="max-w-[1450px] mx-auto px-5 h-full flex items-center"
                style={{ minHeight: '560px' }}
              >
                {/* LEFT TEXT */}
                <div className="w-[45%] py-14 z-10 relative">

                  {/* Badge */}
                  <span
                    className={`inline-block ${slide.badgeColor} text-white
                               text-[10px] font-bold px-3 py-1 rounded-full
                               uppercase tracking-wider mb-4`}
                  >
                    {slide.badge}
                  </span>

                  {/* Heading */}
                  <h1
                    className="font-heading font-extrabold text-gray-900 leading-[1.15] mb-3"
                    style={{ fontSize: 'clamp(25px, 4vw, 70px)' }}
                  >
                    {slide.heading.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </h1>

                  {/* Subtext */}
                  <p className="text-primary font-semibold mb-10 text-[18px]">
                    {slide.subtext}
                  </p>

                  {/* CTA */}
                  <button
                    className="inline-flex items-center gap-2 bg-primary
                               hover:bg-primary-dark text-white font-bold
                               rounded-full px-7 py-3 text-sm transition-all
                               duration-200 shadow-glow hover:shadow-lg
                               hover:-translate-y-0.5 animate-pulse-glow"
                  >
                    {slide.ctaText}
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* RIGHT IMAGE */}
                <div
                  className="w-[55%] relative flex justify-end items-end h-full"
                  style={{ minHeight: '560px' }}
                >
                  <img
                    src={slide.productImg}
                    alt={slide.heading}
                    className="relative z-10 object-contain"
                    style={{
                      height: '500px',
                      filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.18))',
                      position: 'absolute',
                      right: '0',
                      bottom: '0',
                    }}
                  />

                  {/* Floating pill decorators */}
                  {slide.decorators.map((d, i) => (
                    <div
                      key={i}
                      className="absolute animate-float rounded-full z-20"
                      style={{
                        '--rotate': d.rotate,
                        top: d.top,
                        left: d.left,
                        width: `${d.w}px`,
                        height: `${d.h}px`,
                        backgroundColor: d.color,
                        transform: `rotate(${d.rotate})`,
                        animationDelay: `${i * 0.4}s`,
                        opacity: 0.85,
                      }}
                    />
                  ))}
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
