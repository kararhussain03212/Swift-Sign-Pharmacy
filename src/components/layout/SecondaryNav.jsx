const quickLinks = [
  'Vitamins',
  'Derma Care',
  'Nutritional Drinks',
  'Fitness Supplements',
  'Feminine Care',
  'Healthy Snacks',
  'Immunity Booster',
  'Baby Care',
  'Skin Care',
  'CBD Range',
  'Personal Care',
  'Sports Nutrition',
]

const SecondaryNav = () => {
  return (
    <div className="bg-white hidden md:block"
         style={{ borderBottom: '1px solid #e5e5e5' }}>
      <div className="max-w-[1450px] mx-auto px-6">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide"
             style={{ height: '40px' }}>
          {quickLinks.map((link, i) => (
            <button
              key={link}
              className="flex-shrink-0 text-gray-600 hover:text-[#1A9E6E]
                         transition-colors duration-[150ms] whitespace-nowrap
                         relative group"
              style={{
                fontSize: '13px',
                fontWeight: 400,
                paddingLeft: i === 0 ? '0px' : '16px',
                paddingRight: '16px',
                height: '40px',
              }}
            >
              {link}
              {/* Active indicator underline on hover */}
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A9E6E]
                               scale-x-0 group-hover:scale-x-100
                               transition-transform duration-[150ms] origin-left" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav
