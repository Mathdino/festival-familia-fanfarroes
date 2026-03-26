import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const schedules = await prisma.schedule.findMany({
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    })
    return NextResponse.json(schedules)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch schedules' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { time, teamA, teamB, date, round, result } = body
    const schedule = await prisma.schedule.create({
      data: { time, teamA, teamB, date, round, result: result || null },
    })
    return NextResponse.json(schedule, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create schedule' }, { status: 500 })
  }
}
