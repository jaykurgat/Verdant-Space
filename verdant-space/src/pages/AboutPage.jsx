import { useState } from 'react'
import { Mail, MapPin, Send, Check, Shield, Leaf, Users, Lightbulb, Sprout, BookOpen } from 'lucide-react'
import { useScrollFade } from '../hooks/useScrollFade'

const values = [
  {
    icon: Shield,
    title: 'Integrity',
    description: 'We uphold honesty, transparency and scientific accuracy in everything we publish.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We promote responsible environmental stewardship for present and future generations.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge',
    description: 'We believe informed people make better decisions for the environment.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We value partnerships and diverse perspectives to create meaningful impact.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace new ideas and technologies to solve environmental challenges.',
  },
  {
    icon: Sprout,
    title: 'Stewardship',
    description: 'We encourage the responsible management and restoration of forests and ecosystems.',
  },
]

const focusAreas = [
  'Forestry and Forest Conservation',
  'Climate Change and Adaptation',
  'Ecological Restoration',
  'Environmental Policy and Governance',
  'Community-Based Conservation',
  'Nature-Based Solutions',
  'Green Innovation and Technology',
  'Environmental Research',
  'Environmental Education',
]

function ContactForm() {
  const ref = useScrollFade()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSent(true)
    setSending(false)
  }

  return (
    <section ref={ref} className="py-24 px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <span className="accent-line">Get in Touch</span>
          <h2 className="heading-lg">Start a Conversation</h2>
          <p className="body-text">
            Whether you are a student beginning your environmental journey, a forester managing forests, a policy maker shaping sustainable solutions, or simply a citizen who cares about the planet — Verdant Space is always listening.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
              <Mail size={16} className="text-verdant flex-shrink-0" />
              hello@verdantspace.org
            </div>
            <div className="flex items-center gap-3 text-sm font-sans text-charcoal/70">
              <MapPin size={16} className="text-verdant flex-shrink-0" />
              Africa · Writing from everywhere
            </div>
          </div>
        </div>

        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-verdant/10 rounded-full flex items-center justify-center">
                <Check size={24} className="text-verdant" />
              </div>
              <h3 className="heading-sm">Message received</h3>
              <p className="body-text text-sm max-w-xs">
                Thank you for reaching out. We'll be in touch within a few days.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                className="btn-outline text-xs mt-2"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="block font-sans text-xs font-medium text-charcoal mb-2 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What's on your mind?"
                  required
                  rows={5}
                  className="textarea-field"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center"
              >
                {sending ? 'Sending…' : (<>Send Message <Send size={14} /></>)}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  const heroRef    = useScrollFade()
  const storyRef   = useScrollFade()
  const missionRef = useScrollFade()
  const focusRef   = useScrollFade()
  const valuesRef  = useScrollFade()

  return (
    <div className="min-h-screen pt-24">

      {/* ── Header ───────────────────────────────────────── */}
      <div ref={heroRef} className="max-w-6xl mx-auto px-6 py-16">
        <span className="accent-line">Our Story</span>
        <h1 className="heading-xl mt-3 mb-4">About Verdant Space</h1>
        <p className="body-text max-w-2xl text-lg leading-8">
          A trusted digital platform that transforms environmental knowledge into practical insights,
          connecting science, communities and decision-makers to build a more sustainable future.
        </p>
        <div className="w-20 h-1 bg-sage mt-8" />
      </div>

      {/* ── Origin Story ─────────────────────────────────── */}
      <section ref={storyRef} className="py-16 px-6 bg-sage/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <h2 className="heading-lg">Why I Started Verdant Space</h2>
            <div className="space-y-4 body-text leading-8">
              <p>
                It was born from the simple belief that knowledge has the power to transform how people relate to nature.
              </p>
              <p>
                Working in the forestry field, I have experienced firsthand the immense value of forests and ecosystems — not only for biodiversity but also for livelihoods, water security, climate resilience and the well-being of communities.
              </p>
              <p>
                At the same time, I have observed that much of the valuable research, field experience, and environmental knowledge remains inaccessible to the people who need it most.
              </p>
              <p>
                I started Verdant Space to bridge that gap. Whether someone is a student beginning their environmental journey, a forester managing forests, a policy maker shaping sustainable solutions, or simply a citizen who cares about the planet — this space is for you. It aims to provide reliable, relevant and engaging content.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-sm">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
                alt="Forest"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-forest p-6 rounded-sm max-w-[220px] hidden md:block">
              <p className="font-accent text-sage text-sm italic leading-relaxed">
                "Connecting people, Nature and Knowledge."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────── */}
      <section ref={missionRef} className="py-24 px-6 bg-forest">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <p className="font-accent text-sage text-base">Our Vision</p>
            <h3 className="font-serif text-2xl text-warm-white leading-snug">
              Africa's leading digital platform for environmental knowledge
            </h3>
            <p className="font-sans text-sm text-warm-white/60 leading-7">
              Inspiring informed action for healthy forests, resilient ecosystems, and sustainable communities.
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-accent text-sage text-base">Our Mission</p>
            <h3 className="font-serif text-2xl text-warm-white leading-snug">
              Connect people, nature, and knowledge
            </h3>
            <p className="font-sans text-sm text-warm-white/60 leading-7">
              Creating and sharing trusted environmental content that promotes forest conservation, biodiversity protection, climate resilience, ecological restoration, and sustainable natural resource management.
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-accent text-sage text-base">Our Purpose</p>
            <h3 className="font-serif text-2xl text-warm-white leading-snug">
              Make knowledge accessible, practical and impactful
            </h3>
            <p className="font-sans text-sm text-warm-white/60 leading-7">
              We bridge the gap between science, policy, and communities — providing reliable information that empowers people to protect and restore our natural world.
            </p>
          </div>
        </div>
      </section>

      {/* ── Areas of Focus ───────────────────────────────── */}
      <section ref={focusRef} className="py-24 px-6 bg-warm-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="accent-line">What We Cover</span>
              <h2 className="heading-lg">Areas of Focus</h2>
              <p className="body-text">
                Our content spans the full breadth of environmental knowledge — from field-level conservation to policy and governance.
              </p>
            </div>
            <ul className="space-y-3">
              {focusAreas.map((area) => (
                <li key={area} className="flex items-center gap-3 font-sans text-sm text-charcoal/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-verdant flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────── */}
      <section ref={valuesRef} className="py-24 px-6 bg-sage/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3">
            <span className="accent-line">What Guides Us</span>
            <h2 className="heading-lg">Core Values</h2>
            <p className="body-text max-w-xl mx-auto">
              Our brand promise: delivering credible, evidence-based environmental knowledge that informs decisions, inspires action, and supports sustainable development.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 p-6 border border-sage/20 bg-warm-white rounded-sm hover:border-verdant/30 transition-colors">
                <div className="w-10 h-10 bg-sage/15 rounded-sm flex items-center justify-center flex-shrink-0">
                  <v.icon size={18} className="text-verdant" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-forest">{v.title}</h3>
                  <p className="body-text text-sm leading-6">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}
