"use client";

import React, { ReactNode } from 'react';
import { LaserEyesProvider, MAINNET } from '@omnisat/lasereyes';

// This component wraps the entire app with wallet provider
export function WalletProviderWrapper({ children }: { children: ReactNode }) {
    return (
        <LaserEyesProvider
            config={{
                network: MAINNET,
            }}
        >
            {children}
        </LaserEyesProvider>
    );
}
