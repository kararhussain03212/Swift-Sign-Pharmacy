import { Tag } from 'lucide-react'
import { products } from '../../data/products'
import ProductCard from '../ui/ProductCard'
import SectionHeader from '../ui/SectionHeader'
import CountdownTimer from '../ui/CountdownTimer'

const NewLaunches = () => {
  const newProducts = products.filter(p => p.tags.includes('new')).slice(0, 4)

  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-10">
      <SectionHeader title="New Launches" />

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">

        {/* LEFT PROMO CARD */}
        <div className="bg-primary-light rounded-2xl p-5 relative overflow-hidden
                        min-h-[240px] flex flex-col justify-between">
          <div>
            <p className="text-[15px] font-bold text-gray-800 leading-[1.5] mb-4">
              Extra{' '}
              <span className="text-primary">15% off</span>
              {' '}for new member<br />
              sign up on the first time
            </p>
            <CountdownTimer targetDate="2025-12-31" />
          </div>

          <button
            className="mt-5 inline-flex items-center gap-2 bg-primary
                       text-white rounded-full px-5 py-2 text-[12px]
                       font-bold w-fit hover:bg-primary-dark transition-colors
                       "
          >
            <Tag size={13} /> GET COUPON
          </button>

          {/* Decorative bg */}
          <img
            src="https://placehold.co/120x120/E8F5F0/1A9E6E?text=+"
            className="absolute right-0 bottom-0 h-28 object-contain opacity-20 pointer-events-none"
            alt=""
          />
        </div>

        {/* RIGHT PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {newProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewLaunches
