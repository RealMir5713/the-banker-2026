import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-2xl border border-banker-orange/15 bg-white/78 px-4 pr-11 text-sm text-banker-navy shadow-sm outline-none transition focus:border-banker-orange focus:bg-white focus:ring-4 focus:ring-banker-orange/10 disabled:cursor-not-allowed disabled:opacity-60",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-banker-orange" />
    </div>
  )
);

Select.displayName = "Select";

export { Select };
