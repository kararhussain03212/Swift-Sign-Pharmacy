import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getHomepagePromoCards, resolveUploadUrl } from '../../services/headerApi'

const resolveImage = (path) => {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  if (path.startsWith('/uploads/')) return resolveUploadUrl(path)
  return path
}

const THEME_STYLES = {
  'light-teal': {
    bg: '#EAFBFC',
    heading: '#073B45',
    text: 'rgba(7,59,69,0.8)',
    button: 'border border-[#073B45] text-[#073B45] hover:bg-[#073B45] hover:text-white',
  },
  'dark-teal': {
    bg: '#0FAFB8',
    heading: '#ffffff',
    text: 'rgba(255,255,255,0.8)',
    button: 'bg-white text-[#073B45] hover:bg-[#073B45] hover:text-white shadow-sm',
  },
  'pink-teal': {
    bg: '#073B45',
    heading: '#ffffff',
    text: 'rgba(234,251,252,0.8)',
    button: 'bg-[#0FAFB8] text-white hover:bg-white hover:text-[#073B45] shadow-sm',
  },
}

const getTheme = (key) => THEME_STYLES[key] || THEME_STYLES['light-teal']

const RowCard = ({ card }) => {
  const theme = getTheme(card.theme_key)
  const imageLeft = card.layout_key === 'image_left'

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col ${imageLeft ? 'sm:flex-row-reverse' : 'sm:flex-row'} justify-between group cursor-pointer transition-all duration-300 hover:shadow-card-hover`}
      style={{ backgroundColor: theme.bg, minHeight: '220px' }}
    >
      <div className={`flex-1 p-5 sm:p-7 md:p-10 flex flex-col justify-center z-10 ${imageLeft ? 'items-start' : ''}`}>
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-[32px] leading-tight" style={{ color: theme.heading }}>
          {card.heading}
        </h2>
        {card.highlight_text ? (
          <p className="text-[11px] sm:text-[12px] font-extrabold tracking-wider mt-2 uppercase" style={{ color: theme.text }}>
            {card.highlight_text}
          </p>
        ) : (
          <p className="text-xs sm:text-sm mt-2 font-medium" style={{ color: theme.text }}>
            {card.description}
          </p>
        )}
        <div className="mt-4 sm:mt-6">
          <Link
            to={card.button_link || '#'}
            className={`inline-block font-bold px-5 py-2 rounded-full text-[12px] transition-colors duration-200 uppercase tracking-wider ${theme.button}`}
          >
            {card.button_text}
          </Link>
        </div>
      </div>

      <div className={`relative w-full sm:w-2/5 h-[160px] sm:h-auto flex items-end ${imageLeft ? 'justify-start' : 'justify-end'} overflow-hidden`}>
        <img
          src={resolveImage(card.image_url)}
          alt={card.image_alt || card.heading}
          className={`w-full h-full object-cover sm:object-contain ${imageLeft ? 'object-left-bottom' : 'object-right-bottom'} group-hover:scale-105 transition-transform duration-300`}
        />
      </div>
    </div>
  )
}

const TallCard = ({ card }) => {
  const theme = getTheme(card.theme_key)

  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
      style={{ backgroundColor: theme.bg, minHeight: '380px' }}
    >
      <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center z-10">
        <h2 className="font-heading font-extrabold text-xl sm:text-2xl md:text-[28px] leading-tight px-2 mt-2" style={{ color: theme.heading }}>
          {card.heading}
        </h2>
        {card.highlight_text ? (
          <p className="text-[11px] sm:text-[12px] font-extrabold tracking-wider mt-3 uppercase" style={{ color: theme.text }}>
            {card.highlight_text}
          </p>
        ) : (
          <p className="text-[11px] sm:text-[12px] font-medium mt-3" style={{ color: theme.text }}>
            {card.description}
          </p>
        )}
        <div className="mt-5">
          <Link
            to={card.button_link || '#'}
            className={`inline-block font-extrabold px-5 py-2.5 rounded-full text-[12px] transition-colors duration-200 uppercase tracking-wider ${theme.button}`}
          >
            {card.button_text}
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px] mt-auto flex items-end justify-center overflow-hidden">
        <img
          src={resolveImage(card.image_url)}
          alt={card.image_alt || card.heading}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  )
}

const PromoCards = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getHomepagePromoCards()
      .then(data => { if (!cancelled) setCards(Array.isArray(data) ? data : []) })
      .catch(() => { if (!cancelled) setFailed(true) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <section className="w-full overflow-hidden">
        <div className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 sm:gap-5">
              <div className="rounded-2xl sm:rounded-3xl bg-gray-100 animate-pulse" style={{ minHeight: '220px' }} />
              <div className="rounded-2xl sm:rounded-3xl bg-gray-100 animate-pulse" style={{ minHeight: '220px' }} />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <div className="rounded-2xl sm:rounded-3xl bg-gray-100 animate-pulse h-full" style={{ minHeight: '380px' }} />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (failed || cards.length === 0) return null

  const rowCards = cards.filter(c => c.layout_key !== 'image_bottom')
  const tallCards = cards.filter(c => c.layout_key === 'image_bottom')

  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {rowCards.length > 0 && (
            <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 sm:gap-5">
              {rowCards.map(card => <RowCard key={card.id} card={card} />)}
            </div>
          )}
          {tallCards.length > 0 && (
            <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4 sm:gap-5">
              {tallCards.map(card => <TallCard key={card.id} card={card} />)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PromoCards
