import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-banker-orange/15 bg-white/78 px-4 text-sm text-banker-navy shadow-sm outline-none transition focus:border-banker-orange focus:bg-white focus:ring-4 focus:ring-banker-orange/10 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
