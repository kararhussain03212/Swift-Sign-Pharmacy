import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  MessageSquare,
  User,
  Tag,
  Send,
  AlertCircle,
  CheckCircle,
  Check,
  HelpCircle,
  ChevronDown,
  Globe,
  UserPlus
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { contactInfo, licenseInfo } from '../data/contactInfo'

const faqs = [
  {
    q: 'How do I track my order?',
    a: 'Once your order is dispatched, you will receive a tracking number via email and SMS. Use it on our Track Order page or the courier website to follow your delivery in real time.',
  },
  {
    q: "Can I return a product if I'm not satisfied?",
    a: 'Yes. We offer a 30-day hassle-free return policy on most products. Items must be unused, sealed, and in original packaging. Contact us and we\'ll arrange the pickup at no cost to you.',
  },
  {
    q: 'Do you require a prescription for medicines?',
    a: 'Prescription medicines are clearly marked on the product page. You will be prompted to upload a valid prescription at checkout for those products. Our pharmacists verify every prescription within 2 hours.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Standard delivery takes 2–4 business days. Express delivery (next-day) is available in major cities. Free shipping is available on orders above $50. Same-day delivery is available in select areas.',
  },
  {
    q: 'Are all products genuine and certified?',
    a: 'Absolutely. Every product on DCare is sourced directly from certified manufacturers and authorized distributors. We carry the DRAP certification for all pharmaceutical products and conduct regular quality audits.',
  },
  {
    q: 'Can I speak with a pharmacist online?',
    a: 'Yes! Our licensed pharmacists are available 9am–9pm Monday to Saturday via live chat and phone. Just click the chat button or call our helpline. Emergency consultations are available outside of business hours.',
  },
]

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    newsletter: false,
  })
  const [formErrors, setFormErrors]     = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess]       = useState(false)
  const [openFaq, setOpenFaq]           = useState(null)

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied!`, { duration: 2000 })
  }

  const handleSaveContact = () => {
    const textContent = `Contact Details:
${contactInfo.businessName}

Phone: ${contactInfo.phone}
Email: ${contactInfo.email}
Address: ${contactInfo.address.full}`

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${contactInfo.businessName.replace(/\s+/g, '_')}_Contact.txt`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Contact saved!', { duration: 2000 })
  }

  const handleChange = e => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }))
    if (formErrors[e.target.name]) {
      setFormErrors(p => ({ ...p, [e.target.name]: '' }))
    }
  }

  const validate = () => {
    const errors = {}
    if (!formData.name.trim())
      errors.name = 'Name is required'
    if (!formData.email.trim())
      errors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Enter a valid email'
    if (!formData.subject.trim())
      errors.subject = 'Subject is required'
    if (!formData.message.trim())
      errors.message = 'Message is required'
    else if (formData.message.length < 20)
      errors.message = 'Message must be at least 20 characters'
    return errors
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errors = validate()
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }

    if (!executeRecaptcha) {
      toast.error('reCAPTCHA is not ready. Please try again.', { duration: 3000 })
      return
    }

    setIsSubmitting(true)
    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('contact_form')

      // Simulate sending form data (in production, send to backend with token)
      // Your backend should verify the token with Google
      await new Promise(r => setTimeout(r, 1800))

      setIsSuccess(true)
      toast.success('Message sent successfully! 🎉', { duration: 4000 })
      // Reset form
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', newsletter: false })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send message. Please try again.', { duration: 3000 })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)',
          padding: 'clamp(60px, 10vw, 100px) 0 clamp(48px, 8vw, 80px)',
        }}
      >
        {/* Decorative BG elements */}
        <div
          className="pointer-events-none absolute"
          style={{
            right: '-80px',
            top: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.06)',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            right: '60px',
            top: '40px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            left: '-30px',
            top: '50%',
            width: '120px',
            height: '40px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.04)',
            transform: 'rotate(-20deg)',
          }}
        />
        {/* Dots grid */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: '40px',
            bottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Inner */}
        <div className="max-w-[1280px] mx-auto px-5 text-center relative z-10">

         

          {/* Heading */}
          <h1
            className="font-heading font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.15 }}
          >
            Let&rsquo;s{' '}
            <span style={{ color: '#EAFBFC' }}>Talk Health</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed">
            Have questions about medicines, products, or your order?
            Our expert pharmacists are here to help you.
          </p>

          {/* Quick contact pills */}
          {/* <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: <Phone size={14} />,  text: '234-867-7867',     href: 'tel:+2348677867' },
              { icon: <Mail size={14} />,   text: 'hello@swiftsign.com',  href: 'mailto:hello@swiftsign.com' },
              { icon: <Clock size={14} />,  text: 'Mon–Sat, 9am–9pm', href: null },
            ].map(item => (
              <a
                key={item.text}
                href={item.href || '#'}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-[13px] font-medium px-4 py-2 rounded-full border border-white/20 transition-all"
              >
                {item.icon} {item.text}
              </a>
            ))}
          </div> */}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INFO CARDS ROW
      ═══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-10 sm:mt-12 relative z-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              icon:    <Phone size={24} />,
              iconBg:  'bg-green-50',
              iconClr: 'text-primary',
              title:   'Call Us',
              lines:   [contactInfo.phone],
              sub:     contactInfo.hours.summary,
            },
            {
              icon:    <Mail size={24} />,
              iconBg:  'bg-blue-50',
              iconClr: 'text-primary',
              title:   'Email Us',
              lines:   [contactInfo.email],
              sub:     contactInfo.responseTime,
            },
            {
              icon:    <MapPin size={24} />,
              iconBg:  'bg-orange-50',
              iconClr: 'text-orange-500',
              title:   'Visit Us',
              lines:   [contactInfo.address.street, `${contactInfo.address.area}, ${contactInfo.address.city}, ${contactInfo.address.country}`],
              sub:     'Open for walk-ins',
            },
            {
              icon:    <Clock size={24} />,
              iconBg:  'bg-purple-50',
              iconClr: 'text-purple-500',
              title:   'Working Hours',
              lines:   [contactInfo.hours.weekday, contactInfo.hours.weekend],
              sub:     contactInfo.hours.holidays,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 p-5 group cursor-default flex flex-col items-center text-center"
            >
              <div className={`w-12 h-12 ${card.iconBg} ${card.iconClr} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-[14px] mb-2">
                {card.title}
              </h3>
              {card.lines.map(line => (
                <p key={line} className="text-[13px] font-semibold text-gray-700 leading-snug">
                  {line}
                </p>
              ))}
              <p className="text-[11px] text-gray-400 mt-1.5">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CONTACT FORM + MAP
      ═══════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-10 sm:mt-12 mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 sm:gap-8">

          {/* ── LEFT: CONTACT FORM ── */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-card p-5 sm:p-8 lg:p-10">

            {/* Form header */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-[12px] font-bold text-primary bg-primary-light px-3 py-1.5 rounded-full mb-4">
                <MessageCircle size={13} /> GET IN TOUCH
              </span>
              <h2
                className="font-heading font-extrabold text-gray-900 mb-2"
                style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
              >
                Send Us a Message
              </h2>
              <p className="text-gray-500 text-[14px]">
                Fill out the form below and our team will respond within 24 hours.
              </p>
            </div>

            {/* SUCCESS STATE */}
            {isSuccess && (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={40} className="text-primary" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500 text-[14px]">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false)
                    setFormData({ name: '', email: '', phone: '', subject: '', message: '', newsletter: false })
                    setFormErrors({})
                  }}
                  className="mt-6 text-primary font-semibold text-[13px] border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}

            {/* FORM */}
            {!isSuccess && (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className={clsx(
                      'flex items-center border rounded-xl overflow-hidden transition-all duration-200',
                      formErrors.name
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 focus-within:border-primary focus-within: bg-white'
                    )}>
                      <User size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                    {formErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className={clsx(
                      'flex items-center border rounded-xl overflow-hidden transition-all duration-200',
                      formErrors.email
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 focus-within:border-primary focus-within: bg-white'
                    )}>
                      <Mail size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Phone */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within: transition-all bg-white">
                      <Phone size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 311 000 0000"
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <div className={clsx(
                      'flex items-center border rounded-xl overflow-hidden transition-all duration-200',
                      formErrors.subject
                        ? 'border-red-400 bg-red-50'
                        : 'border-gray-200 focus-within:border-primary focus-within: bg-white'
                    )}>
                      <Tag size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Order Inquiry"
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                    {formErrors.subject && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {formErrors.subject}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <div className={clsx(
                    'flex border rounded-xl overflow-hidden transition-all',
                    formErrors.message
                      ? 'border-red-400 bg-red-50'
                      : 'border-gray-200 focus-within:border-primary focus-within: bg-white'
                  )}>
                    <MessageSquare size={16} className="mt-3.5 ml-3.5 text-gray-400 flex-shrink-0 self-start" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      maxLength={500}
                      placeholder="Tell us how we can help you..."
                      className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent resize-none"
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    {formErrors.message ? (
                      <p className="text-[11px] text-red-500 flex items-center gap-1">
                        <AlertCircle size={11} /> {formErrors.message}
                      </p>
                    ) : (
                      <span />
                    )}
                    <span className="text-[11px] text-gray-400">
                      {formData.message.length}/500
                    </span>
                  </div>
                </div>

                {/* Newsletter checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div
                    className={clsx(
                      'w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all',
                      formData.newsletter
                        ? 'bg-primary border-primary'
                        : 'border-gray-300 group-hover:border-primary'
                    )}
                    onClick={() => setFormData(p => ({ ...p, newsletter: !p.newsletter }))}
                  >
                    {formData.newsletter && <Check size={12} className="text-white" />}
                  </div>
                  <span className="text-[13px] text-gray-600 leading-relaxed">
                    Subscribe to our health newsletter for tips, deals, and updates.
                  </span>
                </label>

                {/* reCAPTCHA notice */}
                <p className="text-[11px] text-gray-400 text-center">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                  {' '}apply.
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={clsx(
                    'w-full flex items-center justify-center gap-2.5 bg-primary text-white font-bold rounded-xl py-4 text-[14px] transition-all duration-200',
                    isSubmitting
                      ? 'opacity-70 cursor-not-allowed'
                      : 'hover:bg-primary-dark hover: hover:-translate-y-0.5 active:scale-95'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* ── RIGHT: MAP + INFO ── */}
          <div className="space-y-5">

            {/* MAP EMBED */}
            <div
              className="rounded-2xl overflow-hidden border border-gray-100 shadow-card"
              style={{ height: '320px' }}
            >
              <iframe
                src={contactInfo.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title={`${contactInfo.businessName} Location`}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* STORE INFO CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-gray-900 text-[20px] mb-4 flex items-center gap-2">
                {/* <MapPin size={25} className="text-primary" /> */}
                 Our Location
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <MapPin size={23} />,  label: 'Address', value: contactInfo.address.full },
                  { icon: <Phone size={23} />,   label: 'Phone',   value: contactInfo.phone },
                  { icon: <Mail size={23} />,    label: 'Email',   value: contactInfo.email },
                  { icon: <Clock size={23} />,   label: 'Hours',   value: contactInfo.hours.weekday },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0"
                  >
                    <span className="text-primary mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide leading-none mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[15px] font-semibold text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAVE CONTACT & QUICK LINKS CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 flex flex-col items-center">
              <button
                onClick={handleSaveContact}
                className="w-full bg-[#0FAFB8] text-white py-3.5 rounded-[24px] flex items-center justify-center gap-2 font-medium text-[15px] mb-8 hover:bg-[#073B45] transition-colors"
              >
                <UserPlus size={18} /> Save Contact
              </button>

              <div className="grid grid-cols-3 gap-y-8 w-full text-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleCopy(contactInfo.phone, 'Phone number')}
                    className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                  >
                    <Phone size={20} fill="currentColor" />
                  </div>
                  <span className="text-[13px] text-gray-900 font-medium">Call</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleCopy(contactInfo.phone, 'SMS number')}
                    className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                  >
                    <MessageSquare size={20} fill="currentColor" />
                  </div>
                  <span className="text-[13px] text-gray-900 font-medium">SMS</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleCopy(contactInfo.email, 'Email address')}
                    className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                  >
                    <Mail size={20} />
                  </div>
                  <span className="text-[13px] text-gray-900 font-medium">Email</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleCopy(contactInfo.whatsapp, 'WhatsApp number')}
                    className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                  >
                    <FaWhatsapp size={22} />
                  </div>
                  <span className="text-[13px] text-gray-900 font-medium">WhatsApp</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleCopy(contactInfo.website, 'Website URL')}
                    className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                  >
                    <Globe size={20} />
                  </div>
                  <span className="text-[13px] text-gray-900 font-medium">Website</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div
                    onClick={() => handleCopy(contactInfo.address.full, 'Address')}
                    className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                  >
                    <MapPin size={20} />
                  </div>
                  <span className="text-[13px] text-gray-900 font-medium">Location</span>
                </div>
              </div>
            </div>

             {/* SOCIAL LINKS CARD */}
             <div
               className="rounded-2xl p-6 flex items-center justify-between text-white shadow-card hover:shadow-card-hover transition-shadow duration-200"
              //  style={{ background: '#2C4C38' }}
             >
               <span className="font-heading font-extrabold uppercase tracking-[0.15em] text-[13px] text-black">
                 Follow Us
               </span>
               <div className="flex items-center gap-2.5">
                 {[
                   { name: 'Facebook',  icon: <FaFacebookF size={15} />,  href: contactInfo.social.facebook },
                   { name: 'Instagram', icon: <FaInstagram size={15} />,  href: contactInfo.social.instagram },
                   { name: 'YouTube',   icon: <FaYoutube size={15} />,    href: contactInfo.social.youtube },
                   { name: 'TikTok',    icon: <FaTiktok size={15} />,     href: contactInfo.social.tiktok },
                 ].map(s => (
                   <a
                     key={s.name}
                     href={s.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-10 h-10 rounded-xl border border-[#073B45] flex items-center justify-center text-[#073B45] hover:bg-[#073B45] hover:text-white transition-all duration-200"
                     title={s.name}
                   >
                     {s.icon}
                   </a>
                 ))}
               </div>
             </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════ */}
      <section style={{ backgroundColor: '#EAFBFC', padding: '56px 0' }}>
        <div className="max-w-[1280px] mx-auto px-5">

          {/* FAQ Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-[12px] font-bold text-primary bg-primary-light px-3 py-1.5 rounded-full mb-3">
              <HelpCircle size={13} /> FAQ
            </span>
            <h2
              className="font-heading font-extrabold text-gray-900"
              style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
            >
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-[14px] mt-2 max-w-md mx-auto">
              Quick answers to the most common questions.
            </p>
          </div>

          {/* FAQ accordion */}
          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={clsx(
                  'bg-white rounded-2xl border overflow-hidden transition-all duration-200',
                  openFaq === i
                    ? 'border-primary '
                    : 'border-gray-100 shadow-card hover:border-gray-200'
                )}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                >
                  <span
                    className={clsx(
                      'font-semibold text-[14px] transition-colors',
                      openFaq === i ? 'text-primary' : 'text-gray-800'
                    )}
                  >
                    {faq.q}
                  </span>
                  <div
                    className={clsx(
                      'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200',
                      openFaq === i
                        ? 'bg-primary text-white rotate-180'
                        : 'bg-gray-100 text-gray-400'
                    )}
                  >
                    <ChevronDown size={15} />
                  </div>
                </button>

                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-[13px] text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}

export default Contact
