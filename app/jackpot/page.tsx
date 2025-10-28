'use client'

import { useEffect, useState } from 'react'
import { apiBuyTicket, apiGetJackpot } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { useLaserEyes } from '@omnisat/lasereyes'
import Link from 'next/link'

export default function JackpotPage() {
    const { address, provider } = useLaserEyes()
    const [jackpotBtc, setJackpotBtc] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        apiGetJackpot().then((res) => setJackpotBtc(res.jackpotBtc)).catch(() => setJackpotBtc(null))
    }, [])

    const onBuy = async () => {
        if (!address) return
        setLoading(true)
        setMessage(null)
        try {
            const res = await apiBuyTicket(address)
            setMessage(`Ticket purchased: ${res.ticket.id}`)
        } catch (e) {
            setMessage('Failed to buy ticket')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={'flex flex-col gap-8 w-full max-w-[1200px] px-4 md:px-12'}>
            <h2 className={'text-3xl md:text-4xl font-black mt-6'}>Current Jackpot</h2>
            <div className={'text-5xl md:text-7xl font-black text-orange-400'}>
                {jackpotBtc !== null ? `${jackpotBtc.toLocaleString()} BTC` : '--'}
            </div>
            <div className={'text-gray-400'}>Draw happens every 144 bitcoin blocks</div>
            <div>
                {provider ? (
                    <Button size={'lg'} className={'bg-[#232225]'} disabled={loading} onClick={onBuy}>
                        {loading ? 'Processing...' : 'Buy Ticket'}
                    </Button>
                ) : (
                    <Link href={'/'}>
                        <Button size={'lg'} variant={'outline'} className={'bg-[#1e1d1f] border-[#3c393f] hover:bg-[#3c393f]'}>
                            Connect wallet to buy
                        </Button>
                    </Link>
                )}
            </div>
            {message && <div className={'text-sm text-gray-300'}>{message}</div>}
        </div>
    )
}


