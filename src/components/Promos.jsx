import { motion, useReducedMotion } from 'motion/react'
import { callableStores as stores, promotions, telHref } from '../content'
import Silk from './Silk'
import { EASE, Eyebrow, Icon, SplitReveal } from './ui'

/** Promozione impaginata come un'etichetta sartoriale. */
function PromoTag({ p, i }) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      className="group relative flex flex-col rounded-[22px] bg-carta p-7 text-notte shadow-[0_40px_80px_-40px_rgba(0,0,0,.6)] sm:p-9"
      initial={reduce ? false : { opacity: 0, y: 60, rotate: i % 2 ? 2.5 : -2.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.8 : -0.8 }}
      whileHover={reduce ? undefined : { rotate: 0, y: -6 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
    >
      {/* foro dell'etichetta */}
      <span className="absolute left-1/2 top-4 size-3 -translate-x-1/2 rounded-full bg-notte ring-4 ring-avorio" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-2.5 rounded-[16px] border border-dashed border-notte/15" aria-hidden="true" />

      <p className="eyebrow mt-4 text-blu">{p.kicker}</p>
      <h3 className="display mt-4 text-[clamp(1.75rem,3vw,2.4rem)] leading-[1.05]">{p.title}</h3>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-notte/70">{p.text}</p>

      <div className="mt-auto pt-8">
        <div className="stitch text-notte/25" />
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            {p.price ? (
              <p className="display text-5xl text-blu">{p.price}</p>
            ) : (
              <p className="display-italic text-2xl text-blu">Prezzo in negozio</p>
            )}
            <p className="mt-1 text-xs text-notte/55">{[p.validity, p.stores].filter(Boolean).join(' · ')}</p>
          </div>
          <a
            href="#negozi"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-notte text-white transition-transform duration-500 ease-[var(--ease-silk)] group-hover:-rotate-45"
            aria-label={`Trova il negozio per: ${p.kicker}`}
          >
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Promos() {
  const active = promotions.filter((p) => p.active)
  return (
    <section id="promozioni" className="on-dark relative overflow-hidden bg-notte py-24 text-white lg:py-36" aria-labelledby="promo-title">
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <Silk palette="blue" speed={0.3} density={0.7} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-notte via-notte/70 to-notte" aria-hidden="true" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Eyebrow n="04" light>
              Promozioni
            </Eyebrow>
            <h2 id="promo-title" className="display mt-8 text-[clamp(2.5rem,5.6vw,4.9rem)] leading-[0.98] font-[350]">
              <SplitReveal text="Le offerte" className="block" />
              <SplitReveal text="del momento." className="block text-azzurro" delay={0.12} italicWords={[1]} />
            </h2>
          </div>
          <p className="max-w-md text-[1.02rem] leading-relaxed text-white/70 lg:col-span-5 lg:col-start-8">
            Le promozioni cambiano con le stagioni e possono variare da negozio a negozio. Passa a trovarci o chiamaci per
            conoscere le condizioni in vigore.
          </p>
        </div>

        {active.length > 0 ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-10 lg:px-10">
            {active.map((p, i) => (
              <PromoTag key={p.id} p={p} i={i} />
            ))}
          </div>
        ) : (
          <p className="display-italic mt-16 text-3xl text-white/80">Nuove offerte in arrivo. Chiedi in negozio.</p>
        )}

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70">
          <span className="eyebrow text-azzurro">Chiedi l’offerta</span>
          {stores.map((s) => (
            <a key={s.id} href={telHref(s.phone)} className="inline-flex items-center gap-2 rounded-full px-1 hover:text-white">
              <Icon name="phone" className="size-3.5" />
              {s.name} · {s.phone}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
