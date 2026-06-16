import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { brands } from '../../data/brands'
import SectionHeader from '../ui/SectionHeader'

const FeaturedBrands = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
      <SectionHeader title="Featured Brands" />
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0:    { slidesPerView: 3, spaceBetween: 12 },
          640:  { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
        }}
      >
        {brands.map(brand => (
          <SwiperSlide key={brand.id}>
            <div
              className="flex items-center justify-center border border-gray-100
                         rounded-xl h-16 px-5 bg-white cursor-pointer
                         hover:border-primary hover:shadow-md
                         transition-all duration-200 group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-9 object-contain filter grayscale opacity-60
                           group-hover:grayscale-0 group-hover:opacity-100
                           transition-all duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default FeaturedBrands
