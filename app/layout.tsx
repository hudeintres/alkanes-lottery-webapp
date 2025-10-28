import './globals.css'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import localFont from 'next/font/local'
import Providers from '@/components/Providers'
import NavBar from '@/components/NavBar'

const windows = localFont({
  src: './Windows_Regular.ttf',
  variable: '--font-windows',
})

const pxplus = localFont({
  src: './PxPlus_IBM_VGA8.ttf',
  variable: '--font-pxplus',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen flex flex-col items-center justify-start text-white',
          windows.className
        )}
      >
        <Providers>
          <NavBar />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
