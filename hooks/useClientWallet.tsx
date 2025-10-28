"use client";

import { useLaserEyes } from '@omnisat/lasereyes';
import type { ProviderType } from '@omnisat/lasereyes';

export function useClientWallet() {
    const laserEyes = useLaserEyes();

    return {
        isConnected: !!laserEyes?.address,
        address: laserEyes?.address ?? null,
        publicKey: laserEyes?.publicKey ?? null,
        balance: laserEyes?.balance ?? null,
        connect: laserEyes?.connect ?? (async (provider: ProviderType) => {
            console.log("Connect called but LaserEyes not ready");
        }),
        disconnect: laserEyes?.disconnect ?? (async () => {
            console.log("Disconnect called but LaserEyes not ready");
        }),
        signPsbt: laserEyes?.signPsbt ?? (async (psbt: any) => {
            console.log("SignPsbt called but LaserEyes not ready");
            return psbt;
        }),
    };
}

