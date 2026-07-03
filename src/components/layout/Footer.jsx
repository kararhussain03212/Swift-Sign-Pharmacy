import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { getFooterData, resolveUploadUrl } from '../../services/headerApi'

const XIcon = (props) => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.008 5.961H5.078z" />
  </svg>
)

const SOCIAL_ICON_MAP = {
  facebook: { Icon: FaFacebookF, className: 'bg-[#1877F2] hover:shadow-[#1877F2]/50', size: 14 },
  instagram: { Icon: FaInstagram, className: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:shadow-[#dc2743]/50', size: 14 },
  x: { Icon: XIcon, className: 'bg-black hover:bg-gray-900 hover:shadow-black/50', size: 14 },
  linkedin: { Icon: FaLinkedinIn, className: 'bg-[#0A66C2] hover:shadow-[#0A66C2]/50', size: 14 },
}

const Footer = () => {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false

    getFooterData()
      .then((res) => {
        if (cancelled) return
        setData(res)
        setStatus('success')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  }, [])

  if (status === 'loading') {
    return (
      <footer className="bg-gradient-to-b from-[#073B45] to-[#051f26] pt-16 md:pt-20 pb-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-[1450px] mx-auto h-40 animate-pulse" />
      </footer>
    )
  }

  // Degrade gracefully instead of breaking the page if the API is unreachable.
  if (status === 'error' || !data) {
    return null
  }

  const {
    categories = [],
    quickLinks = [],
    companyInfo,
    appLinks = [],
    socialLinks = [],
    settings,
  } = data

  return (
    <footer className="bg-gradient-to-b from-[#073B45] to-[#051f26] text-white pt-16 md:pt-20 pb-8 px-4 sm:px-6 md:px-8 font-sans">
      <div className="max-w-[1450px] mx-auto">

        {/* ── TOP SECTION: 3 Columns ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">

          {/* Column 1: Categories */}
          {categories.length > 0 && (
            <div>
              <h3 className="text-[14px] font-bold mb-6 uppercase tracking-widest text-white border-b-2 border-[#0FAFB8] pb-3 inline-block">
                CATEGORIES
              </h3>
              <ul className="space-y-3.5 text-[13.5px]">
                {categories.map((item) => (
                  <li key={item.id}>
                    <Link to={`/shop/${item.slug}`} className="text-gray-200 hover:text-[#0FAFB8] transition-all duration-300 hover:translate-x-1 inline-block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 2: Quick Links */}
          {quickLinks.length > 0 && (
            <div>
              <h3 className="text-[14px] font-bold mb-6 uppercase tracking-widest text-white border-b-2 border-[#0FAFB8] pb-3 inline-block">
                QUICK LINKS
              </h3>
              <ul className="space-y-3.5 text-[13.5px]">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link to={link.url} className="text-gray-200 hover:text-[#0FAFB8] transition-all duration-300 hover:translate-x-1 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Column 3: Brand & Contact Info */}
          {companyInfo && (
            <div className="space-y-5">
              <Link to="/" className="inline-block group">
                {companyInfo.logo_url ? (
                  <img src={resolveUploadUrl(companyInfo.logo_url)} alt="Logo" className="h-9" />
                ) : (
                  <h2 className="text-[26px] font-bold tracking-tight text-white group-hover:text-[#0FAFB8] transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
                    Logo Here
                  </h2>
                )}
              </Link>
              <div className="flex flex-col space-y-3.5 text-gray-200">
                {companyInfo.address && (
                  <div className="text-[13.5px] leading-relaxed max-w-[320px]">
                    {companyInfo.address}
                  </div>
                )}
                {companyInfo.email && (
                  <div className="text-[13.5px] hover:text-[#0FAFB8] transition-colors duration-300 cursor-pointer">
                    Email: <span className="font-medium">{companyInfo.email}</span>
                  </div>
                )}
                {companyInfo.phone && (
                  <div className="text-[13.5px] hover:text-[#0FAFB8] transition-colors duration-300 cursor-pointer">
                    Phone: <span className="font-medium">{companyInfo.phone}</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* ── MIDDLE SECTION: App & Social Bar ─────────────────────────────── */}
        {(appLinks.length > 0 || socialLinks.length > 0) && (
          <div className="border-t border-white/15 py-8 flex flex-col md:flex-row justify-between items-center gap-8">

            {/* Left: App Download */}
            {appLinks.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <h4 className="text-[12px] font-bold text-white uppercase tracking-widest whitespace-nowrap">{settings?.app_download_title || 'Download Our App'}</h4>
                <div className="flex gap-3">
                  {appLinks.map((app) => (
                    <a
                      key={app.id}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group hover:scale-110 transition-transform duration-300 bg-white/10 p-2 rounded-lg hover:bg-white/20 backdrop-blur-sm"
                    >
                      <img src={resolveUploadUrl(app.badge_image_url)} alt={app.label} className="h-7 group-hover:brightness-125 transition-all" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Social Connect */}
            {socialLinks.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <h4 className="text-[12px] font-bold text-white uppercase tracking-widest whitespace-nowrap">CONNECT WITH US</h4>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const iconConfig = SOCIAL_ICON_MAP[social.icon_key]
                    if (!iconConfig) return null
                    const { Icon, className, size } = iconConfig
                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${className} text-white w-9 h-9 rounded-full flex items-center justify-center hover:scale-125 hover:shadow-lg transition-all duration-300`}
                        aria-label={social.platform}
                      >
                        <Icon size={size} />
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

          </div>
        )}

        {/* ── BOTTOM SECTION: Copyright ─────────────────────────────── */}
        {settings && (
          <div className="border-t border-white/15 pt-8">
            {settings.copyright_text && (
              <p className="text-gray-300 text-[11.5px] leading-relaxed mb-2">
                {settings.copyright_text}
              </p>
            )}
            {settings.funded_by_text && (
              <p className="text-gray-400 text-[11px]">
                {settings.funded_by_text}
              </p>
            )}
          </div>
        )}

      </div>
    </footer>
  )
}

export default Footer
