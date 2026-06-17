import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { diseaseDetailsData } from '../data/diseaseDetails'
import { diseasesList } from '../data/categories'

/* ─── Reading-progress bar ──────────────────────────────── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
}

/* ─── Section config — add new keys here to auto-render ─── */
const SECTIONS = [
  { key: 'causes',       heading: 'Causes',                  intro: null },
  { key: 'riskFactors',  heading: 'Risk Factors',             intro: (name) => `Risk factors for ${name} include:` },
  { key: 'symptoms',     heading: 'Symptoms',                 intro: (name) => `Common symptoms of ${name} include:` },
  { key: 'diagnosis',    heading: 'Diagnosis',                intro: null },
  { key: 'management',   heading: 'Management & Treatment',   intro: (name) => `Management of ${name} may include:` },
  { key: 'prevention',   heading: 'Prevention',               intro: (name) => `To reduce the risk of ${name}:` },
  { key: 'complications', heading: 'Complications',           intro: (name) => `Possible complications of ${name}:` },
]

/* ─── Renders a single section (string or array value) ─── */
const Section = ({ heading, intro, value, name }) => {
  const isArray = Array.isArray(value)
  const introText = typeof intro === 'function' ? intro(name.toLowerCase()) : intro

  return (
    <section className="mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-heading">
        {heading}
      </h2>
      {introText && (
        <p className="text-gray-600 text-[15px] leading-relaxed mb-3">{introText}</p>
      )}
      {isArray ? (
        <ul className="space-y-2">
          {value.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
              <span className="text-primary font-bold mt-0.5 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 text-[15px] leading-relaxed">{value}</p>
      )}
    </section>
  )
}

/* ─── Main page ─────────────────────────────────────────── */
const DiseaseDetail = () => {
  const { slug } = useParams()
  const disease = diseaseDetailsData[slug]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!disease) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle size={56} className="text-gray-200 mb-4" />
        <h1 className="font-heading font-bold text-gray-800 text-2xl mb-2">
          Disease Not Found
        </h1>
        <p className="text-gray-500 text-[14px] mb-6">
          The disease information you're looking for doesn't exist yet.
        </p>
        <Link
          to="/diseases"
          className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft size={16} /> Back to Diseases
        </Link>
      </div>
    )
  }

  const relatedDiseases = diseasesList
    .filter(d => d.slug !== slug)
    .slice(0, 6)

  return (
    <>
      <ReadingProgress />

      <main>

        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute" style={{ right: '-80px', top: '-80px', width: '400px', height: '400px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.06)' }} />
          <div className="pointer-events-none absolute" style={{ right: '60px', top: '40px', width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

          <div className="max-w-4xl mx-auto px-5 relative z-10">

            {/* Breadcrumb */}
            {/* <nav className="flex items-center gap-2 mb-6">
              <Link to="/" className="text-white/50 text-[13px] hover:text-white transition-colors">Home</Link>
              <ChevronRight size={13} className="text-white/30" />
              <Link to="/diseases" className="text-white/50 text-[13px] hover:text-white transition-colors">Diseases</Link>
              <ChevronRight size={13} className="text-white/30" />
              <span className="text-white/80 text-[13px] line-clamp-1">{disease.title}</span>
            </nav> */}

            {/* Label pill */}
            {/* <span className="inline-flex items-center text-[11px] font-bold text-white bg-white/15 border border-white/20 px-3.5 py-1.5 rounded-full mb-4">
              Disease &amp; Condition
            </span> */}
          </div>
        </section>

        {/* ══ CONTENT ═══════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto px-5 py-10 sm:py-14">

          {/* Overview */}
          <section className="mb-10">
            <h1 className="font-heading font-extrabold text-gray-900 mb-4" style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.2 }}>
              {disease.title}
            </h1>
            <p className="text-gray-700 text-[15px] leading-relaxed">{disease.description}</p>
          </section>

          <hr className="border-gray-100 mb-10" />

          {/* Dynamic sections — auto-renders any key defined in SECTIONS */}
          {SECTIONS.map(({ key, heading, intro }) => {
            const value = disease[key]
            if (!value) return null
            return (
              <Section
                key={key}
                heading={heading}
                intro={intro}
                value={value}
                name={disease.title}
              />
            )
          })}

          {/* When to Consult a Doctor — special alert card */}
          {disease.whenToConsultDoctor && (
            <section className="bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 mt-4">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle size={22} className="text-primary flex-shrink-0 mt-0.5" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
                  When to Consult a Doctor
                </h2>
              </div>
              <p className="text-gray-700 text-[15px] leading-relaxed pl-8">
                {disease.whenToConsultDoctor}
              </p>
            </section>
          )}

        </div>

        {/* ══ MORE DISEASES ═════════════════════════════════════ */}
        {/* <section className="bg-gray-50/70 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[12px] font-bold text-primary uppercase tracking-widest mb-1">
                  Browse More
                </p>
                <h2 className="font-heading font-extrabold text-gray-900 text-[22px]">
                  Other Diseases &amp; Conditions
                </h2>
              </div>
              <Link
                to="/diseases"
                className="hidden sm:flex items-center gap-1.5 text-primary font-semibold text-[13px] border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white transition-all duration-200"
              >
                View All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedDiseases.map(d => (
                <Link
                  key={d.slug}
                  to={`/disease/${d.slug}`}
                  className="bg-white border border-gray-100 rounded-xl px-4 py-3 text-[14px] text-gray-700 font-medium hover:border-primary hover:text-primary hover:shadow-sm transition-all duration-200"
                >
                  {d.name}
                </Link>
              ))}
            </div>

            <div className="mt-6 sm:hidden text-center">
              <Link
                to="/diseases"
                className="inline-flex items-center gap-1.5 text-primary font-semibold text-[13px] border border-primary rounded-full px-5 py-2"
              >
                View All Diseases <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section> */}

      </main>
    </>
  )
}

export default DiseaseDetail
