"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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

// Mock wallet implementation for demo purposes
export function WalletProvider({ children }: WalletProviderProps) {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState<string | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        // Check if user was previously connected (mock)
        const savedConnection = localStorage.getItem('walletConnected');
        if (savedConnection === 'true') {
            const savedAddress = localStorage.getItem('walletAddress');
            const savedBalance = localStorage.getItem('walletBalance');

            setIsConnected(true);
            setAddress(savedAddress);
            setPublicKey('mock-public-key-' + savedAddress);
            setBalance(savedBalance ? parseFloat(savedBalance) : 1.5);
        }
    }, []);

    const connect = async () => {
        try {
            // Mock wallet connection
            const mockAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
            const mockBalance = 1.5;

            setIsConnected(true);
            setAddress(mockAddress);
            setPublicKey('mock-public-key-' + mockAddress);
            setBalance(mockBalance);

            // Save to localStorage
            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletAddress', mockAddress);
            localStorage.setItem('walletBalance', mockBalance.toString());

            console.log('Wallet connected successfully!');
        } catch (error) {
            console.error('Failed to connect wallet:', error);
        }
    };

    const disconnect = async () => {
        setIsConnected(false);
        setAddress(null);
        setPublicKey(null);
        setBalance(null);

        // Clear localStorage
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletBalance');

        console.log('Wallet disconnected');
    };

    const walletContextValue: WalletContextType = {
        isConnected,
        address,
        publicKey,
        balance,
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
        <WalletProvider>
            {children}
        </WalletProvider>
    );
}
