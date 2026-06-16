import { Link } from 'react-router-dom'

const PromoCards = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

          {/* Left Column (Spans 2 columns on large screens) */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-4 sm:gap-5">

            {/* Card 1: Discount 50% */}
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col sm:flex-row justify-between group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
              style={{ backgroundColor: '#EAFBFC', minHeight: '220px' }}
            >
              {/* Left Content */}
              <div className="flex-1 p-5 sm:p-7 md:p-10 flex flex-col justify-center z-10">
                <h2 className="font-heading font-extrabold text-[#073B45] text-xl sm:text-2xl md:text-[32px] leading-tight">
                  Discount 50% Up To
                </h2>
                <p className="text-[#073B45]/80 text-xs sm:text-sm mt-2 font-medium">
                  Vitamins & General Supplements <br className="hidden sm:block" />
                  From 59k Products
                </p>
                <div className="mt-4 sm:mt-6">
                  <Link
                    to="/shop"
                    className="inline-block border border-[#073B45] text-[#073B45] font-bold px-5 py-2 rounded-full text-[12px] hover:bg-[#073B45] hover:text-white transition-colors duration-200 uppercase tracking-wider"
                  >
                    Book Now
                  </Link>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative w-full sm:w-2/5 h-[160px] sm:h-auto flex items-end justify-end overflow-hidden">
                <img
                  src="/jellybee_gummies.png"
                  alt="Jellybee Gummies"
                  className="w-full h-full object-cover sm:object-contain object-right-bottom group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Card 2: Best Item Chance */}
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col sm:flex-row-reverse justify-between group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
              style={{ backgroundColor: '#0FAFB8', minHeight: '220px' }}
            >
              {/* Content */}
              <div className="flex-1 p-5 sm:p-7 md:p-10 flex flex-col justify-center items-start z-10">
                <h2 className="font-heading font-extrabold text-white text-xl sm:text-2xl md:text-[32px] leading-tight">
                  Best Item Chance
                </h2>
                <p className="text-white/80 text-xs sm:text-sm mt-2 font-medium">
                  Extra 20% Off Select Health Care <br className="hidden sm:block" />
                  Care With Code <span className="font-bold text-white">HEALTH20</span>
                </p>
                <div className="mt-4 sm:mt-6">
                  <Link
                    to="/shop"
                    className="inline-block bg-white text-[#073B45] font-extrabold px-5 py-2 rounded-full text-[12px] hover:bg-[#073B45] hover:text-white transition-colors duration-200 uppercase tracking-wider shadow-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="relative w-full sm:w-2/5 h-[160px] sm:h-auto flex items-end justify-start overflow-hidden">
                <img
                  src="/marine_collagen.png"
                  alt="Marine Collagen"
                  className="w-full h-full object-cover sm:object-contain object-left-bottom group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 lg:col-span-1">
            <div
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between h-full group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
              style={{ backgroundColor: '#073B45', minHeight: '380px' }}
            >
              {/* Top Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center justify-center text-center z-10">
                <h2 className="font-heading font-extrabold text-white text-xl sm:text-2xl md:text-[28px] leading-tight px-2 mt-2">
                  Refreshing &<br />Healthy Beauty
                </h2>
                <p className="text-[#EAFBFC]/80 text-[11px] sm:text-[12px] font-extrabold tracking-wider mt-3 uppercase">
                  EXTRA 15% OFF
                </p>
                <div className="mt-5">
                  <Link
                    to="/shop"
                    className="inline-block bg-[#0FAFB8] text-white font-extrabold px-5 py-2.5 rounded-full text-[12px] hover:bg-white hover:text-[#073B45] transition-colors duration-200 uppercase tracking-wider shadow-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>

              {/* Bottom Image */}
              <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px] mt-auto flex items-end justify-center overflow-hidden">
                <img
                  src="/detox_facial_oil.png"
                  alt="Detox Facial Oil"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default PromoCards
