import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="text-white bg-primary-dark">
      <div className="max-w-[1450px] mx-auto px-8" style={{ paddingTop: '50px', paddingBottom: '40px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* ── COL 1: Quick Links ───────────────────── */}
          
          <div>
            <h3 className="font-bold mb-4 text-[25px]">Categories</h3>
            <ul className="space-y-4  text-[14px]">
              <li><Link to="/shop?category=medicines" className="hover:text-primary-light hover:underline transition-colors">Medicines</Link></li>
              <li><Link to="/shop?category=health-supplements" className="hover:text-primary-light hover:underline transition-colors">Health Supplements</Link></li>
              <li><Link to="/shop?category=skin-care" className="hover:text-primary-light hover:underline transition-colors">Skin Care</Link></li>
              <li><Link to="/shop?category=herbal-medicines" className="hover:text-primary-light hover:underline transition-colors">Herbal Medicines</Link></li>
            </ul>
          </div>

          {/* ── COL 2: Categories ────────────────────── */}
          <div>
            <ul className="space-y-4 font-bold text-[14px]">
              <li><Link to="/asaan-order" className="hover:text-primary-light hover:underline transition-colors">Asaan Order</Link></li>
              <li><Link to="/support" className="hover:text-primary-light hover:underline transition-colors">Support</Link></li>
              <li><Link to="/about" className="hover:text-primary-light hover:underline transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-primary-light hover:underline transition-colors">Blogs</Link></li>
              <li><Link to="/contact" className="hover:text-primary-light hover:underline transition-colors">Contact Us</Link></li>
              <li><Link to="/refund-policy" className="hover:text-primary-light hover:underline transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary-light hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link to="/account-deletion" className="hover:text-primary-light hover:underline transition-colors">Account Deletion Policy</Link></li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-8">
              <a href="#" className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <FaFacebookF size={16} fill="currentColor" />
              </a>
              <a href="#" className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <FaLinkedinIn size={16} fill="currentColor" />
              </a>
            </div>
          </div>

          {/* ── COL 3: Contact & Address ─────────────── */}
          <div>
            <div className="mb-6">
              <h2 className="font-extrabold text-3xl tracking-tight mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Logo Here
              </h2>
              
              <div className="space-y-4 text-[13px] font-bold">
                <p className="leading-tight">
                  Parkland City Center, I-8 Markaz, Islamabad
                </p>
                
                {/* <p className="leading-tight">
                  Warehouse/ Pick-Up: D. Watson, Din Pavillion, F-7, Blue Area, Islamabad
                </p> */}

                <p>Email: contactus@dwatson.pk</p>

                <p>Phone: 051-8447077 , 0332-8447777</p>
              </div>
            </div>

            {/* Payment Logos placeholders */}
            <div className="flex items-center gap-2 mt-6 flex-wrap">
              {/* <div className="bg-white rounded px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4 object-contain" /></div> */}
              <div className="bg-white rounded px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 object-contain" /></div>
              <div className="bg-white rounded px-2 py-1"><img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg" alt="UnionPay" className="h-4 object-contain" /></div>
              <div className="bg-white rounded px-2 py-1 text-[#006A4E] font-bold text-[10px]">HBLPay</div>
              <div className="bg-white rounded px-2 py-1 text-[#F47920] font-bold text-[10px]">JazzCash</div>
              <div className="bg-white rounded px-2 py-1 text-[#4CAF50] font-bold text-[10px]">EasyPaisa</div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ─────────────────────────────── */}
      <div className="bg-primary">
        <div className="max-w-[1450px] mx-auto px-8 py-3 text-center">
          <p className="text-white font-semibold text-[11px]">
            Copyright © 2025 D. Watson Chemist & Super Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
