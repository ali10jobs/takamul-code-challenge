"use client";

import React from "react";

type ButtonVariant = "primary" | "outline" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-accent-hover transition-colors",
  outline:
    "border border-white text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-white/10 transition-colors",
  icon: "p-2 rounded-full text-white hover:bg-white/10 transition-colors flex items-center justify-center",
};

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
