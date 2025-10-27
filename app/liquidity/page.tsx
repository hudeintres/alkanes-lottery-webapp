"use client";

import { useState, useEffect } from "react";
import ClientNavbar from "@/components/ClientNavbar";
import { useClientWallet } from "@/hooks/useClientWallet";

export default function LiquidityPage() {
    const { isConnected, address } = useClientWallet();
    const [depositAmount, setDepositAmount] = useState("");
    const [currentAPY, setCurrentAPY] = useState("12.5");
    const [totalLiquidity, setTotalLiquidity] = useState("150.8");
    const [userDeposits, setUserDeposits] = useState("0.0");

    // Simulate APY updates
    useEffect(() => {
        const interval = setInterval(() => {
            const baseAPY = 12.5;
            const variation = (Math.random() - 0.5) * 2;
            setCurrentAPY((baseAPY + variation).toFixed(1));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleDeposit = async () => {
        if (!isConnected || !address) {
            alert("Please connect your wallet first!");
            return;
        }

        if (!depositAmount || parseFloat(depositAmount) <= 0) {
            alert("Please enter a valid deposit amount!");
            return;
        }

        try {
            // TODO: Implement smart contract interaction using oyl-sdk
            // const result = await executeWithBtcWrapUnwrap(/* contract call params */);

            // For now, call our API endpoint
            const response = await fetch('/api/liquidity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'deposit',
                    userAddress: address,
                    amount: depositAmount
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(`Successfully deposited ${depositAmount} BTC! Transaction ID: ${result.transactionId}`);
                setUserDeposits((parseFloat(userDeposits) + parseFloat(depositAmount)).toString());
                setDepositAmount("");
            } else {
                alert(`Failed to deposit: ${result.error}`);
            }
        } catch (error) {
            console.error('Error depositing:', error);
            alert('An error occurred while depositing. Please try again.');
        }
    };

    const handleWithdraw = async () => {
        if (!isConnected || !address) {
            alert("Please connect your wallet first!");
            return;
        }

        if (parseFloat(userDeposits) <= 0) {
            alert("You have no deposits to withdraw!");
            return;
        }

        try {
            // TODO: Implement smart contract interaction using oyl-sdk
            // const result = await executeWithBtcWrapUnwrap(/* contract call params */);

            // For now, call our API endpoint
            const response = await fetch('/api/liquidity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'withdraw',
                    userAddress: address,
                    amount: userDeposits
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(`Successfully withdrew ${userDeposits} BTC! Transaction ID: ${result.transactionId}`);
                setUserDeposits("0.0");
            } else {
                alert(`Failed to withdraw: ${result.error}`);
            }
        } catch (error) {
            console.error('Error withdrawing:', error);
            alert('An error occurred while withdrawing. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ClientNavbar />

            <main className="pt-16">
                <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                            Liquidity Pool
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Provide liquidity to earn attractive yields while supporting the lottery ecosystem
                        </p>
                    </div>

                    {/* Pool Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                Total Liquidity
                            </h3>
                            <p className="text-3xl font-bold text-orange-500">
                                {totalLiquidity} BTC
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                Current APY
                            </h3>
                            <p className="text-3xl font-bold text-green-500">
                                {currentAPY}%
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                Your Deposits
                            </h3>
                            <p className="text-3xl font-bold text-blue-500">
                                {userDeposits} BTC
                            </p>
                        </div>
                    </div>

                    {/* Deposit/Withdraw Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Deposit Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Add Liquidity
                            </h2>

                            {!isConnected && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                    <p className="text-yellow-800 dark:text-yellow-200">
                                        🔗 Please connect your wallet to provide liquidity
                                    </p>
                                </div>
                            )}

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Deposit Amount (BTC)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.00000001"
                                        value={depositAmount}
                                        onChange={(e) => setDepositAmount(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        placeholder="0.00000000"
                                    />
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        Minimum deposit: 0.0001 BTC
                                    </p>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Expected APY:</span>
                                        <span className="text-lg font-semibold text-green-500">{currentAPY}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Your share of pool:</span>
                                        <span className="text-lg font-semibold text-blue-500">
                                            {totalLiquidity && depositAmount
                                                ? ((parseFloat(depositAmount) / (parseFloat(totalLiquidity) + parseFloat(depositAmount))) * 100).toFixed(2)
                                                : "0.00"}%
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDeposit}
                                    disabled={!isConnected || !depositAmount}
                                    className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-colors ${isConnected && depositAmount
                                            ? "bg-green-500 text-white hover:bg-green-600"
                                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Add Liquidity
                                </button>
                            </div>
                        </div>

                        {/* Withdraw Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                Withdraw Liquidity
                            </h2>

                            <div className="space-y-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="text-blue-800 dark:text-blue-200">Available to withdraw:</span>
                                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                                            {userDeposits} BTC
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Current APY:</span>
                                        <span className="text-lg font-semibold text-green-500">{currentAPY}%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 dark:text-gray-400">Your pool share:</span>
                                        <span className="text-lg font-semibold text-blue-500">
                                            {totalLiquidity && userDeposits
                                                ? ((parseFloat(userDeposits) / parseFloat(totalLiquidity)) * 100).toFixed(2)
                                                : "0.00"}%
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleWithdraw}
                                    disabled={!isConnected || parseFloat(userDeposits) <= 0}
                                    className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-colors ${isConnected && parseFloat(userDeposits) > 0
                                            ? "bg-orange-500 text-white hover:bg-orange-600"
                                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Withdraw All
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                How Liquidity Provision Works
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Benefits of Providing Liquidity
                                    </h4>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>• Earn {currentAPY}% APY on your Bitcoin</li>
                                        <li>• Support the lottery ecosystem</li>
                                        <li>• No lock-up period - withdraw anytime</li>
                                        <li>• Transparent on-chain rewards</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Risks & Considerations
                                    </h4>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>• Smart contract risk (audited)</li>
                                        <li>• APY varies with ticket sales</li>
                                        <li>• Bitcoin price volatility</li>
                                        <li>• Impermanent loss potential</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
