import { ChevronLeft, ChevronRight } from 'lucide-react'

const SectionHeader = ({ title, subtitle, prevRef, nextRef, viewAllLink }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div>
        <h2 className="font-heading font-bold text-gray-900 text-xl md:text-3xl leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {viewAllLink && (
          <a
            href={viewAllLink}
            className="text-primary text-sm font-semibold hover:underline mr-2"
          >
            View All
          </a>
        )}

        {(prevRef || nextRef) && (
          <div className="flex items-center gap-1.5">
            <button
              ref={prevRef}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center
                         hover:bg-primary hover:border-primary hover:text-white text-gray-500
                         transition-all duration-200 shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              ref={nextRef}
              className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center
                         hover:bg-primary hover:border-primary hover:text-white text-gray-500
                         transition-all duration-200 shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SectionHeader
