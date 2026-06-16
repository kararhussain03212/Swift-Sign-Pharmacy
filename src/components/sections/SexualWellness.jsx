import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeader from '../ui/SectionHeader'

const SexualWellness = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const trendingProducts = products.filter(p => p.tags.includes('trending'))

  return (
    <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
      <SectionHeader
        title="Sexual Wellness"
        prevRef={prevRef}
        nextRef={nextRef}
        viewAllLink="/shop"
      />

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          0:    { slidesPerView: 1, spaceBetween: 10 },
          640:  { slidesPerView: 3, spaceBetween: 12 },
          1024: { slidesPerView: 5, spaceBetween: 14 },
        }}
      >
        {trendingProducts.map(p => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default SexualWellness
