import HeroBanner from '../components/sections/HeroBanner'
import ShopByCategory from '../components/sections/ShopByCategory'
import WideBanner from '../components/sections/WideBanner'
import PopularProduct from '../components/sections/PopularProduct'
import PromoCards from '../components/sections/PromoCards'
import SuperSavingDeals from '../components/sections/SuperSavingDeals'
import DailyWellbeing from '../components/sections/DailyWellbeing'
import SexualWellness from '../components/sections/SexualWellness'
import MedicalEquipments from '../components/sections/MedicalEquipments'
import HealthierBanner from '../components/sections/HealthierBanner'
import FeaturedBrands from '../components/sections/FeaturedBrands'
import TrustBadges from '../components/sections/TrustBadges'
import StoreLocation from '../components/sections/StoreLocation'

const Home = () => {
  return (
    <main className="w-full overflow-hidden">
      <HeroBanner />
      <ShopByCategory />
      <WideBanner />
      <PopularProduct />
      <PromoCards />
      <SuperSavingDeals />
      <DailyWellbeing />
      <SexualWellness />
      <HealthierBanner />
      <MedicalEquipments />
      <FeaturedBrands />
      <StoreLocation />
      <TrustBadges />
      {/* Bottom padding for mobile nav */}
      <div className="md:hidden h-16" />
    </main>
  )
}

export default Home
