import { motion, useReducedMotion } from 'motion/react'
import { EASE, Eyebrow, SplitReveal } from './ui'
import { listJoin, localities, StoreCountWord } from '../content'

const reasons = [
  {
    k: 'Cura',
    title: 'Attenzione al singolo capo',
    text: 'Ogni capo viene valutato per fibra, colore e lavorazione prima di scegliere come trattarlo. Nessun automatismo, solo il trattamento giusto.',
  },
  {
    k: 'Tempo',
    title: 'Praticità nella tua giornata',
    text: 'Due negozi all’interno dei centri commerciali Verona Uno e Galassia: lasci i capi mentre fai acquisti. E se hai fretta, c’è il servizio espresso 24 ore.',
  },
  {
    k: 'Territorio',
    title: `${StoreCountWord} negozi, vicini a te`,
    text: `${listJoin(localities)}: una rete di punti vendita tra Verona e la bassa veronese, con la sede di Bovolone aperta anche la domenica.`,
  },
  {
    k: 'Competenza',
    title: 'Trattamenti professionali',
    text: 'Lavaggio a secco e ad acqua, impermeabilizzazione, ozono, sottovuoto, tappeti: soluzioni specifiche che a casa non si possono replicare.',
  },
]

export default function Why() {
  const reduce = useReducedMotion()
  return (
    <section id="perche" className="relative bg-white py-24 lg:py-36" aria-labelledby="perche-title">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow n="03">Perché scegliere Prima Clean</Eyebrow>
            <h2 id="perche-title" className="display mt-8 text-[clamp(2.5rem,5.4vw,4.75rem)] leading-[0.98] font-[350] text-notte">
              <SplitReveal text="Le mani giuste" className="block" />
              <SplitReveal text="fanno la differenza." className="block" delay={0.15} italicWords={[2]} />
            </h2>
            <p className="mt-8 max-w-sm text-[1.02rem] leading-relaxed text-notte/70">
              Un servizio professionale, vicino a casa, che restituisce ai tuoi capi l’aspetto che meritano.
            </p>

            {/* piega animata decorativa */}
            <svg viewBox="0 0 320 120" className="mt-12 hidden w-72 text-blu lg:block" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.path
                  key={i}
                  d={`M0 ${30 + i * 14} C 80 ${-10 + i * 14}, 160 ${90 + i * 14}, 320 ${30 + i * 14}`}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity={0.2 + i * 0.16}
                  strokeWidth="1.2"
                  initial={reduce ? false : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: EASE, delay: i * 0.12 }}
                />
              ))}
            </svg>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {reasons.map((r, i) => (
            <motion.li
              key={r.k}
              className="group relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 py-10 sm:gap-x-10"
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {/* linea cucita che si traccia */}
              <motion.span
                aria-hidden="true"
                className="stitch absolute inset-x-0 top-0 origin-left text-notte/25"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
              />
              <span className="display row-span-2 text-[clamp(3rem,6vw,5rem)] leading-[0.8] text-azzurro transition-colors duration-500 group-hover:text-blu">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="eyebrow text-blu">{r.k}</p>
                <h3 className="display mt-2 text-[1.7rem] leading-tight text-notte sm:text-[2rem]">{r.title}</h3>
              </div>
              <p className="col-start-2 max-w-lg text-[0.98rem] leading-relaxed text-notte/70">{r.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
