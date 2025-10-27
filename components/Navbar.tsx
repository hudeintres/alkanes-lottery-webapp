"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { UNISAT, XVERSE, OYL, LEATHER, MAGIC_EDEN, OKX, type ProviderType } from "@omnisat/lasereyes";
import { useClientWallet } from "@/hooks/useClientWallet";

export default function Navbar() {
    const pathname = usePathname();
    const [showWalletMenu, setShowWalletMenu] = useState(false);
    const [mounted, setMounted] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const { address, connect, disconnect, balance, isConnected } = useClientWallet();

    // Handle client-side mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowWalletMenu(false);
            }
        };

        if (showWalletMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showWalletMenu]);

    const navItems = [
        { name: "Jackpot", href: "/jackpot" },
        { name: "Liquidity", href: "/liquidity" },
        { name: "My Tickets", href: "/tickets" },
        { name: "Docs", href: "/docs" },
    ];

    const wallets: Array<{ name: string; provider: ProviderType }> = [
        { name: "Unisat", provider: UNISAT },
        { name: "Xverse", provider: XVERSE },
        { name: "Leather", provider: LEATHER },
        { name: "OYL", provider: OYL },
        { name: "Magic Eden", provider: MAGIC_EDEN },
        { name: "OKX", provider: OKX },
    ];

    const handleWalletClick = async () => {
        console.log("Wallet button clicked. isConnected:", isConnected);
        if (isConnected) {
            console.log("Disconnecting wallet...");
            await disconnect();
            setShowWalletMenu(false);
        } else {
            console.log("Toggling wallet menu");
            setShowWalletMenu(!showWalletMenu);
        }
    };

    const handleConnectWallet = async (e: React.MouseEvent, provider: ProviderType) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("=== handleConnectWallet START ===");
        console.log("Provider:", provider);
        console.log("Connect function:", connect);
        console.log("Mounted:", mounted);
        
        if (!mounted) {
            console.log("Not mounted yet, skipping connection");
            return;
        }
        
        try {
            console.log("About to call connect()...");
            const result = await connect(provider);
            console.log("Connect returned:", result);
            setShowWalletMenu(false);
        } catch (error) {
            console.error("Connect failed with error:", error);
            // Don't close menu on error so user can try again
        }
        console.log("=== handleConnectWallet END ===");
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    const formatBalance = (bal: number | null | undefined) => {
        if (bal === null || bal === undefined) return "0.00000000";
        // Balance from lasereyes is typically in satoshis, convert to BTC
        const btcBalance = typeof bal === 'number' ? bal / 100000000 : 0;
        return btcBalance.toFixed(8);
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
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={handleWalletClick}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isConnected
                                        ? "bg-green-500 text-white hover:bg-green-600"
                                        : "bg-orange-500 text-white hover:bg-orange-600"
                                    }`}
                            >
                                {isConnected ? "Disconnect" : "Connect Wallet"}
                            </button>
                            
                            {showWalletMenu && !isConnected && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                                    <div className="py-2">
                                        {wallets.map((wallet) => (
                                            <button
                                                key={wallet.name}
                                                onClick={(e) => handleConnectWallet(e, wallet.provider)}
                                                className="w-full px-4 py-3 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                {wallet.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
