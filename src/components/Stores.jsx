import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  activeStores as stores,
  areHoursVerified,
  directionsHref,
  isPhoneVerified,
  listJoin,
  mapsHref,
  StoreCountWord,
  telHref,
} from '../content'
import { EASE, Eyebrow, Icon, Reveal, SplitReveal } from './ui'

/**
 * Mappa stilizzata (orientata a nord, non in scala) con tutte le sedi.
 * Panoramica su desktop e tablet, più alta su smartphone.
 */
function StyleMap({ active, setActive }) {
  const reduce = useReducedMotion()
  // collegamento in ordine geografico (ovest → est) per una linea pulita
  const ordered = [...stores].sort((a, b) => a.map.x - b.map.x)
  const path = ordered.map((s, i) => `${i ? 'L' : 'M'} ${s.map.x} ${s.map.y}`).join(' ')

  return (
    <div className="relative aspect-[4/3.4] w-full overflow-hidden rounded-[28px] bg-azzurro-100 ring-1 ring-notte/5 sm:aspect-[16/8] lg:aspect-[21/8]">
      {/* il territorio si "srotola" da ovest a est, come un tessuto */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        initial={reduce ? false : { clipPath: 'inset(0% 100% 0% 0%)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      >
        <defs>
          <pattern id="map-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M4 0H0V4" fill="none" stroke="#0A72B8" strokeOpacity="0.07" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#map-grid)" />
        {/* l'Adige, come un nastro di seta */}
        {[-1.4, 0, 1.4].map((o, i) => (
          <path
            key={i}
            d={`M${2 + o} 0 C ${14 + o} 22, ${22 + o} 30, ${40 + o} 44 S ${58 + o} 70, ${70 + o} 84 S ${88 + o} 96, ${100 + o} 100`}
            fill="none"
            stroke="#79BDD6"
            strokeWidth={i === 1 ? 5 : 1}
            strokeOpacity={i === 1 ? 0.9 : 0.6}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={path}
          fill="none"
          stroke="#203F57"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          vectorEffect="non-scaling-stroke"
        />
      </motion.svg>

      <span className="absolute left-5 top-4 text-[0.68rem] font-semibold tracking-[0.2em] text-notte/45" aria-hidden="true">
        N ↑ · VERONA
      </span>

      {stores.map((s, i) => {
        const on = active === s.id
        const labelLeft = s.map.x > 75
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
            className="absolute"
            style={{ left: `${s.map.x}%`, top: `${s.map.y}%`, translate: labelLeft ? 'calc(-100% + 10px) -50%' : '-10px -50%' }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 1 + i * 0.15 }}
            aria-label={`Vai al negozio di ${s.name}${s.provisional ? ' (nuova sede, operatività in verifica)' : ''}`}
          >
            <span className={`relative flex items-center gap-2 ${labelLeft ? 'flex-row-reverse' : ''}`}>
              <span
                className={`relative grid size-5 place-items-center rounded-full transition-colors ${
                  on ? 'bg-blu' : s.provisional ? 'border-2 border-dashed border-notte/60 bg-white' : 'bg-notte'
                }`}
              >
                <span className={`size-1.5 rounded-full ${s.provisional && !on ? 'bg-notte' : 'bg-white'}`} />
                {on && !reduce && <span className="absolute inset-0 animate-ping rounded-full bg-blu/50" />}
              </span>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 ${
                  on ? 'bg-blu text-white' : 'bg-white text-notte'
                }`}
              >
                <span className="sm:hidden">{s.shortName || s.name}</span>
                <span className="hidden sm:inline">{s.name}</span>
                {s.provisional && <span className={`ml-1.5 font-medium ${on ? 'text-white/75' : 'text-notte/50'}`}>· nuova</span>}
              </span>
            </span>
          </motion.button>
        )
      })}
      <p className="absolute bottom-3 right-5 text-[0.68rem] text-notte/50">Mappa illustrativa, non in scala</p>
    </div>
  )
}

function StoreCard({ s, i, active, setActive }) {
  const on = active === s.id
  const phoneOk = isPhoneVerified(s)
  const hoursOk = areHoursVerified(s)
  return (
    <Reveal delay={(i % 2) * 0.08} className="h-full">
      <article
        id={`negozio-${s.id}`}
        onMouseEnter={() => setActive(s.id)}
        className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] p-6 transition-all duration-500 ease-[var(--ease-silk)] sm:p-8 ${
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
          {s.provisional ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-notte/30 px-3 py-1.5 text-xs font-semibold text-notte/75">
              <span className="size-1.5 rounded-full bg-azzurro" aria-hidden="true" />
              Nuova sede · operatività in verifica
            </span>
          ) : (
            s.badge && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-avorio px-3 py-1.5 text-xs font-semibold text-notte">
                <Icon name="sun" className="size-3.5 text-blu" />
                {s.badge}
              </span>
            )
          )}
        </div>

        <div className="mt-6 grid gap-5 text-[0.95rem] sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
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
            <p className="eyebrow mb-2 text-notte/50">{s.hours && !hoursOk ? 'Orari indicativi' : 'Orari'}</p>
            {s.hours ? (
              <>
                <dl className="space-y-1 text-sm">
                  {s.hours.map(([d, h]) => (
                    <div key={d} className="flex justify-between gap-4">
                      <dt>{d}</dt>
                      <dd className="tabular-nums">{h}</dd>
                    </div>
                  ))}
                </dl>
                {!hoursOk && <p className="mt-2 text-xs leading-snug text-notte/55">Da confermare — chiedi in negozio prima di passare.</p>}
              </>
            ) : (
              <p className="text-sm leading-relaxed">In aggiornamento — chiama il negozio per conferma.</p>
            )}
          </div>
        </div>

        <div className="mt-auto pt-7">
          <div className="flex flex-wrap gap-2">
            <a
              href={telHref(s.phone)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                phoneOk ? 'bg-blu text-white hover:bg-notte' : 'text-notte ring-1 ring-inset ring-notte/25 hover:bg-notte hover:text-white'
              }`}
              aria-label={`Chiama ${s.name}: ${s.phone}${phoneOk ? '' : ' (numero da verificare)'}`}
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
              <span className="sr-only">per {s.name} (si apre in una nuova scheda)</span>
            </a>
            <a
              href={mapsHref(s.mapsQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold text-blu underline-offset-4 hover:underline"
            >
              Google Maps <Icon name="external" className="size-3.5" />
              <span className="sr-only">: {s.name} (si apre in una nuova scheda)</span>
            </a>
          </div>
          {!phoneOk && <p className="mt-3 text-xs text-notte/55">Recapito da verificare.</p>}
        </div>
      </article>
    </Reveal>
  )
}

export default function Stores() {
  const [active, setActive] = useState(stores[0].id)
  const cities = listJoin(stores.map((s) => s.schema.locality))
  return (
    <section id="negozi" className="relative bg-avorio-50 py-24 lg:py-36" aria-labelledby="negozi-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="05">Dove siamo</Eyebrow>
            <h2 id="negozi-title" className="display mt-8 text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98] font-[350] text-notte">
              <SplitReveal text={`${StoreCountWord} negozi,`} className="block" />
              <SplitReveal text="sempre vicino a te." className="block" delay={0.12} italicWords={[1, 2]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="text-[1.02rem] leading-relaxed text-notte/70">
              Lavanderia a {cities}. Scegli il punto vendita più comodo, chiamaci o fatti guidare fino alla porta.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14">
          <StyleMap active={active} setActive={setActive} />
        </Reveal>

        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:gap-5">
          {stores.map((s, i) => (
            <StoreCard key={s.id} s={s} i={i} active={active} setActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  )
}
