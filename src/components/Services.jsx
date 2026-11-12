import { motion, useReducedMotion } from 'motion/react'
import { photos, services } from '../content'
import Swatch from './Swatch'
import { EASE, Eyebrow, Icon, Media, Reveal, SplitReveal } from './ui'

// Composizione editoriale asimmetrica su 12 colonne (desktop)
const layout = [
  'lg:col-span-5 lg:row-span-2',
  'lg:col-span-4',
  'lg:col-span-3',
  'lg:col-span-7',
  'lg:col-span-4 lg:row-span-2',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
  'lg:col-span-4',
]
const tall = [0, 4]

function Card({ s, i }) {
  const reduce = useReducedMotion()
  const isTall = tall.includes(i)
  return (
    <motion.article
      className={`group relative flex w-[78vw] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-notte/[0.07] sm:w-[46vw] lg:w-auto ${layout[i]}`}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, ease: EASE, delay: (i % 3) * 0.08 }}
    >
      <div className={`relative overflow-hidden ${isTall ? 'aspect-[4/3] lg:aspect-auto lg:flex-1' : 'aspect-[4/3] lg:aspect-[16/9]'}`}>
        <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.06] group-hover:-rotate-[0.6deg]">
          <Media src={photos.services[s.id]} alt={s.title}>
            <Swatch material={s.material} />
          </Media>
        </div>
        {/* velo che scorre come un tessuto al passaggio del mouse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -translate-y-full bg-gradient-to-b from-blu/0 via-blu/35 to-notte/70 transition-transform duration-[900ms] ease-[var(--ease-silk)] group-hover:translate-y-0"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 font-display text-sm italic text-notte backdrop-blur">
          {s.n}
        </span>
        <span className="absolute bottom-4 right-4 grid size-11 translate-y-3 place-items-center rounded-full bg-white text-notte opacity-0 transition-all duration-500 ease-[var(--ease-silk)] group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="plus" className="size-4 transition-transform duration-500 group-hover:rotate-90" />
        </span>
      </div>
      <div className="flex flex-col gap-2 p-5 sm:p-6">
        <h3 className="display text-[1.45rem] leading-tight text-notte transition-colors duration-300 group-hover:text-blu sm:text-[1.6rem]">
          {s.title}
        </h3>
        <p className="text-[0.92rem] leading-relaxed text-notte/70">{s.text}</p>
      </div>
    </motion.article>
  )
}

export default function Services() {
  return (
    <section id="servizi" className="relative bg-avorio-50 py-24 lg:py-36" aria-labelledby="servizi-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow n="02">I nostri servizi</Eyebrow>
            <h2 id="servizi-title" className="display mt-8 text-[clamp(2.5rem,6vw,5.25rem)] leading-[0.98] font-[350] text-notte">
              <SplitReveal text="Ogni tessuto ha" className="block" />
              <SplitReveal text="il suo trattamento." className="block" delay={0.15} italicWords={[2]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="text-[1.02rem] leading-relaxed text-notte/70">
              Dal capo di tutti i giorni al tappeto di famiglia: trattamenti professionali scelti in base alla fibra, al colore e
              all’uso. Scorri e scopri cosa possiamo fare per te.
            </p>
          </Reveal>
        </div>

        <div
          className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-12 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
          role="list"
          aria-label="Elenco dei servizi"
        >
          {services.map((s, i) => (
            <div key={s.id} role="listitem" className={`contents`}>
              <Card s={s} i={i} />
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-2 text-xs text-notte/50 lg:hidden" aria-hidden="true">
          <Icon name="arrow" className="size-3.5" /> Scorri per vedere tutti i servizi
        </p>

        <Reveal className="mt-10 flex flex-col gap-4 rounded-2xl border border-dashed border-notte/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="text-sm leading-relaxed text-notte/70">
            <strong className="font-semibold text-notte">Disponibilità per sede:</strong> alcuni servizi possono variare tra i punti
            vendita. Chiama il negozio più vicino per una conferma.
          </p>
          <a href="#negozi" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-blu underline-offset-4 hover:underline">
            Contatta un negozio <Icon name="arrow" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
