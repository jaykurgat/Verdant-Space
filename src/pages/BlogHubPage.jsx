import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import LoadingSpinner from '../components/LoadingSpinner'
import CategorySidebar from '../components/CategorySidebar'
import { useScrollFade } from '../hooks/useScrollFade'
import { getPosts } from '../lib/dataStore'

export default function BlogHubPage() {
  const [posts, setPosts]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [searchParams]            = useSearchParams()
  const [search, setSearch]       = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerRef = useScrollFade()

  const activeCategory    = searchParams.get('category') || ''
  const activeSubCategory = searchParams.get('sub') || ''

  useEffect(() => {
    getPosts().then((p) => { setPosts(p); setLoading(false) })
  }, [])

  const filtered = posts.filter((post) => {
    const matchSearch = !search ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
      post.category?.toLowerCase().includes(search.toLowerCase()) ||
      post.subCategory?.toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory    || post.category    === activeCategory
    const matchSub = !activeSubCategory || post.subCategory === activeSubCategory
    return matchSearch && matchCat && matchSub
  })

  const [featured, ...rest] = filtered

  // Build a readable heading for the current filter
  const filterLabel = activeSubCategory
    ? `${activeCategory} › ${activeSubCategory}`
    : activeCategory || 'All Articles'

  return (
    <div className="min-h-screen pt-24">

      {/* ── Page header ─────────────────────────────────── */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 py-12">
        <span className="accent-line">Environmental Writing</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-2">
          <div className="space-y-2">
            <h1 className="heading-xl">The Blog</h1>
            <p className="body-text max-w-xl">
              Long-form essays, field reports, and ecological analysis — exploring the systems, stories, and knowledge that shape our planet.
            </p>
          </div>
          {/* Search bar */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-light-grey" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="input-field pl-10 pr-10"
            />
            {search && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-light-grey hover:text-charcoal"
                onClick={() => setSearch('')}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Main layout: sidebar + content ──────────────── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex gap-10">

          {/* ── LEFT SIDEBAR — desktop always visible ─────── */}
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="sticky top-24">
              <CategorySidebar posts={posts} />
            </div>
          </aside>

          {/* ── MOBILE sidebar drawer ──────────────────────── */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 flex md:hidden">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-charcoal/40"
                onClick={() => setSidebarOpen(false)}
              />
              {/* Drawer */}
              <div className="relative z-10 w-72 bg-warm-white h-full overflow-y-auto p-6 shadow-xl">
                <CategorySidebar posts={posts} onClose={() => setSidebarOpen(false)} />
              </div>
            </div>
          )}

          {/* ── RIGHT: article grid ────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Active filter bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-xl text-forest">{filterLabel}</span>
                {(activeCategory || search) && (
                  <span className="font-sans text-sm text-light-grey">
                    — {filtered.length} article{filtered.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Mobile: open sidebar button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden flex items-center gap-2 btn-outline text-xs"
              >
                <SlidersHorizontal size={13} />
                Browse Topics
              </button>
            </div>

            {/* Results */}
            {loading ? (
              <LoadingSpinner />
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="font-serif text-2xl text-forest mb-3">No articles found</p>
                <p className="body-text text-sm">Try a different topic or clear your search.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Featured first post */}
                {featured && <BlogCard post={featured} featured />}

                {/* Grid of remaining */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {rest.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
