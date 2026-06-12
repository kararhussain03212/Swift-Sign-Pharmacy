import { blogs } from '../../data/blogs'
import SectionHeader from '../ui/SectionHeader'

const HealthArticles = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-10">
      <SectionHeader title="Health Articles" viewAllLink="/blog" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {blogs.map(blog => (
          <article
            key={blog.id}
            className="bg-white rounded-xl border border-gray-100
                       overflow-hidden shadow-card hover:shadow-card-hover
                       hover:-translate-y-1 transition-all duration-200
                       cursor-pointer group"
          >
            <div className="overflow-hidden aspect-video">
              <img
                src={blog.cover}
                alt={blog.title}
                className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] text-gray-400">{blog.date}</p>
                <span className="text-[10px] text-primary font-medium">{blog.readTime}</span>
              </div>
              <h3
                className="text-[14px] font-semibold text-gray-800
                           line-clamp-2 leading-[1.5] mb-2
                           group-hover:text-primary transition-colors"
              >
                {blog.title}
              </h3>
              <p className="text-[12px] text-gray-500 line-clamp-2 leading-relaxed mb-3">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-primary-light flex-shrink-0" />
                <span className="text-[11px] text-gray-500 font-medium">{blog.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HealthArticles
