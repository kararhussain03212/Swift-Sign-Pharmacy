import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import SectionHeader from '../ui/SectionHeader'

const ShopByCategory = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10">
      <SectionHeader title="Shop by Category" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3">
        {categories.map(cat => (
          <Link key={cat.id} to={`/shop?category=${cat.slug}`}>
            <div
              className="bg-white border border-gray-100 rounded-xl p-2 sm:p-3
                         flex flex-col items-center text-center cursor-pointer
                         hover:border-primary hover:shadow-md
                         hover:-translate-y-1 transition-all duration-200
                         min-h-[120px] sm:min-h-[150px] md:min-h-[160px] justify-center group"
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-2 sm:mb-3
                             transition-transform duration-200 group-hover:scale-105"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl shadow-sm border border-gray-100/50"
                />
              </div>
              <p
                className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-gray-700
                           group-hover:text-primary transition-colors leading-tight px-0.5"
              >
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ShopByCategory
