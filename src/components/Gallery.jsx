import React from 'react'
import FuturisticScene from './FuturisticScene'

const seeds = [11, 23, 37, 49, 58, 67]

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {seeds.map((s) => (
        <div key={s} className="rounded-xl overflow-hidden bg-slate-900/60 ring-1 ring-white/10">
          <FuturisticScene seed={s} />
        </div>
      ))}
    </div>
  )
}
