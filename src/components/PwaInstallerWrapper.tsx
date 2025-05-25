'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the PWA installer component with client-side only rendering
const PwaInstaller = dynamic(
  () => import('./PwaInstaller'),
  { ssr: false }
);

// Simple client component wrapper for the PWA installer
export default function PwaInstallerWrapper() {
  return (
    <Suspense fallback={null}>
      <PwaInstaller />
    </Suspense>
  );
}
