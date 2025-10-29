'use client'

import dynamic from 'next/dynamic'
import { ReactNode, useEffect, useState } from 'react'
import { UtxoProvider } from '@/hooks/useUtxos'
import '@omnisat/lasereyes-ui/style'
import { LaserEyesModalProvider } from '@omnisat/lasereyes-ui'

const DynamicLasereyesProvider = dynamic(
    () => import('@omnisat/lasereyes').then((mod) => mod.LaserEyesProvider),
    { ssr: false }
)

export default function Providers({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)
    const [providers, setProviders] = useState<any[]>([])

    useEffect(() => {
        setMounted(true)
        // Dynamically load providers after mount (from same module as LaserEyesProvider)
        import('@omnisat/lasereyes').then((mod) => {
            setProviders([mod.KEPLR, mod.UNISAT, mod.OYL])
        })
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
            {providers.length > 0 ? (
                <LaserEyesModalProvider
                    config={{
                        providers: providers,
                        theme: {
                            primaryColor: '#3b82f6', // Blue primary color
                            darkMode: 'auto', // Follow system preference
                            borderRadius: 1, // Default border radius
                        },
                    }}
                >
                    <UtxoProvider>{children}</UtxoProvider>
                </LaserEyesModalProvider>
            ) : (
                <UtxoProvider>{children}</UtxoProvider>
            )}
        </DynamicLasereyesProvider>
    )
}


