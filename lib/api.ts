export type Ticket = {
    id: string
    address: string
    createdAt: number
}

export async function apiGetJackpot() {
    const res = await fetch('/api/jackpot', { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch jackpot')
    return res.json() as Promise<{ jackpotSats: number; jackpotBtc: number }>
}

export async function apiBuyTicket(address: string) {
    const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
    })
    if (!res.ok) throw new Error('Failed to buy ticket')
    return res.json() as Promise<{ ticket: Ticket }>
}

export async function apiGetTickets(address: string) {
    const url = new URL('/api/tickets', window.location.origin)
    url.searchParams.set('address', address)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch tickets')
    return res.json() as Promise<{ tickets: Ticket[] }>
}

export async function apiGetLiquidity(address?: string) {
    const url = new URL('/api/liquidity', window.location.origin)
    if (address) url.searchParams.set('address', address)
    const res = await fetch(url.toString(), { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch liquidity')
    return res.json() as Promise<{
        apy: number
        totalLiquiditySats: number
        positions: Array<{ txid: string; amountSats: number; timestamp: number }>
    }>
}

export async function apiAddLiquidity(address: string, amountBtc: number) {
    const res = await fetch('/api/liquidity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, amountBtc }),
    })
    if (!res.ok) throw new Error('Failed to add liquidity')
    return res.json() as Promise<{ positionId: string }>
}


