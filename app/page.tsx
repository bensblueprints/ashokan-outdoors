import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Rates from '@/components/sections/Rates'
import CatskillFlyFishing from '@/components/sections/CatskillFlyFishing'
import BeforeYouFish from '@/components/sections/BeforeYouFish'
import FAQ from '@/components/sections/FAQ'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import FloatingCallButton from '@/components/layout/FloatingCallButton'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Rates />
      <CatskillFlyFishing />
      <BeforeYouFish />
      <FAQ />
      <Reviews />
      <Contact />
      <Footer />
      <FloatingCallButton />
    </main>
  )
}
