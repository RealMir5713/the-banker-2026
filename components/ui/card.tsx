import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[8px] border border-white/70 bg-white/72 shadow-premium backdrop-blur-2xl",
        className
      )}
      {...props}
    />
  );
}
