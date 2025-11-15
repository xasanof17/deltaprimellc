"use client";

import type * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive will-change-transform",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm sm:text-base",
        sm: "h-8 rounded-md px-3 text-xs sm:text-sm",
        lg: "h-11 sm:h-12 rounded-md px-6 sm:px-8 text-base sm:text-lg",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10 sm:size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface AnimatedButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/* ---------------------------------------------------
   🔥 ANIMATED BUTTON:
   - Lift on hover
   - Press down on tap
   - Subtle glow
   - Ripple click effect
---------------------------------------------------- */

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: AnimatedButtonProps) {
  const Comp: any = asChild ? Slot : motion.button;

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}

      /* ✨ Motion magic */
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}

      {...props}
    />
  );
}

export { buttonVariants };
