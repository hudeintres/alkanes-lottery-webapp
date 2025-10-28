"use client";

import { ReactNode, useEffect, useState } from "react";
import { MAINNET } from "@omnisat/lasereyes";
import dynamic from "next/dynamic";

const DynamicLaserEyesProvider = dynamic(
  () => import("@omnisat/lasereyes").then((mod) => mod.LaserEyesProvider),
  { ssr: false }
);

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DynamicLaserEyesProvider
      config={{
        network: MAINNET,
      }}
    >
      {children}
    </DynamicLaserEyesProvider>
  );
}
