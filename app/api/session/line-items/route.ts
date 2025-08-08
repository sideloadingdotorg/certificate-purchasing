import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

export async function GET(req: NextRequest) {
  const session_id = req.nextUrl.searchParams.get("session_id")
  if (!session_id) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 })
  }

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, {
      limit: 1,
    })

    return NextResponse.json(lineItems.data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}