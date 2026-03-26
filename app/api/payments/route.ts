import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { teamId, status } = body
    const payment = await prisma.payment.upsert({
      where: { teamId },
      update: { status },
      create: { teamId, status },
    })
    return NextResponse.json(payment)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
