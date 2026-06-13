import { ChevronDown, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { diseasesList } from '../../data/diseases'

const navCategories = [
  {
    name: 'Diseases',
    subCategories: diseasesList
  },
  {
    name: 'Medicines',
    // subCategories: ['Prescription Medicines', 'Over the Counter (OTC)', 'Homeopathic', 'Ayurvedic', 'Pain Relief', 'First Aid']
  },
  {
    name: 'Vitamins & Supplements',
    subCategories: ['Multivitamins', 'Omega 3 & Fish Oil', 'Calcium & Minerals', 'Vitamin D', 'Vitamin C', 'Immunity Boosters']
  },
  {
    name: 'Personal Care',
    subCategories: ['Oral Hygiene', 'Skin Care', 'Hair & Nail Care', 'Fragrances']
  },
  {
    name: 'Baby Care',
    subCategories: ['Baby Nutrition', 'Baby Bath', 'Baby Essentials']
  },
  {
    name: 'Lifestyle & Fitness',
    subCategories: [' Daily Well-being', 'Men’s Health', 'Women’s Health', 'Elder Care']
  },
  {
    name: 'Sexual Wellness',
    // subCategories: ['Condoms', 'Lubricants', 'Massagers', 'Performance Enhancers', 'Pregnancy Test Kits']
  },
  {
    name: 'Organic',
    subCategories: ['Homeopathic', 'Organic Health', 'Herbal Care']
  },
  {
    name: 'Healthcare Device',
    subCategories: ['Medical Equipment', 'Supports & Braces', 'Hospital Supplies']
  }
]

const SecondaryNav = () => {
  return (
    <div className="bg-white hidden md:block relative z-30"
         style={{ borderBottom: '1px solid #e5e5e5' }}>
      <div className="max-w-[1450px] mx-auto px-6">
        <div className="flex items-center justify-between" style={{ height: '40px' }}>
          
          {/* Main Links */}
          <div className="flex items-center gap-0 overflow-x-visible">
            {navCategories.map((category, i) => (
              <div key={category.name} className="relative group h-full flex items-center">
                <Link
                  to={category.name === 'Diseases' ? '/diseases' : `/shop?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="flex items-center gap-1 text-gray-600 hover:text-[#1A9E6E]
                             transition-colors duration-[150ms] whitespace-nowrap"
                  style={{
                    fontSize: '13px',
                    fontWeight: 400,
                    paddingLeft: i === 0 ? '0px' : '16px',
                    paddingRight: '16px',
                    height: '40px',
                  }}
                >
                  {category.name}
                  {category.subCategories && category.subCategories.length > 0 && (
                    <ChevronDown size={11} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  )}
                  
                  {/* Active indicator underline on hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1A9E6E]
                                   scale-x-0 group-hover:scale-x-100
                                   transition-transform duration-[150ms] origin-left" />
                </Link>

                {/* Dropdown Menu */}
                {category.subCategories && category.subCategories.length > 0 && (
                  <div className="absolute top-full left-0 bg-white shadow-card-hover border border-gray-100 
                                  rounded-b-xl py-2 min-w-[220px] max-h-[70vh] overflow-y-auto opacity-0 invisible translate-y-2
                                  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                                  transition-all duration-200 z-50">
                    {category.name === 'Diseases' && (
                      <Link to="/diseases" className="block px-4 py-2 text-[13px] font-bold text-primary hover:bg-primary-light border-b border-gray-100 mb-1">
                        View A-Z Guide →
                      </Link>
                    )}
                    {category.subCategories.map(sub => (
                      <Link
                        key={sub}
                        to={category.name === 'Diseases'
                          ? `/shop?category=diseases&sub=${encodeURIComponent(sub)}`
                          : `/shop?category=${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}&sub=${sub.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`
                        }
                        className="block px-4 py-2 text-[13px] text-gray-600 hover:bg-primary-light hover:text-primary transition-colors truncate"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Asaan Order Button */}
          <div className="flex-shrink-0 ml-4">
            <Link
              to="/asaan-order"
              className="flex items-center gap-1.5 bg-[#1A9E6E] hover:bg-[#157A56] text-white text-[12px] font-semibold px-4 py-1.5 rounded-full transition-colors shadow-sm"
            >
              <Upload size={13} />
              Asaan Order
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SecondaryNav
