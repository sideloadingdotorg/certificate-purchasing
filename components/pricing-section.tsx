"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle } from "lucide-react"
import { PurchaseModal } from "@/components/purchase-modal"

interface PricingTier {
  id: string
  name: string
  price: number
  duration: string
  description: string
  features: string[]
  popular?: boolean
}

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null)

  const pricingTiers: PricingTier[] = [
    /*{
      id: "6month",
      name: "Basic",
      price: 6,
      duration: "6 Months",
      description: "Perfect for short-term sideloading needs",
      features: ["iOS, iPadOS, TvOS, VisionOS certificate support", "6 Months of use", "No revokes or blacklists", "24/7 support for any issues", "Custom entitlements can't be supplied."],
    },*/
    {
      id: "1year",
      name: "Standard",
      price: 7,
      duration: "1 Year",
      description: "Our most popular option for users",
      features: [
        "iOS, iPadOS, TvOS, VisionOS certificate support",
        "1 Year of use",
        "No revokes or blacklists",
        "Free app installs with the certificate such as Esign, Scarlet, and Executors",
        "24/7 support for any issues",
        "Custom Entitlements per specific apps.",
      ],
      popular: true,
    }/*,
    {
      id: "lifetime",
      name: "Lifetime",
      price: 30,
      duration: "Lifetime*",
      description: "Best value for serious sideloaders",
      features: [
        "iOS, iPadOS, TvOS, VisionOS certificate support",
        "Valid for lifetime*",
        "No revokes or blacklists",
        "Free app installs with the certificate such as Esign, Scarlet, and Executors",
        "24/7 support for any issues",
        "Custom Entitlements per apps.",
      ],
    },*/
  ]

  const handlePurchase = (tier: PricingTier) => {
    setSelectedTier(tier)
    setIsModalOpen(true)
  }

  return (
    <section id="pricing" className="py-20 px-4 md:px-6">
      <div className="container">
      <div className="text-center space-y-4 mb-24 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Simple, Transparent Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Choose the plan that works best for your needs, each plan may take up to 72 hours for Apple to verify your device.
          </p>
          <p className="text-m text-muted-foreground max-w-[700px] mx-auto">
            We use Stripe for payments with Apple Pay, Link, Card. If you have interest in using CashApp email loyahdevapp@icloud.com
          </p>
        </div>

        <div className="relative mb-24 z-0">
          <div className="absolute -top-12 -left-12 w-64 h-64 md:w-64 md:h-64 lg:w-80 lg:h-80 rotate-12 opacity-70 z-[-10]">
            <img 
              src="kSign-5-945x2048.png" 
              alt="iOS Device Mockup 1" 
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="absolute -top-6 right-0 w-48 h-48 md:w-48 md:h-48 lg:w-72 lg:h-72 -rotate-6 opacity-70 z-[-10]">
            <img 
              src="https://preview.redd.it/ios-18-developer-beta-works-with-scarlet-v0-apwgwzz2x1md1.jpeg?width=1080&crop=smart&auto=webp&s=82f827a693aff33589063903766e254a180d617e" 
              alt="iOS Device Mockup 2" 
              className="w-full h-full object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 z-[10] max-w-3xl mx-auto gap-8">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`flex flex-col bg-black relative z-[1] transition-transform duration-300 ease-in-out hover:scale-[1.001] hover:-translate-y-2 ${
                tier.popular
                  ? "border-[hsl(var(--highlight-purple))] shadow-lg shadow-[hsl(var(--highlight-purple))/20]"
                  : "border border-gray-800"
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-[hsl(var(--highlight-purple))] to-[hsl(var(--highlight-pink))] hover:from-[hsl(var(--highlight-purple))] hover:to-[hsl(var(--highlight-pink))]">
                  Most Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gradient">${tier.price}</span>
                  <span className="text-muted-foreground ml-2">/ {tier.duration}</span>
                </div>
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-[hsl(var(--highlight-purple))] flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    tier.popular
                      ? "bg-gradient-to-r from-[hsl(var(--highlight-purple))] to-[hsl(var(--highlight-pink))] hover:opacity-90 transition-opacity"
                      : "border-[hsl(var(--highlight-purple))] text-[hsl(var(--highlight-purple))] hover:bg-[hsl(var(--highlight-purple))/10]"
                  }`}
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => handlePurchase(tier)}
                >
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {selectedTier && <PurchaseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tier={selectedTier} />}
    </section>
  )
}
