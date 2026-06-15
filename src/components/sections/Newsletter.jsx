import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!email.includes('@')) {
      toast.error('Please enter a valid email!', {
        style: { borderRadius: '12px', fontSize: '13px' },
      })
      return
    }
    setSubmitted(true)
    toast.success('Subscribed! Welcome to Dcare 🎉', {
      style: { borderRadius: '12px', fontSize: '13px' },
    })
    setEmail('')
  }

  return (
    <section className="w-full mt-10 relative overflow-hidden" style={{ backgroundColor: '#073B45' }}>
      <div className="max-w-[1450px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between min-h-[220px] md:h-[400px]">
        {/* Left Content (Text & Email Input) */}
        <div className="py-8 md:py-0 flex-1 z-10 w-full md:w-auto text-center md:text-left">
          <h2 className="font-heading font-extrabold text-white text-2xl sm:text-4xl mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-white/70 text-[13px] sm:text-sm mb-8 font-medium">
            Sign up to the Dcare newsletter for 10% off your next purchase
          </p>

          {submitted ? (
            <div className="text-white font-semibold text-[14px] flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl">🎉</span>
              Thank you for subscribing! Check your inbox for your discount code.
            </div>
          ) : (
            <div className="relative max-w-[650px] w-full mx-auto md:mx-0">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Your email address"
                className="w-full h-16 rounded-full bg-white px-8 pr-16 text-[14px] text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-white/20 transition-all font-medium"
              />
              <button
                onClick={handleSubmit}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-transparent hover:bg-slate-100 flex items-center justify-center text-[#073B45] transition-colors"
              >
                <Send size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Right Spacer (reserves width in the centered container) */}
        <div className="hidden md:block w-[40%] lg:w-[45%] flex-shrink-0 h-full self-stretch" />
      </div>

      {/* Right Full-Bleed Curved Image Container */}
      <div className="absolute right-0 top-0 h-full w-[40%] lg:w-[45%] hidden md:block z-0 overflow-hidden">
        {/* Curved Transition Path */}
        <svg 
          className="absolute left-0 top-0 h-full w-36 text-[#073B45] fill-current -ml-[1px] z-10" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path d="M100,0 C20,30 20,70 100,100 L0,100 L0,0 Z" />
        </svg>
        <img
          src="/newsletter_pharmacist_new.png"
          className="w-full h-full object-cover object-top"
          alt="Pharmacist"
        />
      </div>
    </section>
  )
}

export default Newsletter
