import Navbar from "@/components/Navbar";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <main className="pt-16">
                <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            How Bitcoin Lottery Works
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            A simple guide to understanding our decentralized lottery system
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* What is Bitcoin Lottery? */}
                        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                What is Bitcoin Lottery?
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Bitcoin Lottery is a decentralized lottery game built on the Bitcoin blockchain.
                                    Unlike traditional lotteries run by companies, our lottery is powered by smart contracts
                                    on Bitcoin's Alkanes metaprotocol, making it completely transparent and trustless.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                                    Think of it like a massive pot where everyone who buys a ticket contributes a small amount
                                    of Bitcoin, and one lucky winner takes the entire pot. No middlemen, no hidden fees,
                                    just pure Bitcoin gambling excitement!
                                </p>
                            </div>
                        </section>

                        {/* How to Play */}
                        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                How to Play
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            Connect Your Wallet
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            First, connect your Bitcoin wallet to the platform. This is how you'll send and receive Bitcoin.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            Buy Tickets
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Each ticket costs 0.001 BTC. You can buy multiple tickets to increase your chances.
                                            All ticket purchases go directly into the jackpot pool.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            Wait for the Draw
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Draws happen automatically every 144 Bitcoin blocks (approximately every 24 hours).
                                            The entire jackpot goes to the winning ticket holder.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Liquidity Providers */}
                        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                What are Liquidity Providers?
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Liquidity providers are like the "house" in traditional gambling, but decentralized!
                                    Instead of a company taking a cut, individual people provide the Bitcoin that backs the lottery.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                                    When you provide liquidity, you're essentially lending your Bitcoin to the lottery system.
                                    In return, you earn interest (called APY - Annual Percentage Yield) on your Bitcoin.
                                    The more tickets people buy, the higher the rewards for liquidity providers!
                                </p>
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                                    <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                        Why Provide Liquidity?
                                    </h4>
                                    <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                                        <li>• Earn attractive interest on your Bitcoin holdings</li>
                                        <li>• Support the lottery ecosystem and help it grow</li>
                                        <li>• No lock-up period - withdraw your Bitcoin anytime</li>
                                        <li>• Potentially higher returns than traditional savings</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Alkanes Smart Contracts */}
                        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                What are Alkanes Smart Contracts?
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Alkanes is a special system built on top of Bitcoin that allows for smart contracts.
                                    Think of it like adding programmable features to Bitcoin without changing Bitcoin itself.
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
                                    Traditional smart contracts (like on Ethereum) require changing how the blockchain works.
                                    Alkanes is different - it's a "metaprotocol" that adds smart contract functionality
                                    while keeping Bitcoin exactly as it is.
                                </p>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mt-6">
                                    <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                                        Benefits of Alkanes
                                    </h4>
                                    <ul className="text-green-800 dark:text-green-200 space-y-1">
                                        <li>• Bitcoin's security and decentralization</li>
                                        <li>• Lower transaction fees than other blockchains</li>
                                        <li>• No need for "wrapped" Bitcoin or sidechains</li>
                                        <li>• True Bitcoin smart contracts</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* FAQ */}
                        <section className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                Frequently Asked Questions
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Is this safe?
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Yes! The smart contracts are built on Bitcoin's proven security model.
                                        All transactions are transparent and verifiable on the blockchain.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        How do I know the draws are fair?
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Draws are determined by Bitcoin block hashes, which are completely random and unpredictable.
                                        No one can manipulate the results.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        Can I lose money?
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Like any lottery, you might not win. However, as a liquidity provider,
                                        you earn interest regardless of who wins the lottery.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                        How often are draws?
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        Draws happen every 144 Bitcoin blocks, which is approximately every 24 hours.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Getting Started */}
                        <section className="bg-orange-500 rounded-lg p-8 shadow-lg text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to Get Started?
                            </h2>
                            <p className="text-orange-100 mb-6">
                                Join the Bitcoin lottery revolution today!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/jackpot"
                                    className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    Buy Your First Ticket
                                </a>
                                <a
                                    href="/liquidity"
                                    className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                                >
                                    Become a Liquidity Provider
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
