'use client'

import { useEffect, useState } from 'react'
import { apiAddLiquidity, apiGetLiquidity } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLaserEyes } from '@omnisat/lasereyes'
import Link from 'next/link'

export default function LiquidityPage() {
    const { address, provider } = useLaserEyes()
    const [amountBtc, setAmountBtc] = useState<string>('0.01')
    const [apy, setApy] = useState<number | null>(null)
    const [total, setTotal] = useState<number | null>(null)
    const [positions, setPositions] = useState<Array<{ txid: string; amountSats: number; timestamp: number }>>([])
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const refresh = async () => {
        const res = await apiGetLiquidity(address || undefined)
        setApy(res.apy)
        setTotal(res.totalLiquiditySats)
        setPositions(res.positions)
    }

    useEffect(() => {
        refresh().catch(() => { })
    }, [address])

    const onDeposit = async () => {
        if (!address) return
        setLoading(true)
        setMessage(null)
        try {
            const amt = parseFloat(amountBtc)
            await apiAddLiquidity(address, amt)
            setMessage('Liquidity added')
            await refresh()
        } catch (e) {
            setMessage('Failed to add liquidity')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={'flex flex-col gap-8 w-full max-w-[1200px] px-4 md:px-12'}>
            <h2 className={'text-3xl md:text-4xl font-black mt-6'}>Provide Liquidity</h2>
            <div className={'text-gray-300'}>
                Earn yield as part of the house. APY and positions are estimates; final settlement occurs on-chain.
            </div>
            <div className={'flex items-end gap-3'}>
                <div className={'flex flex-col gap-2'}>
                    <label className={'text-sm text-gray-400'}>Amount (BTC)</label>
                    <Input value={amountBtc} onChange={(e) => setAmountBtc(e.target.value)} className={'bg-transparent text-lg'} />
                </div>
                {provider ? (
                    <Button size={'lg'} className={'bg-[#232225]'} disabled={loading} onClick={onDeposit}>
                        {loading ? 'Processing...' : 'Add Liquidity'}
                    </Button>
                ) : (
                    <Link href={'/'}>
                        <Button size={'lg'} variant={'outline'} className={'bg-[#1e1d1f] border-[#3c393f] hover:bg-[#3c393f]'}>
                            Connect wallet
                        </Button>
                    </Link>
                )}
            </div>

            <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
                <div className={'border border-[#3c393f] p-4 rounded'}>
                    <div className={'text-sm text-gray-400'}>APY</div>
                    <div className={'text-2xl font-bold'}>{apy !== null ? `${apy.toFixed(2)}%` : '--'}</div>
                </div>
                <div className={'border border-[#3c393f] p-4 rounded'}>
                    <div className={'text-sm text-gray-400'}>Total Liquidity</div>
                    <div className={'text-2xl font-bold'}>
                        {total !== null ? `${(total / 1e8).toLocaleString()} BTC` : '--'}
                    </div>
                </div>
                <div className={'border border-[#3c393f] p-4 rounded'}>
                    <div className={'text-sm text-gray-400'}>My Deposits</div>
                    <div className={'text-2xl font-bold'}>{positions.length}</div>
                </div>
            </div>

            <div className={'border border-[#3c393f] rounded'}>
                <div className={'p-4 text-lg font-bold'}>Your Positions</div>
                <div className={'divide-y divide-[#3c393f]'}>
                    {positions.length === 0 ? (
                        <div className={'p-4 text-gray-400'}>No positions yet.</div>
                    ) : (
                        positions.map((p) => (
                            <div key={p.txid} className={'p-4 flex justify-between text-sm'}>
                                <span>{p.txid}</span>
                                <span>{(p.amountSats / 1e8).toFixed(8)} BTC</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {message && <div className={'text-sm text-gray-300'}>{message}</div>}
        </div>
    )
}


