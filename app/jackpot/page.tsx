"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useWallet } from "@/contexts/WalletContext";

export default function JackpotPage() {
    const { isConnected, address } = useWallet();
    const [jackpotAmount, setJackpotAmount] = useState("25.5");
    const [ticketCount, setTicketCount] = useState(1);
    const [timeUntilDraw, setTimeUntilDraw] = useState("2:45:30");

    // Simulate real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate jackpot growth
            const currentAmount = parseFloat(jackpotAmount);
            const newAmount = (currentAmount + Math.random() * 0.01).toFixed(3);
            setJackpotAmount(newAmount);
        }, 5000);

        return () => clearInterval(interval);
    }, [jackpotAmount]);

    const handleBuyTickets = async () => {
        if (!isConnected || !address) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            // TODO: Implement smart contract interaction using oyl-sdk
            // const result = await executeWithBtcWrapUnwrap(/* contract call params */);

            // For now, call our API endpoint
            const response = await fetch('/api/jackpot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ticketCount,
                    userAddress: address,
                    amount: (ticketCount * 0.001).toString()
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(`Successfully bought ${ticketCount} ticket(s)! Transaction ID: ${result.transactionId}`);
            } else {
                alert(`Failed to buy tickets: ${result.error}`);
            }
        } catch (error) {
            console.error('Error buying tickets:', error);
            alert('An error occurred while buying tickets. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            <main className="pt-16">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    {/* Jackpot Display */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Current Jackpot
                        </h1>
                        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 mb-4">
                            {jackpotAmount} BTC
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Next draw in: <span className="font-semibold text-orange-500">{timeUntilDraw}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Draws every 144 Bitcoin blocks • ~24 hours
                        </p>
                    </div>

                    {/* Ticket Purchase Section */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Buy Lottery Tickets
                            </h2>

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                    <p className="text-yellow-800 dark:text-yellow-200">
                                        🔗 Please connect your wallet to purchase tickets
                                    </p>
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Ticket Quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Number of Tickets
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                                            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="text-xl font-semibold w-12 text-center">
                                            {ticketCount}
                                        </span>
                                        <button
                                            onClick={() => setTicketCount(ticketCount + 1)}
                                            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Each ticket costs 0.001 BTC
                                    </p>
                                </div>

                                {/* Total Cost */}
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Total Cost:</span>
                                        <span className="text-xl font-bold text-orange-500">
                                            {(ticketCount * 0.001).toFixed(3)} BTC
                                        </span>
                                    </div>
                                </div>

                                {/* Buy Button */}
                                <button
                                    onClick={handleBuyTickets}
                                    disabled={!isConnected}
                                    className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-colors ${isConnected
                                            ? "bg-orange-500 text-white hover:bg-orange-600"
                                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    {isConnected ? "Buy Tickets" : "Connect Wallet to Buy"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Game Info */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                How to Play
                            </h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Connect your Bitcoin wallet</li>
                                <li>• Choose how many tickets to buy</li>
                                <li>• Pay with Bitcoin (0.001 BTC per ticket)</li>
                                <li>• Wait for the next draw every 144 blocks</li>
                                <li>• Win the entire jackpot if your ticket matches!</li>
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Prize Distribution
                            </h3>
                            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                <li>• Winner takes the entire jackpot</li>
                                <li>• Draws happen automatically every 144 blocks</li>
                                <li>• All transactions are on-chain and transparent</li>
                                <li>• No house edge - player-funded liquidity</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
