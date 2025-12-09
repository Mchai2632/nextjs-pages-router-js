import { cn } from "@/utils/cn";
import React from "react";

export default function VerticalSeparator({ color = "currentColor", width = 1, height = "100%", position = "right" }) {
  return (
    <span
      className={cn(`z-1 absolute top-1/2 -translate-y-1/2`, position === "right" ? "left-full" : "right-full")}
      style={{
        height: height,
        borderLeftWidth: `${width}px`,
        borderColor: color,
      }}
    />
  );
}

// Example
function Example() {
  <div className="relative">
    <div className=" px-50 bg-yellow-300">1</div>
    <VerticalSeparator height="40%" width={10} color="border-primary" />
  </div>;
}
