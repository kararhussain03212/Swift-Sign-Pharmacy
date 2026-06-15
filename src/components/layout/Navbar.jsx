import { NavLink, Link } from 'react-router-dom'
import { FileUp } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Home',     to: '/',         },
  { label: 'Blog',     to: '/blog',     },
  { label: 'Medicine', to: '/shop?category=vitamins', },
  { label: 'About',    to: '#',         },
  { label: 'Contact',  to: '/contact',  },
]

const Navbar = () => {
  return (
    <nav className="hidden md:block bg-white relative z-40"
         style={{ borderBottom: '1px solid #e5e5e5' }}>
      
      {/* Top section with location and license (if needed as a separate bar, or integrated) */}
      <div className="max-w-[1450px] mx-auto px-6 flex items-center justify-between"
           style={{ height: '80px' }}>

        {/* ── LOCATION ────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center bg-primary text-white rounded-md px-4 py-2" style={{ maxWidth: '350px' }}>
          <span className="font-bold text-[13px] whitespace-nowrap">DELIVER TO:</span>
          <span className="font-normal text-[13px] ml-1.5 truncate">Dubai, United Arab Emirates</span>
          <button className="font-bold text-[13px] ml-3 hover:underline whitespace-nowrap bg-white text-primary px-2 py-0.5 rounded-sm">Change</button>
        </div>

        {/* ── NAV LINKS ─────────────────────────────────── */}
        <div className="flex items-center justify-center flex-1 mx-8" style={{ gap: '20px' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-1 font-medium px-3 h-full rounded transition-colors duration-[150ms] whitespace-nowrap',
                  isActive
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                )
              }
              style={{ fontSize: '16px', height: '58px' }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* ── LICENSE & PRESCRIPTION ─────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <div className="text-gray-700 text-right leading-tight">
            <div className="text-[12px]">MOHAP License Number:</div>
            <div className="text-[14px] font-medium">OWUDH3B7-210426</div>
          </div>
          <Link
            to="/asaan-order"
            className="flex items-center gap-2 bg-[#0FAFB8] text-white border border-[#0FAFB8] hover:bg-white hover:text-[#0FAFB8] hover:border-2
                       px-4 py-2 rounded-lg font-bold text-[13px] transition-colors"
          >
            <FileUp size={16} strokeWidth={2.5} />
            PRESCRIPTION
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
