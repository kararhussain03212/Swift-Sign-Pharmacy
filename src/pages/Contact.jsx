import { useState, useEffect } from 'react'
import React from 'react'
import toast from 'react-hot-toast'
import clsx from 'clsx'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
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
import { getContactPageContent, getContactInfoCards, getContactFaqs, submitContactMessage } from '../services/headerApi'

const DEFAULT_BUSINESS_NAME = 'Arion Pharmacy'

const ICON_MAP = { phone: Phone, mail: Mail, 'map-pin': MapPin, clock: Clock }
const ICON_STYLES = [
  { bg: 'bg-green-50', clr: 'text-primary' },
  { bg: 'bg-blue-50', clr: 'text-primary' },
  { bg: 'bg-orange-50', clr: 'text-orange-500' },
  { bg: 'bg-purple-50', clr: 'text-purple-500' },
]

const FALLBACK_CONTENT = {
  form_eyebrow: 'GET IN TOUCH',
  hero_heading: "Let's Talk Health",
  hero_description: 'Have questions about medicines, products, or your order? Our expert pharmacists are here to help you.',
  form_title: 'Send Us a Message',
  form_subtext: 'Fill out the form below and our team will respond within 24 hours.',
  newsletter_checkbox_label: 'Subscribe to our health newsletter for tips, deals, and updates.',
  submit_button_text: 'Send Message',
  name_label: 'Full Name', name_placeholder: 'John Doe',
  email_label: 'Email Address', email_placeholder: 'you@example.com',
  phone_label: 'Phone Number', phone_placeholder: '+92 311 000 0000',
  subject_label: 'Subject', subject_placeholder: 'e.g. Order Inquiry',
  message_label: 'Message', message_placeholder: 'Tell us how we can help you...',
  location_card_heading: 'Our Location',
  save_contact_button_text: 'Save Contact',
  call_action_label: 'Call', sms_action_label: 'SMS', email_action_label: 'Email',
  whatsapp_action_label: 'WhatsApp', website_action_label: 'Website', location_action_label: 'Location',
  follow_us_heading: 'Follow Us',
  faq_eyebrow: 'FAQ',
  faq_heading: 'Frequently Asked Questions',
  faq_subtext: 'Quick answers to the most common questions.',
}

const Contact = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [content, setContent] = useState(null)
  const [infoCards, setInfoCards] = useState([])
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [cardsFailed, setCardsFailed] = useState(false)
  const [faqsFailed, setFaqsFailed] = useState(false)

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

  useEffect(() => {
    let cancelled = false

    Promise.allSettled([getContactPageContent(), getContactInfoCards(), getContactFaqs()]).then(
      ([contentRes, cardsRes, faqsRes]) => {
        if (cancelled) return
        if (contentRes.status === 'fulfilled') setContent(contentRes.value)
        if (cardsRes.status === 'fulfilled') setInfoCards(cardsRes.value || [])
        else setCardsFailed(true)
        if (faqsRes.status === 'fulfilled') setFaqs(faqsRes.value || [])
        else setFaqsFailed(true)
        setLoading(false)
      }
    )

    return () => { cancelled = true }
  }, [])

  const c = { ...FALLBACK_CONTENT, ...(content || {}) }
  const hoursCard = infoCards.find(card => card.icon_key === 'clock')
  const hoursSummary = hoursCard ? hoursCard.value_text.split('\n')[0] : ''

  const handleSaveContact = () => {
    const businessName = c.vcard_business_name || DEFAULT_BUSINESS_NAME
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${businessName}`,
      c.phone_number ? `TEL;TYPE=WORK,VOICE:${c.phone_number}` : null,
      c.email ? `EMAIL:${c.email}` : null,
      c.address ? `ADR;TYPE=WORK:;;${c.address.replace(/,/g, '\\,')};;;;` : null,
      'END:VCARD',
    ].filter(Boolean)

    const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${businessName.replace(/\s+/g, '_')}_Contact.vcf`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Contact saved!', { duration: 2000 })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
    if (formErrors[name]) {
      setFormErrors(p => ({ ...p, [name]: '' }))
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

    setIsSubmitting(true)
    try {
      if (executeRecaptcha) {
        await executeRecaptcha('contact_form')
      }

      await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        newsletter: formData.newsletter,
      })

      setIsSuccess(true)
      toast.success('Message sent successfully! 🎉', { duration: 4000 })
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', newsletter: false })
    } catch (error) {
      console.error('Error:', error)
      if (error?.fields) {
        setFormErrors(error.fields)
      } else {
        toast.error(error?.message || 'Failed to send message. Please try again.', { duration: 3000 })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const toTelDigits = value => String(value || '').replace(/[^\d+]/g, '')

  const callHref = (() => {
    const digits = toTelDigits(c.call_action_link || c.phone_number)
    return digits ? `tel:${digits}` : null
  })()

  const smsHref = (() => {
    const digits = toTelDigits(c.sms_action_link || c.phone_number)
    return digits ? `sms:${digits}` : null
  })()

  const emailHref = (() => {
    const value = (c.email_action_link || c.email || '').trim()
    if (!value) return null
    if (value.startsWith('mailto:')) return value
    return `mailto:${value}`
  })()

  const whatsappHref = (() => {
    const value = (c.whatsapp_action_link || c.whatsapp_number || '').trim()
    if (!value) return null
    if (/^https?:\/\//i.test(value)) return value
    const digits = value.replace(/\D/g, '')
    return digits ? `https://wa.me/${digits}` : null
  })()

  const websiteHref = c.website_action_link || c.website_url || null

  const locationHref = c.location_action_link
    || c.google_map_url
    || (c.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}` : null)

  const quickActions = [
    { label: c.call_action_label,     icon: <Phone size={20} fill="currentColor" />, href: callHref },
    { label: c.sms_action_label,      icon: <MessageSquare size={20} fill="currentColor" />, href: smsHref },
    { label: c.email_action_label,    icon: <Mail size={20} />, href: emailHref },
    { label: c.whatsapp_action_label, icon: <FaWhatsapp size={22} />, href: whatsappHref, external: true },
    { label: c.website_action_label,  icon: <Globe size={20} />, href: websiteHref, external: true },
    { label: c.location_action_label, icon: <MapPin size={20} />, href: locationHref, external: true },
  ]

  const socialLinks = [
    { name: 'Facebook',  icon: <FaFacebookF size={15} />,  href: c.facebook_url },
    { name: 'Instagram', icon: <FaInstagram size={15} />,  href: c.instagram_url },
    { name: 'YouTube',   icon: <FaYoutube size={15} />,    href: c.youtube_url },
    { name: 'TikTok',    icon: <FaTiktok size={15} />,     href: c.tiktok_url },
  ].filter(s => s.href)

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
          <h1
            className="font-heading font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.15 }}
          >
            {c.hero_heading}
          </h1>
          <p className="text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed">
            {c.hero_description}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INFO CARDS ROW
      ═══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-5 mt-10 sm:mt-12 relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card p-5 h-40 animate-pulse" />
            ))}
          </div>
        ) : cardsFailed && infoCards.length === 0 ? null : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {infoCards.map((card, i) => {
              const Icon = ICON_MAP[card.icon_key] || Phone
              const style = ICON_STYLES[i % ICON_STYLES.length]
              const lines = String(card.value_text || '').split('\n')
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 p-5 group cursor-default flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 ${style.bg} ${style.clr} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 text-[14px] mb-2">
                    {card.title}
                  </h3>
                  {lines.map((line, li) => (
                    <p key={li} className="text-[13px] font-semibold text-gray-700 leading-snug">
                      {line}
                    </p>
                  ))}
                  {card.note_text ? <p className="text-[11px] text-gray-400 mt-1.5">{card.note_text}</p> : null}
                </div>
              )
            })}
          </div>
        )}
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
                <MessageCircle size={13} /> {c.form_eyebrow}
              </span>
              <h2
                className="font-heading font-extrabold text-gray-900 mb-2"
                style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
              >
                {c.form_title}
              </h2>
              <p className="text-gray-500 text-[14px]">
                {c.form_subtext}
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
                      {c.name_label} <span className="text-red-500">*</span>
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
                        placeholder={c.name_placeholder}
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
                      {c.email_label} <span className="text-red-500">*</span>
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
                        placeholder={c.email_placeholder}
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
                      {c.phone_label}
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-primary focus-within: transition-all bg-white">
                      <Phone size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={c.phone_placeholder}
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      {c.subject_label} <span className="text-red-500">*</span>
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
                        placeholder={c.subject_placeholder}
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
                    {c.message_label} <span className="text-red-500">*</span>
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
                      placeholder={c.message_placeholder}
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
                    {c.newsletter_checkbox_label}
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
                      <Send size={16} /> {c.submit_button_text}
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

          {/* ── RIGHT: MAP + INFO ── */}
          <div className="space-y-5">

            {/* MAP EMBED */}
            {c.map_embed_url && (
              <div
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-card"
                style={{ height: '320px' }}
              >
                <iframe
                  src={c.map_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`${c.vcard_business_name || DEFAULT_BUSINESS_NAME} Location`}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}

            {/* STORE INFO CARD */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-gray-900 text-[20px] mb-4 flex items-center gap-2">
                {c.location_card_heading}
              </h3>
              <div className="space-y-3">
                {[
                  { icon: <MapPin size={23} />,  label: 'Address', value: c.address },
                  { icon: <Phone size={23} />,   label: 'Phone',   value: c.phone_number },
                  { icon: <Mail size={23} />,    label: 'Email',   value: c.email },
                  { icon: <Clock size={23} />,   label: 'Hours',   value: hoursSummary },
                ].filter(item => item.value).map(item => (
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
                <UserPlus size={18} /> {c.save_contact_button_text}
              </button>

              <div className="grid grid-cols-3 gap-y-8 w-full text-center">
                {quickActions.map(action => (
                  <div key={action.label} className="flex flex-col items-center gap-2">
                    {action.href ? (
                      <a
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className="w-[50px] h-[50px] bg-[#0FAFB8] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#073B45] transition-colors shadow-sm"
                      >
                        {action.icon}
                      </a>
                    ) : (
                      <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-sm">
                        {action.icon}
                      </div>
                    )}
                    <span className="text-[13px] text-gray-900 font-medium">{action.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SOCIAL LINKS CARD */}
            {socialLinks.length > 0 && (
              <div className="rounded-2xl p-6 flex items-center justify-between text-white shadow-card hover:shadow-card-hover transition-shadow duration-200">
                <span className="font-heading font-extrabold uppercase tracking-[0.15em] text-[13px] text-black">
                  {c.follow_us_heading}
                </span>
                <div className="flex items-center gap-2.5">
                  {socialLinks.map(s => (
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
            )}

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════ */}
      {!faqsFailed && faqs.length > 0 && (
        <section style={{ backgroundColor: '#EAFBFC', padding: '56px 0' }}>
          <div className="max-w-[1280px] mx-auto px-5">

            {/* FAQ Header */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 text-[12px] font-bold text-primary bg-primary-light px-3 py-1.5 rounded-full mb-3">
                <HelpCircle size={13} /> {c.faq_eyebrow}
              </span>
              <h2
                className="font-heading font-extrabold text-gray-900"
                style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}
              >
                {c.faq_heading}
              </h2>
              <p className="text-gray-500 text-[14px] mt-2 max-w-md mx-auto">
                {c.faq_subtext}
              </p>
            </div>

            {/* FAQ accordion */}
            <div className="max-w-2xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={faq.id}
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
                      {faq.question}
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
                      <p className="text-[13px] text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>
      )}

    </main>
  )
}

export default Contact
