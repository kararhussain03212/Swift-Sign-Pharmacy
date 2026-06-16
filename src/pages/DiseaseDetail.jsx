import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { diseaseDetailsData } from '../data/diseaseDetails'

const DiseaseDetail = () => {
  const { slug } = useParams()
  const disease = diseaseDetailsData[slug]

  if (!disease) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="font-heading font-bold text-gray-800 text-2xl mb-2">Disease Not Found</h1>
        <p className="text-gray-500 text-[14px] mb-6">The disease information you're looking for doesn't exist.</p>
        <Link
          to="/diseases"
          className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft size={16} /> Back to Diseases
        </Link>
      </div>
    )
  }

  return (
    <main className="bg-white min-h-screen pb-20 md:pb-0">
      {/* ══ HEADER ════════════════════════════════════════════ */}
      <div className="bg-gray-50 border-b border-gray-200 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-4 text-[13px]">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link to="/diseases" className="text-primary hover:underline">Diseases</Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-600">{disease.name}</span>
          </nav>

          {/* Title */}
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-gray-900 mb-2">
            {disease.name}
          </h1>

          {/* Category */}
          {disease.category && (
            <p className="text-[13px] text-gray-500 font-medium">Category: {disease.category}</p>
          )}
        </div>
      </div>

      {/* ══ CONTENT ════════════════════════════════════════════ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Description */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Description</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed">
            {disease.description}
          </p>
        </section>

        {/* Causes */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Causes</h2>
          <ul className="space-y-2">
            {disease.causes.map((cause, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Risk Factors */}
        {disease.riskFactors && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Risk Factors</h2>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
              Risk factors of {disease.name.toLowerCase()} include:
            </p>
            <ul className="space-y-2">
              {disease.riskFactors.map((factor, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Symptoms */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Symptoms</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            Symptoms that may occur with {disease.name.toLowerCase()} include:
          </p>
          <ul className="space-y-2">
            {disease.symptoms.map((symptom, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Diagnosis */}
        {disease.diagnosis && (
          <section className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Diagnosis</h2>
            <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
              To diagnose {disease.name.toLowerCase()}, the following tests and procedures may be performed:
            </p>
            <ul className="space-y-2">
              {disease.diagnosis.map((diag, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  <span>{diag}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Management/Treatment */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Management</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            Management of {disease.name.toLowerCase()} depends on the underlying cause. The following measures can help:
          </p>
          <ul className="space-y-2">
            {disease.treatment.map((treat, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{treat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Prevention */}
        <section className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Prevention</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-3">
            To prevent or reduce the risk of {disease.name.toLowerCase()}:
          </p>
          <ul className="space-y-2">
            {disease.prevention.map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* When to Consult Doctor */}
        <section className="bg-primary-light/30 border border-primary/20 rounded-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">When to Consult a Doctor?</h2>
          <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
            Consult your doctor if you experience:
          </p>
          <ul className="space-y-2">
            {disease.whenToSeeDoctor.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 text-[15px]">
                <span className="text-primary font-bold mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </main>
  )
}

export default DiseaseDetail
