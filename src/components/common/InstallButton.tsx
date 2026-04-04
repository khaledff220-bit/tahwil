import React, { useState, useEffect } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

const InstallButton: React.FC = () => {
  const { install, isInstallable, isInstalled } = usePWAInstall();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(isInstallable);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isInstallable]);

  if (isInstalled || !showButton) {
    return null;
  }

  return (
    <button
      onClick={install}
      className="fixed bottom-24 left-4 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 hover:-translate-y-1 active:scale-95"
      aria-label="تثبيت التطبيق"
    >
      <span className="text-xl">📲</span>
      <span className="text-sm font-bold font-cairo">ثبّت التطبيق</span>
    </button>
  );
};

export default InstallButton;
