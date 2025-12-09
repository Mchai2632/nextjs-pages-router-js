import React from "react";
import { motion, scale } from "motion/react";
import { cn } from "@/utils/cn";

export default function Button({
  children,
  onClick,
  variant = "theme",
  size = "md",
  icon: Icon,
  iconPosition = "right", // left or right
  className = "",
  ...props
}) {
  // === Variant Styles ===
  const variants = {
    theme: "bg-bg-light text-text shadow-s hover:shadow-m",
    primary: "bg-primary text-bg-dark shadow-s hover:shadow-m",
    outline: "border border-current text-current bg-transparent hover:bg-primary hover:text-white",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  // === Size Styles ===
  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 cursor-pointer",
        "disabled:bg-gray-200 disabled:text-gray-100 disabled:select-none disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* icon-left */}
      {Icon && iconPosition === "left" && (
        <div className="bg-background rounded-full p-1">
          <Icon className="w-4 h-4 text-text fill-current" />
        </div>
      )}

      <span className="text-nowrap">{children}</span>

      {/* icon-right */}
      {Icon && iconPosition === "right" && (
        <div className="bg-background rounded-full p-1">
          <Icon className="w-4 h-4 text-text fill-current" />
        </div>
      )}
    </motion.button>
  );
}
