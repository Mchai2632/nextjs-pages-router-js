import { cn } from "@/utils/cn";
import React from "react";

export default function Container({ children, ...props }) {
  return (
    <div className={cn("container")} {...props}>
      {children}
    </div>
  );
}
