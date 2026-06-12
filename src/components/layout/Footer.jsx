import { Link } from 'react-router-dom'
import { MapPin, User, Share2, MessageSquare, Camera, Circle } from 'lucide-react'

/* ── Column data ─────────────────────────────────────── */
const services = [
  { label: 'Online Consultation',       href: '#',  highlight: false },
  { label: 'Online Medicines',          href: '#',  highlight: false },
  { label: 'Cough Scanner',             href: '#',  highlight: false },
  { label: 'All Doctors List',          href: '#',  highlight: true  },
  { label: 'Patients Login',            href: '#',  highlight: false },
]

const ourServices = [
  { label: 'Order Medicine',            href: '#',  highlight: false },
  { label: 'Healthcare Products',       href: '#',  highlight: false },
  { label: 'Lab Tests',                 href: '#',  highlight: false },
  { label: 'Nearest Collection Centre', href: '#',  highlight: false },
  { label: 'Online Prescription Upload',href: '#',  highlight: false },
]

const usefulLinks = [
  { label: 'About us',                  href: '#',  highlight: false },
  { label: 'Meet The Team',             href: '#',  highlight: false },
  { label: 'Contact Us',                href: '#',  highlight: false },
  { label: 'Delivery & Shipping',       href: '#',  highlight: false },
  { label: 'Sitemap',                   href: '#',  highlight: false },
  { label: 'Our Policies',              href: '#',  highlight: false },
  { label: 'Editorial Policy',          href: '#',  highlight: false },
  { label: 'Privacy & Security Policy', href: '#',  highlight: false },
  { label: 'Returns & Cancel Policy',   href: '#',  highlight: false },
  { label: 'Terms and Conditions',      href: '#',  highlight: true  },
  { label: 'Drug Interaction Check',    href: '#',  highlight: false },
  { label: 'Company Information',       href: '#',  highlight: false },
]

const topCategories = [
  { label: 'Sports Nutrition',          href: '#',  highlight: false },
  { label: 'Elderly Care',              href: '#',  highlight: false },
  { label: 'Personal Care',             href: '#',  highlight: false },
  { label: 'Healthcare Devices',        href: '#',  highlight: false },
  { label: 'Health Food and Drinks',    href: '#',  highlight: false },
  { label: 'Skin Care',                 href: '#',  highlight: false },
  { label: 'Mother and Baby Care',      href: '#',  highlight: false },
  { label: 'Accessories & Wearables',   href: '#',  highlight: false },
  { label: 'Fitness Supplements',       href: '#',  highlight: false },
  { label: 'Ayurvedic Care',            href: '#',  highlight: false },
  { label: 'Prescription Refill Service',href:'#',  highlight: false },
  { label: 'Home Care',                 href: '#',  highlight: true  },
]

/* ── Shared sub-components ───────────────────────────── */
const ColHeading = ({ children }) => (
  <h3 className="font-bold text-gray-900 mb-5"
      style={{ fontSize: '20px', letterSpacing: '-0.1px' }}>
    {children}
  </h3>
)

const LinkList = ({ links }) => (
  <ul className="space-y-2.5">
    {links.map(l => (
      <li key={l.label}>
        <a
          href={l.href}
          className="transition-colors duration-[150ms] hover:text-[#1A9E6E]"
          style={{
            fontSize: '15px',
            color: l.highlight ? '#1A9E6E' : '#6b7280',
            lineHeight: '1.5',
          }}
        >
          {l.label}
        </a>
      </li>
    ))}
  </ul>
)

/* ── Main Footer ─────────────────────────────────────── */
const Footer = () => {
  return (
    <footer className="bg-white" style={{ borderTop: '1px solid #e5e5e5' }}>

      {/* ── Main grid ────────────────────────────────── */}
      <div className="max-w-[1450px] mx-auto px-8" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_1fr_1fr] gap-12">

          {/* ── COL 1: Brand ─────────────────────────── */}
          <div>
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 mb-12 w-fit group">
              <span className="font-bold text-gray-900 tracking-tight"
                    style={{ fontSize: '35px', letterSpacing: '-0.5px' }}>
                Pharmacy
              </span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center
                              text-white font-bold group-hover:scale-110
                              transition-transform duration-[150ms]"
                   style={{ backgroundColor: '#1A9E6E', fontSize: '16px' }}>
                +
              </div>
            </Link>

            {/* Address block */}
            <div className="mb-9">
              <div className="flex items-start gap-2 mb-1">
                <MapPin size={30} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-800" style={{ fontSize: '18px' }}>
                    Dcare Digital Pharmacy
                  </p>
                  <p className="text-gray-500 mt-0.5" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                    42 Corbridge Crescent, London
                  </p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    Phone: 324 – 897 – 4567
                  </p>
                </div>
              </div>
            </div>

            {/* Pharmacist block */}
            <div className="mb-9 pb-9" style={{ borderBottom: '1px solid #e5e5e5' }}>
              <div className="flex items-start gap-2">
                <User size={30} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-800" style={{ fontSize: '18px' }}>
                    Superint. Pharmacist
                  </p>
                  <p style={{ fontSize: '13px', color: '#1A9E6E' }}>Dcare Pharmacy</p>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>
                    GPhC number: 1230976
                  </p>
                </div>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mb-7">
              {[Share2, MessageSquare, Camera, Circle].map((Icon, i) => (
                <button
                  key={i}
                  className="flex items-center justify-center transition-all duration-[150ms]
                             hover:border-[#1A9E6E] hover:text-[#1A9E6E]"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid #d1d5db',
                    color: '#9ca3af',
                  }}
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>

            {/* App download */}
            {/* <p className="font-semibold text-gray-800 mb-3" style={{ fontSize: '13px' }}>
              Download the App for Free
            </p> */}
            {/* <div className="flex items-center gap-2"> */}
              {/* Google Play */}
              {/* <a
                href="#"
                className="flex items-center gap-2 transition-opacity duration-[150ms] hover:opacity-80"
                style={{
                  backgroundColor: '#111',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="16" viewBox="0 0 24 27" fill="white">
                  <path d="M1.5 0.5L14 13L1.5 25.5C0.9 25.2 0.5 24.6 0.5 24V2C0.5 1.4 0.9 0.8 1.5 0.5Z"/>
                  <path d="M14 13L18.5 8.5L4 0.5L14 13Z" fill="#EA4335"/>
                  <path d="M14 13L4 25.5L18.5 17.5L14 13Z" fill="#FBBC04"/>
                  <path d="M18.5 8.5L23 11C23.6 11.4 24 12 24 12.7C24 13.4 23.6 14 23 14.4L18.5 17L14 13L18.5 8.5Z" fill="#4285F4"/>
                </svg>
                <div>
                  <p style={{ fontSize: '9px', color: '#ccc', lineHeight: 1 }}>GET IT ON</p>
                  <p style={{ fontSize: '12px', color: 'white', fontWeight: 600, lineHeight: 1.3 }}>Google Play</p>
                </div>
              </a> */}

              {/* App Store */}
              {/* <a
                href="#"
                className="flex items-center gap-2 transition-opacity duration-[150ms] hover:opacity-80"
                style={{
                  backgroundColor: '#111',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="16" viewBox="0 0 24 28" fill="white">
                  <path d="M19.5 14.8C19.5 11.5 21.8 10 22 9.8C20.6 7.8 18.4 7.5 17.6 7.5C15.8 7.3 14.1 8.5 13.2 8.5C12.3 8.5 10.8 7.5 9.3 7.5C7.3 7.5 5.4 8.6 4.4 10.4C2.3 14 3.8 19.4 5.9 22.4C6.9 23.9 8.1 25.5 9.7 25.5C11.2 25.5 11.8 24.5 13.6 24.5C15.4 24.5 15.9 25.5 17.6 25.5C19.3 25.5 20.3 23.9 21.3 22.4C22.5 20.7 23 19 23 18.9C22.9 18.8 19.5 17.6 19.5 14.8Z"/>
                  <path d="M16.4 5.5C17.2 4.5 17.8 3.1 17.6 1.7C16.4 1.8 14.9 2.5 14.1 3.5C13.3 4.4 12.6 5.8 12.9 7.2C14.2 7.3 15.5 6.5 16.4 5.5Z"/>
                </svg>
                <div>
                  <p style={{ fontSize: '9px', color: '#ccc', lineHeight: 1 }}>Download on the</p>
                  <p style={{ fontSize: '12px', color: 'white', fontWeight: 600, lineHeight: 1.3 }}>App Store</p>
                </div>
              </a> */}
            {/* </div> */}
          </div>

          {/* ── COL 2: Services + Our Services ────────── */}
          <div>
            <ColHeading>Services</ColHeading>
            <LinkList links={services} />

            <div style={{ marginTop: '32px' }}>
              <ColHeading>Our Services</ColHeading>
              <LinkList links={ourServices} />
            </div>
          </div>

          {/* ── COL 3: Useful Links ───────────────────── */}
          <div>
            <ColHeading>Useful Links</ColHeading>
            <LinkList links={usefulLinks} />
          </div>

          {/* ── COL 4: Top Categories ─────────────────── */}
          <div>
            <ColHeading>Top Categories</ColHeading>
            <LinkList links={topCategories} />
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div style={{ borderTop: '1px solid #e5e5e5' }}>
        <div
          className="max-w-[1450px] mx-auto px-8 flex flex-col md:flex-row
                     items-center justify-between gap-3"
          style={{ paddingTop: '18px', paddingBottom: '18px' }}
        >
          <p className="text-gray-400" style={{ fontSize: '13px' }}>
            © 2025 dcare. All rights reserved.
          </p>
          {/* <div className="flex items-center gap-3">
            {['VISA', 'MC', 'PayPal', 'Apple Pay'].map(p => (
              <span
                key={p}
                className="text-gray-500 font-medium"
                style={{
                  fontSize: '11px',
                  backgroundColor: '#f4f3f3',
                  border: '1px solid #e5e5e5',
                  borderRadius: '4px',
                  padding: '3px 8px',
                }}
              >
                {p}
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer
