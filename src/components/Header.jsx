import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { activeStores as stores, isPhoneVerified, nav, telHref } from '../content'
import { Button, EASE, Icon } from './ui'

export function Logo({ light = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid size-9 place-items-center rounded-[10px] font-sans text-[0.95rem] font-extrabold tracking-[-0.04em] ${
          light ? 'bg-white text-blu' : 'bg-blu text-white'
        }`}
      >
        1A
      </span>
      <span className={`display text-[1.55rem] leading-none ${light ? 'text-white' : 'text-notte'}`}>
        Clean
      </span>
    </span>
  )
}

export default function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 600 && y > prev && !open)
  })

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`mx-3 mt-3 flex max-w-[1400px] items-center justify-between gap-6 rounded-full py-2.5 pl-4 pr-2.5 transition-all duration-500 sm:mx-5 lg:mx-8 lg:mt-4 lg:pl-6 min-[1464px]:mx-auto ${
            scrolled ? 'bg-white/80 shadow-[0_10px_40px_-18px_rgba(32,63,87,.35)] ring-1 ring-notte/5 backdrop-blur-xl' : 'bg-transparent'
          }`}
        >
          <a href="#top" aria-label="1A Clean — torna all’inizio">
            <Logo />
          </a>

          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group relative rounded-full px-4 py-2 text-[0.88rem] font-medium text-notte/80 transition-colors hover:text-notte"
                  >
                    {n.label}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-blu transition-transform duration-500 ease-[var(--ease-silk)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Button href="#negozi" className="!min-h-11" icon="pin">
                Trova il negozio
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full bg-notte text-white lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label="Apri il menu"
            >
              <Icon name="menu" className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 z-[60] flex flex-col bg-notte text-white lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-11 place-items-center rounded-full bg-white/10"
                aria-label="Chiudi il menu"
                autoFocus
              >
                <Icon name="close" className="size-5" />
              </button>
            </div>
            <nav aria-label="Menu mobile" className="flex-1 px-5 pt-6">
              <ul className="space-y-1">
                {nav.map((n, i) => (
                  <li key={n.href} className="overflow-hidden">
                    <motion.a
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 py-2 text-[2.6rem] leading-tight"
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="font-sans text-xs text-azzurro">0{i + 1}</span>
                      {n.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="grid gap-2 border-t border-white/10 px-5 py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="eyebrow mb-1 text-azzurro">Chiama il negozio</p>
              {stores.map((s) => (
                <a key={s.id} href={telHref(s.phone)} className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span className="font-medium">
                    {s.name}
                    {!isPhoneVerified(s) && <span className="ml-2 text-xs font-normal text-white/50">numero da verificare</span>}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-white/70">
                    {s.phone} <Icon name="phone" />
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
