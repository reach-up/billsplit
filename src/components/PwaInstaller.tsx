"use client";

import { useEffect, useState } from 'react';

// PWA installation prompt component
export default function PwaInstaller() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Store the install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setInstallPrompt(null);
  };

  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 border border-purple-200 dark:border-purple-900 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-purple-600 to-green-600 p-2 rounded-lg">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-sm">Install BillSplit</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Add to your home screen for easy access</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setInstallPrompt(null)}
            className="text-xs px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md"
          >
            Not now
          </button>
          <button
            onClick={handleInstallClick}
            className="text-xs px-3 py-1.5 bg-purple-600 text-white rounded-md"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
