import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  variant?: "light" | "dark" | "color";
}

export function Logo({ className = "", size = 40, variant = "color" }: LogoProps) {
  const colors = {
    light: "#FFFFFF",
    dark: "#1e293b",
    color: "#3b82f6", // primary blue
  };

  const mainColor = colors[variant];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Shield Background */}
        <path
          d="M50 5L15 20V45C15 65.2 29.8 84.1 50 95C70.2 84.1 85 65.2 85 45V20L50 5Z"
          fill={mainColor}
          fillOpacity={variant === "color" ? "0.1" : "0.2"}
          stroke={mainColor}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        
        {/* Inner Shield / Protection Symbol */}
        <path
          d="M50 15L25 25V45C25 58.5 35.5 72.5 50 82C64.5 72.5 75 58.5 75 45V25L50 15Z"
          fill={mainColor}
        />

        {/* Text VC */}
        <text
          x="50"
          y="58"
          fill={variant === "color" ? "#FFFFFF" : variant === "light" ? colors.dark : colors.light}
          fontSize="24"
          fontWeight="bold"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          VC
        </text>

        {/* Decorative elements - small circles representing data/connected nodes */}
        <circle cx="50" cy="15" r="3" fill={mainColor} stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="25" cy="25" r="3" fill={mainColor} stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="75" cy="25" r="3" fill={mainColor} stroke="#FFFFFF" strokeWidth="1" />
      </svg>
    </div>
  );
}

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-tight ${className}`}>
      <span className="font-black text-xl tracking-tighter">
        VITIMIZAÇÃO<span className="text-blue-500">ANGOLA</span>
      </span>
      <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">
        Vitimização Criminal
      </span>
    </div>
  );
}
