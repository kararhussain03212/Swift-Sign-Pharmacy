import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { contactInfo } from '../../data/contactInfo'

const Footer = () => {
  return (
    <footer className="bg-[#073B45] text-white pt-10 md:pt-14 pb-6 px-4 sm:px-6 md:px-8 font-sans">
      <div className="max-w-[1450px] mx-auto">
        
        {/* ── TOP SECTION: 3 Columns ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Categories */}
          <div>
            <h3 className="text-[15px] font-bold mb-4 uppercase tracking-wider text-white">
              CATEGORIES
            </h3>
            <ul className="space-y-3 text-[13px]">
              {[
                { name: 'Medicines', link: 'medicines' },
                { name: 'Vitamins & Supplements', link: 'vitamins' },
                { name: 'Personal Care', link: 'personal-care' },
                { name: 'Baby Care', link: 'baby-care' },
                { name: 'Lifestyle & Fitness', link: 'lifestyle-fitness' },
                { name: 'Organic', link: 'organic' },
                { name: 'Healthcare Device', link: 'healthcare-device' },
                { name: 'Obesity', link: 'obesity' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={`/shop/${item.link}`} className="text-white hover:text-[#0FAFB8] transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[15px] font-bold mb-4 uppercase tracking-wider text-white">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-[13px]">
              {[
                { name: 'Asaan Order', path: '/asaan-order' },
                { name: 'Support', path: '/contact' },
                { name: 'About Us', path: '/' },
                { name: 'Blogs', path: '/blog' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white hover:text-[#0FAFB8] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Brand & Contact Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block mb-1">
              <h2 className="text-[22px] font-bold tracking-tight text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Logo Here
              </h2>
            </Link>
            <div className="flex flex-col space-y-2">
              <div className="text-[13px] text-white leading-relaxed max-w-[320px]">
                {contactInfo.address.full}
              </div>
              <div className="text-[13px] text-white">
                Email: {contactInfo.email}
              </div>
              <div className="text-[13px] text-white">
                Phone: {contactInfo.phone}
              </div>
            </div>
          </div>

        </div>

        {/* ── MIDDLE SECTION: App & Social Bar ─────────────────────────────── */}
        <div className="border-t border-white/20 py-5 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left: App Download */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider">DOWNLOAD OUR APP</h4>
            <div className="flex gap-2">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8" />
              </a>
            </div>
          </div>

          {/* Right: Social Connect */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <h4 className="text-[12px] font-bold text-white uppercase tracking-wider">CONNECT WITH US</h4>
            <div className="flex items-center gap-2">
              <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                <FaFacebookF size={12} />
              </a>
              <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram">
                <FaInstagram size={13} />
              </a>
              <a href="#" className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961H5.078z" />
                </svg>
              </a>
              <a href="#" className="bg-[#0A66C2] text-white w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <FaLinkedinIn size={12} />
              </a>
            </div>
          </div>
          
        </div>

        {/* ── BOTTOM SECTION: Copyright ─────────────────────────────── */}
        <div className="border-t border-white/20 pt-5">
          <p className="text-white text-[11px] leading-relaxed mb-1">
            © 2026 Arion Pharmacy - Commercial Market, Powered by Swift Sign Group Of Companies
          </p>
          <p className="text-white text-[11px]">
            Funded By Swift Sign Business Management
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
