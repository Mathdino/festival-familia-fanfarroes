import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      include: {
        players: { orderBy: { position: 'asc' } },
        payment: true,
      },
      orderBy: { name: 'asc' },
    })
    return NextResponse.json(teams)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, formation = '4-3-3', players = [] } = body
    const team = await prisma.team.create({
      data: {
        name,
        formation,
        players: {
          create: players.map((p: { name: string; number?: number; position: string }) => ({
            name: p.name,
            number: p.number ?? null,
            position: p.position,
          })),
        },
        payment: { create: { status: 'UNPAID' } },
      },
      include: { players: true, payment: true },
    })
    return NextResponse.json(team, { status: 201 })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
