import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { blogs } from '../../data/blogs'
import SectionHeader from '../ui/SectionHeader'

const HealthArticles = () => {
  return (
    <section className="max-w-[1450px] mx-auto px-5 mt-10">
      <SectionHeader title="Health Articles" viewAllLink="/blog" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {blogs.slice(0, 3).map(blog => (
          <Link
            key={blog.id}
            to={`/blog/${blog.slug}`}
            className="block group"
          >
            <article
              className="bg-white rounded-xl border border-gray-100
                         overflow-hidden shadow-card hover:shadow-card-hover
                         hover:-translate-y-1 transition-all duration-200
                         cursor-pointer h-full"
            >
              <div className="overflow-hidden aspect-video relative">
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="w-full h-full object-cover
                             group-hover:scale-105 transition-transform duration-500"
                />
                {/* Category pill */}
                <span
                  className="absolute top-2.5 left-2.5 text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: blog.categoryColor }}
                >
                  {blog.category}
                </span>
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
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="text-[11px] text-gray-500 font-medium">{blog.author.name}</span>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-primary font-semibold group-hover:gap-1.5 transition-all">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default HealthArticles
