"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  autoCloseDelay?: number;
  onConfirm?: () => void;
  confirmText?: string;
  showProcessFirst?: boolean; // Whether to show a "processing" state first
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  autoCloseDelay = 3000,
  onConfirm,
  confirmText = "Concluir",
  showProcessFirst = true,
}: SuccessModalProps) {
  const [state, setState] = useState<"processing" | "success">("processing");

  useEffect(() => {
    if (isOpen) {
      if (showProcessFirst) {
        setState("processing");
        const timer = setTimeout(() => {
          setState("success");
        }, 1500); // 1.5s for processing animation
        return () => clearTimeout(timer);
      } else {
        setState("success");
      }
    }
  }, [isOpen, showProcessFirst]);

  useEffect(() => {
    if (isOpen && state === "success" && !onConfirm) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, state, onClose, autoCloseDelay, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-card border border-border shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="relative p-8 flex flex-col items-center text-center">
          {/* Top Decorative Element */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-600"></div>

          {state === "processing" ? (
            <div className="mb-6 flex flex-col items-center animate-in fade-in duration-500">
              <div className="relative">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 bg-primary/10 rounded-full"></div>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-foreground">Processando...</h3>
              <p className="text-sm text-muted-foreground">Validando informações no sistema</p>
            </div>
          ) : (
            <div className="animate-in zoom-in-50 duration-500">
              <div className="mb-6 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping duration-1000 scale-150 opacity-20"></div>
                  <div className="relative bg-green-500 text-white rounded-full p-3 shadow-lg shadow-green-500/30">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {message}
              </p>

              {onConfirm ? (
                <Button 
                  onClick={onConfirm} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl transition-all active:scale-95"
                >
                  {confirmText}
                </Button>
              ) : (
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-green-500 animate-progress origin-left"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
