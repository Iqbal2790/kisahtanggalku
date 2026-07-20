"use client";

import React, { useState, useEffect } from "react";
import { Download, Loader2 } from "lucide-react";

export function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleDone = () => setIsLoading(false);
    window.addEventListener("download-complete", handleDone);
    window.addEventListener("download-error", handleDone);
    
    return () => {
      window.removeEventListener("download-complete", handleDone);
      window.removeEventListener("download-error", handleDone);
    };
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    window.dispatchEvent(new CustomEvent("trigger-download"));
    
    // Fallback if event somehow doesn't fire back
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 py-4 bg-[#f0ebd8] border-2 border-dashed border-stone-800/40 hover:bg-[#e8e2cd] text-stone-800 font-serif font-bold uppercase tracking-widest transition-colors relative group shadow-sm disabled:opacity-70 disabled:cursor-wait"
    >
      <div className="absolute inset-0 border border-stone-800/10 m-1 pointer-events-none"></div>
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Mengekspor...
        </>
      ) : (
        <>
          <Download className="w-5 h-5" />
          Simpan Kartu
        </>
      )}
    </button>
  );
}
