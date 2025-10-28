export default function DocsPage() {
    return (
        <div className={'flex flex-col gap-6 w-full max-w-[900px] px-4 md:px-12'}>
            <h2 className={'text-3xl md:text-4xl font-black mt-6'}>Docs</h2>
            <div className={'space-y-4 text-gray-200 leading-7'}>
                <p>
                    This is an online bitcoin lottery inspired by megapot on Ethereum. The
                    house is funded by liquidity providers, and players buy lottery tickets for a
                    chance to win the jackpot. Draws occur every 144 bitcoin blocks (about once a day).
                </p>
                <p>
                    Liquidity providers deposit BTC into the pool and earn APY generated from gameplay.
                    Deposits and withdrawals are handled by smart contracts implemented on Alkanes, a
                    Bitcoin metaprotocol enabling smart contracts.
                </p>
                <p>
                    For now, interactions are stubbed in the UI and API. Wallet connection is powered by
                    lasereyes. Once the Alkanes contracts are deployed, the backend API will call into
                    those contracts for jackpot reads, ticket purchases, and liquidity actions.
                </p>
                <p>
                    Pages overview:
                </p>
                <ul className={'list-disc pl-6 space-y-1 text-gray-300'}>
                    <li>Jackpot: View the current jackpot and buy tickets.</li>
                    <li>Liquidity: Deposit BTC to join the house and view your positions.</li>
                    <li>My Tickets: See your ticket purchase history.</li>
                    <li>Docs: This page.</li>
                </ul>
            </div>
        </div>
    )
}


