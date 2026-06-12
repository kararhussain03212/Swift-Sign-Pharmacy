import { ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { products } from '../../data/products'
import useCartStore from '../../store/cartStore'
import SectionHeader from '../ui/SectionHeader'
import StarRating from '../ui/StarRating'
import Badge from '../ui/Badge'

const SuperSavingDeals = () => {
  const { addToCart } = useCartStore()
  const dealProducts = products.slice(0, 4)

  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-10">
      <SectionHeader title="Super Saving Deals" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dealProducts.map(product => (
          <div
            key={product.id}
            className="flex items-center gap-4 bg-white rounded-xl
                       border border-gray-100 p-4 shadow-card
                       hover:shadow-card-hover hover:-translate-y-0.5
                       transition-all duration-200 cursor-pointer group"
          >
            {/* Image */}
            <div
              className="w-[250px] h-[250px] flex-shrink-0 bg-gray-50
                          rounded-xl p-2 overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain
                           group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* <div className="flex gap-1.5 mb-1.5 flex-wrap">
                {product.badges.map(b => (
                  <Badge key={b} type={b} />
                ))}
              </div> */}
              <p
                className="text-[13px] font-semibold text-gray-800
                           line-clamp-2 leading-[1.45] mb-1.5"
              >
                {product.name}
              </p>
              <StarRating value={product.rating} count={product.reviewCount} />
              <div className="flex items-center gap-2 mt-1.5 mb-2.5">
                <span className="text-[16px] font-bold text-primary">
                  ${(product.salePrice ?? product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-[12px] text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  addToCart(product)
                  toast.success('Added to cart! 🛒', {
                    style: { borderRadius: '12px', fontSize: '13px' },
                  })
                }}
                className="flex items-center gap-1.5 bg-primary hover:bg-primary-dark
                           text-white rounded-full px-4 py-1.5 text-[12px] font-bold
                           transition-colors shadow-glow"
              >
                <ShoppingCart size={13} /> ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SuperSavingDeals
