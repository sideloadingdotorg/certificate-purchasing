import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    // Step 1: Find the customer by email
    const customers = await stripe.customers.list({ email, limit: 1 });
    if (customers.data.length === 0) {
      return NextResponse.json({ error: "No Stripe customer found with this email" }, { status: 404 });
    }

    const customer = customers.data[0];

    // Step 2: Check if they have made a successful charge
    const charges = await stripe.charges.list({
      customer: customer.id,
      limit: 1,
    });

    const successfulCharge = charges.data.find(charge => charge.paid && charge.status === 'succeeded');

    if (!successfulCharge) {
      return NextResponse.json({ error: "No successful payment found for this customer" }, { status: 403 });
    }

    // Step 3: Return redirect to login-success with email
    return NextResponse.json({
      redirect: `/login-success?email=${encodeURIComponent(email)}`,
    });
  } catch (err: any) {
    console.error("Login session error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}