import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y rounded-2xl border border-banker-orange/15 bg-white/78 px-4 py-3 text-sm text-banker-navy shadow-sm outline-none transition focus:border-banker-orange focus:bg-white focus:ring-4 focus:ring-banker-orange/10 disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

export { Textarea };
