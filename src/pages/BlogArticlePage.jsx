import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar, Share2, Check } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'
import CategorySidebar from '../components/CategorySidebar'
import { getPostById, getPosts } from '../lib/dataStore'
import { renderMarkdown } from '../utils/markdown'

export default function BlogArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [, setSearchParams] = useSearchParams()
  const [post, setPost]               = useState(null)
  const [allPosts, setAllPosts]       = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading]         = useState(true)
  const [copied, setCopied]           = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    Promise.all([getPostById(id), getPosts()]).then(([p, all]) => {
      if (!p) { navigate('/blog'); return }
      setPost(p)
      setAllPosts(all)
      setRelatedPosts(
        all.filter((a) => a.id !== id && a.category === p.category).slice(0, 3)
      )
      setLoading(false)
      // Set the URL params so sidebar knows what's active
      const params = { category: p.category }
      if (p.subCategory) params.sub = p.subCategory
      setSearchParams(params, { replace: true })
    })
  }, [id])

  const share = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return <LoadingSpinner />
  if (!post) return null

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="min-h-screen pt-16">

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
      </div>

      {/* ── Two-column layout: sidebar + article ─────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-12">

          {/* ── LEFT SIDEBAR — sticky, shows current topic ── */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-24">
              <CategorySidebar posts={allPosts} />
            </div>
          </aside>

          {/* ── ARTICLE content ─────────────────────────── */}
          <div className="flex-1 min-w-0 max-w-3xl">

            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-light-grey text-sm font-sans hover:text-verdant transition-colors mb-8"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            {/* Category breadcrumb */}
            <div className="flex items-center gap-1.5 flex-wrap mb-4">
              <span className="tag">{post.category}</span>
              {post.subCategory && (
                <>
                  <span className="text-light-grey text-xs">›</span>
                  <span className="tag bg-verdant/10 text-verdant">{post.subCategory}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl text-forest leading-tight mb-4">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="font-serif text-xl text-charcoal/65 italic leading-relaxed mb-6">
                {post.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-t border-b border-sage/20 mb-10">
              <div className="flex items-center gap-4 text-light-grey text-sm font-sans">
                <span className="flex items-center gap-1.5"><Calendar size={13} />{date}</span>
                <span className="flex items-center gap-1.5"><Clock size={13} />{post.readTime}</span>
                <span>By {post.author}</span>
              </div>
              <button
                onClick={share}
                className="inline-flex items-center gap-1.5 text-verdant text-sm font-sans hover:text-forest transition-colors"
              >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Body */}
            <article
              className="article-body"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }}
            />

            {/* Author footer */}
            <div className="mt-16 pt-8 border-t border-sage/20 flex items-center gap-3">
              <div className="w-10 h-10 bg-forest rounded-sm flex items-center justify-center">
                <span className="font-serif text-warm-white text-sm">VS</span>
              </div>
              <div>
                <p className="font-serif text-forest">{post.author}</p>
                <p className="font-sans text-xs text-light-grey">Verdant Space</p>
              </div>
            </div>

            {/* Related articles */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 space-y-6">
                <h3 className="heading-sm">
                  More in {post.subCategory || post.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.id}
                      to={`/blog/${rp.id}`}
                      className="group block border border-sage/20 rounded-sm overflow-hidden hover:border-verdant/40 transition-colors"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={rp.imageUrl}
                          alt={rp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="tag text-[10px] py-0.5">{rp.category}</span>
                          {rp.subCategory && (
                            <span className="tag bg-verdant/10 text-verdant text-[10px] py-0.5">{rp.subCategory}</span>
                          )}
                        </div>
                        <p className="font-serif text-base text-forest group-hover:text-verdant transition-colors line-clamp-2 mt-1">
                          {rp.title}
                        </p>
                        <p className="font-sans text-xs text-light-grey">{rp.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
