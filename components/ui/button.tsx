import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-banker-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-banker-orange text-white shadow-glow hover:-translate-y-0.5 hover:bg-[#f15e00]",
        secondary:
          "border border-white/55 bg-white/70 text-banker-navy backdrop-blur-xl hover:-translate-y-0.5 hover:border-banker-orange/35 hover:bg-white",
        outline:
          "border border-banker-orange/30 bg-white/70 text-banker-navy hover:-translate-y-0.5 hover:border-banker-orange hover:bg-banker-light/40",
        ghost:
          "text-banker-navy hover:bg-banker-light/35",
        dark:
          "bg-banker-navy text-white hover:-translate-y-0.5 hover:bg-[#102a4d]"
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
