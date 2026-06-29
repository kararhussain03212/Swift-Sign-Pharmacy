import { Home, ShoppingBag, User, Grid, FileText, X, ChevronRight, ChevronDown } from 'lucide-react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { categories } from '../../data/categories'

const MobileBottomNav = () => {
  const [isCatOpen, setIsCatOpen] = useState(false)
  const [openAccordion, setOpenAccordion] = useState(null)
  const navigate = useNavigate()

  const navItems = categories
    .filter(cat => cat.showInNav !== false)
    .map(cat => ({
      name: cat.name,
      slug: cat.slug,
      to: `/shop?category=${cat.slug}`,
      subCategories: cat.subCategories || []
    }))

  // Prevent background scrolling when categories menu is open
  useEffect(() => {
    if (isCatOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      setOpenAccordion(null) // reset accordion when closed
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isCatOpen])

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden bg-white
                      border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center justify-around py-2 px-2">
          {/* Home */}
          <NavLink to="/" end className={({ isActive }) => clsx('flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors', isActive ? 'text-[#0FAFB8]' : 'text-gray-400 hover:text-[#0FAFB8]')}>
            <Home size={20} />
            <span className="text-[9px] font-medium">Home</span>
          </NavLink>
          
          {/* Categories Modal Trigger */}
          <button 
            onClick={() => setIsCatOpen(true)}
            className={clsx('flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors', isCatOpen ? 'text-[#0FAFB8]' : 'text-gray-400 hover:text-[#0FAFB8]')}
          >
            <Grid size={20} />
            <span className="text-[9px] font-medium">Categories</span>
          </button>
          
          {/* Cart */}
          <NavLink to="/cart" className={({ isActive }) => clsx('flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors', isActive ? 'text-[#0FAFB8]' : 'text-gray-400 hover:text-[#0FAFB8]')}>
            <ShoppingBag size={20} />
            <span className="text-[9px] font-medium">Cart</span>
          </NavLink>
          
          {/* Prescription */}
          <NavLink to="/asaan-order" className={({ isActive }) => clsx('flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors', isActive ? 'text-[#0FAFB8]' : 'text-gray-400 hover:text-[#0FAFB8]')}>
            <FileText size={20} />
            <span className="text-[9px] font-medium">Prescription</span>
          </NavLink>
          
          {/* Wishlist */}
          <NavLink to="/wishlist" className={({ isActive }) => clsx('flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors', isActive ? 'text-[#0FAFB8]' : 'text-gray-400 hover:text-[#0FAFB8]')}>
            <User size={20} />
            <span className="text-[9px] font-medium">Wishlist</span>
          </NavLink>
        </div>
      </nav>

      {/* Full-Screen Categories Menu for Mobile */}
      <div 
        className={clsx(
          'fixed inset-0 bg-white z-[60] flex flex-col transition-transform duration-300 md:hidden',
          isCatOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10 shadow-sm">
          <h2 className="font-bold text-lg text-gray-800">All Categories</h2>
          <button onClick={() => setIsCatOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 pb-24">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <div key={item.slug} className="bg-gray-50 rounded-xl overflow-hidden transition-all border border-transparent hover:border-gray-200">
                <button
                  onClick={() => {
                    if (item.subCategories.length > 0) {
                      setOpenAccordion(openAccordion === item.slug ? null : item.slug)
                    } else {
                      setIsCatOpen(false)
                      navigate(item.to)
                    }
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                  {item.subCategories.length > 0 ? (
                    <ChevronDown size={18} className={clsx('text-[#0FAFB8] transition-transform duration-200', openAccordion === item.slug ? 'rotate-180' : '')} />
                  ) : (
                    <ChevronRight size={18} className="text-gray-400" />
                  )}
                </button>

                {/* Subcategories Accordion */}
                <div
                  className={clsx(
                    'grid transition-all duration-200 ease-in-out',
                    openAccordion === item.slug ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-1 flex flex-col gap-2 border-t border-gray-200/50 mx-4">
                      <Link
                        to={item.to}
                        onClick={() => setIsCatOpen(false)}
                        className="text-[13px] font-bold text-[#0FAFB8] py-1 hover:underline"
                      >
                        View All {item.name}
                      </Link>
                      {item.subCategories.map(sub => {
                        const subName = typeof sub === 'object' ? sub.name : sub
                        const subSlug = typeof sub === 'object' ? sub.slug : sub.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        const isViewAll = subSlug.startsWith('all-')
                        let subTo = `/shop?category=${item.slug}&subCategory=${encodeURIComponent(subSlug)}`

                        if (isViewAll) {
                          subTo = `/shop?category=${item.slug}`
                        }

                        return (
                          <Link
                            key={subSlug}
                            to={subTo}
                            onClick={() => setIsCatOpen(false)}
                            className="text-[13px] text-gray-600 hover:text-[#0FAFB8] py-1.5 transition-colors"
                          >
                            {subName}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileBottomNav
