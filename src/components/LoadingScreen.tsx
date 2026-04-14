"use client";

import React, { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Exibe por 2 segundos
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-slate-900 transition-opacity duration-500 animate-in fade-in">
      <div className="relative">
        {/* Pulsing ring around the logo */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping scale-150" />
        
        <div className="relative animate-pulse">
          <Logo size={120} variant="color" />
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">
          VITIMIZAÇÃO<span className="text-blue-500">ANGOLA</span>
        </h1>
        <p className="mt-2 text-sm font-bold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Vitimização Criminal
        </p>
        
        {/* Loading bar */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full bg-blue-500 animate-loading-bar w-0" />
        </div>
      </div>
      
      <div className="absolute bottom-10 text-xs font-medium text-slate-400">
        Iniciando o Sistema...
      </div>
    </div>
  );
}
