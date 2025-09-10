import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classnames
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
