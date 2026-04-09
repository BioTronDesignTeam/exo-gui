"use client";

import React, { useEffect, useState } from "react";

const BANNER_DURATION_MS = 4000;

const EmergencyStop = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  const handleEmergencyStop = (): void => {
    setShowBanner(true);
    // TODO: connect to backend
  };

  useEffect(() => {
    if (!showBanner) return;

    const timer = setTimeout(() => {
      setShowBanner(false);
    }, BANNER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [showBanner]);

  return (
    <>
      <button
        onClick={handleEmergencyStop}
        className="bg-red-600 text-white rounded-full font-bold text-xl hover:bg-red-500 p-4 flex justify-center items-center"
      >
        EMERGENCY STOP
      </button>

      {/* Bottom Banner Alert */}
      <div
        className={`
          fixed bottom-0 left-0 w-full z-50
          bg-red-700 text-white font-bold
          text-center px-6 py-4
          transition-transform duration-300 ease-in-out
          ${showBanner ? "translate-y-0" : "translate-y-full"}
        `}
        role="alert"
        aria-live="assertive"
      >
        EMERGENCY STOP PRESSED — SYSTEM HALTED
      </div>
    </>
  );
};

export default EmergencyStop;