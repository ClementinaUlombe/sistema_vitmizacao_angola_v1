"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  autoCloseDelay?: number; // New prop for auto-close delay
}

export default function SuccessModal({
  isOpen,
  onClose,
  title,
  message,
  autoCloseDelay = 3000, // Default to 3 seconds
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseDelay]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-sm border-2 border-purple-deep bg-gradient-to-br from-purple-light to-blue-500 text-white">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-center">
          <p className="text-lg">{message}</p>
          {/* Removed explicit button, as it auto-closes */}
        </CardContent>
      </Card>
    </div>
  );
}
