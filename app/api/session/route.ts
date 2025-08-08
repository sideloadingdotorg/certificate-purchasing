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
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      await fetch("https://discord.com/api/webhooks/1363558369180520599/1t_ThsRGFcFnijBnpQMYxRNsF2nSv0gPHz7IsOvWAH5V5dQ--X7grqw5ZcOW8koQt8M2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: "✅ Payment Received",
              fields: [
                { name: "Tier", value: session.metadata?.tierId || "Unknown", inline: true },
                { name: "Email", value: session.customer_details?.email || "Unknown", inline: true },
                { name: "UDID", value: session.metadata?.udid || "Unknown", inline: false },
                { name: "Message", value: session.metadata?.message || "None", inline: false },
                { name: "Order ID", value: `ORD-${session.id.slice(-8).toUpperCase()}`, inline: false },
                { name: "Session ID", value: session.id, inline: false },
              ],
              color: 0x00cc66,
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });

      // Create Clerk user
      if (session.customer_details?.email) {
        await fetch("https://api.clerk.com/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
          body: JSON.stringify({
            email_address: [session.customer_details?.email],
          }),
        });
      }
    }

    return NextResponse.json(session);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}