"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { LaserEyesProvider, useLaserEyes } from '@omnisat/lasereyes-react';

interface WalletContextType {
    isConnected: boolean;
    address: string | null;
    publicKey: string | null;
    balance: number | null;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    signMessage?: (message: string) => Promise<string>;
    sendBitcoin?: (to: string, amount: number) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}

interface WalletProviderProps {
    children: ReactNode;
}

// LaserEyes-backed wallet provider
export function WalletProvider({ children }: WalletProviderProps) {
    const { isConnected, address, publicKey, balance, connect, disconnect } = useLaserEyes();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const walletContextValue: WalletContextType = {
        isConnected: mounted ? Boolean(isConnected) : false,
        address: mounted ? (address ?? null) : null,
        publicKey: mounted ? (publicKey ?? null) : null,
        // balance from lasereyes is in sats; convert to BTC number when mounted
        balance: mounted ? (balance != null ? Number(balance) / 100000000 : null) : null,
        connect,
        disconnect,
    };

    return (
        <WalletContext.Provider value={walletContextValue}>
            {children}
        </WalletContext.Provider>
    );
}

// This component wraps the entire app with wallet provider
export function WalletProviderWrapper({ children }: { children: ReactNode }) {
    return (
        <LaserEyesProvider
            config={{
                network: 'mainnet',
            }}
        >
            <WalletProvider>
                {children}
            </WalletProvider>
        </LaserEyesProvider>
    );
}
