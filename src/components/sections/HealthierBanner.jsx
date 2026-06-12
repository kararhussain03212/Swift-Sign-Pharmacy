import React from 'react'

const HealthierBanner = () => {
  return (
    <section className="w-full mt-10" style={{ backgroundColor: '#fee3d1' }}>
      <div
        className="max-w-[1450px] mx-auto px-5 py-6 md:py-0
                   flex flex-col md:flex-row items-center justify-between gap-6 md:h-[250px]"
      >
        {/* Left Content */}
        <div className="relative z-10 text-center md:text-left ">
          <p className="text-[15px] tracking-widest text-[#431b01] mb-6 uppercase ">
            CARE PLAN
          </p>
          <h2 className="font-heading font-extrabold text-[#431b01] text-2xl sm:text-3xl md:text-[60px] leading-tight">
            Get Healthier Together
          </h2>
          <p 
            className="text-[#431b01]/80 text-[16px] md:text-[20px] mt-6 font-medium"
            style={{ lineHeight: '40px' }}
          >
            Book 2 Packages And Get Flat 25% Of On the Second Package
          </p>
        </div>

        {/* Center/Right Couple Image */}
        {/* <div className="hidden md:flex items-end justify-center h-full w-[260px] lg:w-[320px] flex-shrink-0 z-0">
          <img
            src="/elderly_couple_hugging.png"
            alt="Get Healthier Together"
            className="h-full object-contain"
          />
        </div> */}

        {/* Right CTA Button */}
        <div className="relative z-10 flex-shrink-0">
          <button
            className="bg-white hover:bg-gray-50 text-[#431b01] font-extrabold
                       rounded-full px-5 py-2.5 text-[12px] tracking-wider uppercase
                       transition-all flex items-center gap-2.5 shadow-sm hover:shadow-md"
          >
            <span className="w-5 h-5 rounded-full bg-[#431b01] text-white flex items-center justify-center text-[10px] font-extrabold">
              →
            </span>
            BOOK NOW
          </button>
        </div>
      </div>
    </section>
  )
}

export default HealthierBanner
