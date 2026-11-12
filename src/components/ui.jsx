import { motion, useReducedMotion } from 'motion/react'

export const EASE = [0.22, 1, 0.36, 1]

/** Testo che sale da una maschera, parola per parola. */
export function SplitReveal({ text, as: Tag = 'span', className = '', delay = 0, stagger = 0.06, once = true, italicWords = [] }) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${italicWords.includes(i) ? 'display-italic' : ''}`}
            initial={reduce ? false : { y: '110%', rotate: 4 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  )
}

/** Fade + salita leggera all'ingresso in viewport. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const M = motion[as]
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  )
}

/** Rivelazione "a sipario" per immagini: il tessuto si scopre dall'alto. */
export function CurtainReveal({ children, className = '', delay = 0, from = 'bottom' }) {
  const reduce = useReducedMotion()
  const hidden = from === 'bottom' ? 'inset(100% 0% 0% 0% round 28px)' : 'inset(0% 0% 0% 100% round 28px)'
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: hidden }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay }}
    >
      <motion.div
        className="h-full w-full"
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/** Pulsante con riempimento che "scorre" come un nastro. */
export function Button({ href, children, variant = 'primary', icon = 'arrow', className = '', ...rest }) {
  const styles = {
    primary: 'bg-blu text-white',
    dark: 'bg-notte text-white',
    light: 'bg-white text-notte',
    ghost: 'bg-transparent text-notte ring-1 ring-inset ring-notte/25',
    ghostLight: 'bg-transparent text-white ring-1 ring-inset ring-white/35',
  }
  const fill = {
    primary: 'bg-notte',
    dark: 'bg-blu',
    light: 'bg-azzurro',
    ghost: 'bg-notte',
    ghostLight: 'bg-white',
  }
  const hoverText = {
    ghost: 'group-hover:text-white',
    ghostLight: 'group-hover:text-notte',
    light: '',
    primary: '',
    dark: '',
  }
  return (
    <a
      href={href}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3 text-[0.92rem] font-semibold tracking-[-0.005em] transition-transform duration-300 ease-[var(--ease-silk)] active:scale-[0.97] ${styles[variant]} ${className}`}
      {...rest}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-bottom translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-y-0 ${fill[variant]}`}
        style={{ borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }}
      />
      <span className={`relative transition-colors duration-300 ${hoverText[variant]}`}>{children}</span>
      {icon && (
        <span className={`relative grid size-6 place-items-center overflow-hidden rounded-full bg-current/10 transition-colors duration-300 ${hoverText[variant]}`}>
          <Icon name={icon} className="size-3.5 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-[150%]" />
          <Icon name={icon} className="absolute size-3.5 -translate-x-[150%] transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-0" />
        </span>
      )}
    </a>
  )
}

export function Icon({ name, className = 'size-4' }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    arrow: <path d="M4 12h15m-6-6 6 6-6 6" />,
    down: <path d="M12 4v15m-6-6 6 6 6-6" />,
    phone: (
      <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z" />
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2.2" />
        <circle cx="18" cy="6" r="2.2" />
        <path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" />
      </>
    ),
    pin: (
      <>
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
        <circle cx="12" cy="10" r="2.3" />
      </>
    ),
    mail: (
      <>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    external: <path d="M14 4h6v6m0-6-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
    menu: <path d="M4 8h16M4 16h10" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M5.6 18.4 7 17m10-10 1.4-1.4" />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
      {paths[name]}
    </svg>
  )
}

export function Eyebrow({ n, children, light = false }) {
  return (
    <div className={`flex items-center gap-3 ${light ? 'text-azzurro' : 'text-blu'}`}>
      {n && <span className="font-display text-sm italic">{n}</span>}
      <span className={`stitch w-8 ${light ? 'text-azzurro/70' : 'text-blu/60'}`} aria-hidden="true" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}

/** Mostra la foto se disponibile, altrimenti il visual generativo. */
export function Media({ src, alt = '', children, className = '' }) {
  if (src) {
    return <img src={src} alt={alt} loading="lazy" decoding="async" className={`h-full w-full object-cover ${className}`} />
  }
  return children
}
