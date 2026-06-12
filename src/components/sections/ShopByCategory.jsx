import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import SectionHeader from '../ui/SectionHeader'

const ShopByCategory = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-10">
      <SectionHeader title="Shop by Category" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {categories.map(cat => (
          <Link key={cat.id} to={`/shop?category=${cat.slug}`}>
            <div
              className="bg-white border border-gray-100 rounded-xl p-4
                         flex flex-col items-center text-center cursor-pointer
                         hover:border-primary hover:shadow-md
                         hover:-translate-y-1 transition-all duration-200
                         min-h-[250px] justify-center group"
            >
              <div
                className="w-36 h-36 md:w-40 md:h-40 flex items-center justify-center mb-4
                             transition-transform duration-200"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-2xl shadow-sm border border-gray-100/50"
                />
              </div>
              <p
                className="text-[12px] font-semibold text-gray-700
                           group-hover:text-primary transition-colors leading-tight"
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
