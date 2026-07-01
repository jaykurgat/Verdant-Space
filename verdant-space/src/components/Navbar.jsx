import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
  { to: '/',        label: 'Home'      },
  { to: '/blog',    label: 'Blog'      },
  { to: '/gallery', label: 'Pictorial' },
  { to: '/about',   label: 'About'     },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Detect if we are on the homepage (hero has dark background)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  // When on homepage and NOT scrolled: transparent bar, white text
  // When scrolled OR on any other page: glass bar, dark text
  const isLight = scrolled || !isHome

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isLight ? 'glass-nav shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-sage rounded-sm flex items-center justify-center group-hover:bg-verdant transition-colors duration-300">
            <Leaf size={16} className="text-forest" />
          </div>
          <span className={`font-serif text-xl tracking-wide leading-none transition-colors duration-300 ${
            isLight ? 'text-forest' : 'text-warm-white'
          }`}>
            Verdant<span className={isLight ? 'text-verdant' : 'text-sage'}>Space</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm tracking-wide transition-colors duration-200 relative group ${
                location.pathname === link.to
                  ? isLight ? 'text-verdant' : 'text-sage'
                  : isLight
                    ? 'text-charcoal hover:text-forest'
                    : 'text-warm-white/80 hover:text-warm-white'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                isLight ? 'bg-verdant' : 'bg-sage'
              } ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          ))}
          <Link to="/blog" className={`font-sans font-medium text-xs px-4 py-2 rounded-sm transition-all duration-300 ${
            isLight
              ? 'bg-forest text-warm-white hover:bg-verdant'
              : 'bg-warm-white/15 text-warm-white border border-warm-white/30 hover:bg-warm-white/25'
          }`}>
            Read Latest
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${isLight ? 'text-forest' : 'text-warm-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden glass-nav border-t border-sage/20 overflow-hidden transition-all duration-300 ${
        open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-sans text-sm py-2 border-b border-sage/20 transition-colors ${
                location.pathname === link.to ? 'text-verdant' : 'text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/blog" className="btn-primary text-xs text-center justify-center">
            Read Latest
          </Link>
        </div>
      </div>
    </nav>
  )
}
