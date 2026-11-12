import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { activeStores, photos, StoreCountWord, storeCount } from '../content'
import Silk from './Silk'
import { Button, EASE, Icon, Media } from './ui'

const lines = [
  { words: ['La', 'cura'], italic: [] },
  { words: ['che', 'i', 'tuoi', 'capi'], italic: [] },
  { words: ['meritano.'], italic: [0] },
]

const tags = [
  { label: 'Lavaggio a secco', pos: 'left-[6%] top-[14%]', d: 1.5 },
  { label: 'Capi delicati e pelle', pos: 'right-[7%] top-[40%]', d: 1.65 },
  { label: 'Espresso 24 ore', pos: 'left-[10%] bottom-[26%]', d: 1.8 },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-25%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  let w = 0
  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-carta pt-24 lg:pt-28" aria-labelledby="hero-title">
      {/* fondo avorio con trama */}
      <div className="grain pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_10%,#fff_0%,#f6f2ec_45%,#eae3d9_100%)]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-10 px-5 pb-10 sm:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-16">
        {/* TESTO */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 flex flex-col justify-center lg:col-span-7 lg:pt-10">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3 text-blu"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          >
            <span className="inline-block size-1.5 rounded-full bg-blu" />
            <span>Lavanderia &amp; lavasecco<span className="hidden sm:inline"> · Provincia di Verona</span></span>
          </motion.p>

          <h1 id="hero-title" className="display text-notte text-[clamp(3rem,10.5vw,8.6rem)] leading-[0.92] font-[350]" aria-label="La cura che i tuoi capi meritano.">
            {lines.map((line, li) => (
              <span key={li} className={`block ${li === 1 ? 'lg:pl-[12%]' : ''}`} aria-hidden="true">
                {line.words.map((word, wi) => {
                  const idx = w++
                  return (
                    <span key={wi} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                      <motion.span
                        className={`inline-block ${line.italic.includes(wi) ? 'display-italic text-blu' : ''}`}
                        initial={reduce ? false : { y: '115%', rotate: 5 }}
                        animate={{ y: '0%', rotate: 0 }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.35 + idx * 0.07 }}
                      >
                        {word}
                      </motion.span>
                      {wi < line.words.length - 1 && ' '}
                    </span>
                  )
                })}
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          >
            <p className="max-w-md text-[1.05rem] leading-relaxed text-notte/75 lg:text-lg">
              Lavanderia e lavasecco professionale. {StoreCountWord} punti vendita a{' '}
              {activeStores.map((s, i) => (
                <span key={s.id}>
                  <strong className="font-semibold text-notte">{s.name}</strong>
                  {i < activeStores.length - 2 ? ', ' : i === activeStores.length - 2 ? ' e ' : '.'}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 1.25 }}
          >
            <Button href="#servizi">Scopri i servizi</Button>
            <Button href="#negozi" variant="ghost" icon="pin">
              Trova il tuo negozio
            </Button>
          </motion.div>
        </motion.div>

        {/* VISUAL */}
        <div className="relative lg:col-span-5">
          <motion.div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-notte shadow-[0_40px_80px_-40px_rgba(20,42,59,.6)] sm:aspect-[5/4] lg:aspect-auto lg:h-[min(78vh,760px)]"
            initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
            transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.15 }}
          >
            <motion.div className="absolute inset-[-6%]" style={{ y: imgY, scale: imgScale }}>
              <Media src={photos.hero} alt="Dettaglio di un tessuto pregiato curato da Prima Clean">
                <Silk palette="blue" speed={0.55} label="Seta blu in movimento, studio materico" />
              </Media>
            </motion.div>
            <div className="grain absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-notte-900/55 via-transparent to-transparent" />

            {tags.map((t) => (
              <motion.span
                key={t.label}
                className={`absolute ${t.pos} hidden items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-[0.78rem] font-medium text-white ring-1 ring-white/30 backdrop-blur-md sm:inline-flex`}
                initial={reduce ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, ease: EASE, delay: t.d }}
              >
                <span className="size-1.5 rounded-full bg-azzurro" />
                {t.label}
              </motion.span>
            ))}

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white sm:inset-x-7 sm:bottom-7">
              <p className="display-italic max-w-[14rem] text-xl leading-snug sm:text-2xl">Ogni fibra, trattata come un capo unico.</p>
              <span className="eyebrow text-white/70">{storeCount} negozi</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* indicatore scroll */}
      <motion.a
        href="#cura"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-notte/60 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-label="Scorri alla sezione successiva"
      >
        <span className="eyebrow">Scorri</span>
        <span className="relative h-10 w-px overflow-hidden bg-notte/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-blu"
            animate={reduce ? {} : { y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
