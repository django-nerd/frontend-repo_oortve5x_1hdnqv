import React from 'react'
import Gallery from './components/Gallery'
import FuturisticScene from './components/FuturisticScene'
import Sections from './components/Sections'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="relative isolate">
        <div className="absolute inset-0 opacity-60 -z-10">
          <FuturisticScene seed={101} />
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Cyber‑Modern Architecture Pack
            </h1>
            <p className="mt-4 text-blue-200 max-w-2xl mx-auto">
              A cohesive set of ultra‑detailed, minimal, elegant scenes with reflective glass, clean lines, and subtle blue/orange neon accents.
            </p>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-7xl mx-auto px-6 pb-20 space-y-20">
        {/* Hero banner examples */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">Hero banners</h2>
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-slate-900/50">
            <FuturisticScene seed={201} />
          </div>
        </section>

        {/* Full pack mapped to website sections */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">Full website image set</h2>
          <Sections />
        </section>

        {/* Service section grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">Service sections</h2>
          <Gallery />
        </section>

        {/* About / wide */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">About pages</h2>
          <div className="rounded-2xl overflow-hidden ring-1 ring-white/10 bg-slate-900/50">
            <FuturisticScene seed={333} />
          </div>
        </section>

        {/* Background strips */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-blue-200">Backgrounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-slate-900/50">
              <FuturisticScene seed={441} />
            </div>
            <div className="rounded-xl overflow-hidden ring-1 ring-white/10 bg-slate-900/50">
              <FuturisticScene seed={552} />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-blue-300/70">
        Consistent color, perspective, and mood across all images
      </footer>
    </div>
  )
}

export default App
