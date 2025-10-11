import { twMerge } from "tailwind-merge";
import clsx from "clsx";

// cn = class name helper
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
