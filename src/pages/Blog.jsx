import { blogs } from '../data/blogs'
import { Link } from 'react-router-dom'

const Blog = () => {
  return (
    <main className="max-w-[1450px] mx-auto px-5 py-8">
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-gray-900 mb-2">Health Articles & Blog</h1>
        <p className="text-gray-500 text-sm">Expert health advice, wellness tips, and product guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] text-gray-400">{blog.date}</span>
                <span className="text-[11px] text-primary font-medium bg-primary-light
                                 px-2 py-0.5 rounded-full">{blog.readTime}</span>
              </div>
              <h2 className="text-[15px] font-semibold text-gray-800 leading-[1.5]
                             mb-2 group-hover:text-primary transition-colors">
                {blog.title}
              </h2>
              <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-4">
                {blog.excerpt}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center
                                text-white text-xs font-bold">
                  {blog.author[0]}
                </div>
                <span className="text-[12px] text-gray-600 font-medium">{blog.author}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default Blog
