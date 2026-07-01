import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import clsx from 'clsx'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Link2,
  BookOpen,
  Heart,
} from 'lucide-react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { blogs } from '../data/blogs'
import BlogCard from '../components/ui/BlogCard'
import { getBlogPostBySlug, likeBlogPost, resolveUploadUrl } from '../services/headerApi'
import { sanitizeHtml } from '../utils/sanitizeHtml'

const LIKED_STORAGE_KEY = 'liked_blog_posts'

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

/* ─── Helpers ────────────────────────────────────────── */
const formatDate = (value) => {
  if (!value) return ''
  const d = new Date(String(value).replace(' ', 'T'))
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const getInitials = (name) =>
  String(name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase())
    .join('')

const hasLiked = (slug) => {
  try {
    const stored = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) || '[]')
    return Array.isArray(stored) && stored.includes(slug)
  } catch {
    return false
  }
}

const markLiked = (slug) => {
  try {
    const stored = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) || '[]')
    const next = Array.isArray(stored) ? stored : []
    if (!next.includes(slug)) next.push(slug)
    localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* localStorage unavailable — degrade silently */
  }
}

/* ─── Skeleton ───────────────────────────────────────── */
const DetailSkeleton = () => (
  <main>
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)',
        padding: 'clamp(64px, 12vw, 120px) 0 clamp(48px, 9vw, 100px)',
      }}
    >
      <div className="max-w-[1280px] mx-auto px-5 relative z-10 animate-pulse">
        <div className="h-6 w-28 rounded-full bg-white/15 mb-4" />
        <div className="h-9 sm:h-12 max-w-2xl rounded-lg bg-white/15 mb-3" />
        <div className="h-9 sm:h-12 max-w-xl rounded-lg bg-white/15 mb-7" />
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full bg-white/15" />
          <div className="space-y-2">
            <div className="h-3 w-28 rounded bg-white/15" />
            <div className="h-2.5 w-20 rounded bg-white/10" />
          </div>
        </div>
      </div>
    </section>
    <div className="max-w-3xl mx-auto px-5 mb-16 mt-12 animate-pulse">
      <div className="h-14 rounded-2xl border border-gray-100 mb-8" />
      <div className="h-24 rounded-2xl bg-gray-100 mb-8" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-3/4" />
      </div>
    </div>
  </main>
)

/* ─── Main Page ─────────────────────────────────────── */
const BlogDetail = () => {
  const { slug } = useParams()
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'not-found' | 'error'
  const [article, setArticle] = useState(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  useEffect(() => {
    let active = true
    setStatus('loading')
    getBlogPostBySlug(slug)
      .then((data) => {
        if (!active) return
        if (!data) {
          setStatus('not-found')
          return
        }
        setArticle(data)
        setLikeCount(Number(data.likes_count) || 0)
        setLiked(hasLiked(slug))
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [slug])

  if (status === 'loading') return <DetailSkeleton />

  if (status === 'not-found' || status === 'error') {
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

  const handleLike = async () => {
    if (liked) return
    setLiked(true)
    setLikeCount(c => c + 1)
    markLiked(slug)
    try {
      const res = await likeBlogPost(slug)
      if (res && typeof res.likes_count === 'number') setLikeCount(res.likes_count)
      toast.success('Added to favourites! ❤️', { duration: 1500 })
    } catch {
      // optimistic update stays; the like was still recorded client-side
    }
  }

  const avatarUrl = article.author_avatar_url ? resolveUploadUrl(article.author_avatar_url) : ''
  const bodyHtml = sanitizeHtml(article.body_content ?? article.content ?? '')

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
            background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)',
            padding: 'clamp(64px, 12vw, 120px) 0 clamp(48px, 9vw, 100px)',
          }}
        >
          {/* Featured Image Background */}
          {article.image && (
            <img
              src={resolveUploadUrl(article.image)}
              alt={article.title}
              className="pointer-events-none absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.4 }}
            />
          )}

          {/* Decorative circles */}
          <div className="pointer-events-none absolute" style={{ right: '-80px', top: '-80px', width: '400px', height: '400px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.06)' }} />
          <div className="pointer-events-none absolute" style={{ right: '60px', top: '40px', width: '240px', height: '240px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)' }} />

          {/* Watermark word */}
          {(article.watermark_text || article.watermark) && (
            <span
              aria-hidden="true"
              className="pointer-events-none select-none absolute font-heading font-extrabold whitespace-nowrap"
              style={{
                right: '0',
                bottom: '-0.15em',
                fontSize: 'clamp(60px, 14vw, 160px)',
                lineHeight: 1,
                color: 'rgba(255,255,255,0.07)',
              }}
            >
              {article.watermark_text || article.watermark}
            </span>
          )}

          <div className="max-w-[1280px] mx-auto px-5 relative z-10">

            {/* Category pill */}
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white px-3.5 py-1.5 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}
            >
              <Tag size={10} /> {article.category}
            </span>

            {/* Title */}
            <h1
              className="font-heading font-extrabold text-white mb-5 max-w-3xl line-clamp-2"
              style={{ fontSize: 'clamp(24px, 4vw, 42px)', lineHeight: 1.2 }}
            >
              {article.title}
            </h1>

            {/* Author row */}
            <div className="flex flex-wrap items-center gap-5 mb-7">
              <div className="flex items-center gap-2.5">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={article.author}
                    className="w-9 h-9 rounded-full border-2 border-white/30 object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full border-2 border-white/30 bg-white/15 flex items-center justify-center text-white text-[12px] font-bold">
                    {getInitials(article.author) || '?'}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold text-[13px] leading-none">{article.author}</p>
                  {article.author_role && (
                    <p className="text-white/50 text-[11px] mt-0.5">{article.author_role}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-white/60 text-[12px]">
                <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(article.published_at)}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} /> {article.read_time} min read</span>
              </div>
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
                      <span className="text-[12px] sm:text-[13px] font-medium">{article.read_time} min read</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <BookOpen size={14} className="text-primary flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-medium">{article.content_type_label || 'Guide'}</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-gray-600">
                      <Tag size={13} className="text-primary flex-shrink-0" />
                      <span className="text-[12px] sm:text-[13px] font-medium truncate max-w-[100px]">{article.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLike}
                    disabled={liked}
                    className={clsx(
                      'flex items-center gap-1.5 text-[12px] sm:text-[13px] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 flex-shrink-0',
                      liked
                        ? 'bg-red-50 border-red-200 text-red-500 cursor-default'
                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400'
                    )}
                  >
                    <Heart size={13} className={liked ? 'fill-red-500' : ''} />
                    {likeCount}
                  </button>
                </div>
              </div>

              {/* Article Body */}
              <div className="prose-article space-y-8">
                {article.intro_highlight && (
                  <p className="text-[17px] leading-[1.9] text-gray-800 mb-8 font-medium border-l-4 pl-6 bg-primary/5 py-4 pr-4 rounded-r-xl" style={{ borderColor: 'var(--primary, #0FAFB8)' }}>
                    {article.intro_highlight}
                  </p>
                )}
                <div
                  className="font-serif text-[16px] leading-[1.85] text-gray-700 [&_p]:mb-6 [&_p]:font-serif [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-3xl [&_h2]:text-[#5a6d4a] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-3 [&_h2]:border-b-2 [&_h2]:border-gray-200 [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-xl [&_h3]:text-[#5a6d4a] [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_li]:mb-2 [&_li]:font-serif [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-[#6b5b4a] [&_blockquote]:bg-yellow-50 [&_blockquote]:py-4 [&_blockquote]:pr-4 [&_blockquote]:rounded-r-lg [&_blockquote]:my-6 [&_strong]:font-bold [&_strong]:text-[#8b6f47] [&_em]:italic [&_em]:text-[#6b5b4a]"
                  dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <ShareButtons title={article.title} slug={slug} />
              </div>

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
