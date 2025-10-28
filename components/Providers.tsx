'use client'

import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useState } from 'react'
import { UtxoProvider } from '@/hooks/useUtxos'

const DynamicLasereyesProvider = dynamic(
    () => import('@omnisat/lasereyes').then((mod) => mod.LaserEyesProvider),
    { ssr: false }
)

export default function Providers({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <DynamicLasereyesProvider
            config={{
                dataSources: {
                    sandshrew: {
                        apiKey: '348ae3256c48c15cc99dcb056d2f78df',
                        networks: {
                            regtest: {
                                apiUrl: 'http://localhost:18888',
                                apiKey: '',
                            },
                        },
                    },
                },
            }}
        >
            <UtxoProvider>{children}</UtxoProvider>
        </DynamicLasereyesProvider>
    )
}


