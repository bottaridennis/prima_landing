import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { photos } from '../content'
import Silk from './Silk'
import { CurtainReveal, Eyebrow, Media, Reveal } from './ui'

const manifesto =
  'Un capo racconta chi lo indossa. Per questo lo trattiamo come se fosse l’unico: leggiamo l’etichetta, ascoltiamo la fibra, scegliamo il trattamento giusto. Poi lo restituiamo come deve essere — pulito, in forma, pronto per te.'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

const fabrics = ['Seta', 'Lana', 'Cashmere', 'Lino', 'Pelle', 'Cotone', 'Velluto', 'Piumino', 'Lana merino', 'Scamosciato']

export default function Intro() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const words = manifesto.split(' ')
  const visualRef = useRef(null)
  const { scrollYProgress: vp } = useScroll({ target: visualRef, offset: ['start end', 'end start'] })
  const vy = useTransform(vp, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section id="cura" className="relative overflow-hidden bg-white" aria-labelledby="cura-title">
      {/* nastro di tessuti */}
      <div className="relative -mx-4 -rotate-[1.2deg] border-y border-notte/10 bg-notte py-4 text-white" aria-hidden="true">
        <div className="flex w-max animate-[marquee_42s_linear_infinite] gap-10 whitespace-nowrap motion-reduce:animate-none">
          {[...fabrics, ...fabrics, ...fabrics].map((f, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={`display text-2xl sm:text-3xl ${i % 2 ? 'display-italic text-azzurro' : ''}`}>{f}</span>
              <span className="size-1.5 rotate-45 bg-azzurro/70" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:py-40">
        <div className="lg:col-span-7 lg:pr-10">
          <Eyebrow n="01">La nostra cura</Eyebrow>
          <h2 id="cura-title" className="sr-only">
            La cura dei tessuti secondo 1A Clean
          </h2>
          <p ref={ref} className="display mt-10 text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.14] font-[350] text-notte" aria-label={manifesto}>
            <span aria-hidden="true">
              {words.map((w, i) =>
                reduce ? (
                  <span key={i} className="mr-[0.25em] inline-block">{w}</span>
                ) : (
                  <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1.5) / words.length]}>
                    {w}
                  </Word>
                )
              )}
            </span>
          </p>

          <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-notte/10 pt-8 sm:gap-8">
            {[
              ['3', 'punti vendita in provincia di Verona'],
              ['24h', 'servizio espresso quando serve'],
              ['Dom.', 'aperto anche la domenica a Bovolone'],
            ].map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.1}>
                <dt className="display text-[clamp(2rem,5vw,3.75rem)] leading-none text-blu">{k}</dt>
                <dd className="mt-3 max-w-[12rem] text-[0.82rem] leading-snug text-notte/65 sm:text-sm">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div ref={visualRef} className="relative lg:col-span-5">
          <CurtainReveal className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-avorio">
            <motion.div className="absolute inset-[-10%]" style={{ y: vy }}>
              <Media src={photos.intro} alt="Tessuto avorio drappeggiato">
                <Silk palette="ivory" speed={0.35} density={0.8} />
              </Media>
            </motion.div>
            <div className="grain absolute inset-0" />
          </CurtainReveal>

          {/* etichetta di manutenzione: firma visiva del brand */}
          <Reveal delay={0.4} className="absolute -bottom-8 left-4 w-[15.5rem] sm:-left-10 lg:-left-16">
            <div className="relative rounded-xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(20,42,59,.45)] ring-1 ring-notte/5">
              <div className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-avorio" />
              <p className="eyebrow mt-2 text-blu">Etichetta 1A Clean</p>
              <ul className="mt-3 space-y-1.5 text-sm text-notte/80">
                <li className="flex justify-between"><span>Analisi del capo</span><span className="text-blu">✓</span></li>
                <li className="flex justify-between"><span>Trattamento dedicato</span><span className="text-blu">✓</span></li>
                <li className="flex justify-between"><span>Controllo finale</span><span className="text-blu">✓</span></li>
              </ul>
              <div className="stitch mt-4 text-notte/25" />
              <p className="display-italic mt-3 text-lg text-notte">Pronto per te.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
