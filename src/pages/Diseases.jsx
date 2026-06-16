import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { diseasesList } from '../data/categories'

const Diseases = () => {
  const groupedDiseases = useMemo(() => {
    const groups = {}
    diseasesList.forEach(disease => {
      const firstLetter = disease.name.charAt(0).toUpperCase()
      if (!groups[firstLetter]) {
        groups[firstLetter] = []
      }
      groups[firstLetter].push(disease)
    })
    return Object.keys(groups).sort().map(letter => ({
      letter,
      diseases: groups[letter].sort((a, b) => a.name.localeCompare(b.name))
    }))
  }, [])

  return (
    <main className="w-full bg-gray-50/50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-primary text-white py-10 sm:py-14 md:py-16 px-4 sm:px-5">
        <div className="max-w-[1450px] mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-heading font-extrabold mb-3 sm:mb-4">
            Diseases &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-primary-light max-w-2xl opacity-90">
            Browse our comprehensive A-Z guide of diseases and conditions to find related products and information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-5 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {groupedDiseases.map((group) => (
            <div key={group.letter} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
                <h2 className="text-2xl font-bold text-primary">{group.letter}</h2>
              </div>
              <ul className="divide-y divide-gray-50">
                {group.diseases.map(disease => (
                  <li key={disease.slug}>
                    <Link
                      to={`/disease/${disease.slug}`}
                      className="block px-6 py-3 text-[14px] text-gray-600 hover:bg-primary/5 hover:text-primary hover:font-bold transition-all"
                    >
                      {disease.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Diseases
