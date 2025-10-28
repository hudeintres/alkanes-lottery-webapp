import { NextRequest, NextResponse } from 'next/server'
import { alkanesAddLiquidity, fetchCurrentApyPercent, fetchLiquidityPositions } from '@/lib/alkanes'

export const dynamic = 'force-dynamic'

// Simple in-memory accumulator for demo purposes
const deposits: Record<string, number> = {}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const address = searchParams.get('address') ?? undefined
    const apy = await fetchCurrentApyPercent()
    const positions = await fetchLiquidityPositions(address)
    const totalLiquiditySats = Object.values(deposits).reduce((a, b) => a + b, 0)
    return NextResponse.json({ apy, positions, totalLiquiditySats })
}

export async function POST(req: NextRequest) {
    const { address, amountBtc } = await req.json()
    if (!address || typeof amountBtc !== 'number' || amountBtc <= 0) {
        return NextResponse.json({ error: 'invalid_parameters' }, { status: 400 })
    }
    const amountSats = Math.floor(amountBtc * 1e8)
    deposits[address] = (deposits[address] ?? 0) + amountSats
    const { positionId } = await alkanesAddLiquidity(address, amountSats)
    return NextResponse.json({ positionId }, { status: 201 })
}


