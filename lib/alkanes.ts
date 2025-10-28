// Stubs for Alkanes contract interactions on Bitcoin. Replace with real calls.

export async function fetchCurrentJackpotSats(): Promise<number> {
    // TODO: Replace with on-chain read via Alkanes
    return 12_345_678_900 // sats
}

export async function fetchCurrentApyPercent(): Promise<number> {
    // TODO: Replace with on-chain read via Alkanes
    return 18.4
}

export async function fetchLiquidityPositions(address?: string): Promise<
    Array<{ txid: string; amountSats: number; timestamp: number }>
> {
    // TODO: Replace with on-chain read via Alkanes
    if (!address) return []
    return []
}

export async function alkanesBuyTicket(
    _address: string
): Promise<{ ticketId: string; blockHeight: number }> {
    // TODO: Replace with on-chain write via Alkanes
    return { ticketId: `stub-${Date.now()}`, blockHeight: 0 }
}

export async function alkanesAddLiquidity(
    _address: string,
    _amountSats: number
): Promise<{ positionId: string }> {
    // TODO: Replace with on-chain write via Alkanes
    return { positionId: `pos-${Date.now()}` }
}


