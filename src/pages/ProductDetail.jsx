import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductBySlug, getRelatedProducts, resolveUploadUrl } from '../services/headerApi'
import PharmacyProductDetail from '../components/product-detail/PharmacyProductDetail'
import ChemicalProductDetail from '../components/product-detail/ChemicalProductDetail'

const ProductDetailSkeleton = () => (
  <main className="w-full bg-white">
    <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-6 sm:py-8 animate-pulse">
      <div className="h-4 w-64 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
        <div className="bg-gray-100 rounded-2xl" style={{ minHeight: '400px' }} />
        <div className="flex flex-col gap-4">
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="h-10 w-1/2 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  </main>
)

const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [relatedData, setRelatedData] = useState({ related: [], youMayAlsoLike: [] })
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    let cancelled = false
    setLoading(true)
    setNotFound(false)

    getProductBySlug(slug)
      .then(async (data) => {
        if (cancelled) return
        if (!data) {
          setNotFound(true)
          return
        }
        const resolved = {
          ...data,
          images: (data.images || []).map(resolveUploadUrl),
          chemical: data.chemical
            ? { ...data.chemical, molecule_diagram_url: resolveUploadUrl(data.chemical.molecule_diagram_url) }
            : data.chemical,
        }
        setProduct(resolved)
        const related = await getRelatedProducts(slug).catch(() => ({ related: [], youMayAlsoLike: [] }))
        const resolveList = (list) => (list || []).map((p) => ({ ...p, image: resolveUploadUrl(p.image) }))
        if (!cancelled) {
          setRelatedData({
            related: resolveList(related.related),
            youMayAlsoLike: resolveList(related.youMayAlsoLike),
          })
        }
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [slug])

  if (loading) return <ProductDetailSkeleton />

  if (notFound || !product) {
    return (
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-20 text-center text-gray-400">
        <p className="text-xl font-semibold">Product not found</p>
        <button onClick={() => navigate('/shop')} className="mt-4 text-primary font-medium">
          ← Back to Shop
        </button>
      </div>
    )
  }

  const Detail = product.product_type === 'chemical' ? ChemicalProductDetail : PharmacyProductDetail

  return <Detail product={product} related={relatedData.related} youMayAlsoLike={relatedData.youMayAlsoLike} />
}

export default ProductDetail
