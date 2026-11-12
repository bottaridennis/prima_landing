import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { brand, nav, stores, telHref } from '../content'
import { Logo } from './Header'
import Silk from './Silk'
import { Button, Icon, SplitReveal } from './ui'

export function FinalCta() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [120, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1])

  return (
    <section ref={ref} className="on-dark relative bg-avorio-50 lg:px-0" aria-labelledby="cta-title">
      <motion.div style={{ borderTopLeftRadius: radius, borderTopRightRadius: radius, scale }} className="relative origin-bottom overflow-hidden bg-blu text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <Silk palette="mist" speed={0.5} density={0.9} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-notte/90 via-notte/40 to-blu/10" aria-hidden="true" />
        <div className="grain absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[88svh] max-w-[1400px] flex-col justify-end px-5 pb-16 pt-40 sm:px-8 lg:pb-24">
          <p className="eyebrow mb-8 flex items-center gap-3 text-azzurro">
            <span className="stitch w-8 text-azzurro/70" aria-hidden="true" /> 06 — Ti aspettiamo
          </p>
          <h2 id="cta-title" className="display max-w-[14ch] text-[clamp(3rem,9vw,8.4rem)] leading-[0.92] font-[350]">
            <SplitReveal text="Il tuo prossimo lavaggio," className="block" />
            <SplitReveal text="nelle mani giuste." className="block" delay={0.2} italicWords={[1, 2]} />
          </h2>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Button href="#negozi" variant="light" icon="pin">
              Trova il tuo negozio
            </Button>
            <Button href={`mailto:${brand.email}`} variant="ghostLight" icon="mail">
              Scrivici una mail
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark bg-notte-900 text-white/75" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Informazioni e contatti
      </h2>
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            Lavanderia e lavasecco professionale a San Giovanni Lupatoto, Legnago e Bovolone, in provincia di Verona.
          </p>
          <a href={`mailto:${brand.email}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-azzurro">
            <Icon name="mail" /> {brand.email}
          </a>
        </div>

        <nav aria-label="Navigazione a piè di pagina" className="lg:col-span-2">
          <p className="eyebrow mb-5 text-azzurro">Esplora</p>
          <ul className="space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-white">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
          {stores.map((s) => (
            <div key={s.id}>
              <p className="eyebrow mb-5 text-azzurro">{s.name}</p>
              <address className="text-sm not-italic leading-relaxed">
                {s.place !== s.street && (
                  <>
                    {s.place}
                    <br />
                  </>
                )}
                {s.street}
                <br />
                {s.city}
                <br />
                <a href={telHref(s.phone)} className="mt-2 inline-block font-medium text-white hover:text-azzurro">
                  Tel. {s.phone}
                </a>
              </address>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-6 pb-24 text-xs text-white/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:pb-6">
          <p>
            © {year} {brand.legalName}
            {brand.vat ? ` · P.IVA ${brand.vat}` : ' · P.IVA [da inserire]'}
          </p>
          <ul className="flex gap-5">
            {/* TODO: collegare le pagine legali definitive */}
            <li><a href="#privacy" className="hover:text-white">Privacy policy</a></li>
            <li><a href="#cookie" className="hover:text-white">Cookie policy</a></li>
            <li><a href="#note-legali" className="hover:text-white">Note legali</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

/** Barra contatti rapida, solo mobile: chiamata in un tocco. */
export function MobileBar() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [300, 500], ['120%', '0%'])
  return (
    <motion.nav
      style={{ y }}
      aria-label="Contatti rapidi"
      className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-1 rounded-full bg-notte/95 p-1.5 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,.5)] backdrop-blur lg:hidden"
    >
      <span className="pl-3 pr-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-azzurro">
        <Icon name="phone" className="size-4" />
        <span className="sr-only">Chiama</span>
      </span>
      {stores.map((s) => (
        <a
          key={s.id}
          href={telHref(s.phone)}
          className="flex min-h-11 flex-1 items-center justify-center rounded-full px-2 text-center text-[0.8rem] font-semibold transition-colors hover:bg-white/10 active:bg-blu"
          aria-label={`Chiama ${s.name}, ${s.phone}`}
        >
          {s.name}
        </a>
      ))}
    </motion.nav>
  )
}
