import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin, Phone, Clock, ArrowLeft } from 'lucide-react'
import { getStoreBranchBySlug } from '../services/headerApi'

const extractMapSrc = (value) => {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const match = raw.match(/src=["']([^"']+)["']/i)
  return match ? match[1] : raw
}

const DetailSkeleton = () => (
  <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 animate-pulse">
    <div className="h-4 w-24 bg-gray-200 rounded mb-6" />
    <div className="h-9 w-80 max-w-full bg-gray-200 rounded mb-4" />
    <div className="h-4 w-64 bg-gray-100 rounded mb-2" />
    <div className="h-4 w-48 bg-gray-100 rounded mb-8" />
    <div className="h-[360px] w-full bg-gray-100 rounded-2xl" />
  </div>
)

const StoreBranchDetail = () => {
  const { slug } = useParams()
  const [branch, setBranch] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setNotFound(false)

    getStoreBranchBySlug(slug)
      .then(data => {
        if (cancelled) return
        if (!data) setNotFound(true)
        else setBranch(data)
      })
      .catch(() => { if (!cancelled) setNotFound(true) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <DetailSkeleton />
      </main>
    )
  }

  if (notFound || !branch) {
    return (
      <main className="bg-gray-50 min-h-screen flex items-center justify-center py-24 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#073B45] mb-2">Branch Not Found</h1>
          <p className="text-gray-500 mb-6">This branch may have been moved or is no longer active.</p>
          <Link to="/store-locator" className="inline-flex items-center gap-2 text-[#0FAFB8] font-bold text-[14px] hover:underline">
            <ArrowLeft size={16} /> Back to Store Locator
          </Link>
        </div>
      </main>
    )
  }

  const mapSrc = extractMapSrc(branch.map_embed_link)

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <Link to="/store-locator" className="inline-flex items-center gap-2 text-[#0FAFB8] font-semibold text-[13px] mb-6 hover:underline">
          <ArrowLeft size={15} /> Back to Store Locator
        </Link>

        <h1 className="text-[#073B45] text-2xl sm:text-[32px] font-bold leading-tight mb-4">{branch.name}</h1>

        <div className="space-y-2 mb-8">
          <div className="flex items-start gap-2">
            <MapPin size={16} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-[14px]">{branch.address}</p>
          </div>
          <div className="flex items-start gap-2">
            <Clock size={16} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
            <p className="text-gray-600 text-[14px]">{branch.hours_display}</p>
          </div>
          {branch.phone && (
            <div className="flex items-start gap-2">
              <Phone size={16} className="text-[#0FAFB8] flex-shrink-0 mt-0.5" />
              <a href={`tel:${branch.phone}`} className="text-[#0FAFB8] text-[14px] font-semibold hover:underline">
                {branch.phone}
              </a>
            </div>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200" style={{ height: '400px' }}>
          {mapSrc ? (
            <iframe
              src={mapSrc}
              title={`Map — ${branch.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-50 text-center px-4">
              <MapPin size={28} className="text-gray-300" />
              <p className="text-gray-400 text-[14px] font-medium">Map not available</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default StoreBranchDetail
