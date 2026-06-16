import { NavLink, Link } from 'react-router-dom'
import { FileUp } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Home',          to: '/',               },
  { label: 'Blog',          to: '/blog',           },
  { label: 'Store Locator', to: '/store-locator',  },
  { label: 'Contact',       to: '/contact',        },
]

const Navbar = () => {
  return (
    <nav className="hidden sm:block bg-white relative z-40"
         style={{ borderBottom: '1px solid #e5e5e5' }}>

      {/* Top section with location and license (if needed as a separate bar, or integrated) */}
      <div className="max-w-[1450px] mx-auto px-3 sm:px-6 flex items-center justify-between flex-wrap sm:flex-nowrap gap-3 sm:gap-4"
           style={{ minHeight: '50px', paddingTop: '8px', paddingBottom: '8px' }}>

        {/* ── NAV LINKS ─────────────────────────────────── */}
        <div className="flex items-center justify-start flex-wrap gap-1 sm:gap-4" style={{ order: 1 }}>
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1 font-medium px-2 sm:px-3 py-2 rounded transition-colors duration-[150ms] whitespace-nowrap',
                  isActive
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                )
              }
              style={{ fontSize: 'clamp(12px, 2vw, 16px)' }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── LICENSE & PRESCRIPTION ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4 w-full sm:w-auto" style={{ order: 2 }}>
          <div className="hidden lg:block text-gray-700 text-right leading-tight">
            <div className="text-[11px]">PCP License Number:</div>
            <div className="text-[12px] font-medium">OWUDH3B7-210426</div>
          </div>
          <Link
            to="/asaan-order"
            className="flex items-center gap-1.5 bg-[#0FAFB8] text-white border-2 border-[#0FAFB8] hover:bg-white hover:text-[#0FAFB8]
                       px-3 sm:px-4 py-1.5 sm:py-2 rounded-[22px] font-bold text-[11px] sm:text-[13px] transition-colors flex-shrink-0"
          >
            <FileUp size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">PRESCRIPTION</span>
            <span className="sm:hidden">RX</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
