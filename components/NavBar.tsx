'use client'

import Link from 'next/link'
import { useLaserEyes, WalletIcon } from '@omnisat/lasereyes'
import { ConnectWalletModal } from '@omnisat/lasereyes-ui'
import { Button } from '@/components/ui/button'
import { cn, truncateString } from '@/lib/utils'
import { useState } from 'react'

export default function NavBar() {
    const { provider, address, disconnect } = useLaserEyes()
    const [showWalletModal, setShowWalletModal] = useState(false)

    return (
        <>
            <nav className={
                'w-full max-w-[1200px] px-4 md:px-12 mt-6 mb-4 flex items-center'
            }>
                <Link href="/" className={cn('text-xl font-bold')}>BTC Lottery</Link>
                <div className={'grow'} />
                <div className={'flex items-center gap-6 text-sm md:text-base'}>
                    <Link href="/jackpot" className={'hover:text-orange-400'}>Jackpot</Link>
                    <Link href="/liquidity" className={'hover:text-orange-400'}>Liquidity</Link>
                    <Link href="/tickets" className={'hover:text-orange-400'}>My Tickets</Link>
                    <Link href="/docs" className={'hover:text-orange-400'}>Docs</Link>
                </div>
                <div className={'grow'} />
                {address ? (
                    <Button
                        variant="outline"
                        className={'bg-[#1e1d1f] border-[#3c393f] hover:bg-[#3c393f] flex items-center gap-2 text-sm md:text-base'}
                        onClick={() => disconnect()}
                    >
                        {provider && <WalletIcon walletName={provider} size={20} />}
                        <span className={'text-gray-300'}>{truncateString(address, 16)}</span>
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className={'bg-[#1e1d1f] border-[#3c393f] hover:bg-[#3c393f]'}
                        onClick={() => setShowWalletModal(true)}
                    >
                        Connect Wallet
                    </Button>
                )}
            </nav>
            <ConnectWalletModal
                open={showWalletModal}
                onClose={() => setShowWalletModal(false)}
            />
        </>
    )
}


