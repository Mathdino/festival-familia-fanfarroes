import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: params.id },
      include: { players: true, payment: true },
    })
    if (!team) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(team)
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, formation, players } = body

    // Update team basic info
    await prisma.team.update({
      where: { id: params.id },
      data: { name, formation },
    })

    if (players) {
      // Delete all existing players and recreate
      await prisma.player.deleteMany({ where: { teamId: params.id } })
      await prisma.player.createMany({
        data: players.map((p: { name: string; number?: number; position: string }) => ({
          teamId: params.id,
          name: p.name,
          number: p.number ?? null,
          position: p.position,
        })),
      })
    }

    const updated = await prisma.team.findUnique({
      where: { id: params.id },
      include: { players: true, payment: true },
    })
    return NextResponse.json(updated)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.team.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 })
  }
}
