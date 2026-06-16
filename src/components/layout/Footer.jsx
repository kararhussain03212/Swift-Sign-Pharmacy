import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <footer className="text-white bg-[#073B45]">
        {/* ── TOP SECTION ─────────────────────────────────── */}
        <div className="w-full overflow-hidden">
          <div className="max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8"
               style={{ paddingTop: '30px', paddingBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10">

              {/* ── COL 1: Categories ───────────────────── */}
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-[18px] uppercase tracking-wide text-white/90">
                  Categories
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li><Link to="/shop?category=medicines" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Medicines</Link></li>
                  <li><Link to="/shop?category=health-supplements" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Health Supplements</Link></li>
                  <li><Link to="/shop?category=skin-care" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Skin Care</Link></li>
                  <li><Link to="/shop?category=herbal-medicines" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Herbal Medicines</Link></li>
                </ul>
              </div>

              {/* ── COL 2: Quick Links ────────────────────── */}
              <div>
                <h3 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base md:text-[18px] uppercase tracking-wide text-white/90">
                  Quick Links
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                  <li><Link to="/asaan-order" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Asaan Order</Link></li>
                  <li><Link to="/support" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Support</Link></li>
                  <li><Link to="/about" className="text-white/75 hover:text-[#0FAFB8] transition-colors">About Us</Link></li>
                  <li><Link to="/blog" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Blogs</Link></li>
                  <li><Link to="/contact" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Contact Us</Link></li>
                  <li><Link to="/refund-policy" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Refund Policy</Link></li>
                  <li><Link to="/privacy-policy" className="text-white/75 hover:text-[#0FAFB8] transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>

              {/* ── COL 3: Contact & Branding (full width on mobile) ─ */}
              <div className="col-span-2 md:col-span-1 border-t border-white/10 pt-6 md:border-t-0 md:pt-0">
                <h2 className="font-extrabold text-xl sm:text-2xl tracking-tight mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                  Logo Here
                </h2>
                <div className="space-y-2 text-xs sm:text-[13px] text-white/75">
                  <p>Parkland City Center, I-8 Markaz, Islamabad</p>
                  <p>Email: contactus@dwatson.pk</p>
                  <p>Phone: 051-8447077, 0332-8447777</p>
                </div>

                {/* Payment Logos */}
                <div className="flex items-center gap-2 mt-5 flex-wrap">
                  <div className="bg-white rounded px-2 py-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain" />
                  </div>
                  <div className="bg-white rounded px-2 py-1">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg" alt="UnionPay" className="h-4 object-contain" />
                  </div>
                  <div className="bg-white rounded px-2 py-1 text-[#006A4E] font-bold text-[10px]">HBLPay</div>
                  <div className="bg-white rounded px-2 py-1 text-[#F47920] font-bold text-[10px]">JazzCash</div>
                  <div className="bg-white rounded px-2 py-1 text-[#4CAF50] font-bold text-[10px]">EasyPaisa</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── App & Social Bar ─────────────────────────────── */}
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 py-5 sm:py-6"
             style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          {/* Left: App Download */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <h4 className="text-xs font-extrabold text-white/80 tracking-wide uppercase">Download Our App</h4>
            <div className="flex gap-2">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-7 sm:h-8" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-7 sm:h-8" />
              </a>
            </div>
          </div>

          {/* Right: Social Connect */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <h4 className="text-xs font-extrabold text-white/80 tracking-wide uppercase">Connect With Us</h4>
            <div className="flex gap-2">
              <a href="#" className="bg-[#1877F2] text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="Instagram">
                <FaInstagram size={15} />
              </a>
              <a href="#" className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961H5.078z" />
                </svg>
              </a>
              <a href="#" className="bg-[#0A66C2] text-white w-8 h-8 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────── */}
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 md:px-8 py-4"
             style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <p className="text-white/60 text-[10px] sm:text-[11px] leading-snug">
            © 2026 Arion Pharmacy - Commercial Market, Powered by Swift Sign Group Of Companies
          </p>
          <p className="text-white/50 text-[10px] sm:text-[11px] mt-1">
            Funded By Swift Sign Business Management
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
