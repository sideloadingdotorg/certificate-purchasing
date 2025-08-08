import { PricingSection } from "@/components/pricing-section"
import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ThemeTest } from "@/components/theme-test"
import { ReviewSection } from "@/components/review-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <PricingSection />
        <ReviewSection />
      </main>
      <Footer />
      {/*<ThemeTest />*/} 
    </div>
  )
}