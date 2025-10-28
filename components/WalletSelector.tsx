'use client'

import { SUPPORTED_WALLETS, type ProviderType } from '@omnisat/lasereyes'
import WalletConnectButton from '@/components/WalletConnectButton'

export default function WalletSelector() {
    return (
        <div className={'flex items-center justify-center flex-col gap-4'}>
            <div className="text-orange-400 text-xl">supported wallets:</div>
            <div className={'flex flex-wrap justify-center gap-3'}>
                {Object.values(SUPPORTED_WALLETS).map(
                    (walletInfo: { name: ProviderType; url: string }) => (
                        <WalletConnectButton wallet={walletInfo} key={walletInfo.name} />
                    )
                )}
            </div>
        </div>
    )
}


