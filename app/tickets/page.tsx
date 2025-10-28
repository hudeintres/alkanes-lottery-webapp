'use client'

import { useEffect, useState } from 'react'
import { apiGetTickets } from '@/lib/api'
import { useLaserEyes } from '@omnisat/lasereyes'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Ticket = { id: string; address: string; createdAt: number }

export default function TicketsPage() {
    const { address, provider } = useLaserEyes()
    const [tickets, setTickets] = useState<Ticket[]>([])

    useEffect(() => {
        if (!address) return
        apiGetTickets(address)
            .then((res) => setTickets(res.tickets))
            .catch(() => setTickets([]))
    }, [address])

    if (!provider) {
        return (
            <div className={'flex flex-col gap-6 w-full max-w-[1200px] px-4 md:px-12'}>
                <h2 className={'text-3xl md:text-4xl font-black mt-6'}>My Tickets</h2>
                <div className={'text-gray-300'}>Connect your wallet to view your ticket history.</div>
                <Link href={'/'}>
                    <Button size={'lg'} variant={'outline'} className={'bg-[#1e1d1f] border-[#3c393f] hover:bg-[#3c393f]'}>
                        Connect Wallet
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className={'flex flex-col gap-6 w-full max-w-[1200px] px-4 md:px-12'}>
            <h2 className={'text-3xl md:text-4xl font-black mt-6'}>My Tickets</h2>
            <div className={'border border-[#3c393f] rounded'}>
                <div className={'p-4 text-lg font-bold'}>Ticket History</div>
                <div className={'divide-y divide-[#3c393f]'}>
                    {tickets.length === 0 ? (
                        <div className={'p-4 text-gray-400'}>No tickets found.</div>
                    ) : (
                        tickets.map((t) => (
                            <div key={t.id} className={'p-4 flex justify-between text-sm'}>
                                <span>{t.id}</span>
                                <span>{new Date(t.createdAt).toLocaleString()}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}


