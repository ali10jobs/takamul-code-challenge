"use client";

import React from "react";

type InputVariant = "search" | "email";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

const variantClasses: Record<InputVariant, string> = {
  search:
    "w-full bg-transparent border border-white/50 text-white placeholder-white/60 px-4 py-2 rounded text-sm focus:outline-none focus:border-white transition-colors",
  email:
    "bg-transparent border border-white/50 text-white placeholder-white/60 px-4 py-2 rounded text-sm focus:outline-none focus:border-white transition-colors",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "email", className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${variantClasses[variant]} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
