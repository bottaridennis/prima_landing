import { useId } from 'react'

/**
 * "Studi materici": campioni di tessuto disegnati in SVG, uno per servizio.
 * Leggeri, nitidi a ogni risoluzione, coordinati con la palette.
 * Ogni swatch ha una piega diagonale (ombra + luce) per dare profondità.
 */

const C = {
  blu: '#0A72B8',
  az: '#79BDD6',
  notte: '#203F57',
  avorio: '#EAE3D9',
  carta: '#F6F2EC',
  w: '#FFFFFF',
}

function Fold({ id, dark = false }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={dark ? 0.1 : 0.35} />
          <stop offset="0.42" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#000" stopOpacity={dark ? 0.35 : 0.16} />
          <stop offset="0.6" stopColor="#fff" stopOpacity={dark ? 0.12 : 0.3} />
          <stop offset="1" stopColor="#000" stopOpacity={dark ? 0.3 : 0.12} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-fold)`} />
    </>
  )
}

const materials = {
  // Lana: spina di pesce
  wool: (id) => (
    <>
      <defs>
        <pattern id={`${id}-p`} width="28" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <rect width="28" height="20" fill={C.notte} />
          {[0, 5, 10, 15].map((y) => (
            <g key={y} stroke={C.az} strokeOpacity="0.55" strokeWidth="1.6">
              <path d={`M0 ${y + 5} L14 ${y}`} />
              <path d={`M14 ${y} L28 ${y + 5}`} stroke={C.blu} strokeOpacity="0.9" />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-p)`} />
      <Fold id={id} dark />
    </>
  ),
  // Cotone: trama oxford fine + linea di cucitura del colletto
  cotton: (id) => (
    <>
      <defs>
        <pattern id={`${id}-p`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill={C.w} />
          <rect width="3" height="3" fill={C.azzurro ?? C.az} fillOpacity="0.35" />
          <rect x="3" y="3" width="3" height="3" fill={C.az} fillOpacity="0.22" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-p)`} />
      <path d="M-20 170 Q 200 330 420 170" fill="none" stroke={C.blu} strokeOpacity="0.5" strokeWidth="1.4" strokeDasharray="7 6" />
      <path d="M-20 196 Q 200 356 420 196" fill="none" stroke={C.blu} strokeOpacity="0.25" strokeWidth="1" />
      <circle cx="200" cy="330" r="13" fill={C.carta} stroke={C.notte} strokeOpacity="0.35" />
      <circle cx="196" cy="327" r="1.6" fill={C.notte} fillOpacity="0.5" />
      <circle cx="204" cy="327" r="1.6" fill={C.notte} fillOpacity="0.5" />
      <circle cx="196" cy="334" r="1.6" fill={C.notte} fillOpacity="0.5" />
      <circle cx="204" cy="334" r="1.6" fill={C.notte} fillOpacity="0.5" />
      <Fold id={id} />
    </>
  ),
  // Pelle: grana + impuntura
  leather: (id) => (
    <>
      <defs>
        <filter id={`${id}-f`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feColorMatrix values="0 0 0 0 0.92  0 0 0 0 0.89  0 0 0 0 0.85  0 0 0 -1.4 1.05" />
        </filter>
        <radialGradient id={`${id}-g`} cx="0.3" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#d9cbb6" />
          <stop offset="1" stopColor="#9f8a72" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-g)`} />
      <rect width="400" height="500" filter={`url(#${id}-f)`} opacity="0.55" />
      <rect x="34" y="34" width="332" height="432" rx="22" fill="none" stroke={C.carta} strokeOpacity="0.85" strokeWidth="2" strokeDasharray="9 7" />
      <Fold id={id} />
    </>
  ),
  // Tappeto: motivo kilim
  rug: (id) => (
    <>
      <defs>
        <pattern id={`${id}-p`} width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill={C.avorio} />
          <path d="M40 6 74 40 40 74 6 40Z" fill="none" stroke={C.blu} strokeWidth="5" />
          <path d="M40 22 58 40 40 58 22 40Z" fill={C.notte} />
          <path d="M40 32 48 40 40 48 32 40Z" fill={C.az} />
          <path d="M0 0 8 8M80 0 72 8M0 80 8 72M80 80 72 72" stroke={C.notte} strokeWidth="4" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-p)`} />
      <g stroke={C.avorio} strokeWidth="2" opacity="0.9">
        {Array.from({ length: 34 }, (_, i) => (
          <path key={i} d={`M${8 + i * 11.6} 470 q ${(i % 3) - 1} 18 ${(i % 2) * 3 - 1} 34`} />
        ))}
      </g>
      <rect y="458" width="400" height="12" fill={C.notte} />
      <Fold id={id} />
    </>
  ),
  // Restauro: trama aperta, filo che ricuce
  weave: (id) => (
    <>
      <rect width="400" height="500" fill={C.carta} />
      <g>
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={`v${i}`} x={i * 19} y="0" width="11" height="500" fill={C.notte} fillOpacity={i % 2 ? 0.85 : 0.7} />
        ))}
        {Array.from({ length: 27 }, (_, j) => (
          <g key={`h${j}`}>
            {Array.from({ length: 22 }, (_, i) =>
              (i + j) % 2 ? <rect key={i} x={i * 19 - 4} y={j * 19} width="19" height="11" fill={C.az} fillOpacity="0.95" /> : null
            )}
          </g>
        ))}
      </g>
      <rect x="150" y="150" width="120" height="150" fill={C.carta} />
      <path d="M150 170 C 200 160, 230 200, 270 180 M150 210 C 200 200, 230 240, 270 220 M150 250 C 190 240, 240 280, 270 260" stroke={C.blu} strokeWidth="2.4" fill="none" />
      <path d="M250 300 L 340 420" stroke={C.notte} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="248" cy="297" rx="3" ry="6" transform="rotate(-37 248 297)" fill="none" stroke={C.notte} strokeWidth="1.5" />
      <Fold id={id} />
    </>
  ),
  // Impermeabilizzazione: gocce perlate su tessuto tecnico
  water: (id) => (
    <>
      <defs>
        <pattern id={`${id}-p`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="5" height="5" fill={C.blu} />
          <rect width="2.5" height="5" fill="#0965a3" />
        </pattern>
        <radialGradient id={`${id}-d`} cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.8" stopColor={C.notte} stopOpacity="0.15" />
          <stop offset="1" stopColor={C.notte} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-p)`} />
      {[
        [90, 110, 26], [250, 80, 14], [320, 210, 34], [150, 260, 18], [70, 380, 30], [260, 380, 22], [200, 170, 9], [340, 440, 12], [120, 470, 10], [40, 230, 8],
      ].map(([x, y, r], i) => (
        <g key={i}>
          <ellipse cx={x + r * 0.15} cy={y + r * 0.35} rx={r} ry={r * 0.82} fill={C.notte} opacity="0.35" />
          <ellipse cx={x} cy={y} rx={r} ry={r * 0.86} fill={`url(#${id}-d)`} />
        </g>
      ))}
      <Fold id={id} dark />
    </>
  ),
  // Ozono: aria, velature
  air: (id) => (
    <>
      <defs>
        <filter id={`${id}-b`}>
          <feGaussianBlur stdDeviation="38" />
        </filter>
      </defs>
      <rect width="400" height="500" fill={C.azzurro100 ?? '#E3F1F7'} />
      <g filter={`url(#${id}-b)`}>
        <circle cx="120" cy="140" r="120" fill={C.az} />
        <circle cx="300" cy="300" r="140" fill={C.w} />
        <circle cx="140" cy="420" r="110" fill={C.blu} opacity="0.55" />
      </g>
      <g fill="none" stroke={C.w} strokeWidth="1.3" opacity="0.9">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M-10 ${120 + i * 34} C 100 ${80 + i * 34}, 260 ${170 + i * 34}, 410 ${110 + i * 34}`} />
        ))}
      </g>
      <g fill={C.w}>
        <circle cx="300" cy="120" r="3" />
        <circle cx="318" cy="132" r="3" />
        <circle cx="306" cy="146" r="3" />
      </g>
    </>
  ),
  // Sottovuoto: capi piegati sotto una pellicola lucida
  vacuum: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="0.56" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.7" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.74" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={C.avorio} />
      {[
        [C.notte, 330], [C.blu, 268], [C.az, 206], [C.carta, 144],
      ].map(([fill, y], i) => (
        <g key={i}>
          <rect x="62" y={y} width="276" height="60" rx="16" fill={fill} />
          <path d={`M62 ${y + 30} h276`} stroke="#000" strokeOpacity="0.08" />
          <rect x="62" y={y + 46} width="276" height="14" rx="7" fill="#000" fillOpacity="0.08" />
        </g>
      ))}
      <rect x="40" y="120" width="320" height="290" rx="34" fill="#fff" fillOpacity="0.12" stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
      <rect x="40" y="120" width="320" height="290" rx="34" fill={`url(#${id}-s)`} />
      <circle cx="320" cy="150" r="10" fill={C.carta} stroke={C.notte} strokeOpacity="0.4" />
    </>
  ),
  // Espresso: quadrante 24h su raso
  express: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={C.notte} />
          <stop offset="0.5" stopColor="#2a5577" />
          <stop offset="1" stopColor={C.notte} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${id}-g)`} />
      <g transform="translate(200 250)">
        <circle r="128" fill="none" stroke={C.az} strokeOpacity="0.25" />
        {Array.from({ length: 24 }, (_, i) => (
          <line key={i} y1={-128} y2={i % 6 ? -118 : -104} stroke={C.az} strokeWidth={i % 6 ? 1.2 : 2.4} transform={`rotate(${i * 15})`} />
        ))}
        <circle r="96" fill="none" stroke={C.w} strokeWidth="3" strokeDasharray="452 603" strokeLinecap="round" transform="rotate(-90)" />
        <text y="18" textAnchor="middle" fill={C.w} fontFamily="Fraunces Variable, Georgia, serif" fontSize="64" fontStyle="italic">24h</text>
      </g>
      <Fold id={id} dark />
    </>
  ),
}

export default function Swatch({ material, className = '' }) {
  const raw = useId()
  const id = 'sw' + raw.replace(/[^a-zA-Z0-9]/g, '')
  const render = materials[material] || materials.cotton
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className={`h-full w-full ${className}`} aria-hidden="true">
      {render(id)}
    </svg>
  )
}
