import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Share2,
  Link2,
  ChevronRight,
  BookOpen,
  Heart,
  MessageCircle,
  ArrowRight,
  CheckCircle,
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
// Converts the plain-text body into richly styled HTML-like blocks
const ArticleBody = ({ body }) => {
  // Split into sentences grouped in paragraphs of ~2 sentences each
  const sentences = body.split(/(?<=[.!?])\s+/)
  const paragraphs = []
  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(' '))
  }

  return (
    <div className="prose-article">
      {paragraphs.map((para, i) => {
        // First paragraph gets a large drop-cap style
        if (i === 0) {
          return (
            <p key={i} className="text-[16px] leading-[1.85] text-gray-700 mb-6 font-medium">
              {para}
            </p>
          )
        }
        // Insert a pull-quote block after paragraph 2
        if (i === 2) {
          return (
            <div key={`pq-${i}`}>
              <p className="text-[15px] leading-[1.85] text-gray-600 mb-6">{para}</p>
              <blockquote
                className="relative border-l-4 border-primary bg-primary-light/60 rounded-r-2xl px-7 py-5 my-8"
              >
                <div
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 bg-primary-dark rounded-full"
                />
                <p className="text-[17px] leading-[1.7] font-semibold text-primary-dark italic">
                  &ldquo;{para.split('.')[0]}.&rdquo;
                </p>
              </blockquote>
            </div>
          )
        }
        return (
          <p key={i} className="text-[15px] leading-[1.85] text-gray-600 mb-6">
            {para}
          </p>
        )
      })}
    </div>
  )
}

/* ─── Key Takeaways ─────────────────────────────────── */
const KeyTakeaways = ({ blog }) => {
  const points = blog.body
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.length > 30)
    .slice(0, 4)

  return (
    <div
      className="rounded-2xl border border-primary/20 bg-primary-light/40 p-6 my-8"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
          <CheckCircle size={16} className="text-white" />
        </div>
        <h3 className="font-heading font-bold text-gray-900 text-[15px]">
          Key Takeaways
        </h3>
      </div>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-[9px] font-bold">{i + 1}</span>
            </span>
            <p className="text-[13px] text-gray-700 leading-relaxed">{point.trim()}</p>
          </li>
        ))}
      </ul>
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

/* ─── Sidebar widgets ───────────────────────────────── */
const Sidebar = ({ currentSlug, category, tags }) => {
  const related = blogs
    .filter(b => b.slug !== currentSlug && (b.category === category || b.tags.some(t => tags.includes(t))))
    .slice(0, 4)

  const popular = blogs.filter(b => b.slug !== currentSlug).slice(0, 5)

  return (
    <aside className="space-y-6">

      {/* PHARMACIST CTA */}
      <div
        className="relative rounded-2xl overflow-hidden p-6 text-white"
        style={{ background: 'linear-gradient(135deg, #0D3D2B 0%, #1A9E6E 100%)' }}
      >
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full border-2 border-white/10" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-white/10" />
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mb-4">
            <MessageCircle size={22} className="text-white" />
          </div>
          <h4 className="font-heading font-bold text-[15px] mb-1.5">
            Ask Our Pharmacist
          </h4>
          <p className="text-white/65 text-[12px] leading-relaxed mb-4">
            Have questions about medicines or this article? Our licensed pharmacists are here Mon–Sat, 9am–9pm.
          </p>
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 bg-white text-primary font-bold text-[13px] rounded-xl py-2.5 hover:bg-gray-50 transition-colors"
          >
            Chat with Pharmacist <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* RELATED POSTS */}
      {related.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4 flex items-center gap-2">
            <BookOpen size={15} className="text-primary" /> Related Articles
          </h3>
          <div className="space-y-4">
            {related.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="flex gap-3 group"
              >
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-16 h-14 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: post.categoryColor }}
                  >
                    {post.category}
                  </span>
                  <p className="text-[12px] font-semibold text-gray-800 line-clamp-2 leading-snug mt-1 group-hover:text-primary transition-colors">
                    {post.title}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                    <Clock size={10} /> {post.readTime}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* POPULAR POSTS */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4">
          Popular This Week
        </h3>
        <div className="space-y-3">
          {popular.map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="flex items-start gap-3 group"
            >
              <span
                className="w-7 h-7 flex-shrink-0 rounded-lg flex items-center justify-center text-[11px] font-black text-white"
                style={{ backgroundColor: post.categoryColor }}
              >
                {i + 1}
              </span>
              <p className="text-[12px] font-medium text-gray-700 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-1">
          Health Newsletter
        </h3>
        <p className="text-[12px] text-gray-500 mb-4">
          Weekly tips from certified pharmacists, delivered free.
        </p>
        <input
          type="email"
          placeholder="your@email.com"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-primary focus:shadow-glow transition-all mb-2.5"
        />
        <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold rounded-xl py-2.5 text-[13px] transition-colors">
          Subscribe Free
        </button>
      </div>

      {/* TAGS */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4 flex items-center gap-2">
          <Tag size={14} className="text-primary" /> Article Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link
              key={tag}
              to={`/blog?tag=${tag}`}
              className="text-[12px] border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all duration-150"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>

    </aside>
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
            padding: '120px 0 100px' 
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
              <div className="flex items-center gap-6 border border-gray-100 rounded-2xl px-6 py-4 mb-8 shadow-card">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} className="text-primary" />
                  <span className="text-[13px] font-medium">{blog.readTime}</span>
                </div>
                <div className="w-px h-5 bg-gray-200" />
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={16} className="text-primary" />
                  <span className="text-[13px] font-medium">In-depth guide</span>
                </div>
                <div className="w-px h-5 bg-gray-200" />
                <div className="flex items-center gap-2 text-gray-600">
                  <Tag size={15} className="text-primary" />
                  <span className="text-[13px] font-medium">{blog.category}</span>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={handleLike}
                    className={clsx(
                      'flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-xl border transition-all duration-200',
                      liked
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'
                    )}
                  >
                    <Heart size={15} className={liked ? 'fill-red-500' : ''} />
                    {likeCount}
                  </button>
                </div>
              </div>

              {/* Key Takeaways */}
              <KeyTakeaways blog={blog} />

              {/* Article Body */}
              <ArticleBody body={blog.body} />

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
