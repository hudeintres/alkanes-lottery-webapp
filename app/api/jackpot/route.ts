import { NextResponse } from 'next/server'
import { fetchCurrentJackpotSats } from '@/lib/alkanes'

export const dynamic = 'force-dynamic'

export async function GET() {
    const jackpotSats = await fetchCurrentJackpotSats()
    const jackpotBtc = Number((jackpotSats / 1e8).toFixed(8))
    return NextResponse.json({ jackpotSats, jackpotBtc })
}


