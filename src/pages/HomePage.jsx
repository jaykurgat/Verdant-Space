import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Leaf, BookOpen, ArrowRight } from 'lucide-react'
import BlogCard from '../components/BlogCard'
import GalleryCard from '../components/GalleryCard'
import Lightbox from '../components/Lightbox'
import LoadingSpinner from '../components/LoadingSpinner'
import HeroCarousel from '../components/HeroCarousel'
import { useScrollFade } from '../hooks/useScrollFade'
import { getPosts, getGallery, getHero } from '../lib/dataStore'

const pillars = [
  {
    icon: Users,
    title: 'People',
    description: 'Empowering communities, students, professionals, policymakers, and organizations through accessible environmental knowledge.',
  },
  {
    icon: Leaf,
    title: 'Nature',
    description: 'Promoting the conservation, restoration, and sustainable management of forests, biodiversity, wildlife, and natural ecosystems.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge',
    description: 'Sharing research, data, practical insights, and innovations that drive informed environmental action.',
  },
]

function PillarSection() {
  const ref = useScrollFade()
  return (
    <section ref={ref} className="py-24 px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-3">
          <span className="accent-line">What We Stand For</span>
          <h2 className="heading-lg">Three Pillars of Understanding</h2>
          <p className="body-text max-w-xl mx-auto">
            Verdant Space lives at the intersection of people, nature, and knowledge — where the most important environmental conversations are happening.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group p-8 border border-sage/30 rounded-sm hover:border-verdant/50 hover:bg-sage/5 transition-all duration-300 space-y-4"
            >
              <div className="w-12 h-12 bg-sage/20 rounded-sm flex items-center justify-center group-hover:bg-verdant/20 transition-colors duration-300">
                <pillar.icon size={22} className="text-verdant" />
              </div>
              <div>
                <h3 className="heading-sm mb-3">{pillar.title}</h3>
                <p className="body-text text-sm leading-7">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ObjectivesSection() {
  const ref = useScrollFade()
  const objectives = [
    'Promote environmental awareness and education',
    'Publish reliable and evidence-based environmental content',
    'Support forest conservation and restoration initiatives',
    'Advocate for biodiversity protection and climate resilience',
    'Encourage sustainable livelihoods and community participation',
  ]
  return (
    <section ref={ref} className="py-24 px-6 bg-forest">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-4">
          <span className="font-accent text-sage text-lg">Our Commitment</span>
          <h2 className="font-serif text-4xl text-warm-white leading-tight">
            What We Set Out to Do
          </h2>
          <p className="font-sans text-warm-white/60 text-sm leading-7">
            Every piece of content we publish is guided by a clear set of objectives — rooted in science, driven by community, and committed to a sustainable future.
          </p>
        </div>
        <ul className="space-y-4">
          {objectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="w-6 h-6 rounded-sm bg-sage/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="font-serif text-sage text-xs">{i + 1}</span>
              </span>
              <span className="font-sans text-sm text-warm-white/80 leading-6">{obj}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function LatestPostsSection({ posts }) {
  const ref = useScrollFade()
  return (
    <section ref={ref} className="py-24 px-6 bg-sage/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="accent-line">Recently Published</span>
            <h2 className="heading-lg">Latest from the Field</h2>
          </div>
          <Link to="/blog" className="btn-outline text-xs">
            View all articles <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryPreviewSection({ images }) {
  const ref = useScrollFade()
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const preview = images.slice(0, 6)

  return (
    <section ref={ref} className="py-24 px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="accent-line">Environmental Photography</span>
            <h2 className="heading-lg">The World in Frame</h2>
          </div>
          <Link to="/gallery" className="btn-outline text-xs">
            Full gallery <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {preview.map((image, i) => (
            <div key={image.id} className={i === 0 ? 'col-span-2 md:col-span-1' : ''}>
              <GalleryCard image={image} onClick={() => setLightboxIndex(i)} />
            </div>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={preview}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i - 1 + preview.length) % preview.length)}
          onNext={() => setLightboxIndex((i) => (i + 1) % preview.length)}
        />
      )}
    </section>
  )
}

function QuoteSection() {
  const ref = useScrollFade()
  return (
    <section ref={ref} className="py-24 px-6 bg-sage/10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <span className="font-accent text-verdant text-4xl leading-none">"</span>
        <p className="font-serif text-3xl md:text-4xl text-forest leading-relaxed italic">
          Knowledge has the power to transform how people relate to nature.
        </p>
        <div className="w-12 h-px bg-sage mx-auto" />
        <p className="font-sans text-sm text-light-grey">
          The founding belief of Verdant Space
        </p>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [hero, setHero]       = useState(null)
  const [posts, setPosts]     = useState([])
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getHero(), getPosts(), getGallery()]).then(([h, p, g]) => {
      setHero(h)
      setPosts(p)
      setGallery(g)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div>
      <HeroCarousel hero={hero} />

      <PillarSection />
      <LatestPostsSection posts={posts} />
      <ObjectivesSection />
      <QuoteSection />
      <GalleryPreviewSection images={gallery} />
    </div>
  )
}
