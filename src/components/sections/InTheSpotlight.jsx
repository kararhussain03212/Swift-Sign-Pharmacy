import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeader from '../ui/SectionHeader'

const InTheSpotlight = () => {
  const spotlightProducts = products.filter(p => p.tags.includes('spotlight')).slice(0, 4)

  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-10">
      <SectionHeader title="In The Spotlight" viewAllLink="/shop" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {spotlightProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}

export default InTheSpotlight
