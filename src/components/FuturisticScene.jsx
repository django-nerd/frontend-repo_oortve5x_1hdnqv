import React, { useMemo } from 'react'

// Deterministic PRNG (Mulberry32)
function mulberry32(a) {
  return function () {
    var t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

const defaultPalette = {
  skyTealA: '#0f172a', // deep slate base
  skyTealB: '#0b4452', // teal-dark
  skyTealC: '#0ea5b1', // teal accent
  glassBlue: '#60a5fa',
  glassBlueDeep: '#1e3a8a',
  neonBlue: '#38bdf8',
  neonOrange: '#fb923c',
  warmSun: '#ffd7a8',
}

export default function FuturisticScene({ width = 1600, height = 900, seed = 1, palette = defaultPalette, padding = 32, id, className = '', ...rest }) {
  const rand = useMemo(() => mulberry32(seed), [seed])

  // Horizon + perspective
  const horizonY = height * 0.58

  // Generate building specs in layers for depth
  const layers = useMemo(() => {
    const layerSpecs = []
    const layerCount = 4
    for (let i = 0; i < layerCount; i++) {
      const depth = i / (layerCount - 1)
      const count = Math.floor(lerp(6, 14, 1 - depth))
      const buildings = []
      let x = padding + rand() * 40
      const maxX = width - padding
      for (let b = 0; b < count && x < maxX; b++) {
        const w = lerp(60, 220, rand()) * lerp(0.35, 1, 1 - depth)
        const h = lerp(140, 540, rand()) * lerp(0.4, 1, 1 - depth)
        const gap = lerp(16, 42, rand())
        const tilt = lerp(-6, 6, rand())
        const stylePick = rand()
        const style = stylePick < 0.18 ? 'curve' : stylePick < 0.42 ? 'cantilever' : 'straight'
        buildings.push({ x, w, h, tilt, style })
        x += w + gap
      }
      layerSpecs.push({ depth, buildings })
    }
    return layerSpecs
  }, [width, height, padding, rand])

  // Neon accent lines
  const neonLines = useMemo(() => {
    const lines = []
    for (let i = 0; i < 10; i++) {
      const y = lerp(horizonY - height * 0.4, horizonY + height * 0.05, rand())
      const x1 = lerp(padding, width - padding, rand())
      const x2 = lerp(padding, width - padding, rand())
      lines.push({ x1, x2, y, hue: rand() > 0.5 ? 'blue' : 'orange' })
    }
    return lines
  }, [width, height, padding, horizonY, rand])

  const viewBox = `0 0 ${width} ${height}`

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Futuristic architectural glass city"
      id={id}
      className={className}
      style={{ width: '100%', height: 'auto' }}
      {...rest}
    >
      <defs>
        {/* Sky gradient */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyTealC} />
          <stop offset="55%" stopColor={palette.skyTealB} />
          <stop offset="100%" stopColor={palette.skyTealA} />
        </linearGradient>
        {/* Glass gradient base */}
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.glassBlue} stopOpacity="0.9" />
          <stop offset="50%" stopColor={palette.glassBlue} stopOpacity="0.35" />
          <stop offset="100%" stopColor={palette.glassBlueDeep} stopOpacity="0.8" />
        </linearGradient>
        {/* Reflection gradient */}
        <linearGradient id="reflect" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {/* Neon glows */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Soft sun glow */}
        <radialGradient id="sun" cx="75%" cy="18%" r="35%">
          <stop offset="0%" stopColor={palette.warmSun} stopOpacity="0.45" />
          <stop offset="60%" stopColor={palette.warmSun} stopOpacity="0.08" />
          <stop offset="100%" stopColor={palette.warmSun} stopOpacity="0" />
        </radialGradient>
        {/* Panel highlight */}
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        {/* Clip for horizon */}
        <clipPath id="belowHorizon">
          <rect x="0" y={horizonY} width={width} height={height - horizonY} />
        </clipPath>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width={width} height={height} fill="url(#sky)" />
      <rect x="0" y="0" width={width} height={height} fill="url(#sun)" />

      {/* Subtle perspective ground */}
      <g clipPath="url(#belowHorizon)">
        <linearGradient id="ground" x1="0" y1={horizonY} x2="0" y2={height}>
          <stop offset="0%" stopColor="#0b1220" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#030712" stopOpacity="0.95" />
        </linearGradient>
        <rect x="0" y={horizonY} width={width} height={height - horizonY} fill="url(#ground)" />
        {/* Perspective grid lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11
          const y = lerp(horizonY + 6, height - 6, t)
          return (
            <line key={i} x1={padding} x2={width - padding} y1={y} y2={y} stroke="#38bdf833" strokeWidth={1} />
          )
        })}
      </g>

      {/* Buildings */}
      {layers.map(({ depth, buildings }, li) => (
        <g key={li} opacity={lerp(0.68, 1, 1 - depth)}>
          {buildings.map((b, bi) => {
            const baseY = horizonY - lerp(40, 180, 1 - depth)
            const x = b.x
            const w = b.w
            const h = b.h
            const tilt = b.tilt
            const style = b.style
            const top = baseY - h
            const bottom = baseY

            if (style === 'curve') {
              // Sweeping curved tower using a gentle quadratic profile
              const cx = x + w * 0.5
              const curveOut = (rand() * 0.6 + 0.2) * w // outward bulge
              const leftBaseX = x
              const rightBaseX = x + w
              const leftTopX = cx - w * 0.35 - curveOut * 0.3
              const rightTopX = cx + w * 0.35 + curveOut * 0.6

              const pathD = `M ${leftBaseX},${bottom} C ${leftBaseX + curveOut * 0.2},${bottom - h * 0.6} ${leftTopX},${top + h * 0.25} ${leftTopX},${top}
                              L ${rightTopX},${top}
                              C ${rightBaseX - curveOut * 0.2},${bottom - h * 0.6} ${rightBaseX},${bottom} ${rightBaseX},${bottom}
                              Z`

              // panel lines following the curve
              const verticals = Math.max(3, Math.floor(w / 28))
              return (
                <g key={bi}>
                  <path d={pathD} fill="url(#glass)" stroke="#ffffff22" strokeWidth={1} />
                  <path d={pathD} fill="url(#reflect)" />
                  {Array.from({ length: verticals }).map((_, pi) => {
                    const t = (pi + 1) / (verticals + 1)
                    const px = leftBaseX + w * t
                    return <line key={pi} x1={px} y1={top} x2={px} y2={bottom} stroke="url(#panel)" strokeWidth={1} />
                  })}
                  {/* subtle neon edge highlight */}
                  <line x1={leftTopX} y1={top} x2={rightTopX} y2={top} stroke={bi % 2 === 0 ? palette.neonBlue : palette.neonOrange} strokeOpacity="0.65" strokeWidth={2} filter="url(#glow)" />
                </g>
              )
            }

            // Straight or cantilever base polygon (with tilt)
            const skew = Math.tan((tilt * Math.PI) / 180) * h
            const left = x
            const right = x + w
            const pts = [`${left + skew},${top}`, `${right + skew},${top}`, `${right},${bottom}`, `${left},${bottom}`].join(' ')
            const panelCount = Math.max(3, Math.floor(w / 28))

            return (
              <g key={bi}>
                <polygon points={pts} fill="url(#glass)" stroke="#ffffff22" strokeWidth={1} />
                <polygon points={pts} fill="url(#reflect)" />
                {Array.from({ length: panelCount }).map((_, pi) => {
                  const t = (pi + 1) / (panelCount + 1)
                  const xLineTop = lerp(left + skew, right + skew, t)
                  const xLineBottom = lerp(left, right, t)
                  return <line key={pi} x1={xLineTop} y1={top} x2={xLineBottom} y2={bottom} stroke="url(#panel)" strokeWidth={1} />
                })}

                {/* neon accent strip */}
                <line x1={left} y1={top + h * 0.22} x2={right} y2={top + h * 0.28} stroke={bi % 2 === 0 ? palette.neonBlue : palette.neonOrange} strokeOpacity="0.7" strokeWidth={2} filter="url(#glow)" />

                {/* cantilevered volume */}
                {b.style === 'cantilever' && (
                  (() => {
                    const cantH = h * 0.18
                    const cantW = w * (0.65 + rand() * 0.15)
                    const overhang = w * (0.18 + rand() * 0.18)
                    const cy = top + h * (0.28 + rand() * 0.18)
                    const cx = left + w * 0.25 - overhang
                    const cantPts = [`${cx},${cy}`, `${cx + cantW},${cy - cantH * 0.12}`, `${cx + cantW + overhang},${cy + cantH}`, `${cx + overhang},${cy + cantH * 1.12}`].join(' ')
                    return (
                      <g>
                        <polygon points={cantPts} fill="url(#glass)" stroke="#ffffff22" strokeWidth={1} />
                        <polygon points={cantPts} fill="url(#reflect)" />
                        <line x1={cx} y1={cy} x2={cx + cantW + overhang} y2={cy} stroke={palette.neonBlue} strokeOpacity="0.55" strokeWidth={2} filter="url(#glow)" />
                      </g>
                    )
                  })()
                )}
              </g>
            )
          })}
        </g>
      ))}

      {/* Neon horizon lines */}
      {neonLines.map((l, i) => (
        <g key={i} filter="url(#glow)">
          <line x1={l.x1} y1={l.y} x2={l.x2} y2={l.y} stroke={l.hue === 'blue' ? palette.neonBlue : palette.neonOrange} strokeOpacity="0.8" strokeWidth={2} />
        </g>
      ))}

      {/* Cinematic vignette */}
      <rect x="0" y="0" width={width} height={height} fill="#000" opacity="0.08" />
    </svg>
  )
}
