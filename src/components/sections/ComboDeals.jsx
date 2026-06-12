import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeader from '../ui/SectionHeader'

const ComboDeals = () => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const comboProducts = products.filter(p => p.tags.includes('combo'))

  return (
    <section className="bg-primary-light mt-10 py-10">
      <div className="max-w-[1450px] mx-auto px-5">
        <SectionHeader
          title="Popular Combo Deals"
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
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            0:    { slidesPerView: 2, spaceBetween: 10 },
            640:  { slidesPerView: 3, spaceBetween: 12 },
            1024: { slidesPerView: 5, spaceBetween: 14 },
          }}
        >
          {comboProducts.map(p => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ComboDeals
