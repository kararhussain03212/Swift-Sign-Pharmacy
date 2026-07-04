import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'

// Card-shaped products (id/slug/name/image/price/salePrice/brand) rendered
// in a Swiper carousel, used for the "You may also like" / "Related
// products" sections on the product detail page.
const RelatedProductsSlider = ({ title, products }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (!Array.isArray(products) || products.length === 0) return null

  return (
    <div className="mt-12 sm:mt-16 border-t border-gray-100 pt-8 sm:pt-12">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="font-heading font-extrabold text-gray-900 text-xl sm:text-2xl md:text-3xl">
          {title}
        </h2>
        {products.length > 2 && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              ref={prevRef}
              aria-label="Previous"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              ref={nextRef}
              aria-label="Next"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-500"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onBeforeInit={swiper => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        loop={products.length > 5}
        breakpoints={{
          0:    { slidesPerView: 2, spaceBetween: 10 },
          640:  { slidesPerView: 3, spaceBetween: 14 },
          768:  { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 5, spaceBetween: 20 },
        }}
      >
        {products.map(p => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default RelatedProductsSlider
