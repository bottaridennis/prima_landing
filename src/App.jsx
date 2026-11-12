import { MotionConfig } from 'motion/react'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Services from './components/Services'
import Why from './components/Why'
import Promos from './components/Promos'
import Stores from './components/Stores'
import { FinalCta, Footer, MobileBar } from './components/Closing'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-notte focus:px-5 focus:py-3 focus:text-white"
      >
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto">
        <Hero />
        <Intro />
        <Services />
        <Why />
        <Promos />
        <Stores />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
  )
}
