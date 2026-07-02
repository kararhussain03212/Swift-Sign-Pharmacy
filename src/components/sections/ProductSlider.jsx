import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import ProductCard from '../ui/ProductCard'
import SectionHeader from '../ui/SectionHeader'

// Adapts a raw `/api/public/homepage/product-sliders` product row (the
// category-driven `products` table shape) into the plain object ProductCard
// already expects (id/slug/name/image/price/salePrice/brand), without
// touching ProductCard itself.
function toCardProduct(row) {
  const currentPrice = parseFloat(row.base_price)
  const originalPrice = row.pharmacy_original_price !== null && row.pharmacy_original_price !== undefined
    ? parseFloat(row.pharmacy_original_price)
    : null
  const hasDiscount = originalPrice !== null && !Number.isNaN(originalPrice) && originalPrice > currentPrice

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brand: row.manufacturer_or_brand || '',
    image: row.first_image || '',
    price: hasDiscount ? originalPrice : currentPrice,
    salePrice: hasDiscount ? currentPrice : null,
    rating: 0,
    reviewCount: 0,
  }
}

const ProductSlider = ({ title, viewAllLink, products }) => {
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  if (!Array.isArray(products) || products.length === 0) {
    return null
  }

  const cardProducts = products.map(toCardProduct)

  return (
    <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
      <SectionHeader
        title={title}
        prevRef={prevRef}
        nextRef={nextRef}
        viewAllLink={viewAllLink}
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
        loop={cardProducts.length > 5}
        breakpoints={{
          0:    { slidesPerView: 1, spaceBetween: 10 },
          640:  { slidesPerView: 3, spaceBetween: 12 },
          1024: { slidesPerView: 5, spaceBetween: 14 },
        }}
      >
        {cardProducts.map(p => (
          <SwiperSlide key={p.id}>
            <ProductCard product={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default ProductSlider
