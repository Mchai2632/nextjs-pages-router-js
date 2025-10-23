import { cn } from "@/utils/cn";
import React from "react";

export default function Tag({ tagText, variant }) {
  const baseStyles = "px-3 py-1 rounded-full text-sm";
  const variants = {
    primary: "bg-primary text-white",
    outline: "border border-current text-current bg-transparent", // <- 新增 outline
  };

  return (
    <span
      className={cn(baseStyles, variant ? variants[variant] : variants.primary)}
    >
      {tagText}
    </span>
  );
}
