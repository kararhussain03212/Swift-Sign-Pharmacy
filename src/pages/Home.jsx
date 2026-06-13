import HeroBanner from '../components/sections/HeroBanner'
import ShopByCategory from '../components/sections/ShopByCategory'
import WideBanner from '../components/sections/WideBanner'
import PopularProduct from '../components/sections/PopularProduct'
import PromoCards from '../components/sections/PromoCards'
import SuperSavingDeals from '../components/sections/SuperSavingDeals'
import DailyWellbeing from '../components/sections/DailyWellbeing'
import SexualWellness from '../components/sections/SexualWellness'
import MedicalEquipments from '../components/sections/MedicalEquipments'
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
      {/* <OfferStrip /> */}
      {/* <NewLaunches /> */}
      <ShopByCategory />
      <WideBanner />
      <PopularProduct />
      <PromoCards />
      <SuperSavingDeals />
      <DailyWellbeing />
      <SexualWellness />
      <HealthierBanner />
      <MedicalEquipments />
      {/* <InTheSpotlight /> */}
      {/* <HealthArticles /> */}
      <FeaturedBrands />
      {/* <Newsletter /> */}
      <TrustBadges />
      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default Home
