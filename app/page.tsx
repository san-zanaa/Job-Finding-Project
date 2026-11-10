import { Navbar } from "@/components/Navbar"
import { Banner } from "@/components/Banner"
import { Features } from "@/components/Features"
import { PricingSection } from "@/components/PricingSection"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Banner />
      <Features />
      <PricingSection />
    </main>
  )
}
