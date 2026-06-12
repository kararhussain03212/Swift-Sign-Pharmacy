import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

const BlogCard = ({ blog }) => {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group">

      {/* Cover image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={blog.cover}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-[11px] font-bold text-white px-3 py-1 rounded-full"
          style={{ backgroundColor: blog.categoryColor }}
        >
          {blog.category}
        </span>

        {/* Read time badge */}
        <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-medium text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
          <Clock size={11} /> {blog.readTime}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <Calendar size={12} /> {blog.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-gray-900 text-[15px] line-clamp-2 leading-[1.45] mb-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {blog.excerpt}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">

          {/* Author */}
          <div className="flex items-center gap-2">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-7 h-7 rounded-full border-2 border-primary-light object-cover"
            />
            <span className="text-[12px] font-medium text-gray-700">
              {blog.author.name}
            </span>
          </div>

          {/* Read more */}
          <Link
            to={`/blog/${blog.slug}`}
            className="flex items-center gap-1 text-primary font-semibold text-[12px] hover:gap-2 transition-all duration-200"
          >
            Read More <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
