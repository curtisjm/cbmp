import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground ring-offset-background transition-[background-color,border-color,box-shadow] duration-150 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:border-foreground/20 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 read-only:bg-surface-subtle disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-state-disabled disabled:opacity-100 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
