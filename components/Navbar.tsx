"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/contexts/WalletContext";

export default function Navbar() {
    const pathname = usePathname();
    const { isConnected, address, connect, disconnect, balance } = useWallet();

    const navItems = [
        { name: "Jackpot", href: "/jackpot" },
        { name: "Liquidity", href: "/liquidity" },
        { name: "My Tickets", href: "/tickets" },
        { name: "Docs", href: "/docs" },
    ];

    const handleWalletClick = async () => {
        if (isConnected) {
            await disconnect();
        } else {
            await connect();
        }
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const formatBalance = (bal: number | null) => {
        if (bal === null) return "0.00000000";
        return bal.toFixed(8);
    };

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">₿</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            BTC Lottery
                        </span>
                    </Link>

                    <div className="hidden md:block">
                        <div className="flex items-center space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors hover:text-orange-500 ${pathname === item.href
                                            ? "text-orange-500"
                                            : "text-gray-700 dark:text-gray-300"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {isConnected && address && (
                            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                <span>{formatBalance(balance)} BTC</span>
                                <span className="text-gray-400">•</span>
                                <span>{formatAddress(address)}</span>
                            </div>
                        )}
                        <button
                            onClick={handleWalletClick}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isConnected
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-orange-500 text-white hover:bg-orange-600"
                                }`}
                        >
                            {isConnected ? "Disconnect" : "Connect Wallet"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
