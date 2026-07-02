const ProductSliderSkeleton = () => (
  <section className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8 sm:mt-10 animate-pulse">
    <div className="h-6 sm:h-7 w-40 bg-gray-200 rounded mb-5" />
    <div className="flex gap-3 sm:gap-4 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex-1 min-w-[140px] bg-gray-100 rounded-2xl aspect-[3/4]" />
      ))}
    </div>
  </section>
)

export default ProductSliderSkeleton
