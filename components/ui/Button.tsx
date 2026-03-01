"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  icon,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer border border-transparent hover:scale-[1.02] active:scale-[0.98]";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary:
      "bg-[#7C3AED] text-white hover:bg-[#9D6FF0] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]",
    secondary:
      "bg-transparent text-white border-[#1E2540] hover:border-[#7C3AED] hover:text-[#9D6FF0]",
    ghost:
      "bg-transparent text-[#94A3B8] hover:text-white underline-offset-4 hover:underline",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${disabled ? "hover:!scale-100 active:!scale-100" : ""}`}
    >
      {content}
    </button>
  );
}
