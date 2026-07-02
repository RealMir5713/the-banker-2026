import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-banker-orange/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-banker-orange shadow-sm backdrop-blur-xl",
        className
      )}
      {...props}
    />
  );
}
