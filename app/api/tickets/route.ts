import { NextRequest, NextResponse } from 'next/server'
import { alkanesBuyTicket } from '@/lib/alkanes'

export const dynamic = 'force-dynamic'

type Ticket = { id: string; address: string; createdAt: number }
const TICKETS: Ticket[] = []

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address')
    const tickets = address ? TICKETS.filter((t) => t.address === address) : []
    return NextResponse.json({ tickets })
}

export async function POST(req: NextRequest) {
    const { address } = await req.json()
    if (!address) {
        return NextResponse.json({ error: 'missing_address' }, { status: 400 })
    }
    const { ticketId } = await alkanesBuyTicket(address)
    const ticket = { id: ticketId, address, createdAt: Date.now() }
    TICKETS.push(ticket)
    return NextResponse.json({ ticket }, { status: 201 })
}


