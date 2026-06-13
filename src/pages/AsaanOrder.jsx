import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import {
  Upload,
  Phone,
  PackageCheck,
  CheckCircle,
  X,
  FileImage,
  Send,
  AlertCircle,
  User,
  PhoneCall,
} from 'lucide-react'

/* ── Step data ─────────────────────────────────── */
const STEPS = [
  {
    icon: <Upload size={28} strokeWidth={1.8} />,
    label: 'Upload a valid prescription',
  },
  {
    icon: <Phone size={28} strokeWidth={1.8} />,
    label: 'Receive a confirmation call',
  },
  {
    icon: <PackageCheck size={28} strokeWidth={1.8} />,
    label: 'Get medicines at your doorstep',
  },
]

/* ── Prescription tips ─────────────────────────── */
const TIPS = [
  'Do not crop out any part of the prescription image.',
  'Avoid unclear or blurred images of your prescription.',
  'Include details of your doctor, patient, and clinic visit date.',
  'Medicines will only be dispensed against a valid prescription.',
]

/* ── Prescription label annotations ────────────── */
const LABELS = [
  { label: "Doctor's details", pos: { top: '12%', left: '-10%' } },
  { label: "Patient's details", pos: { top: '12%', right: '-12%' } },
  { label: 'Medicine details', pos: { bottom: '6%', left: '-10%' } },
  { label: "Doctor's sign + stamp", pos: { bottom: '6%', right: '-14%' } },
]

/* ══════════════════════════════════════════════════
   AsaanOrder page
══════════════════════════════════════════════════ */
const AsaanOrder = () => {
  const [file, setFile]           = useState(null)
  const [preview, setPreview]     = useState(null)
  const [dragging, setDragging]   = useState(false)
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('')
  const [errors, setErrors]       = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const inputRef = useRef()

  /* ── file handling ── */
  const acceptFile = (f) => {
    if (!f) return
    if (!f.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG, etc.)')
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10 MB.')
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    acceptFile(e.dataTransfer.files[0])
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  /* ── validation ── */
  const validate = () => {
    const errs = {}
    if (!name.trim())            errs.name  = 'Name is required'
    if (!phone.trim())           errs.phone = 'Phone number is required'
    else if (!/^[0-9+\s\-]{7,15}$/.test(phone.trim()))
      errs.phone = 'Enter a valid phone number'
    if (!file)                   errs.file  = 'Please upload your prescription'
    return errs
  }

  /* ── submit ── */
  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('name',         name.trim())
      formData.append('phone',        phone.trim())
      formData.append('prescription', file)

      const res  = await fetch('/api/send-prescription.php', {
        method: 'POST',
        body:   formData,
      })
      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        toast.success('Prescription sent! Our team will contact you shortly. 🎉', { duration: 5000 })
      } else {
        toast.error(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0D3D2B 0%, #1A9E6E 100%)',
          padding: '90px 0 70px',
        }}
      >
        {/* decorative circles */}
        {[
          { w: 380, h: 380, r: '-60px', t: '-60px', b: '2px solid rgba(255,255,255,0.06)' },
          { w: 220, h: 220, r: '80px',  t: '50px',  b: '1px solid rgba(255,255,255,0.05)' },
        ].map((c, i) => (
          <div
            key={i}
            className="pointer-events-none absolute"
            style={{
              right: c.r, top: c.t,
              width: c.w, height: c.h,
              borderRadius: '50%',
              border: c.b,
            }}
          />
        ))}

        {/* dot grid */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: '40px', bottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(6,1fr)',
            gap: '12px',
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>

        <div className="max-w-[1280px] mx-auto px-5 text-center relative z-10">
          {/* badge */}
          <span
            className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12px] font-bold tracking-widest text-white uppercase backdrop-blur-sm"
          >
            <Upload size={13} /> Asaan Order
          </span>

          <h1
            className="font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(26px, 5vw, 46px)', lineHeight: 1.15 }}
          >
            Order Medicines Using{' '}
            <span style={{ color: '#86efac' }}>Prescription</span>
          </h1>
          <p className="text-white/60 max-w-lg mx-auto text-[15px] leading-relaxed">
            Simply upload your doctor's prescription and let our pharmacy team prepare
            your order — delivered right to your door.
          </p>
        </div>
      </section>

      {/* ══ STEPS BAR ════════════════════════════════════ */}
      <div
        className="max-w-[1280px] mx-auto px-5 mt-8 relative z-10"
      >
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Background line for desktop */}
            <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gray-200 z-0" />

            {STEPS.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4 group relative z-10">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg,#1A9E6E,#0D3D2B)',
                    color: '#fff',
                    boxShadow: '0 4px 16px rgba(26,158,110,0.35)',
                  }}
                >
                  {step.icon}
                </div>
                <p className="text-[14px] font-semibold text-gray-700 max-w-[160px] leading-snug">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MAIN CONTENT ════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-5 mt-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">

          {/* ── LEFT: Upload Card ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-8">

            {/* header */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 text-[12px] font-bold text-primary bg-primary-light px-3 py-1.5 rounded-full mb-3">
                <FileImage size={13} /> UPLOAD PRESCRIPTION
              </span>
              <h2 className="font-extrabold text-gray-900 text-[22px] mb-1">
                Upload Prescription
              </h2>
              <p className="text-gray-500 text-[14px]">
                To place an order please upload a picture of your prescription.
              </p>
            </div>

            {/* ── Success state ── */}
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                  style={{ background: '#E8F5F0' }}>
                  <CheckCircle size={40} className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">Order Received! 🎉</h3>
                <p className="text-gray-500 text-[14px] max-w-sm">
                  Your prescription has been sent to our pharmacy team. We will review it and call you on{' '}
                  <span className="font-semibold text-gray-900">{phone}</span> to confirm your order.
                </p>

                <div className="mt-5 w-full max-w-sm rounded-2xl border border-green-200 bg-green-50 p-4 text-left flex gap-3">
                  <span className="text-2xl">✅</span>
                  <div>
                    <p className="text-[13px] font-bold text-gray-800">Prescription sent to pharmacy team</p>
                    <p className="text-[12px] text-gray-500 mt-0.5">Expect a confirmation call within 30 minutes during working hours.</p>
                  </div>
                </div>

                <button
                  onClick={() => { setSubmitted(false); removeFile(); setName(''); setPhone('') }}
                  className="mt-6 text-primary font-semibold text-[13px] border border-primary rounded-full px-6 py-2 hover:bg-primary hover:text-white transition-all"
                >
                  Submit Another Prescription
                </button>
              </div>
            ) : (
              <>
                {/* ── Drop Zone ── */}
                <div
                  onClick={() => !file && inputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  className="relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden"
                  style={{
                    borderColor: dragging ? '#1A9E6E' : errors.file ? '#f87171' : '#D1D5DB',
                    background: dragging ? '#E8F5F0' : errors.file ? '#FEF2F2' : '#FAFAFA',
                    minHeight: '220px',
                  }}
                >
                  {preview ? (
                    /* ── preview ── */
                    <div className="relative w-full h-full">
                      <img
                        src={preview}
                        alt="Prescription preview"
                        className="w-full object-contain rounded-xl"
                        style={{ maxHeight: '300px' }}
                      />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeFile() }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow"
                      >
                        <X size={15} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[12px] px-4 py-2 backdrop-blur-sm flex items-center justify-between">
                        <span className="truncate">{file.name}</span>
                        <span className="text-green-300 flex items-center gap-1 flex-shrink-0 ml-2">
                          <CheckCircle size={12} /> Ready
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* ── placeholder ── */
                    <div className="flex flex-col items-center justify-center gap-3 py-14 px-6">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg,#E8F5F0,#d1fae5)' }}
                      >
                        <Upload size={28} className="text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-[14px] font-semibold text-gray-700">
                          Drag & drop your prescription here
                        </p>
                        <p className="text-[12px] text-gray-400 mt-1">
                          or click to browse — JPG, PNG, PDF · Max 10 MB
                        </p>
                      </div>
                      <button
                        type="button"
                        className="mt-2 flex items-center gap-2 bg-white border-2 border-dashed border-primary text-primary text-[13px] font-semibold px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                        onClick={(e) => { e.stopPropagation(); inputRef.current?.click() }}
                      >
                        <Upload size={15} /> Browse Files
                      </button>
                    </div>
                  )}
                </div>
                {errors.file && (
                  <p className="text-[11px] text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle size={11} /> {errors.file}
                  </p>
                )}

                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => acceptFile(e.target.files[0])}
                />

                {/* ── Contact fields ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                  {/* Name */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <div
                      className="flex items-center border rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        borderColor: errors.name ? '#f87171' : '#E5E7EB',
                        background: errors.name ? '#FEF2F2' : '#fff',
                      }}
                    >
                      <User size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="text"
                        value={name}
                        onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: '' })) }}
                        placeholder="e.g. Ali Khan"
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[13px] font-semibold text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div
                      className="flex items-center border rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        borderColor: errors.phone ? '#f87171' : '#E5E7EB',
                        background: errors.phone ? '#FEF2F2' : '#fff',
                      }}
                    >
                      <PhoneCall size={16} className="ml-3.5 text-gray-400 flex-shrink-0" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setErrors(p => ({ ...p, phone: '' })) }}
                        placeholder="+92 300 0000000"
                        className="flex-1 px-3 py-3 text-[14px] text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* ── Send button ── */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex items-center gap-2.5 text-white font-bold rounded-xl px-8 py-3 text-[14px] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                    style={{
                      background: 'linear-gradient(135deg,#1A9E6E,#0D3D2B)',
                      boxShadow: '0 4px 16px rgba(26,158,110,0.35)',
                    }}
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Prescription
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── RIGHT: How to Upload Guide ── */}
          <div className="space-y-5">

            {/* Tips card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6">
              <h3 className="font-bold text-gray-900 text-[17px] mb-1">
                HOW TO UPLOAD YOUR PRESCRIPTION?
              </h3>
              <div className="h-0.5 rounded-full mb-4" style={{ background: 'linear-gradient(90deg,#1A9E6E,transparent)' }} />

              <ul className="space-y-3">
                {TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] text-gray-600 leading-relaxed">
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 text-white text-[10px] font-bold"
                      style={{ background: '#1A9E6E' }}
                    >
                      {i + 1}
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample prescription visual */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-6">
              <h4 className="font-semibold text-gray-700 text-[13px] mb-4 text-center uppercase tracking-wide">
                Sample Valid Prescription
              </h4>

              {/* Mock prescription slip */}
              <div className="relative mx-auto" style={{ maxWidth: 280 }}>

                {/* Label connectors (desktop) */}
                <div className="hidden sm:block">
                  {/* top-left */}
                  <div className="absolute text-[10px] font-bold text-red-500 flex items-center gap-1"
                    style={{ top: '8%', left: '-8px', transform: 'translateX(-100%)' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>Doctor's details</span>
                    <div style={{ width: 24, height: 1, background: '#EF4444' }} />
                  </div>
                  {/* top-right */}
                  <div className="absolute text-[10px] font-bold text-red-500 flex items-center gap-1"
                    style={{ top: '8%', right: '-8px', transform: 'translateX(100%)' }}>
                    <div style={{ width: 24, height: 1, background: '#EF4444' }} />
                    <span style={{ whiteSpace: 'nowrap' }}>Patient's details</span>
                  </div>
                  {/* bottom-left */}
                  <div className="absolute text-[10px] font-bold text-red-500 flex items-center gap-1"
                    style={{ bottom: '8%', left: '-8px', transform: 'translateX(-100%)' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>Medicine details</span>
                    <div style={{ width: 24, height: 1, background: '#EF4444' }} />
                  </div>
                  {/* bottom-right */}
                  <div className="absolute text-[10px] font-bold text-red-500 flex items-center gap-1"
                    style={{ bottom: '8%', right: '-8px', transform: 'translateX(100%)' }}>
                    <div style={{ width: 24, height: 1, background: '#EF4444' }} />
                    <span style={{ whiteSpace: 'nowrap' }}>Doctor's sign + stamp</span>
                  </div>
                </div>

                {/* The prescription paper */}
                <div
                  className="border border-gray-300 rounded-lg p-4 text-[10px] text-gray-700 font-mono"
                  style={{ background: '#FFFDF7', boxShadow: '2px 3px 12px rgba(0,0,0,0.08)' }}
                >
                  {/* Doctor header */}
                  <div className="border-b border-dashed border-gray-300 pb-2 mb-3">
                    <p className="font-bold text-[11px] text-gray-900">DR. Nowruz , MBBS</p>
                    <p className="text-gray-500">Name of Hospital / Clinic</p>
                    <p className="text-gray-500">Address of Hospital / Clinic</p>
                    <p className="text-gray-500">Phone No.</p>
                  </div>

                  {/* Patient info */}
                  <div className="flex justify-between mb-1 text-gray-500">
                    <span>Date of consultation: ___</span>
                  </div>
                  <div className="flex gap-6 mb-3 text-gray-500">
                    <span>Name of Patient: ___</span>
                    <span>Age: __</span>
                  </div>

                  {/* Medicine table */}
                  <table className="w-full text-[9px] border-collapse mb-3">
                    <thead>
                      <tr className="bg-gray-100">
                        {['Medicine Name', 'Strength', 'Dose', 'Duration'].map(h => (
                          <th key={h} className="border border-gray-300 px-1 py-0.5 text-left font-semibold text-gray-600">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-1 py-0.5">Sitagliptin</td>
                        <td className="border border-gray-300 px-1 py-0.5">10mg</td>
                        <td className="border border-gray-300 px-1 py-0.5">1-0-1</td>
                        <td className="border border-gray-300 px-1 py-0.5">6 months</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-1 py-0.5"></td>
                        <td className="border border-gray-300 px-1 py-0.5"></td>
                        <td className="border border-gray-300 px-1 py-0.5"></td>
                        <td className="border border-gray-300 px-1 py-0.5"></td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Signature */}
                  <div className="flex justify-end">
                    <div className="border border-dashed border-gray-400 rounded px-3 py-2 text-center" style={{ width: 80 }}>
                      <p className="text-[8px] text-gray-400">Doctor's</p>
                      <p className="text-[8px] text-gray-400">Signature</p>
                      <div
                        className="mt-1 mx-auto"
                        style={{
                          width: 50, height: 20,
                          borderBottom: '1.5px solid #1A9E6E',
                          fontStyle: 'italic',
                          fontSize: 9,
                          color: '#1A9E6E',
                          textAlign: 'center',
                          paddingBottom: 2,
                        }}
                      >
                        Dr. M. Ali
                      </div>
                    </div>
                  </div>

                  {/* Red corner annotations on mobile */}
                  <div className="flex justify-between mt-3 sm:hidden">
                    <span className="text-red-500 font-bold text-[8px]">Medicine details</span>
                    <span className="text-red-500 font-bold text-[8px]">Doctor's sign + stamp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp / call CTA */}
            <div
              className="rounded-2xl p-5 flex items-center justify-between"
              style={{ background: 'linear-gradient(135deg,#0D3D2B,#1A9E6E)', color: '#fff' }}
            >
              <div>
                <p className="font-bold text-[15px]">Need help?</p>
                <p className="text-white/70 text-[12px] mt-0.5">Call us for prescription assistance</p>
              </div>
              <a
                href="tel:0518447077"
                className="flex items-center gap-2 bg-white text-primary font-bold text-[13px] px-4 py-2.5 rounded-xl transition-all hover:bg-primary-light hover:shadow"
              >
                <Phone size={15} /> 051-8447077
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}

export default AsaanOrder
