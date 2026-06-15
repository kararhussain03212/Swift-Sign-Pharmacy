import React from 'react'
import { Link } from 'react-router-dom'

const PromoCards = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card 1: Discount 50% Up To (Gummies) */}
          <div 
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row justify-between min-h-[380px] md:h-[280px] md:min-h-0 group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
            style={{ backgroundColor: '#EAFBFC' }}
          >
            {/* Left Content */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center z-10">
              <h2 className="font-heading font-extrabold text-[#073B45] text-3xl md:text-[36px] leading-tight">
                Discount 50% Up To
              </h2>
              <p className="text-[#073B45]/80 text-sm md:text-base mt-2.5 font-medium">
                Vitamins & General Supplements <br />
                From 59k Products
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-block border border-[#073B45] text-[#073B45] font-bold px-6 py-2 rounded-full text-[13px] hover:bg-[#073B45] hover:text-white transition-colors duration-200 uppercase tracking-wider"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* Right Image Container */}
            <div className="relative w-full md:w-1/2 h-[180px] md:h-full flex items-end justify-end">
              <img
                src="/jellybee_gummies.png"
                alt="Jellybee Gummies"
                className="w-full h-full object-cover md:object-contain object-right-bottom group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Card 2: Best Item Chance (Collagen) */}
          <div 
            className="relative rounded-3xl overflow-hidden flex flex-col md:flex-row-reverse justify-between min-h-[380px] md:h-[280px] md:min-h-0 group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
            style={{ backgroundColor: '#0FAFB8' }}
          >
            {/* Right Content */}
            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center items-start z-10">
              <h2 className="font-heading font-extrabold text-white text-3xl md:text-[36px] leading-tight">
                Best Item Chance
              </h2>
              <p className="text-white/80 text-sm md:text-base mt-2.5 font-medium">
                Extra 20% Off Select Health Care <br />
                Care With Code <span className="font-bold text-white">HEALTH20</span>
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-block bg-white text-[#073B45] font-extrabold px-6 py-2.5 rounded-full text-[13px] hover:bg-[#073B45] hover:text-white transition-colors duration-200 uppercase tracking-wider shadow-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
            
            {/* Left Image Container */}
            <div className="relative w-full md:w-1/2 h-[180px] md:h-full flex items-end justify-start">
              <img
                src="/marine_collagen.png"
                alt="Marine Collagen"
                className="w-full h-full object-cover md:object-contain object-left-bottom group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

        </div>

        {/* Right Column (Spans 1 column on large screens) */}
        <div className="lg:col-span-1">
          {/* Card 3: Refreshing & Healthy Beauty (Cucumber Facial Oil) */}
          <div 
            className="relative rounded-3xl overflow-hidden flex flex-col justify-between min-h-[500px] lg:h-[584px] group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
            style={{ backgroundColor: '#073B45' }}
          >
            {/* Top Content */}
            <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center z-10">
              <h2 className="font-heading font-extrabold text-white text-3xl md:text-[32px] leading-tight px-4 mt-4">
                Refreshing &<br />Healthy Beauty
              </h2>
              <p className="text-[#EAFBFC]/80 text-[13px] font-extrabold tracking-wider mt-3.5 uppercase">
                EXTRA 15% OFF
              </p>
              <div className="mt-6">
                <Link
                  to="/shop"
                  className="inline-block bg-[#0FAFB8] text-white font-extrabold px-6 py-2.5 rounded-full text-[13px] hover:bg-white hover:text-[#073B45] transition-colors duration-200 uppercase tracking-wider shadow-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Bottom Image Container */}
            <div className="relative w-full h-[260px] sm:h-[300px] lg:h-[320px] mt-auto flex items-end justify-center">
              <img
                src="/detox_facial_oil.png"
                alt="Detox Facial Oil"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default PromoCards
