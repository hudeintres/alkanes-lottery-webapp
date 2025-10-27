"use client";

import { useState, useEffect } from 'react';
import { useLaserEyes } from '@omnisat/lasereyes';
import type { ProviderType } from '@omnisat/lasereyes';

export function useClientWallet() {
    const [mounted, setMounted] = useState(false);
    const [contextReady, setContextReady] = useState(false);
    
    useEffect(() => {
        setMounted(true);
        // Give LaserEyes context time to initialize
        const timer = setTimeout(() => {
            setContextReady(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    let laserEyes;
    let error = null;
    try {
        laserEyes = useLaserEyes();
    } catch (e) {
        // LaserEyes context not available
        error = e;
        laserEyes = null;
    }

    // Log for debugging
    if (mounted && contextReady) {
        console.log("useClientWallet: mounted and contextReady");
        console.log("  - laserEyes:", laserEyes);
        console.log("  - error:", error);
    }

    // Return safe defaults until both mounted and context is ready
    if (!mounted || !contextReady || !laserEyes) {
        return {
            isConnected: false,
            address: null,
            publicKey: null,
            balance: null,
            connect: async (provider: ProviderType) => {
                console.log("Connect called before LaserEyes ready");
            },
            disconnect: async () => {
                console.log("Disconnect called before LaserEyes ready");
            },
            signPsbt: async (psbt: any) => {
                console.log("SignPsbt called before LaserEyes ready");
                return psbt;
            },
        };
    }

    // Return real LaserEyes values
    console.log("useClientWallet: Returning real LaserEyes connect function");
    return {
        isConnected: !!laserEyes.address,
        address: laserEyes.address ?? null,
        publicKey: laserEyes.publicKey ?? null,
        balance: laserEyes.balance ?? null,
        connect: laserEyes.connect,
        disconnect: laserEyes.disconnect,
        signPsbt: laserEyes.signPsbt,
    };
}

