import { useState } from 'react'
import { Eye, ChevronDown, ChevronUp } from 'lucide-react'

const ProductDocuments = ({ documents }) => {
  const [expandedSections, setExpandedSections] = useState({
    certificates: true,
    sds: true,
    datasheets: true,
    brochures: true
  })
  const [searchTerm, setSearchTerm] = useState('')

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const filteredCertificates = documents.certificates?.filter(cert =>
    cert.lotNumber.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const DocumentSection = ({ title, icon: Icon, data, section }) => {
    if (!data || data.length === 0) return null

    const isExpanded = expandedSections[section]

    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection(section)}
          className="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            {/* <Eye size={20} className="text-primary" /> */}
            <h3 className="text-base font-bold text-gray-900">
              {title}
              <span className="text-gray-500 font-medium ml-2">({data.length})</span>
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-400" />
          ) : (
            <ChevronDown size={20} className="text-gray-400" />
          )}
        </button>

        {isExpanded && (
          <div className="px-4 pb-4 bg-gray-50">
            {section === 'certificates' && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search by lot number or partial lot number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                {filteredCertificates.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">No certificates found matching your search</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-300 bg-white">
                          <th className="px-3 py-3 text-left font-bold text-gray-900">Lot #</th>
                          <th className="px-3 py-3 text-left font-bold text-gray-900">Certificate Type</th>
                          <th className="px-3 py-3 text-left font-bold text-gray-900">Date</th>
                          <th className="px-3 py-3 text-left font-bold text-gray-900">Catalog Number(s)</th>
                          <th className="px-3 py-3 text-center font-bold text-gray-900">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCertificates.map((cert, idx) => (
                          <tr key={idx} className="border-b border-gray-200 hover:bg-white transition-colors">
                            <td className="px-3 py-3">
                              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline cursor-pointer">
                                {cert.lotNumber}
                              </a>
                            </td>
                            <td className="px-3 py-3 text-gray-600">{cert.type}</td>
                            <td className="px-3 py-3 text-gray-600">{cert.date}</td>
                            <td className="px-3 py-3 text-gray-600">{cert.catalogNumbers}</td>
                            <td className="px-3 py-3 text-center">
                              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold">
                                {/* <Eye size={16} /> */}
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {section !== 'certificates' && (
              <div className="space-y-2">
                {data.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      {item.lastUpdated && (
                        <p className="text-xs text-gray-500 mt-0.5">Last updated: {item.lastUpdated}</p>
                      )}
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                    >
                      {/* <Eye size={16} /> */}
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-12 sm:mt-16">
      <div className="border-b border-gray-200 pb-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900">Documents & Downloads</h2>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <DocumentSection
          title="Certificates"
          data={documents.certificates}
          section="certificates"
        />
        <DocumentSection
          title="Safety Data Sheets"
          data={documents.sds}
          section="sds"
        />
        <DocumentSection
          title="Product Information"
          data={documents.datasheets}
          section="datasheets"
        />
        <DocumentSection
          title="Scientific Resources"
          data={documents.brochures}
          section="brochures"
        />
      </div>
    </div>
  )
}

export default ProductDocuments
