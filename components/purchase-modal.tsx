"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  price: number
  duration: string
  description: string
  features: string[]
  popular?: boolean
}

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  tier: PricingTier
}

export function PurchaseModal({ isOpen, onClose, tier }: PurchaseModalProps) {
  const [email, setEmail] = useState("")
  const [udid, setUdid] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const udidRegex = /^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{8}-[a-fA-F0-9]{16}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!udidRegex.test(udid)) {
      alert("Please enter a valid UDID (40-character hex or UUID format).");
      setIsSubmitting(false);
      return;
    }

    try {
      const checkRes = await fetch(`/api/purchases?email=${email}`);
      const purchases = await checkRes.json();
      if (purchases.error) {
        alert(`An error occurred: ${purchases.message || 'Unknown error'}`);
        setIsSubmitting(false);
        return;
      }
      if (!Array.isArray(purchases)) {
        alert("Unexpected response from server.");
        setIsSubmitting(false);
        return;
      }
      const alreadyExists = purchases.some((p: any) => p.udid === udid);
      
      if (alreadyExists) {
        alert("You have already made a purchase under this device. To extend your certificate or replace with a new option, email loyahdevapp@icloud.com with the device.");
        setIsSubmitting(false);
        return;
      }
      
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          udid,
          message,
          tier,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to initiate payment.")
      }

      const data = await response.json()

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert("Checkout session started, but no redirect URL was returned.")
      }
    } catch (error: any) {
      alert(`An error occurred: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Purchase {tier.name} Certificate</DialogTitle>
          <DialogDescription>
            Complete your purchase of the {tier.duration} iOS signing certificate for ${tier.price}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">We'll send your certificate and instructions to this email.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="udid">Device UDID</Label>
            <Input
              id="udid"
              placeholder="00000000-0000000000000000"
              value={udid}
              onChange={(e) => setUdid(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Your device's Unique Device Identifier. Cannot be edited later.{" "}
              <a href="https://udid.tech" target="_blank" rel="noopener noreferrer" className="underline">
                How to find your UDID
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Information (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Any questions or special requirements?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <div className="pt-4 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${tier.price}.00</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${tier.price}.00</span>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[hsl(var(--highlight-purple))] to-[hsl(var(--highlight-pink))] hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
