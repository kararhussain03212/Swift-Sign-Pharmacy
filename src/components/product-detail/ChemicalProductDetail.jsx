import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, HelpCircle, Maximize2 } from 'lucide-react'
import toast from 'react-hot-toast'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'
import ProductDocuments from '../ProductDocuments'
import RelatedProductsSlider from './RelatedProductsSlider'
import { resolveUploadUrl } from '../../services/headerApi'

// Adapts the API's grouped doc_group shape ({certificate, safety_data_sheet,
// product_information, scientific_resource}) into the field names the
// existing ProductDocuments component already expects, without touching it.
// "#" is a seeded placeholder for demo rows with no real file — leave it as
// a harmless no-op anchor instead of mangling it into a fake /uploads/ URL.
const resolveDocUrl = (url) => (!url || url === '#') ? '#' : resolveUploadUrl(url)

function toProductDocumentsShape(documents) {
  const mapCert = (d) => ({ lotNumber: d.lot_number, type: d.certificate_type, date: d.document_date, catalogNumbers: d.catalog_numbers, url: resolveDocUrl(d.file_url) })
  const mapSimple = (d) => ({ title: d.title, lastUpdated: d.document_date, url: resolveDocUrl(d.file_url) })

  return {
    certificates: (documents.certificate || []).map(mapCert),
    sds: (documents.safety_data_sheet || []).map(mapSimple),
    datasheets: (documents.product_information || []).map(mapSimple),
    brochures: (documents.scientific_resource || []).map(mapSimple),
  }
}

const SPEC_LABELS = [
  ['boiling_point', 'Boiling Point'],
  ['cas_number', 'CAS'],
  ['chemical_name_of_material', 'Chemical Name of Material'],
  ['color', 'Color'],
  ['melting_point', 'Melting Point'],
  ['molecular_formula', 'Molecular Formula'],
  ['molecular_weight', 'Molecular Weight (g/mol)'],
  ['percent_purity', 'Percent Purity'],
  ['synonym', 'Synonym'],
  ['grade', 'Grade'],
  ['unit_size', 'Unit Size'],
]

const ChemicalProductDetail = ({ product, related, youMayAlsoLike }) => {
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const chemical = product.chemical || {}

  const [quantity, setQuantity] = useState(1)
  const [selectedQtyIdx, setSelectedQtyIdx] = useState(
    Math.max(0, (chemical.quantity_options || []).findIndex(q => Number(q.is_default)))
  )
  const [selectedPkgIdx, setSelectedPkgIdx] = useState(
    Math.max(0, (chemical.packaging_options || []).findIndex(p => Number(p.is_default)))
  )

  const selectedQty = chemical.quantity_options?.[selectedQtyIdx]
  const selectedPkg = chemical.packaging_options?.[selectedPkgIdx]
  const displayPrice = selectedQty?.price_override != null ? Number(selectedQty.price_override) : Number(product.base_price)

  const thumbnail = product.images[1] || product.images[0] || chemical.molecule_diagram_url

  const cartProduct = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    image: product.images[0] || chemical.molecule_diagram_url,
    price: displayPrice,
    salePrice: null,
    brand: product.manufacturer_or_brand,
    selectedQuantity: selectedQty?.label,
    selectedPackaging: selectedPkg?.label,
  }

  return (
    <main className="w-full bg-white">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8">

        {/* Breadcrumbs */}
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 mb-5 sm:mb-6 font-medium">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <Link to="/shop/laboratory-chemicals" className="hover:text-primary transition-colors">Laboratory Chemicals</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-[180px] sm:max-w-xs md:max-w-none">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
          {/* Left: molecule diagram + thumbnail */}
          <div className="flex flex-col">
            <div className="relative bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 flex items-center justify-center overflow-hidden group"
                 style={{ minHeight: '260px', maxHeight: '500px' }}>
              {product.badge_label && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-red-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {product.badge_label}
                  </span>
                </div>
              )}
              <button className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-500 hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10">
                <Maximize2 size={15} />
              </button>
              <img
                src={chemical.molecule_diagram_url || product.images[0]}
                alt={product.name}
                className="max-h-[220px] sm:max-h-[340px] md:max-h-[380px] w-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>

            {thumbnail && (
              <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4">
                <div className="bg-white border border-gray-200 rounded-xl p-2 flex items-center justify-center h-16 sm:h-20 md:h-24 overflow-hidden">
                  <img src={thumbnail} alt={`${product.name} thumbnail`} className="max-h-full object-contain" />
                </div>
              </div>
            )}
          </div>

          {/* Right: info */}
          <div className="flex flex-col">
            <h1 className="font-heading text-gray-900 text-lg sm:text-xl md:text-[26px] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl sm:text-3xl font-bold text-[#111111]">
                ₨{displayPrice.toFixed(0)}
              </span>
            </div>

            {/* Quantity variant selector */}
            {chemical.quantity_options && chemical.quantity_options.length > 0 && (
              <div className="py-4 border-b border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Quantity:</h3>
                <div className="flex flex-wrap gap-2">
                  {chemical.quantity_options.map((qty, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedQtyIdx(idx)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                        selectedQtyIdx === idx ? 'border-primary bg-primary-light text-primary' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {qty.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging variant selector */}
            {chemical.packaging_options && chemical.packaging_options.length > 0 && (
              <div className="py-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Packaging:</h3>
                  {chemical.packaging_options.length > 2 && (
                    <a href="#" className="text-primary text-sm font-semibold hover:underline">View all</a>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {chemical.packaging_options.map((pkg, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPkgIdx(idx)}
                      className={`px-3 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                        selectedPkgIdx === idx ? 'border-primary bg-primary-light text-primary' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {pkg.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2.5 py-4 my-4 border-t border-b border-gray-100 text-[13px] sm:text-[14px]">
              {product.manufacturer_or_brand && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Manufacturer:</span>
                  <span className="font-medium text-gray-600">{product.manufacturer_or_brand}</span>
                </div>
              )}
              {product.form && (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">Form:</span>
                  <span className="font-medium text-gray-600">{product.form}</span>
                </div>
              )}
              {product.sku && (
                <div>
                  <span className="font-bold text-gray-900">SKU#: </span>
                  <span className="font-medium text-gray-600">{product.sku}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <div className="flex items-center justify-between border border-gray-200 rounded-full px-4 py-2.5 w-full sm:w-32 bg-[#f4f3f3]">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-black font-extrabold text-lg w-6 text-center">-</button>
                <span className="font-bold text-gray-800 text-[14px] w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className="text-gray-500 hover:text-black font-extrabold text-lg w-6 text-center">+</button>
              </div>

              <button
                onClick={() => {
                  addToCart(cartProduct, quantity)
                  toast.success('Added to cart! 🛒', { style: { borderRadius: '12px', fontSize: '13px' } })
                }}
                className="flex-1 bg-black hover:bg-gray-800 text-white font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200"
              >
                Add To Cart
              </button>
            </div>

            <button
              onClick={() => { addToCart(cartProduct, quantity); navigate('/cart') }}
              className="w-full border border-gray-300 hover:bg-black hover:border-black hover:text-white text-black font-extrabold rounded-full py-3 text-[13px] tracking-wider uppercase transition-all duration-200 mb-5"
            >
              Buy Now
            </button>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-bold text-gray-600 border-b border-gray-100 pb-4 mb-4">
              <button
                onClick={() => {
                  toggleWishlist(cartProduct)
                  toast.success(isWishlisted(product.id) ? 'Removed from wishlist!' : 'Added to wishlist! ❤️')
                }}
                className="flex items-center gap-2 hover:text-[#073b45] transition-colors text-sm"
              >
                <Heart size={20} fill={isWishlisted(product.id) ? '#0FAFB8' : 'none'} className={isWishlisted(product.id) ? 'text-primary' : 'text-gray-400'} />
                <span>Add to wishlist</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#073b45] transition-colors text-sm">
                <HelpCircle size={20} className="text-gray-400" />
                <span>Ask Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-gray-200 pb-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Description</h2>
          </div>
          <div className="max-w-none text-gray-600 text-[14px] sm:text-[15px] leading-relaxed flex flex-col gap-5 font-medium">
            <div>
              <h3 className="text-gray-900 font-extrabold text-base mb-2">Product Details:</h3>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                {product.manufacturer_or_brand && <li><strong>Manufacturer:</strong> {product.manufacturer_or_brand}</li>}
                {product.form && <li><strong>Form:</strong> {product.form}</li>}
              </ul>
            </div>
            {product.description_text && <p>{product.description_text}</p>}
          </div>
        </div>

        {/* Specifications table */}
        <div className="mt-12 sm:mt-16">
          <div className="border-b border-gray-200 pb-4 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Specifications</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <tbody>
                {SPEC_LABELS.map(([key, label]) => {
                  const value = chemical[key]
                  if (!value || String(value).trim() === '') return null
                  return (
                    <tr key={key} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-bold text-gray-900 bg-gray-50 w-32 sm:w-40">{label}</td>
                      <td className="py-3 px-4 text-gray-600">{value}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents & Downloads */}
        {chemical.documents && <ProductDocuments documents={toProductDocumentsShape(chemical.documents)} />}

        {/* You May Also Like */}
        <RelatedProductsSlider title="You may also like..." products={youMayAlsoLike} />

        {/* Related Products */}
        <RelatedProductsSlider title="Related products" products={related} />
      </div>

      <div className="md:hidden h-16" />
    </main>
  )
}

export default ChemicalProductDetail
