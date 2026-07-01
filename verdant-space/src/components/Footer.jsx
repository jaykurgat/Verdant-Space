import { Link } from 'react-router-dom'
import { Leaf, Mail, MapPin } from 'lucide-react'

const focusAreas = [
  'Forestry and Forest Conservation',
  'Climate Change and Adaptation',
  'Ecological Restoration',
  'Community-Based Conservation',
  'Nature-Based Solutions',
  'Environmental Education',
]

export default function Footer() {
  return (
    <footer className="bg-forest text-warm-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-sage rounded-sm flex items-center justify-center">
                <Leaf size={14} className="text-forest" />
              </div>
              <span className="font-serif text-xl text-warm-white">VerdantSpace</span>
            </Link>
            <p className="font-sans text-sm text-warm-white/60 leading-relaxed max-w-xs">
              Africa's trusted digital platform for environmental knowledge — connecting science, communities and decision-makers to build a more sustainable future.
            </p>
            <p className="font-accent text-sage text-base italic">
              "Connecting People, Nature and Knowledge"
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-warm-white/50 text-xs font-sans">
                <Mail size={12} />
                hello@verdantspace.org
              </div>
              <div className="flex items-center gap-2 text-warm-white/50 text-xs font-sans">
                <MapPin size={12} />
                Africa
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-sage">Explore</h4>
            <ul className="space-y-2">
              {[
                { to: '/',       label: 'Home'             },
                { to: '/blog',   label: 'Blog'             },
                { to: '/gallery',label: 'Pictorial Gallery'},
                { to: '/about',  label: 'About & Contact'  },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-sans text-sm text-warm-white/70 hover:text-sage transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus Areas */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-sage">Focus Areas</h4>
            <ul className="space-y-2">
              {focusAreas.map((area) => (
                <li key={area}>
                  <Link
                    to={`/blog?category=${encodeURIComponent(area)}`}
                    className="font-sans text-sm text-warm-white/70 hover:text-sage transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-warm-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-warm-white/40">
            © {new Date().getFullYear()} Verdant Space. All rights reserved.
          </p>
          <p className="font-sans text-xs text-warm-white/30 italic">
            Delivering credible, evidence-based environmental knowledge.
          </p>
        </div>
      </div>
    </footer>
  )
}
