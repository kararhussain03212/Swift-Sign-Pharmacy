import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { getFeaturedBrands, resolveUploadUrl } from '../../services/headerApi'
import SectionHeader from '../ui/SectionHeader'

const resolveImage = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/uploads/')) return resolveUploadUrl(path)
  return path
}

const BrandTile = ({ brand }) => {
  const content = brand.logo_url ? (
    <img
      src={resolveImage(brand.logo_url)}
      alt={brand.name}
      className="max-h-9 object-contain filter grayscale opacity-60
                 group-hover:grayscale-0 group-hover:opacity-100
                 transition-all duration-300"
    />
  ) : (
    <span className="font-heading font-bold text-gray-400 group-hover:text-primary transition-colors duration-300 text-sm">
      {brand.name}
    </span>
  )

  const tileCls = "flex items-center justify-center border border-gray-100 rounded-xl h-16 px-5 bg-white cursor-pointer hover:border-primary hover:shadow-md transition-all duration-200 group"

  return brand.link_url ? (
    <Link to={brand.link_url} className={tileCls}>{content}</Link>
  ) : (
    <div className={tileCls}>{content}</div>
  )
}

const FeaturedBrands = () => {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getFeaturedBrands()
      .then(data => { if (!cancelled) setBrands(Array.isArray(data) ? data : []) })
      .catch(() => { if (!cancelled) setFailed(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
        <SectionHeader title="Featured Brands" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 flex-1 min-w-[100px] rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    )
  }

  if (failed || brands.length === 0) return null

  return (
    <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
      <SectionHeader title="Featured Brands" />
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={brands.length > 6}
        breakpoints={{
          0:    { slidesPerView: 3, spaceBetween: 12 },
          640:  { slidesPerView: 4, spaceBetween: 16 },
          1024: { slidesPerView: 6, spaceBetween: 24 },
        }}
      >
        {brands.map(brand => (
          <SwiperSlide key={brand.id}>
            <BrandTile brand={brand} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default FeaturedBrands
