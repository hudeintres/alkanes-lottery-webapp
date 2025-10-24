import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 dark:from-gray-900 dark:via-black dark:to-gray-900">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Win Big with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  Bitcoin Lottery
                </span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Join the ultimate Bitcoin lottery experience. Buy tickets for a chance to win massive jackpots,
                or provide liquidity to earn attractive yields. Built on Bitcoin with Alkanes smart contracts.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/jackpot"
                  className="rounded-lg bg-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 transition-colors"
                >
                  Play Now
                </a>
                <a
                  href="/docs"
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-orange-500 transition-colors"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                Experience the future of Bitcoin gaming with our decentralized lottery system
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    🎫 Buy Tickets
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600 dark:text-gray-300">
                    Purchase lottery tickets with Bitcoin for a chance to win the massive jackpot.
                    Draws happen every 144 Bitcoin blocks.
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    🏦 Provide Liquidity
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600 dark:text-gray-300">
                    Add Bitcoin to the liquidity pool and earn attractive APY while supporting the lottery ecosystem.
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    ⚡ Smart Contracts
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-600 dark:text-gray-300">
                    Built on Alkanes, Bitcoin's metaprotocol for smart contracts. Fully decentralized and transparent.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-orange-500">
          <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Win?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-orange-100">
                Join thousands of players in the most exciting Bitcoin lottery experience.
                Connect your wallet and start playing today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/jackpot"
                  className="rounded-lg bg-white px-8 py-4 text-sm font-semibold text-orange-500 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  View Current Jackpot
                </a>
                <a
                  href="/liquidity"
                  className="text-sm font-semibold leading-6 text-white hover:text-orange-200 transition-colors"
                >
                  Become a Liquidity Provider <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
