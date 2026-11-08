"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = requestAnimationFrame(() => setVisible(true));
    // Auto-close after 3s
    const closeTimer = setTimeout(onClose, 3000);
    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
      }}
    >
      <div
        className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold backdrop-blur-sm border ${
          type === "success"
            ? "bg-[#1a2a0a] border-[#ccff00]/30 text-[#ccff00]"
            : "bg-[#2a0a0a] border-red-500/30 text-red-400"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 shrink-0" />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 opacity-60 hover:opacity-100 transition-opacity text-current"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
