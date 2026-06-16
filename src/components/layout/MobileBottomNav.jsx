import { Home, ShoppingBag, User, Grid, FileText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'

const tabs = [
  { label: 'Home',         to: '/',             icon: Home        },
  { label: 'Categories',   to: '/shop',         icon: Grid        },
  { label: 'Cart',         to: '/cart',         icon: ShoppingBag },
  { label: 'Prescription', to: '/asaan-order',  icon: FileText    },
  { label: 'Account',      to: '#',             icon: User        },
]

const MobileBottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white
                    border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around py-2 px-2">
        {tabs.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors',
                isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
              )
            }
          >
            <Icon size={20} />
            <span className="text-[9px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileBottomNav
