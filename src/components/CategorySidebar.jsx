import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronRight, X } from 'lucide-react'
import { CATEGORIES } from '../lib/categories'

export default function CategorySidebar({ posts = [], onClose }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory    = searchParams.get('category') || ''
  const activeSubCategory = searchParams.get('sub') || ''

  // Track which categories are expanded
  const [expanded, setExpanded] = useState(() => {
    // Auto-expand the active category on load
    return activeCategory ? { [activeCategory]: true } : {}
  })

  // Auto-expand when active category changes
  useEffect(() => {
    if (activeCategory) {
      setExpanded((prev) => ({ ...prev, [activeCategory]: true }))
    }
  }, [activeCategory])

  const toggleExpand = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const selectCategory = (label) => {
    if (label === activeCategory && !activeSubCategory) {
      // clicking active top-level clears filter
      setSearchParams({})
    } else {
      setExpanded((prev) => ({ ...prev, [label]: true }))
      setSearchParams({ category: label })
    }
    onClose?.()
  }

  const selectSub = (category, sub) => {
    if (sub === activeSubCategory) {
      setSearchParams({ category })
    } else {
      setSearchParams({ category, sub })
    }
    onClose?.()
  }

  const clearAll = () => {
    setSearchParams({})
    onClose?.()
  }

  // Count posts per category and subcategory
  const countFor = (cat, sub) =>
    posts.filter((p) =>
      p.category === cat && (sub ? p.subCategory === sub : true)
    ).length

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-lg text-forest">Browse by Topic</h3>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-light-grey hover:text-charcoal">
            <X size={18} />
          </button>
        )}
      </div>

      {/* All articles link */}
      <button
        onClick={clearAll}
        className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-sm text-sm font-sans mb-1 transition-colors ${
          !activeCategory
            ? 'bg-forest text-warm-white font-medium'
            : 'text-charcoal/70 hover:bg-sage/10 hover:text-forest'
        }`}
      >
        <span>All Articles</span>
        <span className={`text-xs ${!activeCategory ? 'text-warm-white/60' : 'text-light-grey'}`}>
          {posts.length}
        </span>
      </button>

      {/* Divider */}
      <div className="border-t border-sage/20 my-3" />

      {/* Category tree */}
      <nav className="space-y-0.5">
        {CATEGORIES.map((cat) => {
          const isActiveCat  = activeCategory === cat.label
          const isExpanded   = expanded[cat.label]
          const hasSubs      = cat.subcategories.length > 0
          const catCount     = countFor(cat.label)

          return (
            <div key={cat.id}>
              {/* Category row */}
              <div className="flex items-stretch">
                {/* Main category button */}
                <button
                  onClick={() => selectCategory(cat.label)}
                  className={`flex-1 text-left flex items-center justify-between px-3 py-2 rounded-l-sm text-sm font-sans transition-colors ${
                    isActiveCat && !activeSubCategory
                      ? 'bg-forest text-warm-white font-medium'
                      : isActiveCat
                      ? 'bg-sage/15 text-forest font-medium'
                      : 'text-charcoal/70 hover:bg-sage/10 hover:text-forest'
                  }`}
                >
                  <span className="leading-snug pr-2">{cat.label}</span>
                  <span className={`text-xs flex-shrink-0 ${
                    isActiveCat && !activeSubCategory ? 'text-warm-white/60' : 'text-light-grey'
                  }`}>
                    {catCount > 0 ? catCount : ''}
                  </span>
                </button>

                {/* Expand/collapse toggle for categories with subs */}
                {hasSubs && (
                  <button
                    onClick={() => toggleExpand(cat.label)}
                    className={`px-2 rounded-r-sm transition-colors flex-shrink-0 ${
                      isActiveCat
                        ? isActiveCat && !activeSubCategory
                          ? 'bg-forest text-warm-white/70 hover:bg-verdant'
                          : 'bg-sage/15 text-forest hover:bg-sage/25'
                        : 'text-light-grey hover:bg-sage/10 hover:text-forest'
                    }`}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  </button>
                )}
              </div>

              {/* Subcategories — slide open/close */}
              {hasSubs && isExpanded && (
                <div className="ml-3 mt-0.5 mb-1 border-l-2 border-sage/30 pl-3 space-y-0.5">
                  {cat.subcategories.map((sub) => {
                    const isActiveSub = activeSubCategory === sub && isActiveCat
                    const subCount    = countFor(cat.label, sub)

                    return (
                      <button
                        key={sub}
                        onClick={() => selectSub(cat.label, sub)}
                        className={`w-full text-left flex items-center justify-between px-2 py-1.5 rounded-sm text-xs font-sans transition-colors ${
                          isActiveSub
                            ? 'bg-verdant text-warm-white font-medium'
                            : 'text-charcoal/60 hover:bg-sage/10 hover:text-forest'
                        }`}
                      >
                        <span>{sub}</span>
                        {subCount > 0 && (
                          <span className={`text-[10px] flex-shrink-0 ${isActiveSub ? 'text-warm-white/60' : 'text-light-grey'}`}>
                            {subCount}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
