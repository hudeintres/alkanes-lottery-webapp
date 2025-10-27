"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function ClientNavbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder during SSR
        return (
            <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">₿</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                BTC Lottery
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return <Navbar />;
}

