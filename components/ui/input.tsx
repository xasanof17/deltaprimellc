"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";

const shake: Variants = {
  initial: { x: 0 },
  error: {
    x: [-4, 4, -4, 4, 0],
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

interface AnimatedInputProps extends React.ComponentProps<"input"> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className, type, hasError = false, ...props }, ref) => {
    return (
      <motion.div
        variants={shake}
        animate={hasError ? "error" : "initial"}
        className="w-full"
      >
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive placeholder:text-sm",
            className,
          )}
          aria-invalid={hasError ? "true" : "false"}
          {...props}
        />
      </motion.div>
    );
  },
);

Input.displayName = "Input";

export { Input };
