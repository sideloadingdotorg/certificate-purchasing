import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { exec } from 'child_process'
import util from 'util'
const execAsync = util.promisify(exec)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const allowedOrigin = 'https://buy.sideloading.org'

export async function GET(req: NextRequest) {
  const origin = req.headers.get('origin') || req.headers.get('referer')
  if (!origin || !origin.includes(allowedOrigin)) {
    return NextResponse.json({ error: true, message: 'Unauthorized request' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')

  const whereClause = email ? { email } : undefined

  try {
    const userPurchases = await prisma.purchase.findMany({
      where: whereClause,
      orderBy: { date: 'desc' }
    })
    return NextResponse.json(userPurchases)
  } catch (error) {
    return NextResponse.json({ error: true, message: 'Failed to load purchases', details: error instanceof Error ? error.message : error }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || req.headers.get('referer')
  if (!origin || !origin.includes(allowedOrigin)) {
    return NextResponse.json({ error: true, message: 'Unauthorized request' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const { email, itemName, orderId, udid, message, date } = body

    if (!email || !itemName || !orderId || !udid || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check for existing purchase with the same UDID
    const existing = await prisma.purchase.findFirst({
      where: { udid }
    })

    if (existing) {
      return NextResponse.json({ error: 'UDID already added' }, { status: 409 })
    }

    // Attempt to determine the device model using fastlane spaceship
    let deviceModel = ''

    // Save purchase with deviceModel and delivered status
    const purchase = await prisma.purchase.create({
      data: {
        email,
        itemName,
        orderId,
        udid,
        message,
        date: new Date(date),
        deviceModel,
        delivered: false
      }
    })

    return NextResponse.json({ success: true, purchase })
  } catch (error: any) {
    return NextResponse.json({ error: true, message: 'Failed to save purchase', details: error.message }, { status: 500 })
  }
}
