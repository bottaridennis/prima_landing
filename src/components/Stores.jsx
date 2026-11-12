import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { directionsHref, mapsHref, stores, telHref } from '../content'
import { EASE, Eyebrow, Icon, Reveal, SplitReveal } from './ui'

/** Mappa stilizzata (non geografica in scala) della provincia, con i tre negozi. */
function StyleMap({ active, setActive }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-azzurro-100 ring-1 ring-notte/5">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
            <path d="M5 0H0V5" fill="none" stroke="#0A72B8" strokeOpacity="0.07" strokeWidth="0.2" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* il fiume Adige, come un nastro di seta */}
        {[0, 1.2, 2.4].map((o, i) => (
          <motion.path
            key={i}
            d={`M${8 + o} 0 C ${20 + o} 18, ${10 + o} 26, ${32 + o} 34 S ${48 + o} 52, ${64 + o} 62 S ${70 + o} 86, ${92 + o} 100`}
            fill="none"
            stroke="#79BDD6"
            strokeWidth={i === 1 ? 1.6 : 0.4}
            strokeOpacity={i === 1 ? 0.9 : 0.6}
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: EASE, delay: 0.2 + i * 0.1 }}
          />
        ))}
        {/* collegamenti tra negozi */}
        <motion.path
          d={`M${stores[0].map.x} ${stores[0].map.y} L ${stores[2].map.x} ${stores[2].map.y} L ${stores[1].map.x} ${stores[1].map.y}`}
          fill="none"
          stroke="#203F57"
          strokeOpacity="0.35"
          strokeWidth="0.35"
          strokeDasharray="1.2 1.2"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: EASE, delay: 0.8 }}
        />
        <text x="12" y="10" fontSize="2.6" fill="#203F57" fillOpacity="0.45" fontFamily="Manrope Variable, sans-serif" letterSpacing="0.4">
          VERONA ↑
        </text>
      </svg>

      {stores.map((s, i) => {
        const on = active === s.id
        return (
          <motion.button
            key={s.id}
            type="button"
            onMouseEnter={() => setActive(s.id)}
            onFocus={() => setActive(s.id)}
            onClick={() => {
              setActive(s.id)
              document.getElementById(`negozio-${s.id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' })
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${s.map.x}%`, top: `${s.map.y}%` }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1 + i * 0.15 }}
            aria-label={`Vai al negozio di ${s.name}`}
          >
            <span className="relative flex items-center gap-2">
              <span className={`relative grid size-5 place-items-center rounded-full transition-colors ${on ? 'bg-blu' : 'bg-notte'}`}>
                <span className="size-1.5 rounded-full bg-white" />
                {on && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-blu/50" />}
              </span>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 ${
                  on ? 'bg-blu text-white' : 'bg-white text-notte'
                }`}
              >
                {s.name}
              </span>
            </span>
          </motion.button>
        )
      })}
      <p className="absolute bottom-4 left-5 text-[0.7rem] text-notte/50">Mappa illustrativa, non in scala</p>
    </div>
  )
}

function StoreCard({ s, i, active, setActive }) {
  const on = active === s.id
  return (
    <Reveal delay={i * 0.08}>
      <article
        id={`negozio-${s.id}`}
        onMouseEnter={() => setActive(s.id)}
        className={`group relative overflow-hidden rounded-[24px] p-6 transition-all duration-500 ease-[var(--ease-silk)] sm:p-8 ${
          on ? 'bg-white shadow-[0_30px_60px_-35px_rgba(20,42,59,.45)] ring-1 ring-blu/20' : 'bg-white/60 ring-1 ring-notte/[0.07]'
        }`}
        aria-labelledby={`store-${s.id}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow text-blu">{s.place}</p>
            <h3 id={`store-${s.id}`} className="display mt-2 text-[2.2rem] leading-none text-notte sm:text-[2.6rem]">
              {s.name}
            </h3>
          </div>
          {s.badge && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-avorio px-3 py-1.5 text-xs font-semibold text-notte">
              <Icon name="sun" className="size-3.5 text-blu" />
              {s.badge}
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-5 text-[0.95rem] sm:grid-cols-2">
          <address className="not-italic leading-relaxed text-notte/80">
            <span className="flex gap-2">
              <Icon name="pin" className="mt-1 size-4 shrink-0 text-blu" />
              <span>
                {s.street}
                <br />
                {s.city}
                <br />
                <span className="text-sm text-notte/55">{s.hint}</span>
              </span>
            </span>
          </address>
          <div className="text-notte/80">
            <p className="eyebrow mb-2 text-notte/50">Orari</p>
            {s.hours ? (
              <dl className="space-y-1 text-sm">
                {s.hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-4">
                    <dt>{d}</dt>
                    <dd className="tabular-nums">{h}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="text-sm leading-relaxed">In aggiornamento — chiama il negozio per conferma.</p>
            )}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <a
            href={telHref(s.phone)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blu px-5 text-sm font-semibold text-white transition-colors hover:bg-notte"
          >
            <Icon name="phone" /> {s.phone}
          </a>
          <a
            href={directionsHref(s.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-notte/[0.06] px-5 text-sm font-semibold text-notte transition-colors hover:bg-notte hover:text-white"
          >
            <Icon name="route" /> Indicazioni stradali
            <span className="sr-only">(si apre in una nuova scheda)</span>
          </a>
          <a
            href={mapsHref(s.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-blu underline-offset-4 hover:underline"
          >
            Google Maps <Icon name="external" className="size-3.5" />
            <span className="sr-only">(si apre in una nuova scheda)</span>
          </a>
        </div>
      </article>
    </Reveal>
  )
}

export default function Stores() {
  const [active, setActive] = useState(stores[0].id)
  return (
    <section id="negozi" className="relative bg-avorio-50 py-24 lg:py-36" aria-labelledby="negozi-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="05">Dove siamo</Eyebrow>
            <h2 id="negozi-title" className="display mt-8 text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98] font-[350] text-notte">
              <SplitReveal text="Tre negozi," className="block" />
              <SplitReveal text="sempre vicino a te." className="block" delay={0.12} italicWords={[1, 2]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="text-[1.02rem] leading-relaxed text-notte/70">
              Lavanderia a San Giovanni Lupatoto, Legnago e Bovolone. Scegli il punto vendita più comodo, chiamaci o fatti guidare
              fino alla porta.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <StyleMap active={active} setActive={setActive} />
            </div>
          </div>
          <div className="grid gap-4 lg:col-span-7 lg:gap-5">
            {stores.map((s, i) => (
              <StoreCard key={s.id} s={s} i={i} active={active} setActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
