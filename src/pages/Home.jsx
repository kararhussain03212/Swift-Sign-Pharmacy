import HeroBanner from '../components/sections/HeroBanner'
import OfferStrip from '../components/sections/OfferStrip'
import NewLaunches from '../components/sections/NewLaunches'
import WideBanner from '../components/sections/WideBanner'
import ShopByCategory from '../components/sections/ShopByCategory'
import PromoCards from '../components/sections/PromoCards'
import SuperSavingDeals from '../components/sections/SuperSavingDeals'
import TrendingNow from '../components/sections/TrendingNow'
import ComboDeals from '../components/sections/ComboDeals'
import InTheSpotlight from '../components/sections/InTheSpotlight'
import HealthierBanner from '../components/sections/HealthierBanner'
import HealthArticles from '../components/sections/HealthArticles'
import FeaturedBrands from '../components/sections/FeaturedBrands'
import Newsletter from '../components/sections/Newsletter'
import TrustBadges from '../components/sections/TrustBadges'

const Home = () => {
  return (
    <main>
      <HeroBanner />
      <OfferStrip />
      <NewLaunches />
      <WideBanner />
      <ShopByCategory />
      <PromoCards />
      <SuperSavingDeals />
      <TrendingNow />
      <ComboDeals />
      <InTheSpotlight />
      <HealthierBanner />
      <HealthArticles />
      <FeaturedBrands />
      <Newsletter />
      <TrustBadges />
      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default Home
