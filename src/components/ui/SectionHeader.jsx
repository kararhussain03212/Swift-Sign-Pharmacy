const SectionHeader = ({ title, subtitle, viewAllLink }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
      <div className="flex-1">
        <h2 className="font-heading font-bold text-gray-900 text-lg sm:text-xl md:text-3xl leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {viewAllLink && (
          <a
            href={viewAllLink}
            className="text-primary text-sm font-semibold hover:underline mr-2"
          >
            View All
          </a>
        )}
      </div>
    </div>
  )
}

export default SectionHeader
