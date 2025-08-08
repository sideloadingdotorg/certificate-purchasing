'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const [session, setSession] = useState<any>(null)
  const [productName, setProductName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!sessionId) {
      router.push('/')
      return
    }

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/session?session_id=${sessionId}`)
        const data = await res.json()

        // Fetch line items to get the product name
        const lineRes = await fetch(`/api/session/line-items?session_id=${sessionId}`)
        const lineData = await lineRes.json()

        setProductName(lineData?.[0]?.description || "iOS Signing Certificate")
        setSession(data)

        const purchaseRes = await fetch('/api/purchases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.customer_details?.email,
            itemName: lineData?.[0]?.description || "iOS Signing Certificate",
            orderId: `ORD-${data.id.slice(-8).toUpperCase()}`,
            udid: data.metadata?.udid,
            message: data.metadata?.message || "None",
            date: new Date().toISOString()
          })
        })

        const purchaseData = await purchaseRes.json()
        if (!purchaseRes.ok) {
          alert(`Failed to save purchase: ${purchaseData.error || 'Unknown error'}`)
        } else {
          console.log('Purchase saved:', purchaseData)
        }
      } catch (err) {
        console.error('Failed to fetch session:', err)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [sessionId, router])

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading your order details...</div>
  }

  const orderId = `ORD-${session.id.slice(-8).toUpperCase()}`

  return (
    <div className="max-w-xl mx-auto mt-20 text-center px-6">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your purchase!</h1>
      <p className="text-lg mb-6">We've received your order. Here are the details:</p>

      <div className="bg-black border border-gray-800 rounded-lg p-6 text-left space-y-4">
        <p><strong>Order ID:</strong> {orderId}</p>
        <p><strong>Tier:</strong> {productName}</p>
        <p><strong>Email:</strong> {session.customer_details?.email}</p>
        <p><strong>Device UDID:</strong> {session.metadata?.udid}</p>
        <p><strong>Message:</strong> {session.metadata?.message || "None"}</p>
      </div>

      <p className="text-m text-muted-foreground max-w-[700px] mx-auto mt-5">
            You will get an email with an invoice shortly. To view your certificates status for this device login below with stripe:
        </p>
      <div className="mt-4">
        <a href="/sign-in">
          <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
            Go to Login
          </button>
        </a>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        If you have any questions, contact <a href="mailto:loyahdevapp@icloud.com" className="underline">loyahdevapp@icloud.com</a>.
      </p>
    </div>
  )
}