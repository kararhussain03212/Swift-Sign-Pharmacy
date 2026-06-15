import { useState } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import {
  ChevronRight,
  Search,
  ChevronDown,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  Mail,
} from 'lucide-react'
import { blogs } from '../data/blogs'
import BlogCard from '../components/ui/BlogCard'
import SectionHeader from '../components/ui/SectionHeader'

const CATEGORIES = [
  'All',
  'Baby Care',
  'Skin Care',
  'Nutrition',
  'Wellness',
  'Diabetes',
  'Heart Health',
  'Immunity',
  'Mental Health',
]

const categoryList = [
  { name: 'All',           count: blogs.length },
  { name: 'Baby Care',     count: blogs.filter(b => b.category === 'Baby Care').length },
  { name: 'Skin Care',     count: blogs.filter(b => b.category === 'Skin Care').length },
  { name: 'Nutrition',     count: blogs.filter(b => b.category === 'Nutrition').length },
  { name: 'Wellness',      count: blogs.filter(b => b.category === 'Wellness').length },
  { name: 'Diabetes',      count: blogs.filter(b => b.category === 'Diabetes').length },
  { name: 'Heart Health',  count: blogs.filter(b => b.category === 'Heart Health').length },
  { name: 'Immunity',      count: blogs.filter(b => b.category === 'Immunity').length },
  { name: 'Mental Health', count: blogs.filter(b => b.category === 'Mental Health').length },
]

const featured = blogs.find(b => b.featured)

const Blog = () => {
  const [searchQuery, setSearchQuery]     = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount]   = useState(6)
  const [sidebarSearch, setSidebarSearch] = useState('')

  const filtered = blogs
    .filter(b => !b.featured)
    .filter(b => activeCategory === 'All' || b.category === activeCategory)
    .filter(b =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <main>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #073B45 0%, #0FAFB8 100%)',
          padding: '100px 0 80px',
        }}
      >
        {/* Decorative BG elements */}
        <div
          className="pointer-events-none absolute"
          style={{
            right: '-80px',
            top: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.06)',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            right: '60px',
            top: '40px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        />
        <div
          className="pointer-events-none absolute"
          style={{
            left: '-30px',
            top: '50%',
            width: '120px',
            height: '40px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.04)',
            transform: 'rotate(-20deg)',
          }}
        />
        {/* Dots grid */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: '40px',
            bottom: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
              }}
            />
          ))}
        </div>

        {/* Inner */}
        <div className="max-w-[1280px] mx-auto px-5 text-center relative z-10">

          
          

          {/* Heading */}
          <h1
            className="font-heading font-extrabold text-white mb-3"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', lineHeight: 1.15 }}
          >
            Health Articles &amp;{' '}
            <span style={{ color: '#EAFBFC' }}>Wellness Tips</span>
          </h1>

          {/* Subtext */}
          <p className="text-white/60 max-w-xl mx-auto text-[15px] leading-relaxed mb-8">
            Expert-written guides on medicine, nutrition, skincare,
            and living your healthiest life.
          </p>

          {/* Search bar */}
          <div
            className="flex items-center bg-white rounded-full shadow-lg mx-auto overflow-hidden"
            style={{ maxWidth: '480px', height: '48px' }}
          >
            <Search size={18} className="ml-5 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="flex-1 px-3 text-[14px] text-gray-700 outline-none bg-transparent"
            />
            <button
              onClick={() => {}}
              className="bg-primary border border-primary hover:bg-primary-dark text-white font-bold text-[13px] px-8 h-full rounded-full transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-8 flex-wrap">
            {[
              { value: '120+', label: 'Articles' },
              { value: '15',   label: 'Categories' },
              { value: '50K+', label: 'Readers' },
              { value: '12',   label: 'Expert Authors' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="font-heading font-extrabold text-white text-xl">{stat.value}</p>
                <p className="text-white/50 text-[12px] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATEGORY FILTER PILLS
      ═══════════════════════════════════════ */}
      <div
        className="bg-white sticky z-30"
        style={{
          top: '100px',
          borderBottom: '1px solid #E5E7EB',
          padding: '16px 0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        <div className="max-w-[1280px] mx-auto px-5">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setVisibleCount(6) }}
                className={clsx(
                  'flex-shrink-0 rounded-full px-4 py-1.5 text-[13px] font-semibold border transition-all duration-200 whitespace-nowrap',
                  activeCategory === cat
                    ? 'bg-primary text-white border-primary shadow-glow'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FEATURED ARTICLE
      ═══════════════════════════════════════ */}
      {featured && (
        <div className="max-w-[1280px] mx-auto px-5 mt-10">
          <SectionHeader title="Featured Article" />

          <Link
            to={`/blog/${featured.slug}`}
            className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-card-hover group border border-gray-100 hover:-translate-y-1 transition-all duration-300"
          >

            {/* LEFT — Image */}
            <div className="relative overflow-hidden min-h-[280px]" style={{ aspectRatio: '16/9' }}>
              <img
                src={featured.cover}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
              <span
                className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1 rounded-full text-white"
                style={{ backgroundColor: featured.categoryColor }}
              >
                {featured.category}
              </span>
            </div>

            {/* RIGHT — Content */}
            <div className="bg-white p-8 flex flex-col justify-between">
              <div>
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
                    <Calendar size={13} /> {featured.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="flex items-center gap-1.5 text-[12px] text-gray-400">
                    <Clock size={13} /> {featured.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-heading font-bold text-gray-900 mb-3 leading-[1.35] group-hover:text-primary transition-colors"
                  style={{ fontSize: 'clamp(18px, 2.5vw, 24px)' }}
                >
                  {featured.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-3 mb-6">
                  {featured.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] bg-primary-light text-primary font-medium px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary-light"
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800 leading-none">
                      {featured.author.name}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{featured.author.role}</p>
                  </div>
                </div>

                {/* Read more — styled as button, navigation handled by parent Link */}
                <span className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-[13px] px-5 py-2.5 rounded-full transition-all shadow-glow">
                  Read Article <ArrowRight size={15} />
                </span>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* ═══════════════════════════════════════
          BLOG GRID + SIDEBAR
      ═══════════════════════════════════════ */}
      <div className="max-w-[1280px] mx-auto px-5 mt-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

          {/* ── LEFT: BLOG GRID ── */}
          <div>
            <SectionHeader
              title={activeCategory === 'All' ? 'All Articles' : activeCategory}
              subtitle={`${filtered.length} article${filtered.length !== 1 ? 's' : ''} found`}
            />

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
                <p className="font-heading font-semibold text-gray-600 text-lg">
                  No articles found
                </p>
                <p className="text-[13px] mt-1">Try a different category or search term</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {filtered.slice(0, visibleCount).map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>

                {/* Load More */}
                {visibleCount < filtered.length && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setVisibleCount(v => v + 6)}
                      className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full px-8 py-3 text-[14px] transition-all hover:shadow-glow"
                    >
                      Load More Articles <ChevronDown size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── RIGHT: SIDEBAR ── */}
          <aside className="space-y-6">

            {/* WIDGET 1: SEARCH */}
            {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4">
                Search Articles
              </h3>
              <div className="flex items-center border border-gray-200 rounded-full overflow-hidden focus-within:border-primary focus-within:shadow-glow transition-all">
                <input
                  value={sidebarSearch}
                  onChange={e => setSidebarSearch(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') setSearchQuery(sidebarSearch)
                  }}
                  placeholder="Search..."
                  className="flex-1 px-4 py-2.5 text-[13px] outline-none bg-transparent"
                />
                <button
                  onClick={() => setSearchQuery(sidebarSearch)}
                  className="bg-primary px-4 py-2.5 text-white hover:bg-primary-dark transition-colors"
                >
                  <Search size={15} />
                </button>
              </div>
            </div> */}

            {/* WIDGET 2: CATEGORIES */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4">
                Categories
              </h3>
              <ul className="space-y-1">
                {categoryList.map(cat => (
                  <li key={cat.name}>
                    <button
                      onClick={() => { setActiveCategory(cat.name); setVisibleCount(6) }}
                      className={clsx(
                        'w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-all',
                        activeCategory === cat.name
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-primary-light hover:text-primary'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                        {cat.name}
                      </span>
                      <span
                        className={clsx(
                          'text-[11px] font-bold px-2 py-0.5 rounded-full',
                          activeCategory === cat.name
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-500'
                        )}
                      >
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* WIDGET 3: POPULAR POSTS */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4">
                Popular Posts
              </h3>
              <div className="space-y-4">
                {blogs.slice(0, 4).map((post, i) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="flex gap-3 group"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      {/* <span className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </span> */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar size={11} /> {post.date}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* WIDGET 4: NEWSLETTER CTA */}
            {/* <div
              className="relative rounded-2xl overflow-hidden p-6 text-center"
              style={{ background: 'linear-gradient(135deg, #073B45, #0FAFB8)' }}
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border-2 border-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-white/10" />

              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Mail size={22} className="text-white" />
                </div>
                <h4 className="font-heading font-bold text-white text-[15px] mb-2">
                  Get Health Tips
                </h4>
                <p className="text-white/60 text-[12px] mb-4 leading-relaxed">
                  Weekly articles delivered to your inbox. No spam.
                </p>
                <input
                  placeholder="Your email"
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-[13px] text-white placeholder-white/40 outline-none focus:border-white/50 mb-2.5"
                />
                <button className="w-full bg-white text-primary font-bold rounded-full py-2.5 text-[13px] hover:bg-gray-100 transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div> */}

            {/* WIDGET 5: TAGS CLOUD */}
            {/* <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-heading font-bold text-gray-900 text-[15px] mb-4">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'health tips', 'vitamins', 'skincare', 'baby care',
                  'nutrition', 'wellness', 'omega 3', 'immunity',
                  'diabetes', 'heart health', 'sleep', 'pain relief',
                ].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[12px] border border-gray-200 rounded-full px-3 py-1 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div> */}

          </aside>
        </div>
      </div>
    </main>
  )
}

export default Blog
