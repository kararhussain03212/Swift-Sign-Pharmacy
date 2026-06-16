import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Link2,
  ChevronRight,
  BookOpen,
  Heart,
} from 'lucide-react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { blogs } from '../data/blogs'
import BlogCard from '../components/ui/BlogCard'

/* ─── Reading-progress bar ─────────────────────────── */
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

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-gray-100">
      <div
        className="h-full bg-primary transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

/* ─── Article body renderer ─────────────────────────── */
const ArticleBody = ({ blog }) => {
  const body = blog.body;
  let blocks = [];
  
  // Support both new markdown-style \n\n and old sentence splitting
  if (body.includes('\n\n')) {
    blocks = body.split('\n\n');
  } else {
    const sentences = body.split(/(?<=[.!?])\s+/);
    for (let i = 0; i < sentences.length; i += 2) {
      blocks.push(sentences.slice(i, i + 2).join(' '));
    }
  }

  return (
    <div className="prose-article">
      {blocks.map((block, i) => {
        // If it's a heading
        if (block.startsWith('## ')) {
          return (
            <h2 
              key={i} 
              className="text-center font-heading font-bold text-4xl py-20 px-8 rounded-xl my-12 shadow-sm"
              style={{ 
                backgroundColor: `${blog.categoryColor}15`, 
                color: blog.categoryColor 
              }}
            >
              {block.replace('## ', '')}
            </h2>
          );
        }

        // First paragraph gets a slightly larger, darker style
        if (i === 0) {
          return (
            <p key={i} className="text-[16px] leading-[1.85] text-gray-700 mb-6 font-medium">
              {block}
            </p>
          )
        }
        
        // Auto pull-quote for old format blocks
        if (i === 2 && !body.includes('\n\n')) {
          return (
            <div key={`pq-${i}`}>
              <p className="text-[15px] leading-[1.85] text-gray-600 mb-6">{block}</p>
              <blockquote
                className="relative border-l-4 border-primary bg-primary-light/60 rounded-r-2xl px-7 py-5 my-8"
              >
                <div
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 bg-primary-dark rounded-full"
                />
                <p className="text-[17px] leading-[1.7] font-semibold text-primary-dark italic">
                  &ldquo;{block.split('.')[0]}.&rdquo;
                </p>
              </blockquote>
            </div>
          )
        }
        
        return (
          <p key={i} className="text-[15px] leading-[1.85] text-gray-600 mb-6">
            {block}
          </p>
        )
      })}
    </div>
  )
}

/* ─── Share buttons ─────────────────────────────────── */
const ShareButtons = ({ title, slug }) => {
  const url   = `${window.location.origin}/blog/${slug}`
  const text  = encodeURIComponent(title)
  const href  = encodeURIComponent(url)

  const share = [
    {
      label: 'Facebook',
      icon: <FaFacebookF size={14} />,
      bg: '#1877F2',
      href: `https://facebook.com/sharer/sharer.php?u=${href}`,
    },
    {
      label: 'Twitter',
      icon: <FaTwitter size={14} />,
      bg: '#1DA1F2',
      href: `https://twitter.com/intent/tweet?text=${text}&url=${href}`,
    },
    {
      label: 'LinkedIn',
      icon: <FaLinkedinIn size={14} />,
      bg: '#0A66C2',
      href: `https://linkedin.com/sharing/share-offsite/?url=${href}`,
    },
    {
      label: 'WhatsApp',
      icon: <FaWhatsapp size={14} />,
      bg: '#25D366',
      href: `https://wa.me/?text=${text}%20${href}`,
    },
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!', { duration: 2000 })
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mr-1">
        Share:
      </span>
      {share.map(s => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          title={`Share on ${s.label}`}
          className="flex items-center gap-2 text-white text-[12px] font-semibold px-3.5 py-2 rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150"
          style={{ backgroundColor: s.bg }}
        >
          {s.icon} {s.label}
        </a>
      ))}
      <button
        onClick={copyLink}
        className="flex items-center gap-2 text-gray-600 text-[12px] font-semibold px-3.5 py-2 rounded-xl border border-gray-200 hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-150"
      >
        <Link2 size={13} /> Copy Link
      </button>
    </div>
  )
}

/* ─── Main Page ─────────────────────────────────────── */
const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const blog = blogs.find(b => b.slug === slug)

  // Scroll to top whenever slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  // Random initial like count
  useEffect(() => {
    if (blog) setLikeCount(Math.floor(Math.random() * 120) + 40)
  }, [slug])

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
        <BookOpen size={56} className="text-gray-200 mb-4" />
        <h1 className="font-heading font-bold text-gray-800 text-2xl mb-2">
          Article Not Found
        </h1>
        <p className="text-gray-500 text-[14px] mb-6">
          The article you're looking for doesn't exist or may have been removed.
        </p>
        <Link
          to="/blog"
          className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    )
  }

  const handleLike = () => {
    setLiked(l => {
      setLikeCount(c => l ? c - 1 : c + 1)
      return !l
    })
    if (!liked) toast.success('Added to favourites! ❤️', { duration: 1500 })
  }

  // Next / prev articles
  const currentIndex = blogs.findIndex(b => b.slug === slug)
  const prevPost = blogs[currentIndex - 1] || null
  const nextPost = blogs[currentIndex + 1] || null

  return (
    <>
      <ReadingProgress />

      <main>

        {/* ═══════════════════════════════════════
            HERO BANNER
        ═══════════════════════════════════════ */}
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(13, 61, 43, 0.85), rgba(26, 158, 110, 0.85)), url(${blog.cover})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: 'clamp(64px, 12vw, 120px) 0 clamp(48px, 9vw, 100px)',
          }}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute" style={{ right: '-80px', top: '-80px', width: '400px', height: '400px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.06)' }} />
          <div className="pointer-events-none absolute" style={{ right: '60px', top: '40px', width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

          <div className="max-w-[1280px] mx-auto px-5 relative z-10">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6">
              <Link to="/" className="text-white/50 text-[13px] hover:text-white transition-colors">Home</Link>
              <ChevronRight size={13} className="text-white/30" />
              <Link to="/blog" className="text-white/50 text-[13px] hover:text-white transition-colors">Blog</Link>
              <ChevronRight size={13} className="text-white/30" />
              <span className="text-white/80 text-[13px] line-clamp-1">{blog.title}</span>
            </nav>

            {/* Category pill */}
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white px-3.5 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: blog.categoryColor }}
            >
              <Tag size={10} /> {blog.category}
            </span>

            {/* Title */}
            <h1
              className="font-heading font-extrabold text-white mb-5 max-w-3xl"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.2 }}
            >
              {blog.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 mb-7">
              <div className="flex items-center gap-2.5">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-9 h-9 rounded-full border-2 border-white/30 object-cover"
                />
                <div>
                  <p className="text-white font-semibold text-[13px] leading-none">{blog.author.name}</p>
                  <p className="text-white/50 text-[11px] mt-0.5">{blog.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/60 text-[12px]">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {blog.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {blog.readTime}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span
                  key={tag}
                  className="text-[11px] bg-white/10 border border-white/15 text-white/80 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            ARTICLE BODY
        ═══════════════════════════════════════ */}
        <div className="max-w-3xl mx-auto px-5 mb-16 mt-12">

              {/* Quick stats bar */}
              <div className="border border-gray-100 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 mb-8 shadow-card">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Clock size={14} className="text-primary flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-medium">{blog.readTime}</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <BookOpen size={14} className="text-primary flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-medium hidden sm:inline">In-depth guide</span>
                      <span className="text-[12px] sm:text-[13px] font-medium sm:hidden">Guide</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Tag size={13} className="text-primary flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-medium truncate max-w-[100px]">{blog.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLike}
                    className={clsx(
                      'flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 flex-shrink-0',
                      liked
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'
                    )}
                  >
                    <Heart size={13} className={liked ? 'fill-red-500' : ''} />
                    {likeCount}
                  </button>
                </div>
              </div>

              {/* Article Body */}
              <ArticleBody blog={blog} />

        </div>

        {/* ═══════════════════════════════════════
            MORE ARTICLES
        ═══════════════════════════════════════ */}
        <section className="bg-gray-50/60 py-14">
          <div className="max-w-[1280px] mx-auto px-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[12px] font-bold text-primary uppercase tracking-widest mb-1">
                  Keep Reading
                </p>
                <h2 className="font-heading font-extrabold text-gray-900 text-[22px]">
                  More Health Articles
                </h2>
              </div>
              <Link
                to="/blog"
                className="hidden sm:flex items-center gap-1.5 text-primary font-semibold text-[13px] border border-primary rounded-full px-5 py-2 hover:bg-primary hover:text-white transition-all duration-200"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {blogs
                .filter(b => b.slug !== slug)
                .slice(0, 3)
                .map(b => (
                  <BlogCard key={b.id} blog={b} />
                ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}

export default BlogDetail
