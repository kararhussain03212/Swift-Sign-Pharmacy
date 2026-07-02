import { useEffect, useState } from 'react'
import HeroBanner from '../components/sections/HeroBanner'
import ShopByCategory from '../components/sections/ShopByCategory'
import WideBanner from '../components/sections/WideBanner'
import ProductSlider from '../components/sections/ProductSlider'
import ProductSliderSkeleton from '../components/sections/ProductSliderSkeleton'
import PromoCards from '../components/sections/PromoCards'
import SuperSavingDeals from '../components/sections/SuperSavingDeals'
import HealthierBanner from '../components/sections/HealthierBanner'
import FeaturedBrands from '../components/sections/FeaturedBrands'
import TrustBadges from '../components/sections/TrustBadges'
import StoreLocation from '../components/sections/StoreLocation'
import { getHomepageProductSliders } from '../services/headerApi'

const Home = () => {
  const [sliders, setSliders] = useState([])
  const [slidersLoading, setSlidersLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    getHomepageProductSliders()
      .then(data => {
        if (!cancelled) setSliders(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (!cancelled) setSliders([])
      })
      .finally(() => {
        if (!cancelled) setSlidersLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  // Sliders keep the admin's sort_order, but are spread back across the same
  // three interleaved slots the original hardcoded sections used to occupy
  // (1 before PromoCards, 2 after SuperSavingDeals, the rest after HealthierBanner)
  // instead of stacking every slider in a single block.
  const firstSlider = sliders.slice(0, 1)
  const nextTwoSliders = sliders.slice(1, 3)
  const remainingSliders = sliders.slice(3)

  const renderSliders = (list) =>
    list.map(slider => (
      <ProductSlider
        key={slider.id}
        title={slider.title}
        viewAllLink={slider.viewAllLink}
        products={slider.products}
      />
    ))

  return (
    <main className="w-full overflow-hidden">
      <HeroBanner />
      <ShopByCategory />
      <WideBanner />

      {slidersLoading ? <ProductSliderSkeleton /> : renderSliders(firstSlider)}

      <PromoCards />
      <SuperSavingDeals />

      {slidersLoading ? <ProductSliderSkeleton /> : renderSliders(nextTwoSliders)}

      <HealthierBanner />

      {!slidersLoading && renderSliders(remainingSliders)}

      <FeaturedBrands />
      <StoreLocation />
      <TrustBadges />
      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default Home
