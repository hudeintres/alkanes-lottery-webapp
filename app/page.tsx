'use client'

import Link from 'next/link'
import WalletSelector from '@/components/WalletSelector'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className={'flex flex-col gap-10 w-full mb-24 max-w-[1200px] px-4 md:px-12'}>
      <section className={'mt-10 text-center flex flex-col gap-6'}>
        <h1 className={'text-4xl md:text-6xl font-black'}>
          The Bitcoin Lottery House
        </h1>
        <p className={'text-gray-300 text-lg md:text-xl max-w-2xl mx-auto'}>
          Buy lottery tickets for a chance to win the jackpot. Liquidity providers
          fund the house and earn APY from gameplay. Draws every 144 bitcoin blocks.
        </p>
        <div className={'flex flex-col md:flex-row gap-4 justify-center'}>
          <Link href={'/jackpot'}>
            <Button size={'lg'} className={'bg-[#232225]'}>Buy Ticket</Button>
          </Link>
          <Link href={'/liquidity'}>
            <Button size={'lg'} variant={'outline'} className={'bg-[#1e1d1f] border-[#3c393f] hover:bg-[#3c393f]'}>
              Provide Liquidity
            </Button>
          </Link>
          <Link href={'/tickets'}>
            <Button size={'lg'} variant={'ghost'}>My Tickets</Button>
          </Link>
        </div>
      </section>
      <WalletSelector />
    </div>
  )
}
