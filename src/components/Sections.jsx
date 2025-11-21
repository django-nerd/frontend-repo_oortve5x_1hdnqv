import React from 'react'
import FuturisticScene from './FuturisticScene'

// Map of website sections to deterministic seeds for cohesive variety
const sections = [
  { key: 'hero', label: 'Hero banner', seed: 101 },
  { key: 'about', label: 'About', seed: 201 },
  { key: 'services', label: 'Services', seed: 301 },
  { key: 'portfolio', label: 'Portfolio', seed: 401 },
  { key: 'features', label: 'Features', seed: 501 },
  { key: 'team', label: 'Team', seed: 601 },
  { key: 'testimonials', label: 'Testimonials', seed: 701 },
  { key: 'contact', label: 'Contact', seed: 801 },
  { key: 'footer', label: 'Footer', seed: 901 },
]

export default function Sections() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sections.map((s) => (
        <div key={s.key} className="group rounded-2xl overflow-hidden ring-1 ring-white/10 bg-slate-900/60">
          <div className="relative">
            <FuturisticScene seed={s.seed} />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <p className="text-sm tracking-wide text-blue-100/90">{s.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
