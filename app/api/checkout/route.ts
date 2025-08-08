import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function POST(req: NextRequest) {
  try {
    const { email, udid, message, tier } = await req.json();

    if (!email || !udid || !tier?.id || !tier?.price || !tier?.name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const customer = await stripe.customers.create({ email });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer: customer.id,
      payment_intent_data: {
        receipt_email: email,
      },
      invoice_creation: {
        enabled: true,
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tier.name} Certificate`,
              description: `Device UDID: ${udid}${message ? `\nMessage: ${message}` : ""}`,
              images: ["https://raw.githubusercontent.com/sideloadingdotorg/certificate-purchasing/refs/heads/main/public/phoneicns.png"],
            },
            unit_amount: tier.price * 100,
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata: {
        udid,
        tierId: tier.id,
        message: message || "",
      },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err.message);
    return NextResponse.json({ error: "Stripe checkout session failed" }, { status: 500 });
  }
}
